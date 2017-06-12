import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import {
    fromGlobalId,
    nodeDefinitions,
    globalIdField,
    mutationWithClientMutationId,
    connectionDefinitions, // is a helper that takes the graphql node and returns as an object
    connectionArgs, // are the args like first:...,last:...
    connectionFromPromisedArray
} from 'graphql-relay';
// the graphql add the edges and node levels to the query



let Schema = (db) =>{

//DUMMY data
    let counter = 42;
    let data = [{counter: 33},{counter: 33},{counter: 44}];

//STORE TYPE
    class Store {};
    let store = new Store();

    let nodeDefs = nodeDefinitions(
        //first function takes the global id and checks the type to return
        (globalId) => {
            let {type} = fromGlobalId(globalId);
            if (type === 'Store') {
                return store;
            }
            return null;
        },
        //second takes the resolve
        (obj) => {
            if (obj instanceof Store) {
                return storeType;
            }
            return null;
        }
    )



    let storeType = new GraphQLObjectType({
           
            name: 'Store',
            fields: () => ({
                // you are returning the linkConnection and relay is adding the node and edges layer to the
                //some to many functionalities
                id: globalIdField("Store"),
                linkConnection: {
                    type: linkConnection.connectionType,
                    args: {
                        ...connectionArgs,
                        query: { type: GraphQLString }
                    },
                    resolve: ( _ , args) => {
                        let findParams = {};
                        if (args.query) {
                            findParams.title = new RegExp(args.query , 'i');
                        } 
                       return connectionFromPromisedArray(
                        db.collection('links')
                            .find(findParams)
                            .sort({createdAt: -1})
                            .toArray(),
                        args
                    )}
                }
            }),
            //any graphql type which is asked by relay must have interface
            interfaces: [nodeDefs.nodeInterface]
        });





//TYPES
let linkType = new GraphQLObjectType({
    name: "Link",
    fields: () => ({
        // _id: {type: GraphQLString },
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) => obj._id
        },
        title: {type: GraphQLString },
        url: {type: GraphQLString },
        createdAt: {
            type: GraphQLString,
            resolve: (obj) => new Date(obj.createdAt).toISOString()
        }
        
    })
});
// is returning an object for the use of the Relay helpers 
let linkConnection = connectionDefinitions({
    name: 'Link',
    nodeType: linkType
});

const Query = new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                node: nodeDefs.nodeField,
                store: {
                    type: storeType,
                    resolve: () => store
                }
                
            })
        });

// mutation in the relay way
let createLinkMutation = mutationWithClientMutationId({
    name: 'CreateLink',

    inputFields: {
        title: { type: new GraphQLNonNull(GraphQLString)},
        url: { type: new GraphQLNonNull(GraphQLString)},
    },

    outputFields: {
        //this is to return the cursor which is sort of an index id
        linkEdge: {
            type: linkConnection.edgeType,
            resolve: (obj) => ({node: obj.ops[0] , cursor: obj.insertedId})
        },
        store: {
            type: storeType,
            resolve: () => store
        }
    },

    mutateAndGetPayload: ({title, url}) => {
        return db.collection("links").insertOne({
        title,
        url,
        createdAt: Date.now()
      });
    }
});



///Simple mutation graphql only
// const Mutation = new GraphQLObjectType({
//             name: 'Mutation',
//             fields: () => ({
//                 incrementCounter: {
//                     type: GraphQLInt,
//                     resolve: () => ++counter
//                 }
//             })
//         });

//Mutation using Relay 
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createLink: createLinkMutation
    })
});



    let schema = new GraphQLSchema({
        query: Query,
        mutation: Mutation
    });
    return schema
}
export default Schema;