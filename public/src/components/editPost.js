import React from 'react'

export class EditPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	url: "/api/posts/" + this.props.params.category + "/" + this.props.params.postid,
            post: {
                creator: {},
                medialinks: [{}]
            },
            title: ""
        };
        this.sendPutRequest = this.sendPutRequest.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
    }
    handleChanges(event) {
    	this.setState({
    		post: {
    			title: event.target.title.value
    		}	
    	});
    }
    loadPostFromServer() {
		$.ajax({
			url: this.state.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({
					post: data,
					title: data.title
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.state.url, status, err.toString());
			}.bind(this)
		});	
	}
	componentDidMount() {
		this.loadPostFromServer();		
	}
	sendPutRequest() {
		console.info(this);
		$.ajax({
			url: this.state.url,
			dataType: 'json',
			method: 'PUT',
			success: function(data) {
				window.location.href = "/posts/" + data.category + "/" + data._id;
			},
			error: function(xhr, status, err) {
				console.error(this.state.url, status, err.toString());
			}.bind(this)
		});
	}
	render() {
		return (
			<section className="page">
				<div className="col-xs-12">
					<form onChange={this.handleChanges}>
						<h1>Edit Post</h1>
						<div>
							<label>Title</label>
							<div>
								<input type="text" name="title" value={this.state.post.title} required />
							</div>
						</div>
						<div>
							<label>Category</label>
							<br />
							<select name="category" selected={this.state.post.category}>
								<option value="inside">Inside</option>
								<option value="outside">Outside</option>
								<option value="relatives">Relatives</option>
								<option value="anthro">Anthropodicies</option>
							</select>
						</div>
						<div>
			                <label>Cover Photo URL</label>
			                <br />
			                <input type="text" name="coverPhotoURL" placeholder={this.state.post.coverPhotoURL} />
			            </div>
						<div>
							<label>Content</label>
							<div>
								<textarea cols="30" rows="10" name="content" placeholder={this.state.post.content} required></textarea>
							</div>
						</div>
						<br />
						<div>
							<button className="btn btn-primary" onClick={this.sendPutRequest}>Edit</button>
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