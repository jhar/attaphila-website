import React from 'react'
import Markdown from 'react-remarkable'

export class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    loadPostsFromServer(category) {
		var url;
		if (category == 'all') {
			url = "/api/posts";
		} else {
			url = "/api/posts/" + category
		} 
		$.ajax({
			url: url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({
					data: data
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(url, status, err.toString());
			}.bind(this)
		});	
    }
	componentDidMount() {
		this.loadPostsFromServer(this.props.category);		
	}
	componentWillReceiveProps(nextProps) {
		this.loadPostsFromServer(nextProps.category);
	}
	render() {
		var postPreviewNodes = this.state.data.map(function (post) {
			return (
				<PostPreview post={post} changeView={this.props.changeView.bind(this)}>
				</PostPreview>
			);	
		}.bind(this));
		if (this.state.data.length === 0) {
			return (
				<section className="posts-view">
					<h2 className="no-posts">No posts to show</h2>
				</section>
			);
		} else {
			return (
				<section className="posts-view">
					{postPreviewNodes}	
				</section>	
			);
		}
	}
}

class PostPreview extends React.Component {
    constructor(props) {
        super(props);
    }
	render() {
		var content = this.props.post.content;
		var short = content.substr(0,140);
		return (
			<article>
				<a onClick={this.props.changeView.bind(this, 'post', {category:this.props.post.category, postid:this.props.post._id, mode: 'read'})}>
					<div className="media">
						<div className="media-left media-middle">
							<img className="media-object" src={this.props.post.coverPhotoURL} />
						</div>
						<div className="media-body">
							<h3 className="media-heading">{this.props.post.title}</h3>
							<p>{this.props.post.short}</p>
							<span>Click to read more.</span>
						</div>
					</div>
				</a>
			</article>
		);
	}	
}