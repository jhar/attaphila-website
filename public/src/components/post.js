import React from 'react'
import { FormattedDate } from './reusable.js'

export class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
			    console.log(data);
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
		this.loadPostFromServer(this.props.category, this.props.postid);		
	}
	render() {
	    return (
	        <span>Post</span>   
	    );
	}
}