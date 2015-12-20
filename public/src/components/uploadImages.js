import React from 'react'

export class UploadImages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            previewURL: ''
        }
		this.uploadFile = this.uploadFile.bind(this);
		this.getSignedRequest = this.getSignedRequest.bind(this);
		this.initUpload = this.initUpload.bind(this);
	}
	uploadFile(file, signed_request, url) {
		var self = this;
		var xhr = new XMLHttpRequest();
		xhr.open("PUT", signed_request);
		xhr.setRequestHeader('x-amz-acl', 'public-read');
		xhr.onload = function() {
			if (xhr.status === 200) {
				self.setState({
					previewURL: url	
				});
			}
		};
		xhr.onerror = function() {
			alert("Could not upload file.");
		};
		xhr.send(file);
	}
	getSignedRequest(file) {
		var self = this;
		var xhr = new XMLHttpRequest();
	    xhr.open("GET", "/uploads?file_name=" + file.name + "&file_type=" + file.type);
	    xhr.onreadystatechange = function() {
	        if(xhr.readyState === 4){
	            if(xhr.status === 200){
	                var response = JSON.parse(xhr.responseText);
	                self.uploadFile(file, response.signed_request, response.url);
	            }
	            else{
	                alert("Could not get signed URL.");
	            }
	        }
	    };
	    xhr.send();
	}
	initUpload() {
		console.log("here");
		var files = document.getElementById("file_input").files;
		var file = files[0];
		if (file == null) {
			alert("No file selected.");
			return;
		}
		this.getSignedRequest(file);
	}
	render() {
		return (
			<div className="col-xs-12">
				<h1>Upload Images</h1>
				<input type="file" id="file_input" onChange={this.initUpload}/>
				<img className="img-responsive" src={this.state.previewURL} />
				<h5>Make sure to copy the URL below:</h5>
				<span>{this.state.previewURL}</span>
			</div>
		);
	}
}