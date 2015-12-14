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
            params: {
                category: 'null',
                postid: 'null',
                mode: 'null'
            }
        }
        this.changeView = this.changeView.bind(this);
    }
    changeView(view, params) {
        this.setState({
            view: view,
            params: {
                category: params.category,
                postid: params.postid,
                mode: params.mode
            }
        });
    }
    render() {
        var viewControl;
        if (this.state.view == 'post') {
            viewControl = <Post params={this.state.params} changeView={this.changeView.bind(this)}/>;
        } else if (this.state.view == 'posts') {
            viewControl = <Posts params={this.state.params} changeView={this.changeView.bind(this)} />;
        } else {
            viewControl = <Hero />;
        }
        return (
            <div className="container-fluid">
				<header className="col-xs-12 col-sm-3 text-center">
					<a onClick={this.changeView.bind(this, 'hero')}>
						<div className="col-xs-6 col-sm-9">
							<span className="atta-header">Attaphila</span>
						</div>
						<div className="col-xs-6 col-sm-3">
							<img className="atta-brand" src="img/attaBrand.png" />
						</div>
					</a>
	            </header>
			  	<nav className="col-xs-12 col-sm-9">
					<ul className="nav nav-justified">
    					<li><a onClick={this.changeView.bind(this, 'posts', {category: 'inside'})}>Inside</a></li>
    					<li><a onClick={this.changeView.bind(this, 'posts', {category: 'outside'})}>Outside</a></li>
    					<li><a onClick={this.changeView.bind(this, 'posts', {category: 'relatives'})}>Relatives</a></li>
    					<li><a onClick={this.changeView.bind(this, 'posts', {category: 'anthro'})}>Anthropodicies</a></li>
					</ul>
				</nav>
				{viewControl}
				<footer>
					<Footer user={this.props.user} changeView={this.changeView.bind(this)}/>
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

    Link to individual posts from posts view
    List All Posts (from footer)
    Create Post (from footer)
    
    Upload Images

*/