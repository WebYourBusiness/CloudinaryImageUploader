'use strict';

let imageFile, imagePreview;
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

function uploadImage() {
	let tag = [].map.call(document.getElementById('select-tag').selectedOptions, function (option) {
		return option.value;
	});

	let tags = ['stained-glasses', 'accessories', 'interiors', 'events'];
	tag = tags[+tag[0]];

	if (imageFile !== undefined) {
		let confirmMsg = confirm('You are going to upload image with tag : ' + tag);
		if (confirmMsg == true) {
			document.getElementById('uploading-message').innerHTML = 'Uploading...';

			cloudinaryStore.uploadImage(imageFile)
				.then((res) => {
					document.getElementById('uploading-message').innerHTML = '';
					alert('Image uploaded successfully!');
					imagePreview.src = '';
					imageFile = undefined;
					return res;
				})
				.then((res) => {
					let imageObj = {
						url: res.secure_url
					};
					return imageObj;
				})
				.then((imageObj) => {
					let img = document.createElement('img');
					img.src = imageObj.url;
					img.alt = 'just uploaded';
					img.width = 200;
					img.height = 250;
					img.style.margin = '2px';
					img.className += ' flex-item';

					let imageContainer = document.createElement('div');
					imageContainer.className += ' imageContainer'

					imageContainer.appendChild(img);

					document.getElementById('uploaded-images').appendChild(imageContainer);
				})
				.catch(function (error) {
					console.log(error);
				});
		} else { }
	} else {
		alert('ERROR: No image selected!');
	}
}
