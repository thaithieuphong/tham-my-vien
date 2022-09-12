var subDoctorForm = document.forms['submit-doctor-form'];
var subDoctorModal = document.getElementById('submit-doctor-modal');
var subDoctorBtn = document.getElementById('submit-form-doctor-btn');

subDoctorBtn.addEventListener("click", () => {
    subDoctorForm.submit();

});

subDoctorModal.addEventListener('show.bs.modal', function(event){
	
    var button = event.relatedTarget;

    var id = button.getAttribute("data-id")

    subDoctorForm.setAttribute('action', `/operating-room/nursing/service-note/${id}?_method=PATCH`)

})

document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function(){
		$('.input-images-before').imageUploader({
			label: 'Kéo và thả hoặc bấm chọn hình ảnh',
			imagesInputName: 'before',
		});
		$('.input-videos-before').imageUploader({
			label: 'Kéo và thả hoặc bấm chọn video',
			imagesInputName: 'before',
		});
		$('.input-images-after').imageUploader({
			label: 'Kéo và thả hoặc bấm chọn hình ảnh',
			imagesInputName: 'after',
		});
		$('.input-videos-after').imageUploader({
			label: 'Kéo và thả hoặc bấm chọn video',
			imagesInputName: 'after',
		});
	});

	let inputMultiImageBefore = document.getElementById('input-multi-images-before');
	inputMultiImageBefore.addEventListener('change', (e) => {
		let files = e.target;//event.target.files;
		imagesPreviewBefore(files);
	})

	let imagesPreviewBefore = function (input) {
		let inputFiles = Array.from(input.files);
		if (input.files) {
			// let filesAmount = inputFiles.length
			for (let i = 0; i < inputFiles.length; i++) {
				let reader = new FileReader();
				let newImage = document.createElement('img');
				let closeButtonLink = document.createElement('button');
				let divMain = document.createElement('figure');
				reader.addEventListener('load', (event) => {
					// newImage.setAttribute('alt', filesAmount)
					let src = event.target.result;
					divMain.classList = 'col-md-4 col-sm figure img-container position-relative mt-2';
					divMain.id = i;
					newImage.src = src;
					newImage.classList = 'figure-img img-fluid rounded img-cover';
					newImage.id = i;
					closeButtonLink.id = i;
					closeButtonLink.type = 'button';
					closeButtonLink.ariaLabel = 'Close';
					closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-4 mt-2 close-img';
					let imgc = document.querySelector('.preview-images-before');
					divMain.append(newImage, closeButtonLink);
					imgc.append(divMain);
					let closeBtns = document.querySelectorAll('.close-img');
					closeBtns.forEach(btn => {
						btn.addEventListener('click', () => {
							let parent = btn.parentElement;
							parent.remove();
						})
					})
				});
				reader.readAsDataURL(inputFiles[i]);
			}
		}
	};

	let inputMultiVideoBefore = document.getElementById('input-multi-videos-before');
	inputMultiVideoBefore.addEventListener('change', (e) => {
		let files = e.target;//event.target.files;
		videosPreviewBefore(files);
	})

	let videosPreviewBefore = function (input) {
		let inputFiles = Array.from(input.files);
		if (input.files) {
			for (i = 0; i < inputFiles.length; i++) {
				let reader = new FileReader();
				reader.onload = function (event) {
					let newVideo = document.createElement('video');
					let closeButtonLink = document.createElement('button');
					let divMain = document.createElement('figure');
					let src = event.target.result;
					divMain.classList = 'col-md-4 col-sm figure imgbox position-relative mt-2';
					divMain.id = i;
					newVideo.src = src;
					newVideo.classList = 'img-fluid';
					newVideo.controls = true;
					newVideo.id = i;
					closeButtonLink.type = 'button';
					closeButtonLink.id = i;
					closeButtonLink.ariaLabel = 'Close';
					closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-4 mt-2 close-video';
					let videoc = document.querySelector('.preview-videos-before');
					divMain.append(newVideo, closeButtonLink);
					videoc.append(divMain);
					let closeBtn = document.querySelectorAll('.close-video');
					closeBtn.forEach(btn => {
						btn.addEventListener('click', (e) => {
							let parent = btn.parentElement;
							parent.remove();
						})
					})
				};
				reader.readAsDataURL(inputFiles[i]);
			}
		}
	};

	let inputMultiImageAfter = document.getElementById('input-multi-images-after');
	inputMultiImageAfter.addEventListener('change', (e) => {
		let files = e.target;//event.target.files;
		imagesPreviewAfter(files);
	})

	let imagesPreviewAfter = function (input) {
		let inputFiles = Array.from(input.files);
		if (input.files) {
			// let filesAmount = inputFiles.length
			for (let i = 0; i < inputFiles.length; i++) {
				let reader = new FileReader();
				let newImage = document.createElement('img');
				let closeButtonLink = document.createElement('button');
				let divMain = document.createElement('figure');
				reader.addEventListener('load', (event) => {
					// newImage.setAttribute('alt', filesAmount)
					let src = event.target.result;
					divMain.classList = 'col-md-4 col-sm figure img-container position-relative mt-2';
					divMain.id = i;
					newImage.src = src;
					newImage.classList = 'figure-img img-fluid rounded img-cover';
					newImage.id = i;
					closeButtonLink.id = i;
					closeButtonLink.type = 'button';
					closeButtonLink.ariaLabel = 'Close';
					closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-4 mt-2 close-img';
					let imgc = document.querySelector('.preview-images-after');
					divMain.append(newImage, closeButtonLink);
					imgc.append(divMain);
					let closeBtns = document.querySelectorAll('.close-img');
					closeBtns.forEach(btn => {
						btn.addEventListener('click', () => {
							let parent = btn.parentElement;
							parent.remove();
						})
					})
				});
				reader.readAsDataURL(inputFiles[i]);
			}
		}
	};

	let inputMultiVideoAfter = document.getElementById('input-multi-videos-after');
	inputMultiVideoAfter.addEventListener('change', (e) => {
		let files = e.target;//event.target.files;
		videosPreviewAfter(files);
	})

	let videosPreviewAfter = function (input) {
		let inputFiles = Array.from(input.files);
		if (input.files) {
			for (i = 0; i < inputFiles.length; i++) {
				let reader = new FileReader();
				reader.onload = function (event) {
					let newVideo = document.createElement('video');
					let closeButtonLink = document.createElement('button');
					let divMain = document.createElement('figure');
					let src = event.target.result;
					divMain.classList = 'col-md-4 col-sm figure imgbox position-relative mt-2';
					divMain.id = i;
					newVideo.src = src;
					newVideo.classList = 'img-fluid';
					newVideo.controls = true;
					newVideo.id = i;
					closeButtonLink.type = 'button';
					closeButtonLink.id = i;
					closeButtonLink.ariaLabel = 'Close';
					closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-4 mt-2 close-video';
					let videoc = document.querySelector('.preview-videos-after');
					divMain.append(newVideo, closeButtonLink);
					videoc.append(divMain);
					let closeBtn = document.querySelectorAll('.close-video');
					closeBtn.forEach(btn => {
						btn.addEventListener('click', (e) => {
							let parent = btn.parentElement;
							parent.remove();
						})
					})
				};
				reader.readAsDataURL(inputFiles[i]);
			}
		}
	};
});


