import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, Router, Route, Link } from 'react-router'
import { PostsByCategory } from './components/postsByCategory.js'
import { SinglePost } from './components/singlePost.js'
import { Footer } from './components/footer.js'

class App extends React.Component {
    render() {
    	var user = window.user;
        return (
            <div className="container-fluid">
				<header className="col-xs-12 col-sm-3 text-center">
					<Link to="/">
						<div className="col-xs-6 col-sm-9">
							<span className="atta-header">Attaphila</span>
						</div>
						<div className="col-xs-6 col-sm-3">
							<img className="atta-brand" src="img/attaBrand.png" />
						</div>
					</Link>
	            </header>
			  	<nav className="col-xs-12 col-sm-9">
					<ul className="nav nav-justified">
						<li><Link to="/posts/inside">Inside</Link></li>
						<li><Link to="/posts/outside">Outside</Link></li>
						<li><Link to="/posts/relatives">Relatives</Link></li>
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
}

class Hero extends React.Component {
	render() {
		return (
			<section className="hero">
			</section>
		);
	}
}

class CreatePost extends React.Component {
	render() {
		return (
			<section className="page">
				<div className="col-xs-12">
					<h1>New Post</h1>
					<form action="/api/posts" method="post">
						<div>
							<label>Title</label>
							<div>
								<input type="text" name="title" placeholder="Title" required />
							</div>
						</div>
						<div>
							<label>Category</label>
							<br />
							<select name="category">
								<option value="inside">Inside</option>
								<option value="outside">Outside</option>
								<option value="relatives">Relatives</option>
								<option value="anthro">Anthropodicies</option>
							</select>
						</div>
						<div>
			                <label>Cover Photo URL</label>
			                <br />
			                <input type="text" name="coverPhotoURL" placeholder="Cover Photo URL" />
			            </div>
						<div>
							<label>Content</label>
							<div>
								<textarea cols="30" rows="10" name="content" placeholder="Content" required></textarea>
							</div>
						</div>
						<ol>
							<li>
								<label>Media Link</label>
								<input type="text" name="mediaLinkURL" placeholder="Media Link URL" />
								<br />
								<label>Media Type</label>
								<select name="mediaLinkMedia">
									<option value="article">Link</option>
									<option value="youtube">YouTube</option>
									<option value="photo">Photo</option>
								</select>
							</li>
						</ol>
						<div>
							<input type="button" value="Add more media" />
							<input type="button" value="Remove" />
						</div>
						<br />
						<div>
							<input type="submit" />
						</div>
						<div>
							<strong>Errors</strong>
						</div>
					</form>
				</div>
			</section>	
		);
	}
}

class UploadImages extends React.Component {
	render() {
		return (
			<section className="page">
				<div className="col-xs-12">
					<h1>Upload Images</h1>
					<input type="file" />
					<br />
					<div>
						Name: <span></span><br />
						<button>upload</button><br />
						<span>
							Successfully uploaded to:<br />
							<span></span>
						</span>
				        <span>Canceled</span>
				        <span>Error</span>
					</div>
				</div>
			</section>
		);
	}
}

render(
	<Router>
		<Route path="/" component={App}>
			<IndexRoute component={Hero} />
			<Route path="posts/create" component={CreatePost} />
			<Route path="posts/:category" component={PostsByCategory} />
			<Route path="posts/:category/:postid" component={SinglePost} />
			<Route path="/images" component={UploadImages} />
		</Route>
	</Router>,
	document.getElementById('app')
);