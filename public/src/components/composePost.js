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
					creator: {}
				}
			}
		} else {
			console.error("Error in ComposePost constructor: mode or post not passed as prop");
		}
		this.handleChange = this.handleChange.bind(this);
		this.sendPostRequest = this.sendPostRequest.bind(this);
		this.sendPutRequest = this.sendPutRequest.bind(this);
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
		var comTitle, comShort, comCat, comCover, comContent, comSubmit;
		if (this.props.mode == 'create') {
			comTitle = <input type="text" name="title" placeholder="Title" onChange={this.handleChange} required />;
			comShort = <input type="text" name="short" placeholder="Short Description" onChange={this.handleChange} required />;
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
			comShort = <input type="text" name="short" value={this.state.post.short} onChange={this.handleChange} required />;
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
						<label>Short Description</label>
						<div>
							{comShort}
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