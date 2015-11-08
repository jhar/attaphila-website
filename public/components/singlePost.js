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
		var adminOptions;
		var user = window.user;
		if (user._id == this.state.post.creator._id) {
			adminOptions = <SinglePostAdmin post={this.state.post} />
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
	render() {
		return (
			<div>
				<a href="/posts/{this.state.post.category}/{this.state.post._id}/edit">edit </a>or
				<a href="#"> delete</a>
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