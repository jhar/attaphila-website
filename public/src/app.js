import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, Router, Route, Link } from 'react-router'
import { PostsByCategory } from './components/postsByCategory.js'
import { SinglePost } from './components/singlePost.js'
import { CreatePost } from './components/createPost.js'
import { EditPost } from './components/editPost.js'
import { UploadImages } from './components/uploadImages.js'
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

render(
	<Router>
		<Route path="/" component={App}>
			<IndexRoute component={Hero} />
			<Route path="posts/create" component={CreatePost} />
			<Route path="posts/:category" component={PostsByCategory} />
			<Route path="posts/:category/:postid" component={SinglePost} />
			<Route path="posts/:category/:postid/edit" component={EditPost} />
			<Route path="/images" component={UploadImages} />
		</Route>
	</Router>,
	document.getElementById('app')
);