import {post} from 'jquery';

let API = {
    fetchLinks() {
        post('/graphql', {
            query: `{
                links {
                    _id
                }
            }`
         }).done( res => console.log(res.data.links))
    }
}

export default API;