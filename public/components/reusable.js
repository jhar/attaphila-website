import React from 'react'

export class FormattedDate extends React.Component {
	render() {
		var months = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
		];
		var date = new Date(this.props.date);
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		return (
			<span>{months[monthIndex] + ' ' + day + ', ' + year}</span>	
		);
	}	
}