# React + GraphQL + Relay
*The objective of this repo is to share a basic **without auth** graphql server, for others to learn and play around with*

## GRAPHQL SET UP
- `yarn`
- `yarn dev`
- `yarn run update-schema` // every time you change the schema you must update it.


# Database
Make sure your mongo service is running.
A collection called `graphql_tutorial` will be created.


## Play arround

Open `http://localhost:5000/graphql` 

### Query and Mutation examples in the GraphiQL 
*Check out the Schema inside the docs tab for the whole schema.*


`Query`

``` 
query allLinks {
  linksCount
  AllLinks(first: 20) {
    edges {
      node {
        title
        _id
        url
      }
    }
  }
} 
```


`Mutations`
```
mutation createLink($input: CreateLinkInput!) {
  createLink(input: $input) {
    error {
			message
    }
    AllLinks(first: 30) {
			edges {
        node {
          _id
          id
          title
        }
      }
    }
		linkEdge {
			node {
        url
        title
        id
        _id
      }
    }
  }
}
```
**variables to Create Link**
``` 
{
  "input": {
    "title": "Facebook",
    "url": "www.facebook.com",
    "clientMutationId": "32"
  }
} 
```



```
mutation deleteLink($input: DeleteLinkInput!){
  deleteLink(input: $input){
    error {
      message
    }
   AllLinks(first: 20) {
    edges {
      node {
        title
        id
        _id
      }
    }
  } 
  }
}
```
**variables to delete Link**
``` 
{
  "input": {
    "id": "5a1dd932ac310a0c1cf2d931",
    "clientMutationId": "32"
  }
} 
```
