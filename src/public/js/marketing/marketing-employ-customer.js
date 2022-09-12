//CREATE: submit create customer forms
// Handle create info Customer
var createCustomer = document.getElementById("create-customer-btn");
var createCustomerForm = document.forms["create-customer-form"];
createCustomer.addEventListener("click", () => {
	createCustomerForm.submit();
});

// Handle select image from modal create
var addImg = document.getElementById("input-create-img");
var addAvt = document.getElementById("add-avt-customer");
addImg.addEventListener("change", (e) => {
	addAvt.src = URL.createObjectURL(e.target.files[0]);
});
//END CREATE: submit create customer forms

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
	var firstName = button.getAttribute("data-edit-firstname");
	var lastName = button.getAttribute("data-edit-lastname");
	var birth = button.getAttribute("data-edit-birth");
	var gender = button.getAttribute("data-edit-gender");
	var phone = button.getAttribute("data-edit-phone");
	var email = button.getAttribute("data-edit-email");
	var address = button.getAttribute("data-edit-address");
	var resource = button.getAttribute("data-edit-resource");
	var desciption = button.getAttribute("data-edit-description");

	// Get element need embeded input
	var editAvt = document.getElementById("edit-customer-avt");
	var editFirstName = document.getElementById("edit-firstName");
	var editLastName = document.getElementById("edit-lastName");
	var editBirth = document.getElementById("edit-birth");
	var editGender = document.getElementById("edit-gender");
	var editPhone = document.getElementById("edit-phone");
	var editEmail = document.getElementById("edit-email");
	var editAddress = document.getElementById("edit-address");
	var editResource = document.getElementById("edit-resource");
	var editDescription = document.getElementById("edit-description");

	editFirstName.focus();

	if (imageEdit === '') {
		editAvt.setAttribute('src', '/img/user-icon.png');
	} else {
		editAvt.setAttribute('src', '/img/uploads/customers/' + imageEdit);
	}
	editCustomerForm.setAttribute('action', `/marketing/employ/customers/${idEdit}?_method=PUT`);
	editFirstName.value = firstName;
	editLastName.value = lastName;
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



// //PUSH COMMENT CUSTOMER: detail customer and submit push comment
// var detailCustomerAddComment = document.getElementById("detail-customer-add-comment");
// var detailCustomerComment = document.forms["detail-customer-form"];
// detailCustomerAddComment.addEventListener("click", () => {
// 	detailCustomerComment.submit();
// })
// var detailCustomer = document.getElementById("detail-customer-modal");
// detailCustomer.addEventListener("show.bs.modal", function (event) {
// 	// Button that triggered the modal
// 	var button = event.relatedTarget;
// 	// Get data from edit button
// 	var idDetail = button.getAttribute('data-detail-id');
// 	var imageDetail = button.getAttribute("data-detail-img");
// 	var firstName = button.getAttribute("data-detail-firstname");
// 	var lastName = button.getAttribute("data-detail-lastname");
// 	var birth = button.getAttribute("data-detail-birth");
// 	var gender = button.getAttribute("data-detial-gender");
// 	var phone = button.getAttribute("data-detail-phone");
// 	var email = button.getAttribute("data-detail-phone");
// 	var address = button.getAttribute("data-detail-address");
// 	var desciption = button.getAttribute("data-detail-description");
// 	var comment = button.getAttribute("data-detail-comment");

// 	// Get element need embeded input
// 	var detailAvt = document.getElementById("detail-customer-avt");
// 	var detailName = document.getElementById("detail-customer-name");
// 	var detailBirth = document.getElementById("detail-customer-birth");
// 	var detailGender = document.getElementById("detail-customer-gender");
// 	var detailPhone = document.getElementById("detail-customer-phone");
// 	var detailEmail = document.getElementById("detail-customer-email");
// 	var detailAddress = document.getElementById("detail-customer-address");
// 	var detailDescription = document.getElementById("detail-customer-description");
// 	var detailComment = document.getElementById("detail-customer-comment");

// 	if (imageDetail === '') {
// 		editAvt.setAttribute('src', '/img/user-icon.png');
// 	} else {
// 		detailAvt.setAttribute('src', '/img/uploads/customers/' + imageDetail);
// 	}
// 	detailCustomerComment.setAttribute('action', `/marketing/employ/customers/${idDetail}?_method=PATCH`);
// 	detailName.innerHTML = firstName + " " + lastName;
// 	detailBirth.innerHTML = birth;
// 	detailGender.innerHTML = gender;
// 	detailPhone.innerHTML = phone;
// 	detailEmail.innerHTML = email;
// 	detailAddress.innerHTML = address;
// 	detailDescription.innerHTML = desciption;
// 	detailComment.innerHTML = comment;
// });

// //END PUSH COMMENT CUSTOMER: detail customer and submit push comment




document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#customer_table").DataTable({
			paging: true,
			reponsive: true,
		});
	});
});

// Handle message
// var alertMessage = document.getElementById('alert-message');
