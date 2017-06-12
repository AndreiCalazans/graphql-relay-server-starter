import React from "react";
import Relay from 'react-relay';
import Link from './Link';
import CreateLinkMutation from '../mutations/CreateLinkMutation';

// use it to delay function call
import {debounce} from 'lodash';



class Main extends React.Component {
    constructor(props) {
      super(props);

      this.search = debounce(this.search, 300);
    }
    callSearch = (e) => {
      this.search(e.target.value);
    }
    search = (value) => {
      let query = value;
      this.props.relay.setVariables({ query });
    }

    setLimit = (e) => {
      let newLimit = Number(e.target.value);
      this.props.relay.setVariables({limit: newLimit});
    }

    handleSubmit= (e) => {
      e.preventDefault();
      //Mutate...
      Relay.Store.commitUpdate(
        new CreateLinkMutation({
          title: this.refs.newTitle.value,
          url: this.refs.newUrl.value,
          store: this.props.store
        })
      )
      this.refs.newTitle.value = '';
      this.refs.newUrl.value = '';
    }

  render() {
    let content = this.props.store.linkConnection.edges.map(edge => {
      return <Link key={edge.node.id} link={edge.node} />
    });
    return (
      <div>
        <h3>Links</h3>
        <p>This is a link adder, it keeps links by its title. Go ahead and add one</p>
        <form onSubmit={this.handleSubmit}>
          <input style={styles.inputs} type="text" placeholder='Title' ref='newTitle'/>
          <input style={styles.inputs} type="text" placeholder='Url' ref='newUrl'/>
          <button type='submit'>Add</button>
        </form>
        Showing: &nbsp;
        <input style={styles.inputs} type="text" placeholder='Search' onChange={this.callSearch}/>
        <select onChange={this.setLimit} defaultValue={this.props.relay.variables.limit}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <ul>    
          {content}
        </ul>
      </div>
    );
  }
}

//For Relay to read the data to the components
//Declare the data reqirement for this component
// createContainer(component , dataRequirement)
Main = Relay.createContainer(Main, {
  initialVariables: {
    limit: 5,
    query: ''
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
          id,
            linkConnection(first: $limit, query: $query) {
              edges {
                node {
                  id,
                ${Link.getFragment('link')}  
                }
            }
          }
      }
    `
  }
});


export default Main;

const styles = {
  inputs: {
    padding: 5,
    margin: 5,
    display: 'block'
  }
}