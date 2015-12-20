import React from 'react'

export class Footer extends React.Component {
	render() {

		if (this.props.user == 'null') {
			return <SignInButton />;
		} else {
			return <SignOut username={this.props.user.username} changeView={this.props.changeView.bind(this)} />;
		}
		
	}	
}

class SignInButton extends React.Component {
	render() {
		return (
			<div className="col-xs-12 text-center">
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#signInModal">Admin</button>
			</div>
		);
	}	
}

class SignOut extends React.Component {
	render() {
		return (
			<ul className="nav nav-justified">
				<li><a href="/signout">Signout</a></li>
				<li><a onClick={this.props.changeView.bind(this, 'post', {mode: 'create'})}>Create Post</a></li>
				<li><a onClick={this.props.changeView.bind(this, 'uploads')}>Upload Images</a></li>
			</ul>
		);
	}	
}