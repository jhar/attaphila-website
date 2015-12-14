import React from 'react'

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
			    console.info(this);
			    console.log(data);
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
				<PostPreview post={post}>
				</PostPreview>
			);	
		});
		return (
			<section className="col-xs-12">
				{postPreviewNodes}	
			</section>	
		);
	}
}

class PostPreview extends React.Component {
	render() {
		return (
			<article className="row">
				<div className="col-xs-12">
					<a href="#">
						<div className="media">
							<div className="media-left media-middle">
								<img className="media-object" src={this.props.post.coverPhotoURL} />
							</div>
							<div className="media-body">
								<h3 className="media-heading">{this.props.post.title}</h3>
								<p>{this.props.post.content}</p>
								<span>Click to read more.</span>
							</div>
						</div>
					</a>
				</div>
			</article>
		);
	}	
}