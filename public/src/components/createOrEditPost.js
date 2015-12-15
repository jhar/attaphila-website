import React from 'react'

export class CreateOrEditPost extends React.Component {
	constructor(props) {
		super(props);
		if (this.props.mode == 'edit' && this.props.post) {
			this.state = {
				post: this.props.post
			}
		} else if (this.props.mode == 'create') {
			this.state = {
				post: {
					creator: {},
					medialinks: [{}]
				}
			}
		} else {
			console.error("Error in CreateOrEditPost constructor: mode or post not passed as prop");
		}
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		var postCopy = this.state.post;
		if (event.target.name == 'title') {
			postCopy.title = event.target.value;
			this.setState({
				post: postCopy
			});
		} else if (event.target.name == 'category') {
			postCopy.category = event.target.value
			this.setState({
				post: postCopy
			});
		}
	}
	sendPostRequest() {
		if (this.props.mode == 'create') {
			$.ajax({
				url: "/api/posts/",
				dataType: 'json',
				method: 'POST',
				success: function(data) {
					console.log("SUCCESS");
				},
				error: function(xhr, status, err) {
					
				}.bind(this)
			});
		} else {
			console.error("Error in CreateOrEditPost sendPostRequest(): wrong mode");
		}
	}
	sendPutRequest() {
		if (this.props.mode == 'edit') {
			$.ajax({
				url: "/api/posts/" + this.state.post.category + "/" + this.state.post._id,
				dataType: 'json',
				method: 'PUT',
				success: function(data) {
					console.log("SUCCESS");
				},
				error: function(xhr, status, err) {
					console.error(this.state, status, err.toString());
				}.bind(this)
			});
		} else {
			console.error("Error in CreateOrEditPost sendPutRequest(): wrong mode");
		}
	}
	render() {
		var coeHeader, coeMethod, coeTitle, coeCat;
		if (this.props.mode == 'create') {
			coeHeader = "Create New Post";
			coeMethod = "post";
			coeTitle = <input type="text" name="title" placeholder="Title" required />;
			coeCat = <select name="category" required>
					 	<option value="inside">Inside</option>
						<option value="outside">Outside</option>
						<option value="relatives">Relatives</option>
						<option value="anthro">Anthropodicies</option>
					 </select>;
		} else {
			coeHeader = "Edit Existing Post";
			coeMethod = "";
			coeTitle = <input type="text" name="title" value={this.state.post.title} onChange={this.handleChange} required />;
			coeCat = <select name="category" value={this.state.post.category} onChange={this.handleChange} required>
					 	<option value="inside">Inside</option>
						<option value="outside">Outside</option>
						<option value="relatives">Relatives</option>
						<option value="anthro">Anthropodicies</option>
					</select>;
		}
		return (
			<section className="page">
				<div className="col-xs-12">
					<h1>{coeHeader}</h1>
					<form action="/api/posts" method={coeMethod}>
						<div>
							<label>Title</label>
							<div>
								{coeTitle}
							</div>
						</div>
						<div>
							<label>Category</label>
							<br />
							{coeCat}
						</div>
						<div>
			                <label>Cover Photo URL</label>
			                <br />
			                <input type="text" name="coverPhotoURL" placeholder="Cover Photo URL" />
			            </div>
						<div>
							<label>Content</label>
							<div>
								<textarea cols="30" rows="10" name="content" placeholder="Content" required></textarea>
							</div>
						</div>
						<ol>
							<li>
								<label>Media Link</label>
								<input type="text" name="mediaLinkURL" placeholder="Media Link URL" />
								<br />
								<label>Media Type</label>
								<select name="mediaLinkMedia">
									<option value="article">Link</option>
									<option value="youtube">YouTube</option>
									<option value="photo">Photo</option>
								</select>
							</li>
						</ol>
						<div>
							<input type="button" value="Add more media" />
							<input type="button" value="Remove" />
						</div>
						<br />
						<div>
							<input type="submit" />
						</div>
						<div>
							<strong>Errors</strong>
						</div>
					</form>
				</div>
			</section>	
		);
	}
}