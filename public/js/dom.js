'use strict';

let imageFile, imagePreview;

function postImage(url, data, contentType, tag) {
	return axios({
		url: url,
		method: 'post',
		headers: {
			'Content-Type': contentType || 'application/json'
		},
		data: data
	})
		.then(function (res) {

			// console.log(res);
			// console.log(res.data.bytes);
			// console.log(res.data.created_at);
			// console.log(res.data.secure_url);

			alert('Image uploaded successfully!');
			imagePreview.src = '';
			imageFile = undefined;
			return res;
		})
		.then((res) => {
			let imageObj = {
				tag: tag,
				url: res.data.secure_url
			};

			console.log(imageObj);
			return imageObj;
		})
		.then((imageObj) => {
			let img = document.createElement('img');
			img.src = imageObj.url;
			img.alt = 'just uploaded';
			img.width = 200;
			img.style.margin = '2px';

			let labelTag = document.createElement('label');
			labelTag.innerHTML += imageObj.tag;
			labelTag.style.margin = '2px';

			let imageContainer = document.createElement('div');
			imageContainer.className += ' imageContainer'

			imageContainer.appendChild(labelTag);
			imageContainer.appendChild(img);
		
			document.getElementById('uploaded-images').appendChild(imageContainer);
		})
		.catch(function (error) {
			console.log(error);
			alert(error);
		});
}

function previewFile() {
	imagePreview = document.querySelector('img');
	imageFile = document.querySelector('input[type=file]').files[0];

	let reader = new FileReader();
	reader.onloadend = function () {
		imagePreview.src = reader.result;
	}

	if (imageFile) {
		reader.readAsDataURL(imageFile);
	} else {
		imagePreview.src = "";
	}
}

function cloudinaryUpload(file, tag) {
	let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/webdjs/upload';
	let CLOUDINARY_UPLOAD_PRESET = 'putjeq3f';
	let formData = new FormData();

	formData.append('file', file);
	formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
	postImage(CLOUDINARY_URL, formData, 'application/x-www-form-urlencoded', tag);
}

function uploadImage() {
	let tag = [].map.call(document.getElementById('select-tag').selectedOptions, function (option) {
		return option.value;
	});
	let tags = ['Витражи', 'Аксесоари', 'Интериор', 'Събития'];
	tag = tags[+tag[0]];

	if (imageFile !== undefined) {
		let confirmMsg = confirm('You are going to upload image with tag : ' + tag);
		if (confirmMsg == true) {
			cloudinaryUpload(imageFile, tag);
		} else { }
	} else {
		alert('ERROR: No image!');
	}
}
