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
		var coeTitle, coeMethod;
		if (this.props.mode == 'create') {
			coeTitle = "Create New Post";
			coeMethod = "post";
		} else {
			coeTitle = "Edit Existing Post";
			coeMethod = ""
		}
		return (
			<section className="page">
				<div className="col-xs-12">
					<h1>{coeTitle}</h1>
					<form action="/api/posts" method={coeMethod}>
						<div>
							<label>Title</label>
							<div>
								<input type="text" name="title" placeholder="Title" required />
							</div>
						</div>
						<div>
							<label>Category</label>
							<br />
							<select name="category">
								<option value="inside">Inside</option>
								<option value="outside">Outside</option>
								<option value="relatives">Relatives</option>
								<option value="anthro">Anthropodicies</option>
							</select>
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