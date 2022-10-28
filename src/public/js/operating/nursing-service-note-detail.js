let slideIndex = 1;
showSlidesCounselorImg(slideIndex);
showSlidesCounselorVideo(slideIndex);
showSlidesBeforeImg(slideIndex);
showSlidesBeforeVideo(slideIndex);
showSlidesInImg(slideIndex);
showSlidesInVideo(slideIndex);
showSlidesAfterImg(slideIndex);
showSlidesAfterVideo(slideIndex);
showSlidesReExamImg(slideIndex);
showSlidesReExamVideo(slideIndex);

// Next/previous controls
function plusSlidesCounselorImg(n) {
	showSlidesCounselorImg(slideIndex += n);
}
function plusSlidesCounselorVideo(n) {
	showSlidesCounselorVideo(slideIndex += n);
}

function plusSlidesBeforeImg(n) {
	showSlidesBeforeImg(slideIndex += n);
}

function plusSlidesBeforeVideo(n) {
	showSlidesBeforeVideo(slideIndex += n);
}

function plusSlidesInImg(n) {
	showSlidesInImg(slideIndex += n);
}

function plusSlidesInVideo(n) {
	showSlidesInVideo(slideIndex += n);
}

function plusSlidesAfterImg(n) {
	showSlidesAfterImg(slideIndex += n);
}

function plusSlidesAfterVideo(n) {
	showSlidesAfterVideo(slideIndex += n);
}

function plusSlidesReExamImg(n) {
	showSlidesReExamImg(slideIndex += n);
}

function plusSlidesReExamVideo(n) {
	showSlidesReExamVideo(slideIndex += n);
}

// Thumbnail image controls
function currentSlideCounselorImg(n) {
	showSlidesCounselor(slideIndex = n);
}
function currentSlideCounselorVideo(n) {
	showSlidesCounselorVideo(slideIndex = n);
}

function currentSlideBeforeImg(n) {
	showSlidesBeforeImg(slideIndex = n);
}

function currentSlideBeforeVideo(n) {
	showSlidesBeforeVideo(slideIndex = n);
}

function currentSlideInImg(n) {
	showSlidesInImg(slideIndex = n);
}

function currentSlideInVideo(n) {
	showSlidesInVideo(slideIndex = n);
}

function currentSlideAfterImg(n) {
	showSlidesAfterImg(slideIndex = n);
}

function currentSlideAfterVideo(n) {
	showSlidesAfterVideo(slideIndex = n);
}

function currentSlideReExamImg(n) {
	showSlidesReExamImg(slideIndex = n);
}

function currentSlideReExamVideo(n) {
	showSlidesReExamVideo(slideIndex = n);
}

function showSlidesCounselorImg(n) {
	let i;
	let slides = document.getElementsByClassName("slide-counselor-img");
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

function showSlidesCounselorVideo(n) {
	let i;
	let slides = document.getElementsByClassName("slide-counselor-video");
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

function showSlidesBeforeImg(n) {
	let i;
	let slides = document.getElementsByClassName("slide-before-img");
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

function showSlidesBeforeVideo(n) {
	let i;
	let slides = document.getElementsByClassName("slide-before-video");
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

function showSlidesInImg(n) {
	let i;
	let slides = document.getElementsByClassName("slide-in-img");
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

function showSlidesInVideo(n) {
	let i;
	let slides = document.getElementsByClassName("slide-in-video");
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
		slides[slideIndex-1].style.display = "block";
		dots[slideIndex-1].className += " active-click";
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
		slides[slideIndex-1].style.display = "block";
		dots[slideIndex-1].className += " active-click";
	}
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