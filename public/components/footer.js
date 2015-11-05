import React from 'react'

export class Footer extends React.Component {
	render() {

		if (this.props.user == 'null') {
			return <SignIn />;
		} else {
			return <SignOut username={this.props.user.username} />;
		}
		
	}	
}

class SignIn extends React.Component {
	render() {
		return (
			<div className="col-xs-12 text-center">
				Are you Zach? Then <a href="/signin">Sign In</a> !
			</div>
		);
	}	
}

class SignOut extends React.Component {
	render() {
		return (
			<ul className="nav nav-justified">
				<li><a href="#">Hello {this.props.username}</a></li>
				<li><a href="/signout">Signout</a></li>
				<li><a href="/posts/create">Create Post</a></li>
				<li><a href="/posts/">List All Posts</a></li>
			</ul>
		);
	}	
}