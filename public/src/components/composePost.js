import React from 'react'

export class ComposePost extends React.Component {
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
			console.error("Error in ComposePost constructor: mode or post not passed as prop");
		}
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		var postCopy = this.state.post;
		postCopy[event.target.name] = event.target.value;
		this.setState({
			post: postCopy	
		});
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
			console.error("Error in ComposePost sendPostRequest(): wrong mode");
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
		var comHeader, comMethod, comTitle, comCat, comCover, comContent, comMedia;
		if (this.props.mode == 'create') {
			comHeader = "Create New Post";
			comMethod = "post";
			comTitle = <input type="text" name="title" placeholder="Title" required />;
			comCat = <select name="category" required>
					 	<option value="inside">Inside</option>
						<option value="outside">Outside</option>
						<option value="relatives">Relatives</option>
						<option value="anthro">Anthropodicies</option>
					 </select>;
			comCover = <input type="text" name="coverPhotoURL" placeholder="Cover Photo URL" />;
			comContent = <textarea cols="30" rows="10" name="content" placeholder="Content" required></textarea>;
		} else {
			comHeader = "Edit Existing Post";
			comMethod = "";
			comTitle = <input type="text" name="title" value={this.state.post.title} onChange={this.handleChange} required />;
			comCat = <select name="category" value={this.state.post.category} onChange={this.handleChange} required>
					 	<option value="inside">Inside</option>
						<option value="outside">Outside</option>
						<option value="relatives">Relatives</option>
						<option value="anthro">Anthropodicies</option>
					</select>;
			comCover = <input type="text" name="coverPhotoURL" value={this.state.post.coverPhotoURL} onChange={this.handleChange} />;
			comContent = <textarea cols="30" rows="10" name="content" value={this.state.post.content} onChange={this.handleChange} required></textarea>;
		}
		return (
			<section className="page">
				<div className="col-xs-12">
					<h1>{comHeader}</h1>
					<form action="/api/posts" method={comMethod}>
						<div>
							<label>Title</label>
							<div>
								{comTitle}
							</div>
						</div>
						<div>
							<label>Category</label>
							<br />
							{comCat}
						</div>
						<div>
			                <label>Cover Photo URL</label>
			                <br />
			                {comCover}
			            </div>
						<div>
							<label>Content</label>
							<div>
								{comContent}
							</div>
						</div>
						<ComposeMediaLinks mode={this.props.mode} post={this.state.post} handleChange={this.handleChange.bind(this)}/>
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

class ComposeMediaLinks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			post: this.props.post
		};
		this.handleAdd = this.handleAdd.bind(this);
	}
	handleAdd() {
		console.log(this.state.post);
		var postCopy = this.state.post;
		if (this.state.post.medialinks) {
			var mediaLinksCopy = this.state.post.medialinks;
			postCopy['medialinks'] = mediaLinksCopy.concat({});
		} else {
			postCopy['medialinks'] = [{}];
		}
		this.setState({
			post: postCopy	
		});
	}
	render() {
		var mediaLinkNodes = this.state.post.medialinks.map(function (mediaLink) {
			return (
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
			);	
		}.bind(this));
		return (
			<div>
				<ol>
				{mediaLinkNodes}
				</ol>
				<div>
					<input type="button" value="Add more media" onClick={this.handleAdd} />
					<input type="button" value="Remove" />
				</div>
			</div>
		);
	}
}