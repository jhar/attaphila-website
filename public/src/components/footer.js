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
			<div className="text-center">
				<small>
					Copyright 2015. Zach Phillips. 
				</small>
				<button type="button" className="btn btn-link" data-toggle="modal" data-target="#signInModal">Admin</button>
			</div>
		);
	}	
}

class SignOut extends React.Component {
	render() {
		return (
			<div>
				<div className="col-xs-6 text-center">
					<a href="/signout">Signout</a>
				</div>
				<div className="col-xs-6 text-center">
					<a onClick={this.props.changeView.bind(this, 'post', {mode: 'create'})}>Create Post</a>
				</div>
			</div>
		);
	}	
}