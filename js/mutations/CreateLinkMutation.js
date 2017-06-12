import Relay from 'react-relay';

class CreateLinkMutation extends Relay.Mutation {
   //these functions are default

   //must return the graphql operation for this mutation to work
    getMutation() {
        return Relay.QL`
            mutation { createLink }
        `
    }
    //prepare the variables for the mutation, it allows you to do  things with
    // the variables
    getVariables() {
        return {
            title: this.props.title,
            url: this.props.url
        }
    }
    // normally it represents what will be effected by this query
    getFatQuery() {
        return Relay.QL`
            fragment on CreateLinkPayload {
                linkEdge,
                store { linkConnection }
            }
        `
    }
    // this determines what to do on the return add, delete , update etc...
    getConfigs() {
        return [{
            type: 'RANGE_ADD',
            parentName: 'store',
            parentID: this.props.store.id,
            connectionName: 'linkConnection',
            edgeName: 'linkEdge',
            // can you use append or prepend
            rangeBehaviors: {
                '': 'prepend'
            },
        }]
    }
    // optimistic updates renders to the client as soons as the mutation is called
    getOptimisticResponse() {
        return {
            linkEdge: {
                node: {
                    title: this.props.title,
                    url: this.props.url,
                }
            }
        }
    }
}

export default CreateLinkMutation;