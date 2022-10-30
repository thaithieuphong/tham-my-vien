function validatePhoneNumber(input_str) {
	let number = parseInt(input_str);
	return isNaN(number);
}
var createPhone = document.getElementById('create-phone');
createPhone.addEventListener('input', (e) => {
	if (validatePhoneNumber(e.target.value)) {
		document.getElementById('create_phone_error').classList.remove('off');
	} else {
		document.getElementById('create_phone_error').classList.add('off');
			// alert("validation success")
	}
})



//CREATE: submit create customer forms
// Handle create info Customer
var createCustomer = document.getElementById("create-customer-btn");
var createCustomerForm = document.forms["create-customer-form"];
createCustomer.addEventListener("click", () => {
	createCustomerForm.submit()
});


// Handle select image from modal create
var addImg = document.getElementById("input-create-img");
var addAvt = document.getElementById("add-avt-customer");
addImg.addEventListener("change", (e) => {
	addAvt.src = URL.createObjectURL(e.target.files[0]);
});
//END CREATE: submit create customer forms

//EDIT: Load edit customer modal and submit edit customer forms

formatBirth = (d) => {
	let date = new Date(d);
	let newDate = date.toLocaleString('vi-VI', { day: 'numeric', month: 'numeric', year: 'numeric' });
	return newDate;
}

var editPhone = document.getElementById('edit-phone');
editPhone.addEventListener('input', (e) => {
	if (validatePhoneNumber(e.target.value)) {
		document.getElementById('edit_phone_error').classList.remove('off');
	} else {
		document.getElementById('edit_phone_error').classList.add('off');
			// alert("validation success")
	}
})

// Handle select image from modal edit
var editImg = document.getElementById("input-edit-img");
var editAvt = document.getElementById("edit-customer-avt");
editImg.addEventListener("change", (e) => {
	editAvt.src = URL.createObjectURL(e.target.files[0]);
});

// Handle push data to edit modal
var editCustomer = document.getElementById("edit-customer-modal");
editCustomer.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from edit button
	var idEdit = button.getAttribute('data-id');
	var imageEdit = button.getAttribute("data-edit-img");
	var nickName = button.getAttribute("data-edit-nickname");
	var statusCus = button.getAttribute("data-edit-statusCus");
	var birth = button.getAttribute("data-edit-birth");
	var gender = button.getAttribute("data-edit-gender");
	var phone = button.getAttribute("data-edit-phone");
	var email = button.getAttribute("data-edit-email");
	var address = button.getAttribute("data-edit-address");
	var resource = button.getAttribute("data-edit-resource");
	var desciption = button.getAttribute("data-edit-description");

	// Get element need embeded input
	var editAvt = document.getElementById("edit-customer-avt");
	var editNickName = document.getElementById("edit-nickName");
	var editStatusCus = document.getElementById("edit-statusCus");
	var editBirth = document.getElementById("edit-birth");
	var editGender = document.getElementById("edit-gender");
	var editPhone = document.getElementById("edit-phone");
	var editEmail = document.getElementById("edit-email");
	var editAddress = document.getElementById("edit-address");
	var editResource = document.getElementById("edit-resource");
	var editDescription = document.getElementById("edit-description");

	editNickName.focus();

	if (imageEdit === '') {
		editAvt.setAttribute('src', '/img/user-icon.png');
	} else {
		editAvt.setAttribute('src', imageEdit);
	}
	editCustomerForm.setAttribute('action', `/business/employ/customers/${idEdit}?_method=PUT`);
	editNickName.value = nickName;
	editStatusCus.value = statusCus;
	editBirth.value = birth;
	editGender.value = gender;
	editPhone.value = phone;
	editEmail.value = email;
	editAddress.value = address;
	editResource.value = resource;
	editDescription.value = desciption;
});

// Handle edit info Customer
var editBtn = document.getElementById("edit-customer-btn");
var editCustomerForm = document.forms["edit-customer-form"];
editBtn.addEventListener("click", () => {
	editCustomerForm.submit();
});
//EDIT END: Load edit customer modal and submit edit customer forms

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

