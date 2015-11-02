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
					<a href={"/posts/" + this.props.post.category + "/" + this.props.post._id}>
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
});

render(
	<Router>
		<Route path="/" component={App}>
			<Route path="/posts/:category" component={PostsByCategory} />
		</Route>
	</Router>,
	document.getElementById('app')
);