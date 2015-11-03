import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'

var App = React.createClass({
    render: function() {
    	var user = window.user;
        return (
            <div className="container-fluid">
				<header>
			    	<span className="h2">Attaphila</span>
	            </header>
			  	<nav>
					<ul className="nav nav-justified">
						<li><Link to="/posts/inside">Inside</Link></li>
						<li><Link to="/posts/outside">Outside</Link></li>
						<li><Link to="/posts/relatives">Distant Relatives</Link></li>
						<li><Link to="/posts/anthro">Anthropodicies</Link></li>
					</ul>
				</nav>
				{this.props.children}
				<footer>
					<Footer user={user}/>
				</footer>
	        </div>
        );
    } 
});

var Footer = React.createClass({
	render: function() {

		if (this.props.user == 'null') {
			return (<SignIn />);
		} else {
			return (<SignOut username={this.props.user.username} />);
		}
		
	}	
});

var SignIn = React.createClass({
	render: function() {
		return (
			<div className="col-xs-12">
				Are you Zach? Then <a href="/signin">Sign In</a> !
			</div>
		);
	}	
});

var SignOut = React.createClass({
	render: function() {
		return (
			<div className="col-xs-12">
				<h3>Hello <span>{this.props.username}</span>!</h3>
				<a href="/signout">Signout</a>
				<br />
				<a href="/posts/create">Create Post</a>
				<br />
				<a href="/posts/">List All Posts</a>
			</div>
		);
	}	
});

var PostsByCategory = React.createClass({
	loadPostsFromServer: function(cat) {
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
	},
	getInitialState: function() {
		return {
			data: []
		};
	},
	componentDidMount: function() {
		this.loadPostsFromServer(this.props.params.category);		
	},
	componentWillReceiveProps: function(nextProps) {
		this.loadPostsFromServer(nextProps.params.category);
	},
	render: function() {
		var postPreviewNodes = this.state.data.map(function (post) {
			return (
				<PostPreview post={post}>
				</PostPreview>
			);	
		});
		return (
			<section className="postsByCategory">
				{postPreviewNodes}	
			</section>	
		);
	}
});

var PostPreview = React.createClass({
	render: function() {
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
});

var SinglePost = React.createClass({
	loadPostFromServer: function(cat, pid) {
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
	},
	componentDidMount: function() {
		this.loadPostFromServer(this.props.params.category, this.props.params.postid);		
	},
	getInitialState: function() {
		return {
			post: {
				creator: {},
				medialinks: [{}]
			}
		};
	},
	render: function() {
		console.log(this.state.post.creator.username);
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
});

var FormattedDate = React.createClass({
	render: function() {
		var months = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
		];
		var date = new Date(this.props.date);
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		return (
			<span>{months[monthIndex] + ' ' + day + ', ' + year}</span>	
		);
	}	
});

render(
	<Router>
		<Route path="/" component={App}>
			<Route path="posts/:category" component={PostsByCategory} />
			<Route path="posts/:category/:postid" component={SinglePost} />
		</Route>
	</Router>,
	document.getElementById('app')
);