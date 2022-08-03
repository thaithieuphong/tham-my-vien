//CREATE: submit create customer forms
// Handle create info Customer
var createCustomer = document.getElementById("create-customer-btn");
var createCustomerModal = document.getElementById("create-customer-modal");
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
	var editDescription = document.getElementById("edit-description");

	editFirstName.focus();

	if (imageEdit === '') {
		editAvt.setAttribute('src', '/img/user-icon.png');
	} else {
		editAvt.setAttribute('src', '/img/uploads/customers/' + imageEdit);
	}
	editCustomerForm.setAttribute('action', `/business/employ/customers/${idEdit}?_method=PUT`);
	editFirstName.value = firstName;
	editLastName.value = lastName;
	editBirth.value = birth;
	editGender.value = gender;
	editPhone.value = phone;
	editEmail.value = email;
	editAddress.value = address;
	editDescription.value = desciption;
});

// Handle edit info Customer
var editBtn = document.getElementById("edit-customer-btn");
var editCustomerForm = document.forms["edit-customer-form"];
editBtn.addEventListener("click", () => {
	editCustomerForm.submit();
});
//EDIT END: Load edit customer modal and submit edit customer forms


//CREATE: submit create service note forms
var createServiceNote = document.getElementById("create-service-note-btn");
createServiceNote.addEventListener("click", () => {
	createServiceNoteForm.submit();
  });
// Handle create service-note
var createServiceNoteForm = document.forms["create-service-note-form"]
var createServiceNote = document.getElementById("create-service-note-modal");
createServiceNote.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from detail button
	// Handle edit info Customer
	var dataServiceNoteID = button.getAttribute("data-service-note-id");
	var dataServiceNoteImg = button.getAttribute("data-service-note-img");
	var dataFirstName = button.getAttribute("data-service-note-firstname");
	var dataLastName = button.getAttribute("data-service-note-lastname");
	var dataBirth = button.getAttribute("data-service-note-birth");
	var dataGender = button.getAttribute("data-service-note-gender");
	var dataPhone = button.getAttribute("data-service-note-phone");
	var dataEmail = button.getAttribute("data-service-note-email");
	var dataAddress = button.getAttribute("data-service-note-address");
	var dataDescription = button.getAttribute("data-service-note-description");

	// // Get element need embeded input
	var serviceNoteCustomerID = document.getElementById('create-service-note-customerID');
	var serviceNoteCustomerImg = document.getElementById('create-service-note-img');
	var serviceNoteFirstLastName = document.getElementById(
		"create-service-note-firstLastName"
	);
	var serviceNoteBirth = document.getElementById("create-service-note-birth");
	var serviceNoteGender = document.getElementById("create-service-note-gender");
	var serviceNotePhone = document.getElementById("create-service-note-phone");
	var serviceNoteEmail = document.getElementById("create-service-note-email");
	var serviceNoteAddress = document.getElementById(
		"create-service-note-address"
	);
	var serviceNoteDescription = document.getElementById("create-service-note-description");

	createServiceNoteForm.setAttribute(
		"action",
		`/business/employ/customers/${dataServiceNoteID}/service-note`
	);
	if (dataServiceNoteImg === '') {
		serviceNoteCustomerImg.setAttribute('src', '/img/user-icon.png');
	} else {
		serviceNoteCustomerImg.setAttribute('src', '/img/uploads/customers/' + dataServiceNoteImg);
	}

	serviceNoteCustomerID.value = dataServiceNoteID;
	serviceNoteFirstLastName.innerHTML = dataFirstName + " " + dataLastName;
	serviceNoteBirth.innerHTML = dataBirth;
	serviceNoteGender.innerHTML = dataGender;
	serviceNotePhone.innerHTML = dataPhone;
	serviceNoteEmail.innerHTML = dataEmail;
	serviceNoteAddress.innerHTML = dataAddress;
	serviceNoteDescription.innerHTML = dataDescription;
});



//CREATE: submit create service note forms


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
