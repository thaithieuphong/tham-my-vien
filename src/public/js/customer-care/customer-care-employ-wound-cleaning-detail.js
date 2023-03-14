// Delete WoundCleaning Image
var imageModalWoundCleaning = document.getElementById('imageModalWoundCleaning');

imageModalWoundCleaning.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImg = button.getAttribute('data-img');
	var modalImageWoundCleaning = document.getElementById('modal-img-wound-cleaning');

	// modalImageWoundCleaning.setAttribute('src', `${dataImg}`);
	modalImageWoundCleaning.setAttribute('src', `/wound-cleaning/img/${dataImg}`);

});

// Delete WoundCleaning Video
var videoModalWoundCleaning = document.getElementById('videoModalWoundCleaning');

videoModalWoundCleaning.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideo = button.getAttribute('data-video');
	var modalVideoWoundCleaning = document.getElementById('modal-video-wound-cleaning');

	// modalVideoWoundCleaning.setAttribute('src', `${dataVideo}`);
	modalVideoWoundCleaning.setAttribute('src', `/wound-cleaning/video/${dataVideo}`);
});
let slideIndex = 1;
showSlidesAfterImg(slideIndex);
showSlidesAfterVideo(slideIndex);

// Next/previous controls

function plusSlidesAfterImg(n) {
	showSlidesAfterImg(slideIndex += n);
}

function plusSlidesAfterVideo(n) {
	showSlidesAfterVideo(slideIndex += n);
}

// Thumbnail image controls

function currentSlideAfterImg(n) {
	showSlidesAfterImg(slideIndex = n);
}

function currentSlideAfterVideo(n) {
	showSlidesAfterVideo(slideIndex = n);
}

function showSlidesAfterImg(n) {
	let i;
	let slides = document.getElementsByClassName("slide-after-img");
	if(slides) {
		let dots = document.getElementsByClassName("dot");
		if (n > slides.length) {slideIndex = 1}
		if (n < 1) {slideIndex = slides.length}
		for (i = 0; i < slides.length; i++) {
		  slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
		  dots[i].className = dots[i].className.replace(" active-click", "");
		}
		if (slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";
		if (dots[slideIndex-1]) {
			dots[slideIndex-1].className += " active-click";
		}
	}
}

function showSlidesAfterVideo(n) {
	let i;
	let slides = document.getElementsByClassName("slide-after-video");
	if(slides) {
		let dots = document.getElementsByClassName("dot");
		if (n > slides.length) {slideIndex = 1}
		if (n < 1) {slideIndex = slides.length}
		for (i = 0; i < slides.length; i++) {
		  slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
		  dots[i].className = dots[i].className.replace(" active-click", "");
		}
		if (slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";
		if (dots[slideIndex-1]) {
			dots[slideIndex-1].className += " active-click";
		}
	}
}