let slideIndex = 1;
showSlidesReExamImg(slideIndex);
showSlidesReExamVideo(slideIndex);

// Next/previous controls

function plusSlidesReExamImg(n) {
	showSlidesReExamImg(slideIndex += n);
}

function plusSlidesReExamVideo(n) {
	showSlidesReExamVideo(slideIndex += n);
}

// Thumbnail image controls

function currentSlideReExamImg(n) {
	showSlidesReExamImg(slideIndex = n);
}

function currentSlideReExamVideo(n) {
	showSlidesReExamVideo(slideIndex = n);
}

function showSlidesReExamImg(n) {
	let i;
	let slides = document.getElementsByClassName("slide-re-exam-img");
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
		slides[slideIndex-1].style.display = "block";
		dots[slideIndex-1].className += " active-click";
	}
}

function showSlidesReExamVideo(n) {
	let i;
	let slides = document.getElementsByClassName("slide-re-exam-video");
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
		slides[slideIndex-1].style.display = "block";
		dots[slideIndex-1].className += " active-click";
	}
}