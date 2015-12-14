import React from 'react'
import { render } from 'react-dom'
import { Hero } from './components/hero.js'
import { Post } from './components/post.js'
import { Posts } from './components/posts.js'
import { Footer } from './components/footer.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'hero',
            category: 'null',
            postid: 'null'
        }
    }
    changeView(view, category, postid) {
        console.log(view);
        this.setState({
            category: category,
            postid: postid,
            view: view 
        });
    }
    render() {
        var viewControl;
        if (this.state.view == 'post') {
            viewControl = <Post category={this.state.category} postid={this.state.postid} />;
        } else if (this.state.view == 'posts') {
            viewControl = <Posts category={this.state.category} />;
        } else {
            viewControl = <Hero />;
        }
        return (
            <div className="container-fluid">
				<header className="col-xs-12 col-sm-3 text-center">
					<button onClick={this.changeView.bind(this, 'hero')}>
						<div className="col-xs-6 col-sm-9">
							<span className="atta-header">Attaphila</span>
						</div>
						<div className="col-xs-6 col-sm-3">
							<img className="atta-brand" src="img/attaBrand.png" />
						</div>
					</button>
	            </header>
			  	<nav className="col-xs-12 col-sm-9">
					<ul className="nav nav-justified">
    					<li><button onClick={this.changeView.bind(this, 'posts', 'inside')}>Inside</button></li>
    					<li><button onClick={this.changeView.bind(this, 'posts', 'outside')}>Outside</button></li>
    					<li><button onClick={this.changeView.bind(this, 'posts', 'relatives')}>Relatives</button></li>
    					<li><button onClick={this.changeView.bind(this, 'posts', 'anthro')}>Anthropodicies</button></li>
					</ul>
				</nav>
				{viewControl}
				<footer>
					<Footer user={this.props.user}/>
				</footer>
	        </div>
        );
    } 
}

render(
  <App user = { window.user }/>,
  document.getElementById('app')
);

/* TODO:

    Link to individual posts

*/