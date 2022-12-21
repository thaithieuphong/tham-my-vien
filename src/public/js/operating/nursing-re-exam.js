//Multiple images re xam
document.addEventListener('DOMContentLoaded', function () {

	let inputMultiImageReExamination = document.getElementById('input-multi-images-reExamination');
	if (inputMultiImageReExamination) {
		inputMultiImageReExamination.addEventListener('change', (e) => {
			let files = e.target;//event.target.files;
			imagesPreviewReExamination(files);
		})
		let imagesPreviewReExamination = function (input) {
			let inputFiles = Array.from(input.files);
			if (input.files) {
				for (let i = 0; i < inputFiles.length; i++) {
					let reader = new FileReader();
					let newImage = document.createElement('img');
					let iconClose = document.createElement('i');
					iconClose.setAttribute('class', 'ti-close');
					let closeButtonLink = document.createElement('div');
					closeButtonLink.append(iconClose);
					let divMain = document.createElement('figure');
					reader.addEventListener('load', (event) => {
						let src = event.target.result;
						divMain.classList = 'col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 figure img-container position-relative mt-2';
						divMain.id = i;
						newImage.src = src;
						newImage.classList = 'figure-img img-fluid rounded img-cover';
						newImage.id = i;
						closeButtonLink.id = i;
						closeButtonLink.type = 'button';
						closeButtonLink.ariaLabel = 'Close';
						closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 close-img mr-4 mt-2';
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
	if (inputMultiVideoReExamination) {
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
						divMain.classList = 'col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 figure imgbox position-relative mt-2';
						divMain.id = i;
						newVideo.src = src;
						newVideo.classList = 'img-fluid';
						newVideo.controls = true;
						newVideo.id = i;
						closeButtonLink.type = 'button';
						closeButtonLink.id = i;
						closeButtonLink.ariaLabel = 'Close';
						closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 close-img mr-4 mt-2';
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
	createReExaminationModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let id = button.getAttribute("data-id");
		let cusId = button.getAttribute("data-cusId");
		let identification = button.getAttribute("data-identification");
		let fullName = button.getAttribute("data-fullName");
		let gender = button.getAttribute("data-gender");
		let phone = button.getAttribute("data-phone");
		createReExaminationForm.setAttribute('action', `/operating-room/nursing/discharge-from-hospital/${id}/create-re-examination`);

		let submitId = document.getElementById('submit-re-exam-cusId');
		let submitIdentification = document.getElementById('submit-re-exam-identification');
		let submitFullName = document.getElementById('submit-re-exam-fullname');
		let submitGender = document.getElementById('submit-re-exam-gender');
		let submitPhone = document.getElementById('submit-re-exam-phone');
		submitId.value = cusId;
		submitIdentification.innerHTML = identification;
		submitFullName.innerHTML = fullName;
		submitGender.innerHTML = gender;
		submitPhone.innerHTML = '0' + phone;

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
	submitReExaminationModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let id = button.getAttribute("data-id");
		let fullName = button.getAttribute("data-fullName");
		submitReExaminationForm.setAttribute('action', `/operating-room/nursing/re-examination/${id}/done?_method=PATCH`);

		let submitFullName = document.getElementById('submit-re-exam-fullname');
		submitFullName.innerHTML = fullName;

	})
}

var deleteReExaminationForm = document.forms['delete-re-exam-form'];
var deleteReExaminationModal = document.getElementById('delete-re-exam-modal');
var deleteReExaminationBtn = document.getElementById('delete-re-exam-btn');
var deleteReExamInput = document.getElementById('delete-re-exam-input');

if (deleteReExaminationBtn) {
	deleteReExaminationBtn.addEventListener("click", () => {
		deleteReExaminationForm.submit();
	});
}

if (deleteReExaminationModal) {
	deleteReExaminationModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let id = button.getAttribute("data-id");
		let cusID = button.getAttribute("data-cusId");
		let fullName = button.getAttribute("data-fullName");
		deleteReExaminationForm.setAttribute('action', `/operating-room/nursing/re-examination/${id}/delete?_method=DELETE`);

		let deleteFullName = document.getElementById('delete-re-exam-fullname');
		deleteFullName.innerHTML = fullName;
		deleteReExamInput.value = cusID;
	})
}

// Sửa lịch hẹn tái khám của nursing
var editReExaminationForm = document.forms['edit-reexam-schedule-form'];
var editReExaminationModal = document.getElementById('edit-reexam-schedule-modal');
var editReExaminationBtn = document.getElementById('edit-reexam-schedule-btn');
var editReExamInput = document.getElementById('edit-reexam-schedule-input');

if (editReExaminationBtn) {
	editReExaminationBtn.addEventListener("click", () => {
		editReExaminationForm.submit();
	});
}

if (editReExaminationModal) {
	editReExaminationModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let id = button.getAttribute("data-edit-reexam-id");
		let fullName = button.getAttribute("data-edit-reexam-fullName");
		let nickName = button.getAttribute("data-edit-reexam-nickName");
		let gender = button.getAttribute("data-edit-reexam-gender");
		let phone = button.getAttribute("data-edit-reexam-phone");
		editReExaminationForm.setAttribute('action', `/operating-room/nursing/re-examination/${id}/edit?_method=PATCH`);

		let editFullName = document.getElementById('edit-reexam-schedule-fullname');
		let editNickName = document.getElementById('edit-reexam-schedule-nickname');
		let editGender = document.getElementById('edit-reexam-schedule-gender');
		let editPhone = document.getElementById('edit-reexam-schedule-phone');
		editFullName.innerHTML = fullName;
		editNickName.innerHTML = nickName;
		editGender.innerHTML = gender;
		editPhone.innerHTML = phone;
	})
}


// Sửa lịch hẹn tái khám của customer care
var editReExaminationFormCustomerCare = document.forms['edit-reexam-schedule-form-customer-care'];
var editReExaminationModalCustomerCare = document.getElementById('edit-reexam-schedule-modal-customer-care');
var editReExaminationBtnCustomerCare = document.getElementById('edit-reexam-schedule-btn-customer-care');
var editReExamInputCustomerCare = document.getElementById('edit-reexam-schedule-input-customer-care');

if (editReExaminationBtnCustomerCare) {
	editReExaminationBtnCustomerCare.addEventListener("click", () => {
		editReExaminationFormCustomerCare.submit();
	});
}

if (editReExaminationModalCustomerCare) {
	editReExaminationModalCustomerCare.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let id = button.getAttribute("data-edit-reexam-id-customer-care");
		let fullName = button.getAttribute("data-edit-reexam-fullName-customer-care");
		let nickName = button.getAttribute("data-edit-reexam-nickName-customer-care");
		let gender = button.getAttribute("data-edit-reexam-gender-customer-care");
		let phone = button.getAttribute("data-edit-reexam-phone-customer-care");
		editReExaminationFormCustomerCare.setAttribute('action', `/customer-care/employ/re-exam/${id}/edit?_method=PATCH`);

		let editFullName = document.getElementById('edit-reexam-schedule-fullname-customer-care');
		let editNickName = document.getElementById('edit-reexam-schedule-nickname-customer-care');
		let editGender = document.getElementById('edit-reexam-schedule-gender-customer-care');
		let editPhone = document.getElementById('edit-reexam-schedule-phone-customer-care');
		editFullName.innerHTML = fullName;
		editNickName.innerHTML = nickName;
		editGender.innerHTML = gender;
		editPhone.innerHTML = '0' + phone;
	})
}