document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#customerNew").bootstrapTable({
			pagination: true,
			search: true,
		});
		$("#customerPotential").bootstrapTable({
			pagination: true,
			search: true,
		});
		$("#customerSchedule").bootstrapTable({
			pagination: true,
			search: true,
		});
		$("#customerFail").bootstrapTable({
			pagination: true,
			search: true,
		});
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

	// let inputMultiVideoConselor = document.getElementById('input-multi-videos-counselor');
	// inputMultiVideoConselor.addEventListener('change', (e) => {
	// 	let files = e.target;//event.target.files;
	// 	videosPreviewConselor(files);
	// })

	// let videosPreviewConselor = function (input) {
	// 	let inputFiles = Array.from(input.files);
	// 	if (input.files) {
	// 		for (i = 0; i < inputFiles.length; i++) {
	// 			let reader = new FileReader();
	// 			reader.onload = function (event) {
	// 				let newVideo = document.createElement('video');
	// 				let closeButtonLink = document.createElement('button');
	// 				let divMain = document.createElement('div');
	// 				let src = event.target.result;
	// 				divMain.classList = 'col-xl-2 col-lg-3 col-md-4 col-sm-12 mt-3 mb-3 ml-2 mr-2 pl-0 pr-0 position-relative';
	// 				divMain.id = i;
	// 				newVideo.src = src;
	// 				newVideo.classList = 'img-fluid';
	// 				newVideo.controls = true;
	// 				newVideo.id = i;
	// 				closeButtonLink.type = 'button';
	// 				closeButtonLink.id = i;
	// 				closeButtonLink.ariaLabel = 'Close';
	// 				closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-2 mt-2 close-video';
	// 				let videoc = document.querySelector('.preview-videos-counselor');
	// 				divMain.append(newVideo, closeButtonLink);
	// 				videoc.append(divMain);
	// 				let closeBtn = document.querySelectorAll('.close-video');
	// 				closeBtn.forEach(btn => {
	// 					btn.addEventListener('click', (e) => {
	// 						let parent = btn.parentElement;
	// 						parent.remove();
	// 					})
	// 				})
	// 			};
	// 			reader.readAsDataURL(inputFiles[i]);
	// 		}
	// 	}
	// };
});



//Search
function convert_vi_to_en(str) {
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
	str = str.replace(/đ/g, "d");
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
	str = str.replace(/Đ/g, "D");
	str = str.replace(
		/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
		" "
	);
	str = str.replace(/  +/g, " ");
	return str;
}

// var input = document.getElementById("myInput");
// var li = document.getElementsByClassName("card");
// input.addEventListener('input', (e) => {
// 	var value = e.target.value;
// 	var filters = convert_vi_to_en(value);
// 	var a = document.getElementsByClassName("text-success");
// 	for (i = 0; i < a.length; i++) {
// 		txtValue = convert_vi_to_en(a[i].textContent) || convert_vi_to_en(a[i].innerText) ;
// 		// console.log("content", a.textContent)
// 		// console.log("innert", a.innerText)
// 		var text1 = txtValue.toUpperCase();
// 		var text2 = filters.toUpperCase();
// 		if (text1.match(text2)) {
// 			console.log('filter', text1);
// 			console.log('txtValue', text2)
// 			console.log('li', li[i]);
// 			li[i].style.display = "";
// 		} else {
// 			li[i].style.display = "none";
// 		}
// 	}
// })

// var checkList = document.getElementById('list1');
// checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
// 	if (checkList.classList.contains('visible'))
// 		checkList.classList.remove('visible');
// 	else
// 		checkList.classList.add('visible');
// }

let dropDown = document.getElementsByClassName('dropdown-item');
let moveToBtns = document.getElementsByClassName('btn-moveTo');
let potentialForm = document.forms['customer-potential-form'];
let notOKForm = document.forms['customer-notOK-form'];
let scheduleForm = document.forms['customer-schedule-form'];

for (i = 0; i < dropDown.length; i++) {
	let dropDownItem = dropDown[i];
	dropDownItem.addEventListener('click', (e) => {
		let value = e.target.innerHTML;
		let cusID = e.target.getAttribute('data-cusID');
		if(value === 'Tiềm năng') {
			potentialForm.setAttribute("action", `/business/employ/customers/${cusID}/potential?_method=PATCH`);
			potentialForm.submit();
		}
		if(value === 'Không thành công') {
			notOKForm.setAttribute("action", `/business/employ/customers/${cusID}/notOK?_method=PATCH`);
			notOKForm.submit();
		}
		if(value === 'Đặt lịch') {
			notOKForm.setAttribute("action", `/business/employ/customers/${cusID}/schedule?_method=PATCH`);
			notOKForm.submit();
		}
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