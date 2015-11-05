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
			<div className="col-xs-12">
				Are you Zach? Then <a href="/signin">Sign In</a> !
			</div>
		);
	}	
}

class SignOut extends React.Component {
	render() {
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
}