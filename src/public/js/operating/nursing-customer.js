document.addEventListener("DOMContentLoaded", function () {

	let inputMultiImageConselor = document.getElementById('input-multi-images-before-counselor');
	inputMultiImageConselor.addEventListener('change', (e) => {
		let files = e.target;//event.target.files;
		imagesPreviewConselor(files);
	})

	let imagesPreviewConselor = function (input) {
		let inputFiles = Array.from(input.files);
		if (input.files) {
			// let filesAmount = inputFiles.length
			for (let i = 0; i < inputFiles.length; i++) {
				let reader = new FileReader();
				let newImage = document.createElement('img');
				let closeButtonLink = document.createElement('button');
				let divMain = document.createElement('div');
				reader.addEventListener('load', (event) => {
					let src = event.target.result;
					divMain.classList = 'col-xl-2 col-lg-3 col-md-4 col-sm-12 mt-3 mb-3 ml-2 mr-2 pl-0 pr-0 position-relative';
					divMain.id = i;
					newImage.src = src;
					newImage.classList = 'img-fluid';
					newImage.id = i;
					closeButtonLink.id = i;
					closeButtonLink.type = 'button';
					closeButtonLink.ariaLabel = 'Close';
					closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-2 mt-2 close-img';
					let imgc = document.querySelector('.preview-images-before-counselor');
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
});

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


var editPhone = document.getElementById('edit-phone');
editPhone.addEventListener('input', (e) => {
	if (validatePhoneNumber(e.target.value)) {
		document.getElementById('edit_phone_error').classList.remove('off');
	} else {
		document.getElementById('edit_phone_error').classList.add('off');
	}
})

//EDIT: Load edit customer modal and submit edit customer forms

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
	var identification = button.getAttribute("data-edit-identification");
	var fullName = button.getAttribute("data-edit-fullname");
	var nickName = button.getAttribute("data-edit-nickname");
	var birth = button.getAttribute("data-edit-birth");
	var phone = button.getAttribute("data-edit-phone");
	var gender = button.getAttribute("data-edit-gender");
	var height = button.getAttribute("data-edit-height");
	var weight = button.getAttribute("data-edit-weight");
	var homeTown = button.getAttribute("data-edit-homeTown");
	var resource = button.getAttribute("data-edit-resource");
	var desciption = button.getAttribute("data-edit-description");

	// Get element need embeded input
	var editAvt = document.getElementById("edit-customer-avt");
	var editIdentification = document.getElementById("edit-identification");
	var editFullName = document.getElementById("edit-fullName");
	var editNickName = document.getElementById("edit-nickName");
	var editBirth = document.getElementById("edit-birth");
	var editGender = document.getElementById("edit-gender");
	var editPhone = document.getElementById("edit-phone");
	var editHeight = document.getElementById("edit-height");
	var editWeight = document.getElementById("edit-weight");
	var editHomeTown = document.getElementById("edit-homeTown");
	var editResource = document.getElementById("edit-resource");
	var editDescription = document.getElementById("edit-description");

	editFullName.focus();

	if (imageEdit === '') {
		editAvt.setAttribute('src', '/img/user-ray.png');
	} else {
		// editAvt.setAttribute('src', `/img/uploads/customers/${imageEdit}`);
		editAvt.setAttribute('src', imageEdit);
	}
	editCustomerForm.setAttribute('action', `/operating-room/nursing/customers/${idEdit}?_method=PUT`);
	editIdentification.value = identification;
	editFullName.value = fullName;
	editNickName.value = nickName;
	editBirth.value = birth;
	editGender.value = gender;
	editPhone.value = phone;
	editHeight.value = height;
	editWeight.value = weight;
	editHomeTown.value = homeTown;
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