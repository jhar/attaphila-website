import React from 'react'

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