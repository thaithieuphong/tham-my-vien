//Multiple images re xam

document.addEventListener('DOMContentLoaded', function () {
	$(document).ready(function(){
		$('.input-images-re-examination').imageUploader({
			label: 'Kéo và thả hoặc bấm chọn hình ảnh',
			imagesInputName: 're-examination',
			preloadedInputName:'preloaded'
		});
		$('.input-videos-re-examination').imageUploader({
			label: 'Kéo và thả hoặc bấm chọn video',
			imagesInputName: 're-examination',
			preloadedInputName:'preloaded'
		});
	});

	let inputMultiImageReExamination = document.getElementById('input-multi-images-reExamination');
	inputMultiImageReExamination.addEventListener('change', (e) => {
		let files = e.target;//event.target.files;
		imagesPreviewReExamination(files);
	})

	let imagesPreviewReExamination = function (input) {
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
					let imgc = document.querySelector('.preview-images-re-exam');
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

	let inputMultiVideoReExamination = document.getElementById('input-multi-videos-reExamination');
	inputMultiVideoReExamination.addEventListener('change', (e) => {
		let files = e.target;//event.target.files;
		videosPreviewReExamination(files);
	})

	let videosPreviewReExamination = function (input) {
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
					let videoc = document.querySelector('.preview-videos-re-exam');
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


//END Multiple images re xam

var subDoctorForm = document.forms['submit-re-exam-form'];
var subDoctorModal = document.getElementById('submit-re-exam-modal');
var subDoctorBtn = document.getElementById('submit-form-re-exam-btn');

subDoctorBtn.addEventListener("click", () => {
    subDoctorForm.submit();
});

subDoctorModal.addEventListener('show.bs.modal', function(event){
    var button = event.relatedTarget;
    var id = button.getAttribute("data-id");
    subDoctorForm.setAttribute('action', `/operating-room/nursing/re-examination/${id}?_method=PATCH`);
})