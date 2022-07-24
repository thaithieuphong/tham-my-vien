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
	editCustomerForm.setAttribute('action', `/business/manager/customers/${idEdit}?_method=PUT`);
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
		`/business/manager/customers/${dataServiceNoteID}/service-note`
	);
	serviceNoteFirstLastName.value = dataFirstName + " " + dataLastName;
	serviceNoteBirth.value = dataBirth;
	serviceNoteGender.value = dataGender;
	serviceNotePhone.value = dataPhone;
	serviceNoteEmail.value = dataEmail;
	serviceNoteAddress.value = dataAddress;
});
//END CREATE: submit create service note forms

//ADD USER to CUSTOMER
//Hidden and remove hidden attribute
var rmHiddenBtn = document.getElementById("remove-hidden");
var addhidden = document.getElementById("add-hidden");
var hiddenRemove = document.querySelectorAll(".hidden");

rmHiddenBtn.addEventListener("click", () => {
	for (i = 0; i < hiddenRemove.length; i++) {
		hiddenRemove[i].removeAttribute('hidden');
	};
});

addhidden.addEventListener("click", () => {
	for (i = 0; i < hiddenRemove.length; i++) {
		hiddenRemove[i].setAttribute('hidden', 'true');
	}
})

//Check all customer
var customerItemCheckbox = document.querySelectorAll('.check-box-customer');
var checkCusAll = document.getElementById("check-customer-all");
//check all click
checkCusAll.addEventListener("change", () => {
	var isCheckedAll = $(checkCusAll).prop('checked');
	$(customerItemCheckbox).prop('checked', isCheckedAll);
	renderCheckallBtn();
});
//check items click
for (i = 0; i < document.querySelectorAll('.check-box-customer').length; i++) {
	customerItemCheckbox[i].addEventListener("change", () => {
		var isCheckedAll = document.querySelectorAll('.check-box-customer').length === document.querySelectorAll('.check-box-customer:checked').length
		$(checkCusAll).prop('checked', isCheckedAll);
		renderCheckallBtn();
	});
}
//Render button check all submit
var checkAllSubmitBtn = document.getElementById("add-user-customer-btn");
function renderCheckallBtn(){
	var checkCount = document.querySelectorAll('.check-box-customer:checked').length;
	if(checkCount){
		checkAllSubmitBtn.classList.remove("disabled");
	}else{
		checkAllSubmitBtn.classList.add("disabled")
	};
}
//Check all submit button click
var addUserCusForm = document.forms['add-user-customer-form'];
checkAllSubmitBtn.addEventListener("click", function(e)  {
	e.preventDefault();
	var isSubmittable = !checkAllSubmitBtn.classList.constains("disabled")
	if(isSubmittable){

	}
})



//END ADD USER to CUSTOMER

//DETAIL: detail customer and push comment

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
