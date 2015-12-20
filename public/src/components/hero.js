import React from 'react'
import { Posts } from './posts.js'

export class Hero extends React.Component {
	render() {
		return (
			<div className="hero">
				<div className="heroImage" />
				<img className="heroImageWhite img-responsive" src="img/female.png" />
				<div className="heroImage2" />
			</div>
		);
	}
}