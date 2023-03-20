var imageModalCounselor = document.getElementById('imageModalCounselor');

imageModalCounselor.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');

	var modalImageCounselor = document.getElementById('modal-img-counselor');

	modalImageCounselor.setAttribute('src', `${dataImgURL}`);
	// modalImageCounselor.setAttribute('src', `/counselor/img/${dataImgName}`);
})

var videoModalCounselor = document.getElementById('videoModalCounselor');

videoModalCounselor.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoName = button.getAttribute('data-name-video');
	var dataVideoURL = button.getAttribute('data-url-video');

	var modalVideoCounselor = document.getElementById('modal-video-counselor');

	modalVideoCounselor.setAttribute('src', `${dataVideoURL}`);
	// modalVideoCounselor.setAttribute('src', `/counselor/video/${dataVideo}`);
})

var imageModalBefore = document.getElementById('imageModalBefore');

imageModalBefore.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');

	var modalImageBefore = document.getElementById('modal-img-before');

	modalImageBefore.setAttribute('src', `${dataImgURL}`);
	// modalImageBefore.setAttribute('src', `/before/img/${dataImg}`);
})

var videoModalBefore = document.getElementById('videoModalBefore');

videoModalBefore.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoName = button.getAttribute('data-name-video');
	var dataVideoURL = button.getAttribute('data-url-video');

	var modalVideoBefore = document.getElementById('modal-video-before');

	modalVideoBefore.setAttribute('src', `${dataVideoURL}`);
	// modalVideoBefore.setAttribute('src', `/before/video/${dataVideo}`);
})

var imageModalInSurgery = document.getElementById('imageModalInSurgery')

imageModalInSurgery.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');

	var modalImageInSurgery = document.getElementById('modal-img-inSurgery');

	modalImageInSurgery.setAttribute('src', `${dataImgURL}`);
	// modalImageInSurgery.setAttribute('src', `/in-surgery/img/${dataImg}`);
})

var videoModalInSurgery = document.getElementById('videoModalInSurgery')

videoModalInSurgery.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoName = button.getAttribute('data-name-video');
	var dataVideoURL = button.getAttribute('data-url-video');

	var modalVideoInSurgery = document.getElementById('modal-video-inSurgery');

	modalVideoInSurgery.setAttribute('src', `${dataVideoURL}`);
	// modalVideoInSurgery.setAttribute('src', `/in-surgery/video/${dataVideo}`);
})

var imageModalAfter = document.getElementById('imageModalAfter')

imageModalAfter.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');

	var modalImageAfter = document.getElementById('modal-img-after');

	modalImageAfter.setAttribute('src', `${dataImgURL}`);
	// modalImageAfter.setAttribute('src', `/after/img/${dataImg}`);
})

var videoModalAfter = document.getElementById('videoModalAfter')

videoModalAfter.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoName = button.getAttribute('data-name-video');
	var dataVideoURL = button.getAttribute('data-url-video');

	var modalVideoAfter = document.getElementById('modal-video-after');

	modalVideoAfter.setAttribute('src', `${dataVideoURL}`);
	// modalVideoAfter.setAttribute('src', `/after/video/${dataVideo}`);
})