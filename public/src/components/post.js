import React from 'react'
import { FormattedDate } from './reusable.js'

export class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.params.mode,
            post: {
                creator: {},
                medialinks: [{}]
            }
        }
    }
    loadPostFromServer(category, postid) {
		$.ajax({
			url: "/api/posts" + category + "/" + postid,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({
					post: data
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.state.url, status, err.toString());
			}.bind(this)
		});	
    }
    componentDidMount() {
        if (this.state.mode == 'read') {
		    this.loadPostFromServer(this.props.params.category, this.props.params.postid);
        }
	}
	render() {
	    return (
	        <ul>
	            <li>Category: {this.props.params.category}</li>
	            <li>Mode: {this.state.mode}</li>
	       </ul>
	    );
	}
}