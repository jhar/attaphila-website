import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import { PostsByCategory } from './components/postsByCategory.js'
import { SinglePost } from './components/singlePost.js'
import { Footer } from './components/footer.js'

class App extends React.Component {
    render() {
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
}

render(
	<Router>
		<Route path="/" component={App}>
			<Route path="posts/:category" component={PostsByCategory} />
			<Route path="posts/:category/:postid" component={SinglePost} />
		</Route>
	</Router>,
	document.getElementById('app')
);