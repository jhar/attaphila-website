import React from 'react'
import { Link } from 'react-router'
import { FormattedDate } from './reusable.js'

export class SinglePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	url: "/api/posts/" + this.props.params.category + "/" + this.props.params.postid,
            post: {
                creator: {},
                medialinks: [{}]
            }
        };
    }
	loadPostFromServer() {
		$.ajax({
			url: this.state.url,
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
		this.loadPostFromServer();		
	}
	render() {
		var adminOptions;
		var user = window.user;
		if (user._id == this.state.post.creator._id) {
			adminOptions = <SinglePostAdmin url={this.state.url} post={this.state.post} />
		} else {
			adminOptions = '';
		}
		return (
			<section className="col-xs-12">
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
						{adminOptions}
					</div>
					<div className="col-xs-0 col-sm-1 col-md-2 col-lg-2"></div>
				</div>
				<MediaLinks medialinks={this.state.post.medialinks} />
			</section>	
		);
	}	
}

class SinglePostAdmin extends React.Component {
	constructor(props) {
		super(props);
		this.deletePostFromServer = this.deletePostFromServer.bind(this);
	}
	deletePostFromServer() {
		$.ajax({
			url: this.props.url,
			type: 'DELETE',
			complete: function() {
				window.location.href="/";
			}
		});
	}
	render() {
		return (
			<div>
				<button className="btn btn-primary btn-sm"><Link to={"/posts/" + this.props.post.category + "/" + this.props.post._id + "/edit"}>Edit</Link></button> or <button className="btn btn-primary btn-sm" onClick={this.deletePostFromServer}>Delete</button>
			</div>
		);
	}	
}

class MediaLinks extends React.Component {
    render() {
        var mediaLinkNodes = this.props.medialinks.map(function(media) {
            if (media.media == 'article') {
                return (
                    <div>
                        <h3><a href={media.url}>Go to Page</a></h3>  
                    </div>
                );
            } else if (media.media == 'youtube') {
                return (
                    <div className="embed-responsive embed-responsive-16by9">
					    <iframe className="embed-responsive-item" src={media.url}></iframe>
					</div>
                );
            } else if (media.media == 'photo'){
                return (
                    <div className="img-responsive">
						<img src={media.url} />
					</div>
                );
            }
        });
        return (
            <div className="row">
				<div className="col-xs-0 col-sm-1 col-md-2 col-lg-2"></div>
				<div className="col-xs-12 col-sm-10 col-md-8 col-lg-8">
					{mediaLinkNodes}
				</div>
				<div className="col-xs-0 col-sm-1 col-md-2 col-lg-2"></div>
			</div>
        );
    }
}