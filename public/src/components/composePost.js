import React from 'react'
import { UploadImages } from './uploadImages.js'

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
					category: 'inside',
					creator: {},
					medialinks: [{}]
				}
			}
		} else {
			console.error("Error in ComposePost constructor: mode or post not passed as prop");
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.sendPostRequest = this.sendPostRequest.bind(this);
		this.sendPutRequest = this.sendPutRequest.bind(this);
	}
	handleChange(event) {
		if (event.target.dataset.index) {
			var postCopy = this.state.post;
			var mediaLinksCopy = this.state.post.medialinks;
			var index = event.target.dataset.index;
			if (event.target.name == 'url') {
				mediaLinksCopy[index].url = event.target.value;
			} else {
				mediaLinksCopy[index].media = event.target.value;
			}
			postCopy['medialinks'] = mediaLinksCopy;
			this.setState({
				post: postCopy
			});
		} else {
			var postCopy = this.state.post;
			postCopy[event.target.name] = event.target.value;
			this.setState({
				post: postCopy	
			});
		}

	}
	handleAdd() {
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
	handleRemove() {
		var postCopy = this.state.post;
		var mediaLinksCopy = this.state.post.medialinks;
		mediaLinksCopy.pop();
		postCopy['medialinks'] = mediaLinksCopy;
		this.setState({
			post: postCopy	
		});
	}
	sendPostRequest() {
		if (this.props.mode == 'create') {
			$.ajax({
				url: "/api/posts/",
				context: this,
				data: this.state.post,
				type: 'post',
				success: function(data) {
					this.props.changeView('post', {category: data.category, postid: data._id, mode: 'read'});
				},
				error: function(xhr, status, err) {
					console.error(this.state, status, err.toString());
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
				context: this,
				data: this.state.post,
				dataType: 'json',
				method: 'PUT',
				success: function(data) {
					this.props.changeView('post', {category: data.category, postid: data._id, mode: 'read'});
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
		var comTitle, comCat, comCover, comContent, comMedia, comSubmit;
		if (this.props.mode == 'create') {
			comTitle = <input type="text" name="title" placeholder="Title" onChange={this.handleChange} required />;
			comCat = <select name="category" onChange={this.handleChange} required>
					 	<option value="inside">Inside</option>
						<option value="outside">Outside</option>
						<option value="relatives">Relatives</option>
						<option value="anthro">Anthropodicies</option>
					 </select>;
			comCover = <input type="text" name="coverPhotoURL" placeholder="Cover Photo URL" onChange={this.handleChange} />;
			comContent = <textarea cols="30" rows="10" name="content" placeholder="Content" onChange={this.handleChange} required></textarea>;
			comSubmit = <button className="btn btn-sm btn-success" onClick={this.sendPostRequest}>Submit</button>;
		} else {
			comTitle = <input type="text" name="title" value={this.state.post.title} onChange={this.handleChange} required />;
			comCat = <select name="category" value={this.state.post.category} onChange={this.handleChange} required>
					 	<option value="inside">Inside</option>
						<option value="outside">Outside</option>
						<option value="relatives">Relatives</option>
						<option value="anthro">Anthropodicies</option>
					</select>;
			comCover = <input type="text" name="coverPhotoURL" value={this.state.post.coverPhotoURL} onChange={this.handleChange} />;
			comContent = <textarea cols="30" rows="10" name="content" value={this.state.post.content} onChange={this.handleChange} required></textarea>;
			comSubmit = <button className="btn btn-sm btn-success" onClick={this.sendPutRequest}>Submit</button>;
		}
		return (
			<section className="page">
				<div className="col-xs-12 col-sm-6">
					<h1>Compose Post</h1>
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
					<ComposeMediaLinks mode={this.props.mode} post={this.state.post} handleChange={this.handleChange.bind(this)} handleAdd={this.handleAdd.bind(this)} handleRemove={this.handleRemove.bind(this)}/>
					<br />
					<div>
						{comSubmit}
					</div>
				</div>
				<div className="col-xs-12 col-sm-6">
					<UploadImages />
				</div>
			</section>	
		);
	}
}

class ComposeMediaLinks extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var removeButton;
		if (this.props.post.medialinks.length == 0) {
			removeButton = '';
		} else {
			removeButton = <button className="btn btn-xs btn-danger" onClick={this.props.handleRemove}>Remove Last</button>;
		}
		var mediaLinkNodes = this.props.post.medialinks.map(function (mediaLink, index) {
			var mlURL, mlType;
			if (this.props.mode == 'create') {
				mlURL = <input type="text" name="url" placeholder="Media Link URL" onChange={this.props.handleChange} data-index={index}/>;
				mlType = <select name="media" defaultValue="article" onChange={this.props.handleChange} data-index={index}>
						 	<option value="article">Link</option>
							<option value="youtube">YouTube</option>
							<option value="photo">Photo</option>
						 </select>;
			} else {
				mlURL = <input type="text" name="url" value={mediaLink.url} onChange={this.props.handleChange} data-index={index}/>;
				mlType = <select name="media" value={mediaLink.media} onChange={this.props.handleChange} data-index={index}>
						 	<option value="article">Link</option>
							<option value="youtube">YouTube</option>
							<option value="photo">Photo</option>
						 </select>;
			}
			return (
				<li>
					<label>Media Link</label>
					{mlURL}
					<br />
					<label>Media Type</label>
					{mlType}
				</li>
			);	
		}.bind(this));
		return (
			<div>
				<ol>
				{mediaLinkNodes}
				</ol>
				<div>
					<button className="btn btn-xs btn-primary" onClick={this.props.handleAdd}>Add Media</button>
					{removeButton}
				</div>
			</div>
		);
	}
}