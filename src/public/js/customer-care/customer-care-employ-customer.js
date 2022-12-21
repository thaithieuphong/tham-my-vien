let slideIndex = 1;
showSlidesCounselorImg(slideIndex);
showSlidesCounselorVideo(slideIndex);
showSlidesBeforeImg(slideIndex);
showSlidesBeforeVideo(slideIndex);
showSlidesInImg(slideIndex);
showSlidesInVideo(slideIndex);
showSlidesAfterImg(slideIndex);
showSlidesAfterVideo(slideIndex);

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
		if (slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";
		if (dots[slideIndex-1]) {
			dots[slideIndex-1].className += " active-click";
		}
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
		if (slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";
		if (dots[slideIndex-1]) {
			dots[slideIndex-1].className += " active-click";
		}
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
		if (slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";
		if (dots[slideIndex-1]) {
			dots[slideIndex-1].className += " active-click";
		}
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
		if (slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";
		if (dots[slideIndex-1]) {
			dots[slideIndex-1].className += " active-click";
		}
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
		if (slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";
		if (dots[slideIndex-1]) {
			dots[slideIndex-1].className += " active-click";
		}
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
		if (slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";
		if (dots[slideIndex-1]) {
			dots[slideIndex-1].className += " active-click";
		}
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
showSlidesReExamImg(slideIndex);
showSlidesReExamVideo(slideIndex);

function plusSlidesReExamImg(n) {
	showSlidesReExamImg(slideIndex += n);
}

function plusSlidesReExamVideo(n) {
	showSlidesReExamVideo(slideIndex += n);
}

function currentSlidesReExamImg(n) {
	showSlidesReExamImg(slideIndex = n);
}

function currentSlidesReExamVideo(n) {
	showSlidesReExamVideo(slideIndex = n);
}

function showSlidesReExamImg(n) {
	let i;
	let slides = document.getElementsByClassName("slide-re-exam-img");
	if (slides) {
		let dots = document.getElementsByClassName("dot");
		if (n > slides.length) { slideIndex = 1 }
		if (n < 1) { slideIndex = slides.length }
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(" active-click", "");
		}
		if (slides[slideIndex - 1]) {
			slides[slideIndex - 1].style.display = "block";
		}
		if (dots[slideIndex - 1]) {
			dots[slideIndex - 1].className += " active-click";
		}
	}
}

function showSlidesReExamVideo(n) {
	let i;
	let slides = document.getElementsByClassName("slide-re-exam-video");
	if (slides) {
		let dots = document.getElementsByClassName("dot");
		if (n > slides.length) { slideIndex = 1 }
		if (n < 1) { slideIndex = slides.length }
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(" active-click", "");
		}
		if (slides[slideIndex - 1]) {
			slides[slideIndex - 1].style.display = "block";
		}
		if (dots[slideIndex - 1]) {
			dots[slideIndex - 1].className += " active-click";
		}
	}
}

var setColors = document.getElementsByClassName('status-color');
for(i=0; i < setColors.length; i++) {
	let value = setColors[i].innerHTML;
	if(value === 'Tạo mới') {
		setColors[i].classList.add('bg-primary', 'text-white');
	}
	if(value === 'Đang xử lý') {
		setColors[i].classList.add('bg-warning', 'text-white');
	}
	if(value === 'Hoàn thành') {
		setColors[i].classList.add('bg-success', 'text-white');
	}
}

// Tạo lịch tái khám của customer care
var createReExaminationFormCustomerCare = document.forms['create-re-exam-form-customer-care'];
var createReExaminationModalCustomerCare = document.getElementById('create-re-exam-modal-customer-care');
var createReExaminationBtnCustomerCare = document.getElementById('create-re-exam-btn-customer-care');

if (createReExaminationBtnCustomerCare) {
	createReExaminationBtnCustomerCare.addEventListener("click", () => {
		createReExaminationFormCustomerCare.submit();
	});
}

if (createReExaminationModalCustomerCare) {
	createReExaminationModalCustomerCare.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let id = button.getAttribute("data-id");
		let cusId = button.getAttribute("data-cusId");
		let identification = button.getAttribute("data-identification");
		let fullName = button.getAttribute("data-fullName");
		let nickName = button.getAttribute("data-nickName");
		let gender = button.getAttribute("data-gender");
		let phone = button.getAttribute("data-phone");
		createReExaminationFormCustomerCare.setAttribute('action', `/customer-care/employ/customers/${id}/create-re-examination`);

		let createIdCustomerCare = document.getElementById('create-re-exam-cusId-customer-care');
		let createIdentificationCustomerCare = document.getElementById('create-re-exam-identification-customer-care');
		let createFullNameCustomerCare = document.getElementById('create-re-exam-fullname-customer-care');
		let createNickNameCustomerCare = document.getElementById('create-re-exam-nickname-customer-care');
		let createGenderCustomerCare = document.getElementById('create-re-exam-gender-customer-care');
		let createPhoneCustomerCare = document.getElementById('create-re-exam-phone-customer-care');
		createIdCustomerCare.value = cusId;
		createIdentificationCustomerCare.innerHTML = identification;
		createFullNameCustomerCare.innerHTML = fullName;
		createNickNameCustomerCare.innerHTML = nickName;
		createGenderCustomerCare.innerHTML = gender;
		createPhoneCustomerCare.innerHTML = '0' + phone;

	})
}


// Lưu trữ hồ sơ khách hàng đã hoàn thành việc chăm sóc vào kho lưu trữ
var submitServiceNoteFormCustomerCare = document.forms['submit-service-note-done-form-customer-care'];
var submitServiceNoteModalCustomerCare = document.getElementById('submit-service-note-done-modal-customer-care');
var submitServiceBtnCustomerCare = document.getElementById('submit-service-note-done-btn-customer-care');

if (submitServiceBtnCustomerCare) {
	submitServiceBtnCustomerCare.addEventListener("click", () => {
		submitServiceNoteFormCustomerCare.submit();
	});
}

if (submitServiceNoteModalCustomerCare) {
	submitServiceNoteModalCustomerCare.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let id = button.getAttribute("data-id-customer-care");
		let cusID = button.getAttribute('data-cusID');
		let fullNameCustomerCare = button.getAttribute("data-fullName-customer-care");
		submitServiceNoteFormCustomerCare.setAttribute('action', `/customer-care/employ/customers/service-note/${id}/done?_method=PATCH`);

		let submitCusID = document.getElementById('submit-service-note-done-cusId-customer-care');
		let submitFullNameCustomerCare = document.getElementById('fullName-modal-customer-care');
		submitCusID.value = cusID;
		submitFullNameCustomerCare.innerHTML = fullNameCustomerCare;
	})
}

