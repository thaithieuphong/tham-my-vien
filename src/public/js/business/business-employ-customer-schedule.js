formatBirth = (d) => {
	let date = new Date(d);
	let newDate = date.toLocaleString('vi-VI', { day: 'numeric', month: 'numeric', year: 'numeric' });
	return newDate;
}

document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#customerSchedule").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
	});
});

let inputPriceBefore = document.getElementById('create-schedule-priceBefore');
inputPriceBefore.addEventListener('keyup', function(evt){
	let convertMoney = parseFloat(this.value.replace(/\D/g,''), 10);
	let convertedMoney = convertMoney.toLocaleString();
    inputPriceBefore.value = convertedMoney;
}, false);

let inputDeposit = document.getElementById('create-schedule-deposit');
inputDeposit.addEventListener('keyup', function(evt){
	let convertMoney = parseFloat(this.value.replace(/\D/g,''), 10);
	let convertedMoney = convertMoney.toLocaleString();
    inputDeposit.value = convertedMoney;
}, false);

//CREATE: submit create service note forms
var createScheduleBtn = document.getElementById("create-schedule-btn");
createScheduleBtn.addEventListener("click", () => {
	createScheduleForm.submit();
  });
// Handle create service-note
var createScheduleForm = document.forms["create-schedule-form"]
var createSchedule = document.getElementById("create-schedule-modal");
createSchedule.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from detail button
	// Handle edit info Customer
	var dataScheduleID = button.getAttribute("data-schedule-id");
	var dataScheduleImg = button.getAttribute("data-schedule-img");
	var dataNickName = button.getAttribute("data-schedule-nickname");
	var dataBirth = button.getAttribute("data-schedule-birth");
	var dataGender = button.getAttribute("data-schedule-gender");
	var dataPhone = button.getAttribute("data-schedule-phone");
	var dataEmail = button.getAttribute("data-schedule-email");
	var dataAddress = button.getAttribute("data-schedule-address");
	var dataDescription = button.getAttribute("data-schedule-description");

	// // Get element need embeded input
	var scheduleCustomerID = document.getElementById('create-schedule-customerID');
	var scheduleCustomerImg = document.getElementById('create-schedule-img');
	var scheduleNickName = document.getElementById(
		"create-schedule-nickName"
	);
	var scheduleBirth = document.getElementById("create-schedule-birth");
	var scheduleGender = document.getElementById("create-schedule-gender");
	var schedulePhone = document.getElementById("create-schedule-phone");
	var scheduleEmail = document.getElementById("create-schedule-email");
	var scheduleAddress = document.getElementById("create-schedule-address");
	var scheduleDescription = document.getElementById("create-schedule-description");

	createScheduleForm.setAttribute(
		"action",
		`/business/employ/customers/${dataScheduleID}/schedule/create`
	);
	if (dataScheduleImg === '') {
		scheduleCustomerImg.setAttribute('src', '/img/user-icon.png');
	} else {
		scheduleCustomerImg.setAttribute('src', dataScheduleImg);
	}

	scheduleCustomerID.value = dataScheduleID;
	scheduleNickName.innerHTML = dataNickName;
	scheduleBirth.innerHTML = formatBirth(dataBirth);
	scheduleGender.innerHTML = dataGender;
	schedulePhone.innerHTML = dataPhone;
	scheduleEmail.innerHTML = dataEmail;
	scheduleAddress.innerHTML = dataAddress;
	scheduleDescription.innerHTML = dataDescription;
});

let inputMultiImageCounselor = document.getElementById('input-multi-images-counselor');
if(inputMultiImageCounselor) {
	inputMultiImageCounselor.addEventListener('change', (e) => {
		let files = e.target;//event.target.files;
		imagesPreviewCounselor(files);
	})

	let imagesPreviewCounselor = function (input) {
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
					let src = event.target.result;
					divMain.classList = 'col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6 figure img-container position-relative';
					divMain.id = i;
					newImage.src = src;
					newImage.classList = 'figure-img img-fluid rounded img-cover';
					newImage.id = i;
					closeButtonLink.id = i;
					closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 mr-4 mt-2 close-img';
					let imgc = document.querySelector('.preview-images-counselor');
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