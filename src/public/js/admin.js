

// var iCFName = document.forms["create-customer-form"]["customer-firstName"];
// var iCLName = document.forms["create-customer-form"]["customer-lastName"];
// var iCBirth = document.forms["create-customer-form"]["customer-birth"];
// var iCGender = document.forms["create-customer-form"]["customer-gender"];
// var iCPhone = document.forms["create-customer-form"]["customer-phone"];
// // Handle create info Customer
// var create = document.getElementById("create");
// var cCForm = document.forms["create-customer-form"];
// var fbFName = document.getElementById("feedback-firstname");
// var fbLName = document.getElementById("feedback-lastname");
// var fbBirth = document.getElementById("feedback-birth");
// var fbGender = document.getElementById("feedback-gender");
// var fbPhone = document.getElementById("feedback-phone");

// create.addEventListener("click", () => {
//   // if (iCFName.value == "" || iCFName.value == null) {
//   //   fbFName.setAttribute('class', 'alert alert-danger mt-1');
// 	// 	fbFName.innerHTML = 'Khong duoc de trong truong nay'
// 	// } else if (iCLName.value == "" || iCLName.value == null) {
// 	// 	fbLName.setAttribute('class', 'alert alert-danger mt-1');
// 	// 	fbLName.innerHTML = 'Khong duoc de trong truong nay'
// 	// } else if (iCBirth.value == "" || iCBirth.value == null) {
// 	// 	fbBirth.setAttribute('class', 'alert alert-danger mt-1');
// 	// 	fbBirth.innerHTML = 'Khong duoc de trong truong nay'
// 	// } else if (iCGender.value == "" || iCGender.value == null) {
// 	// 	fbGender.setAttribute('class', 'alert alert-danger mt-1');
// 	// 	fbGender.innerHTML = 'Khong duoc de trong truong nay'
// 	// } else if (iCPhone.value == "" || iCPhone.value == null) {
// 	// 	fbPhone.setAttribute('class', 'alert alert-danger mt-1');
// 	// 	fbPhone.innerHTML = 'Khong duoc de trong truong nay'
// 	// } else {
//   //  	cCForm.submit();
// 	// }
//   cCForm.submit();
// });


// var inpCFName = document.getElementById('customer-firstName');
// inpCFName.addEventListener('input', () => {
// 	if (iCFName == "" || iCFName == null) {
// 		fbFName.removeAttribute('class', 'alert alert-danger mt-1');
// 		fbFName.innerHTML = '';
// 	}
// 	// fbFName.removeAttribute('class', 'alert alert-danger mt-1');
// })

// Handle edit info Customer


// Handle create service note
var createServiceNote = document.getElementById("create-service-note-btn");
var createServiceNoteForm = document.forms["create-service-note-form"];
createServiceNote.addEventListener("click", () => {
  createServiceNoteForm.submit();
});

// Handle select image from modal create
var addImg = document.getElementById("create-img");
var addAvt = document.getElementById("add-avt-customer");
addImg.addEventListener("change", (e) => {
  addAvt.src = URL.createObjectURL(e.target.files[0]);
});

// Handle select image from modal edit
var editImg = document.getElementById("edit-img");
var editAvt = document.getElementById("edit-avt");
editImg.addEventListener("change", (e) => {
  editAvt.src = URL.createObjectURL(e.target.files[0]);
});

// EDIT
// Handle select image from modal edit
var editImg = document.getElementById("edit-img");
var editAvt = document.getElementById("edit-avt");
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
	var editAvt = document.getElementById("edit-avt");
	var editFirstName = document.getElementById("edit-firstName");
	var editLastName = document.getElementById("edit-lastName");
	var editBirth = document.getElementById("edit-birth");
	var editGender = document.getElementById("edit-gender");
	var editPhone = document.getElementById("edit-phone");
	var editEmail = document.getElementById("edit-email");
	var editAddress = document.getElementById("edit-address");
	var editDescription = document.getElementById("edit-description");

	editFirstName.focus();

  console.log(imageEdit)
	if (imageEdit === '') {
		editAvt.setAttribute('src', '/img/user-icon.png');
	} else {
		editAvt.setAttribute('src', '/img/uploads/customers/' + imageEdit);
	}
	editCustomerForm.setAttribute('action', `/admin/customer/${idEdit}?_method=PUT`);
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
var editBtn = document.getElementById("edit");
var editCustomerForm = document.forms["edit-customer-form"];
editBtn.addEventListener("click", () => {
	editCustomerForm.submit();
});

// Handle create service-note
var createServiceNote = document.getElementById("create-service-note");
createServiceNote.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget;
  // Get data from detail button
  // Handle edit info Customer
  var dataServiceNoteID = button.getAttribute("data-service-note-id");
  var dataFirstName = button.getAttribute("data-service-note-firstname");
  var dataLastName = button.getAttribute("data-service-note-lastname");
  var dataBirth = button.getAttribute("data-service-note-birth");
  var dataGender = button.getAttribute("data-service-note-gender");
  var dataPhone = button.getAttribute("data-service-note-phone");
  var dataEmail = button.getAttribute("data-service-note-email");
  var dataAddress = button.getAttribute("data-service-note-address");

  // // Get element need embeded input
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

  createServiceNoteForm.setAttribute(
    "action",
    `/admin/customers/${dataServiceNoteID}/service-note`
  );
  serviceNoteFirstLastName.value = dataFirstName + " " + dataLastName;
  serviceNoteBirth.value = dataBirth;
  serviceNoteGender.value = dataGender;
  serviceNotePhone.value = dataPhone;
  serviceNoteEmail.value = dataEmail;
  serviceNoteAddress.value = dataAddress;
});

document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () {
    $("#customer_table").DataTable({
      paging: true,
      reponsive: true,
    });
  });

  $(document).ready(function () {
    $("#ctv_table").DataTable({
      paging: true,
      reponsive: true,
    });
  });
});

// Handle message
// var alertMessage = document.getElementById('alert-message');
