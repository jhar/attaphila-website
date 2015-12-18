import React from 'react'
import { Posts } from './posts.js'

export class Hero extends React.Component {
	render() {
		return (
			<div className="hero">
				<img className="heroImage img-responsive" src="img/attaphilaHero.jpg" />
				<div className="heroContent">
					<Posts category="all" changeView={this.props.changeView.bind(this)} />
				</div>
				<img className="heroImage img-responsive" src="img/fungalGarden.jpg" />
			</div>
		);
	}
}