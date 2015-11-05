import React from 'react'
import { Link } from 'react-router'

export class PostsByCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
	loadPostsFromServer(cat) {
		var url = "/api/posts/" + cat;
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
		this.loadPostsFromServer(this.props.params.category);		
	}
	componentWillReceiveProps(nextProps) {
		this.loadPostsFromServer(nextProps.params.category);
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
					<Link to={"/posts/" + this.props.post.category + "/" + this.props.post._id}>
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
					</Link>
				</div>
			</article>
		);
	}	
}