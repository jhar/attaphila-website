import React from 'react'
import { FormattedDate } from './reusable.js'
import { ComposePost } from './composePost.js'

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
			url: "/api/posts/" + category + "/" + postid,
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
    componentWillMount() {
        if (this.props.mode == 'read' || this.props.mode == 'edit') {
		    this.loadPostFromServer(this.props.category, this.props.postid);
        }
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.mode == 'read' || nextProps.mode == 'edit') {
		    this.loadPostFromServer(nextProps.category, nextProps.postid);
        }
	}
	render() {
	    if (this.props.mode == 'create') {
	        return (
	            <ComposePost mode="create" changeView={this.props.changeView.bind(this)}/>  
	        );
	    } else if (this.props.mode == 'edit') {
	        return (
	            <ComposePost mode="edit" post={this.state.post} changeView={this.props.changeView.bind(this)}/>  
	        );
	    } else {
	        var adminOptions;
    		if ((this.props.user._id == this.state.post.creator._id) || this.props.user.username == 'justin' ) {
    			adminOptions = <PostAdmin post={this.state.post} changeView={this.props.changeView.bind(this)}/>
    		} else {
    			adminOptions = '';
    		}
    		return (
    			<section className="post-view">
					<img className="img-responsive cover-photo" src={this.state.post.coverPhotoURL} />
					<div className="title-container">
						<span className="post-category">{this.state.post.category}</span>
						<span className="post-title">{this.state.post.title}</span>
						<small className="post-meta">
							<em>Posted on </em>
							<em>
								<FormattedDate date={this.state.post.created} />
							</em>
							<em> by </em>
							<em>{this.state.post.creator.username}</em>
						</small>
						{adminOptions}
					</div>
					<p className="post-paragraph">{this.state.post.content}</p>
    				<MediaLinks medialinks={this.state.post.medialinks} />
    			</section>
    		);
        }
	}
}

class PostAdmin extends React.Component {
	constructor(props) {
		super(props);
		this.deletePostFromServer = this.deletePostFromServer.bind(this);
	}
	deletePostFromServer() {
		$.ajax({
			url: "/api/posts/" + this.props.post.category + "/" + this.props.post._id,
			context: this,
			type: 'DELETE',
		}).done(function() {
			this.props.changeView('posts', {category: 'all'});
		});
	}
	render() {
		return (
			<div>
				<button className="btn btn-primary btn-sm">
				    <a onClick={this.props.changeView.bind(this, 'post', {category:this.props.post.category, postid:this.props.post._id, mode: 'edit'})}>Edit</a>
				</button> or <button className="btn btn-primary btn-sm" onClick={this.deletePostFromServer}>Delete</button>
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
            	var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
            	var rxResult = media.url.match(rx);
            	var embedURL = "https://www.youtube.com/embed/" + rxResult[1]; 
                return (
                    <div className="embed-responsive embed-responsive-16by9">
					    <iframe className="embed-responsive-item" frameBorder="0" src={embedURL} allowFullScreen></iframe>
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