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
            postid: 'null',
            mode: 'null',
            categoryButton: false,
            categoryNav: false
        }
        this.changeView = this.changeView.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleHash = this.handleHash.bind(this);
    }
    componentDidMount() {
        if(window.innerWidth < 768) {
            this.setState({
                iconClick: true,
                categoryNav: false
            });
        } else {
            this.setState({
                iconClick: false,
                categoryNav: true
            })
        }
        window.addEventListener('resize', this.handleResize);
        window.onhashchange = this.handleHash();
        this.handleHash();
    }
    handleHash() {
        var hashArray = window.location.hash.substr(2).split("/");
        if (hashArray[0] && !hashArray[1]) {
            this.changeView('posts', {category: hashArray[0]}, false);    
        } else if (hashArray[0] && hashArray[1]) {
            this.changeView('post', {category: hashArray[0], postid: hashArray[1], mode: 'read'}, false);
        }
    }
    handleIconClick() {
        this.setState({
            categoryNav: !this.state.categoryNav 
        });
    }
    handleResize(event) {
        if(window.innerWidth < 768) {
            this.setState({
                iconClick: true,
                categoryNav: false
            });
        } else {
            this.setState({
                iconClick: false,
                categoryNav: true
            })
        }
    }
    changeView(view, params, changeHash) {
        this.setState({
            view: view,
            category: params.category,
            postid: params.postid,
            mode: params.mode
        });
        this.handleResize();
        if (params.category && !params.postid) {
            window.location.hash = "#/" + params.category;
        } else if (params.category && params.postid) {
            window.location.hash = "#/" + params.category + "/" + params.postid;
        } else {
            window.location.hash = '';
        }
    }
    render() {
        var viewControl;
        if (this.state.view == 'post') {
            viewControl = <Post user={this.props.user} category={this.state.category} postid={this.state.postid} mode={this.state.mode} changeView={this.changeView.bind(this)}/>;
        } else if (this.state.view == 'posts') {
            viewControl = <Posts category={this.state.category} changeView={this.changeView.bind(this)} />;
        } else {
            viewControl = <Hero changeView={this.changeView.bind(this)}/>;
        }
        var icon;
        var categoryNav;
        if(this.state.iconClick == true) {
            icon = <img className="atta-brand" src="img/attaBrand.png" onClick={this.handleIconClick.bind(this)}/>;
        } else {
            icon = <img className="atta-brand" src="img/attaBrand.png" />;
        }
        if(this.state.categoryNav == true) {
            categoryNav = <nav className="col-xs-12 col-sm-9">
					        <ul className="nav nav-justified">
    					        <li><a onClick={this.changeView.bind(this, 'posts', {category: 'inside'})}>Inside</a></li>
    					        <li><a onClick={this.changeView.bind(this, 'posts', {category: 'outside'})}>Outside</a></li>
    					        <li><a onClick={this.changeView.bind(this, 'posts', {category: 'relatives'})}>Relatives</a></li>
    					        <li><a onClick={this.changeView.bind(this, 'posts', {category: 'anthro'})}>Anthropodicies</a></li>
    					        <li><a onClick={this.changeView.bind(this, 'posts', {category: 'all'})}>All</a></li>
					        </ul>
				         </nav>;
        } else {
            categoryNav = '';
        }
        return (
            <div className="container-fluid">
				<header className="col-xs-12 col-sm-3 text-center">
					<a onClick={this.changeView.bind(this, 'hero')}>
						<div className="col-xs-8 col-sm-9 atta-header">
							Attaphila
						</div>
					</a>
					<div className="col-xs-4 col-sm-3">
						{icon}
					</div>
	            </header>
	            {categoryNav}
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
