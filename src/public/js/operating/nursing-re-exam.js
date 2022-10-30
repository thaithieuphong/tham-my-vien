//Multiple images re xam
document.addEventListener('DOMContentLoaded', function () {

	let inputMultiImageReExamination = document.getElementById('input-multi-images-reExamination');
	if(inputMultiImageReExamination) {
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
					let iconClose = document.createElement('i');
					iconClose.setAttribute('class', 'ti-close');
					let closeButtonLink = document.createElement('div');
					closeButtonLink.append(iconClose);
					let divMain = document.createElement('figure');
					reader.addEventListener('load', (event) => {
						// newImage.setAttribute('alt', filesAmount)
						let src = event.target.result;
						divMain.classList = 'col-md-4 col-sm figure img-container position-relative mt-2 p-0';
						divMain.id = i;
						newImage.src = src;
						newImage.classList = 'figure-img img-fluid rounded img-cover';
						newImage.id = i;
						closeButtonLink.id = i;
						closeButtonLink.type = 'button';
						closeButtonLink.ariaLabel = 'Close';
						// closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-4 mt-2 close-img';
						closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 mr-3 close-img';
						let imgc = document.querySelector('.preview-images-reExamination');
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
	}

	let inputMultiVideoReExamination = document.getElementById('input-multi-videos-reExamination');
	if(inputMultiVideoReExamination) {
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
						let iconClose = document.createElement('i');
						iconClose.setAttribute('class', 'ti-close');
						let closeButtonLink = document.createElement('div');
						closeButtonLink.append(iconClose);
						let divMain = document.createElement('figure');
						let src = event.target.result;
						divMain.classList = 'col-md-4 col-sm figure imgbox position-relative mt-2 p-0';
						divMain.id = i;
						newVideo.src = src;
						newVideo.classList = 'img-fluid';
						newVideo.controls = true;
						newVideo.id = i;
						closeButtonLink.type = 'button';
						closeButtonLink.id = i;
						closeButtonLink.ariaLabel = 'Close';
						// closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-4 mt-2 close-video';
						closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 close-img';
						let videoc = document.querySelector('.preview-videos-reExamination');
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
	}

});


//END Multiple images re xam

var createReExaminationForm = document.forms['create-re-exam-form'];
var createReExaminationModal = document.getElementById('create-re-exam-modal');
var createReExaminationBtn = document.getElementById('create-re-exam-btn');

if (createReExaminationBtn) {
	createReExaminationBtn.addEventListener("click", () => {
		createReExaminationForm.submit();
	});
}

if (createReExaminationModal) {
	createReExaminationModal.addEventListener('show.bs.modal', function(event){
		var button = event.relatedTarget;
		let id = button.getAttribute("data-id");
		let cusId = button.getAttribute("data-cusId");
		let fullName = button.getAttribute("data-fullName");
		let gender = button.getAttribute("data-gender");
		let phone = button.getAttribute("data-phone");
		createReExaminationForm.setAttribute('action', `/operating-room/nursing/storage-cus-info/${id}/create-re-examination`);
	
		let submitId = document.getElementById('submit-re-exam-cusId');
		let submitFullName = document.getElementById('submit-re-exam-fullname');
		let submitGender = document.getElementById('submit-re-exam-gender');
		let submitPhone = document.getElementById('submit-re-exam-phone');
		submitId.value = cusId;
		submitFullName.innerHTML = fullName;
		submitGender.innerHTML = gender;
		submitPhone.innerHTML = '0' + phone;
	
	})
}

var alertElement = document.getElementsByClassName('alert');
for(i=0; i < alertElement.length; i++) {
	if(alertElement[i]) {
		let element = alertElement[i];
		let timerOut = setTimeout(closeAlert, 5000);
		function closeAlert() {
			element.remove();
		}
	}
}

var submitReExamForm = document.forms['submit-reExamination-form'];
var submitReExamFormBtn = document.getElementById('submit-reExamination-form-btn');
if (submitReExamFormBtn) {
	submitReExamFormBtn.addEventListener("click", () => {
		submitReExamForm.submit();
	});
}

var submitReExaminationForm = document.forms['submit-re-exam-form-done'];
var submitReExaminationModal = document.getElementById('submit-re-exam-modal-done');
var submitReExaminationBtn = document.getElementById('submit-re-exam-btn-done');

if (submitReExaminationBtn) {
	submitReExaminationBtn.addEventListener("click", () => {
		submitReExaminationForm.submit();
	});
}

if (submitReExaminationModal) {
	submitReExaminationModal.addEventListener('show.bs.modal', function(event){
		var button = event.relatedTarget;
		let id = button.getAttribute("data-id");
		let fullName = button.getAttribute("data-fullName");
		submitReExaminationForm.setAttribute('action', `/operating-room/nursing/re-examination/${id}/done?_method=PATCH`);
	
		let submitFullName = document.getElementById('submit-re-exam-fullname');
		submitFullName.innerHTML = fullName;
	
	})
}