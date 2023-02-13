var imageModalCounselor = document.getElementById('imageModalCounselor');

imageModalCounselor.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImg = button.getAttribute('data-img');

	var modalImageCounselor = document.getElementById('modal-img-counselor');

	// modalImageCounselor.setAttribute('src', `${dataImg}`);
	modalImageCounselor.setAttribute('src', `/counselor/img/${dataImg}`);
})

var videoModalCounselor = document.getElementById('videoModalCounselor');

videoModalCounselor.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideo = button.getAttribute('data-video');

	var modalVideoCounselor = document.getElementById('modal-video-counselor');

	// modalVideoCounselor.setAttribute('src', `${dataVideo}`);
	modalVideoCounselor.setAttribute('src', `/counselor/video/${dataVideo}`);
})

var imageModalBefore = document.getElementById('imageModalBefore');

imageModalBefore.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImg = button.getAttribute('data-img');

	var modalImageBefore = document.getElementById('modal-img-before');

	// modalImageBefore.setAttribute('src', `${dataImg}`);
	modalImageBefore.setAttribute('src', `/before/img/${dataImg}`);
})

var videoModalBefore = document.getElementById('videoModalBefore');

videoModalBefore.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideo = button.getAttribute('data-video');

	var modalVideoBefore = document.getElementById('modal-video-before');

	// modalVideoBefore.setAttribute('src', `${dataVideo}`);
	modalVideoBefore.setAttribute('src', `/before/video/${dataVideo}`);
})

var imageModalInSurgery = document.getElementById('imageModalInSurgery')

imageModalInSurgery.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImg = button.getAttribute('data-img');

	var modalImageInSurgery = document.getElementById('modal-img-inSurgery');

	// modalImageInSurgery.setAttribute('src', `${dataImg}`);
	modalImageInSurgery.setAttribute('src', `/in-surgery/img/${dataImg}`);
})

var videoModalInSurgery = document.getElementById('videoModalInSurgery')

videoModalInSurgery.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideo = button.getAttribute('data-video');

	var modalVideoInSurgery = document.getElementById('modal-video-inSurgery');

	// modalVideoInSurgery.setAttribute('src', `${dataVideo}`);
	modalVideoInSurgery.setAttribute('src', `/in-surgery/video/${dataVideo}`);
})

var imageModalAfter = document.getElementById('imageModalAfter')

imageModalAfter.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImg = button.getAttribute('data-img');

	var modalImageAfter = document.getElementById('modal-img-after');

	// modalImageAfter.setAttribute('src', `${dataImg}`);
	modalImageAfter.setAttribute('src', `/after/img/${dataImg}`);
})

var videoModalAfter = document.getElementById('videoModalAfter')

videoModalAfter.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideo = button.getAttribute('data-video');

	var modalVideoAfter = document.getElementById('modal-video-after');

	// modalVideoAfter.setAttribute('src', `${dataVideo}`);
	modalVideoAfter.setAttribute('src', `/after/video/${dataVideo}`);
})