let slideIndex = 1;
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

// Cập nhật phiếu hoàn thành của nursing
var submitServiceNoteForm = document.forms['submit-service-note-done-form'];
var submitServiceNoteModal = document.getElementById('submit-service-note-done-modal');
var submitServiceBtn = document.getElementById('submit-service-note-done-btn');

if (submitServiceBtn) {
	submitServiceBtn.addEventListener("click", () => {
		submitServiceNoteForm.submit();
	});
}

if (submitServiceNoteModal) {
	submitServiceNoteModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let id = button.getAttribute("data-id");
		let surgeryDayData = button.getAttribute("data-surgeryDay");
		let cusID = button.getAttribute('data-cusID')
		let fullName = button.getAttribute("data-fullName");
		submitServiceNoteForm.setAttribute('action', `/operating-room/nursing/service-note/${id}/done?_method=PATCH`);

		let inputCusID = document.getElementById('submit-service-note-done-cusId');
		let inputSurgeryDay = document.getElementById('submit-service-note-done-surgeryDay');
		let submitFullName = document.getElementById('fullName-modal');
		inputCusID.value = cusID;
		inputSurgeryDay.value = surgeryDayData;
		submitFullName.innerHTML = fullName;
	})
}

// Cập nhật phiếu hoàn thành của customer care
var submitReExaminationFormCustomerCare = document.forms['submit-re-exam-form-done-customer-care'];
var submitReExaminationModalCustomerCare = document.getElementById('submit-re-exam-modal-done-customer-care');
var submitReExaminationBtnCustomerCare = document.getElementById('submit-re-exam-btn-done-customer-care');