// nhập tìm kiếm
var inputSearch = document.getElementById('search-customer'); // Lấy thẻ input từ giao diện
if (inputSearch) {
	inputSearch.addEventListener('keyup', (e) => {
		let value = e.target.value.toLowerCase(); // Lấy giá trị được nhập vào từ thẻ input
		getDataTable(value);
	});
}

function getDataTable(value) {
	// Declare variables
	var table, tr;
	let filter = value;
	table = document.getElementById("table-customer");
	tr = table.querySelectorAll(".text-value");
	tr.forEach(item => {
		let identifies = item.querySelectorAll(".text-identify");
		let fullNames = item.querySelectorAll(".text-fullName");
		let nickNames = item.querySelectorAll(".text-nickName");
		let phones = item.querySelectorAll(".text-phone");
		let statuses = item.querySelectorAll(".text-status");
		let identifyText, fullNameText, nickNameText, phoneText, statusText;
		identifies.forEach(identify => {
			return identifyText = identify.innerHTML.toLowerCase().trim();
		})
		fullNames.forEach(fullName => {
			let fullNameLink = fullName.querySelector(".fullName-link");
			return fullNameText = fullNameLink.innerHTML.toLowerCase().trim();
		})
		nickNames.forEach(nickName => {
			return nickNameText = nickName.innerHTML.toLowerCase().trim();
		})
		phones.forEach(phone => {
			return phoneText = phone.innerHTML.toLowerCase().trim();
		})
		statuses.forEach(status => {
			return statusText = status.innerHTML.toLowerCase().trim();
		})
		let obj = { fullName: fullNameText, nickName: nickNameText, identify: identifyText, phone: phoneText, status: statusText }
		if (obj.identify || obj.fullName || obj.nickName || obj.phone || obj.status !== undefined) {
			const isVisible = obj.identify.includes(filter) || obj.fullName.includes(filter) || obj.nickName.includes(filter) || obj.phone.includes(filter) || obj.status.includes(filter);
			item.classList.toggle('off', !isVisible);
		}
	})
}

var alertElement = document.getElementsByClassName('alert');
for (i = 0; i < alertElement.length; i++) {
	if (alertElement[i]) {
		let element = alertElement[i];
		let timerOut = setTimeout(closeAlert, 5000);
		function closeAlert() {
			element.remove();
		}
	}
}