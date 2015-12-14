import React from 'react'
import { Link } from 'react-router'

export class Footer extends React.Component {
	render() {

		if (this.props.user == 'null') {
			return <SignIn />;
		} else {
			return <SignOut username={this.props.user.username} changeView={this.props.changeView.bind(this)} />;
		}
		
	}	
}

class SignIn extends React.Component {
	render() {
		return (
			<div className="col-xs-12 text-center">
				Are you Zach? Then <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#signInModal">Sign in!</button>
				<div className="modal fade" id="signInModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
						<form action="/signin" className="form-sign-in" method="post">
							<img className="img-responsive signinImage" src="/img/scrapbook.png" />
							<input className="form-control" type="text" name="username" placeholder="Username" required autofocus />
							<input className="form-control" type="password" name="password" placeholder="Password" required />
							<button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
						</form>
				    </div>
				  </div>
				</div>
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
				<li><a onClick={this.props.changeView.bind(this, 'posts', {category: 'all'})}>List All Posts</a></li>
				<li><a>Upload Images</a></li>
			</ul>
		);
	}	
}