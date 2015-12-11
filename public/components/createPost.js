import React from 'react'

export class CreatePost extends React.Component {
	render() {
		return (
			<section className="page">
				<div className="col-xs-12">
					<h1>New Post</h1>
					<form action="/api/posts" method="post">
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