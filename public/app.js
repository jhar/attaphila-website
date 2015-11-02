var App = React.createClass({
    render: function() {
        return (
            <div className="container-fluid">
            	<Header />
				<Content />
				<Footer />
	        </div>
        );
    } 
});

var Header = React.createClass({
	render: function() {
		return (
			<div>
				<header>
			    	<span className="h2">Attaphila</span>
	            </header>
			  	<nav>
					<ul className="nav nav-justified">
						<li>
							<a className="list-group-item" href="#!/posts/inside">Inside</a>
						</li>
						<li>
							<a className="list-group-item" href="#!/posts/outside">Outside</a>
						</li>
						<li>
							<a className="list-group-item" href="#!/posts/relatives">Distant Relatives</a>
						</li>
						<li>
							<a className="list-group-item" href="#!/posts/anthro">Anthropodicies</a>
						</li>
					</ul>
				</nav>
			</div>
		);
	}	
});

var Content = React.createClass({
	render: function() {
		return (
			<section>
			</section>
		);
	}
});

var Footer = React.createClass({
	render: function() {
		var footerRender;
		if (window.user == 'null') {
			footerRender = <SignIn />	
		} else {
			footerRender = <SignOut />
		}
		
		return (
			<footer>
				{footerRender}
			</footer>
		);
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
				<h3>Hello</h3>
				<span> Username goes here </span>
				<a href="/signout">Signout</a>
				<br />
				<a href="/#!/posts/create">Create Post</a>
				<br />
				<a href="/#!/posts/">List All Posts</a>
			</div>
		);
	}	
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);