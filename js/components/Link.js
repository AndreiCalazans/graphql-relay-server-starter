import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';
class Link extends React.Component {
    dateStyle = () => ({
        color: '#888',
        fontSize: '0.7em',
        marginRight: '0.5em'
    })
    
    dataLabel = () => {
        let {link , relay} = this.props;
        if (relay.hasOptimisticUpdate(link)) {
           return 'Saving...' 
        }
       return moment(link.createdAt).format('lll')
    }

    render() {
        let {link} = this.props;

        return (
            <li style={styles.li_container}>
                <a style={styles.anchor} href={'http://'+link.url}>
                    <p>
                        {link.title}
                    </p>
                    <p>
                        <span style={this.dateStyle()}>{this.dataLabel()}</span>
                        {link.url}
                    </p>
                </a>
            </li>
        );
    }
}

Link = Relay.createContainer(Link, {
    fragments: {
        link: () => Relay.QL`
        fragment on Link {
            url,
            title,
            createdAt,
        }`
    }
});

export default Link;

const styles = {
    li_container: {
        listStyle: 'none',
        padding: 5,
        boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.2)',
        margin: 10
    },
    anchor: {
        textDecoration:'none'
    }

}