if (submitReExaminationBtnCustomerCare) {
	submitReExaminationBtnCustomerCare.addEventListener("click", () => {
		submitReExaminationFormCustomerCare.submit();
	});
}

if (submitReExaminationModalCustomerCare) {
	submitReExaminationModalCustomerCare.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let id = button.getAttribute("data-id-customer-care");
		let fullName = button.getAttribute("data-fullName-customer-care");
		submitReExaminationFormCustomerCare.setAttribute('action', `/customer-care/employ/re-exam/${id}/done?_method=PATCH`);

		let submitFullNameCustomerCare = document.getElementById('submit-re-exam-fullname-customer-care');
		submitFullNameCustomerCare.innerHTML = fullName;
	})
}

var inputSearch = document.getElementById('search-reexamination'); // Lấy thẻ input từ giao diện
if (inputSearch) {
	inputSearch.addEventListener('keyup', (e) => {
		let value = e.target.value.toLowerCase(); // Lấy giá trị được nhập vào từ thẻ input
		getData(value);
	});
}

var inputSearchDischarge = document.getElementById('search-discharge'); // Lấy thẻ input từ giao diện
if (inputSearchDischarge) {
	inputSearchDischarge.addEventListener('keyup', (e) => {
		let value = e.target.value.toLowerCase(); // Lấy giá trị được nhập vào từ thẻ input
		getData(value);
	});
}

var inputSearchStorageDone = document.getElementById('search-storage-done'); // Lấy thẻ input từ giao diện
if (inputSearchStorageDone) {
	inputSearchStorageDone.addEventListener('keyup', (e) => {
		let value = e.target.value.toLowerCase(); // Lấy giá trị được nhập vào từ thẻ input
		getData(value);
	});
}

var inputSearchSchedule = document.getElementById('search-schedule'); // Lấy thẻ input từ giao diện
if (inputSearchSchedule) {
	inputSearchSchedule.addEventListener('keyup', (e) => {
		let value = e.target.value.toLowerCase(); // Lấy giá trị được nhập vào từ thẻ input
		getDataTable(value);
	});
}

function getDataTable(value) {
	// Declare variables
	var table, tr;
	let filter = value;
	table = document.getElementById("table-schedule");
	tr = table.querySelectorAll(".text-value");
	tr.forEach(item => {
		let identifies = item.querySelectorAll(".text-identify");
		let fullNames = item.querySelectorAll(".text-fullName");
		let nickNames = item.querySelectorAll(".text-nickName");
		let phones = item.querySelectorAll(".text-phone");
		let schedules = item.querySelectorAll(".text-schedule");
		let statuses = item.querySelectorAll(".text-status");
		let identifyText, fullNameText, nickNameText, phoneText, scheduleText, statusText;
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
		schedules.forEach(schedule => {
			return scheduleText = schedule.innerHTML.toLowerCase().trim();
		})
		statuses.forEach(status => {
			return statusText = status.innerHTML.toLowerCase().trim();
		})
		let obj = { fullName: fullNameText, nickName: nickNameText, identify: identifyText, phone: phoneText, schedule: scheduleText, status: statusText }
		if (obj.identify || obj.fullName || obj.nickName || obj.phone || obj.schedule || obj.status !== undefined) {
			const isVisible = obj.identify.includes(filter) || obj.fullName.includes(filter) || obj.nickName.includes(filter) || obj.phone.includes(filter) || obj.schedule.includes(filter) || obj.status.includes(filter);
			item.classList.toggle('off', !isVisible);
		}
	})
}

function getData(value) {
	const cards = document.querySelectorAll('.card');
	cards.forEach(card => {
		let fullName = card.querySelector('.text-fullName');
		let nickName = card.querySelector('.text-nickName');
		let idendify = card.querySelector('.text-identify');
		let textFullName = fullName.innerHTML;
		let textNickName = nickName.innerHTML;
		let textIdentify = idendify.innerHTML;
		let obj = { fullName: textFullName, nickName: textNickName, idendify: textIdentify, element: card }
		const isVisible = obj.fullName.toLowerCase().includes(value) || obj.nickName.toLowerCase().includes(value) || obj.idendify.toLowerCase().includes(value);
		card.classList.toggle('off', !isVisible);
	})
}

