import React from 'react'
import { FormattedDate } from './reusable.js'

export class SinglePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {
                creator: {},
                medialinks: [{}]
            }
        };
    }
	loadPostFromServer(cat, pid) {
		var url = "/api/posts/" + cat + "/" + pid;
		$.ajax({
			url: url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({
					post: data
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(url, status, err.toString());
			}.bind(this)
		});	
	}
	componentDidMount() {
		this.loadPostFromServer(this.props.params.category, this.props.params.postid);		
	}
	render() {
		return (
			<section className="page">
				<div className="row">
					<div className="col-xs-0 col-sm-1 col-md-2 col-lg-2"></div>
					<div className="col-xs-12 col-sm-10 col-md-8 col-lg-8">
						<img className="img-responsive cover-photo" src={this.state.post.coverPhotoURL} />
						<h2>{this.state.post.title}</h2>
					</div>
					<div className="col-xs-0 col-sm-1 col-md-2 col-lg-2"></div>
				</div>
				<div className="row">
					<div className="col-xs-0 col-sm-1 col-md-2 col-lg-2"></div>
					<div className="col-xs-12 col-sm-10 col-md-8 col-lg-8">
						<p>{this.state.post.content}</p>
						<small>
							<em>Posted on </em>
							<em>
								<FormattedDate date={this.state.post.created} />
							</em>
							<em> by </em>
							<em>{this.state.post.creator.username}</em>
						</small>
						<div>
							// TODO: Only show if user._id == post.creator._id
							<a href="/posts/{this.state.post.category}/{this.state.post._id}/edit">edit</a>
							// TODO: Make this delete the post
							<a href="#">delete</a>
						</div>
					</div>
					<div className="col-xs-0 col-sm-1 col-md-2 col-lg-2"></div>
				</div>
				<div className="row">
					<div className="col-xs-0 col-sm-1 col-md-2 col-lg-2"></div>
					<div className="col-xs-12 col-sm-10 col-md-8 col-lg-8">
						// TODO: media in post.medialinks
						<div>
							<div>
								<h3>
									// TODO: if media.media == 'article', then
							  			a href=media.url Go to Page /a
							  	</h3>
							</div>
							<div className="embed-responsive embed-responsive-16by9">
							  <iframe className="embed-responsive-item">
							  	TODO: if media.media == 'youtube', src=media.url
							  </iframe>
							</div>
							<div className="img-responsive">
								TODO: only display img src=media.url if media.media == 'photo'
							</div>
						</div>
					</div>
					<div className="col-xs-0 col-sm-1 col-md-2 col-lg-2"></div>
				</div>
			</section>	
		);
	}	
}