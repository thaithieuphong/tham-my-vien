//PATCH: load form and submit push performer forms
var pushPerformerBtn = document.getElementById("add-performer-btn");
var performerForm = document.forms['add-performer-form'];
pushPerformerBtn.addEventListener("click", () => {
	performerForm.submit();
})


var performerModal = document.getElementById("add-performer-modal");
performerModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from edit button
	var id = button.getAttribute("data-id");
	var customerID = button.getAttribute("data-customerID");
	var name = button.getAttribute("data-name");
	var birth = button.getAttribute("data-birth");
	var gender = button.getAttribute("data-gender");
	var email = button.getAttribute("data-email");
	var phone = button.getAttribute("data-phone");
	var address = button.getAttribute("data-address");
	var createName = button.getAttribute("data-createName");
	var service = button.getAttribute("data-service");
	var schedule = button.getAttribute("data-schedule");
	var comment = button.getAttribute("data-comment");

	// Get element need embeded input
	// var modalCustomerID = document.getElementById("customerID");
	var modalName = document.getElementById("add-performer-firstLastName");
	var modalBirth = document.getElementById("add-performer-birth");
	var modalGender = document.getElementById("add-performer-gender");
	var modalEmail = document.getElementById("add-performer-email");
	var modalPhone = document.getElementById("add-performer-phone");
	var modalAddress = document.getElementById("add-performer-address");
	var modalCreateName = document.getElementById("add-performer-createName");
	var modalService = document.getElementById("add-performer-service");
	var modalSchedule = document.getElementById("add-performer-schedule");
	var modalComment = document.getElementById("add-performer-comment");

	performerForm.setAttribute('action', `/reception/employ/service-note/${id}?_method=PATCH`);

	console.log(id)
	modalName.innerHTML = name;
	modalBirth.innerHTML = birth;
	modalGender.innerHTML = gender;
	modalEmail.innerHTML = email;
	modalPhone.innerHTML = phone;
	modalAddress.innerHTML = address;
	modalCreateName.innerHTML = createName;
	modalService.innerHTML = service;
	modalSchedule.value = schedule;
	modalComment.innerHTML = comment;

})

//END PATCH: load form and submit push performer forms

//PATCH: load form and submit push performer rexamination forms
var reExamBtn = document.getElementById("add-performer-re-exam-btn");
var reExamForm = document.forms['add-performer-re-exam-form'];
// var userStateForm = document.forms['user-state-form'];
reExamBtn.addEventListener("click", () => {
	reExamForm.submit();
})
var reExamModal = document.getElementById("add-performer-re-exam-modal");
reExamModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from edit button
	var id = button.getAttribute("data-re-exam-id");
	var customerID = button.getAttribute("data-re-exam-customerID");
	var name = button.getAttribute("data-re-exam-name");
	var birth = button.getAttribute("data-re-exam-birth");
	var gender = button.getAttribute("data-re-exam-gender");
	var email = button.getAttribute("data-re-exam-email");
	var phone = button.getAttribute("data-re-exam-phone");
	var address = button.getAttribute("data-re-exam-address");
	var createName = button.getAttribute("data-re-exam-createName");
	var service = button.getAttribute("data-re-exam-service");
	var schedule = button.getAttribute("data-re-exam-schedule");
	var comment = button.getAttribute("data-re-exam-comment");

	// Get element need embeded input
	// var modalCustomerID = document.getElementById("customerID");
	var modalName = document.getElementById("add-performer-re-exam-firstLastName");
	var modalBirth = document.getElementById("add-performer-re-exam-birth");
	var modalGender = document.getElementById("add-performer-re-exam-gender");
	var modalEmail = document.getElementById("add-performer-re-exam-email");
	var modalPhone = document.getElementById("add-performer-re-exam-phone");
	var modalAddress = document.getElementById("add-performer-re-exam-address");
	var modalCreateName = document.getElementById("add-performer-re-exam-createName");
	var modalService = document.getElementById("add-performer-re-exam-service");
	var modalSchedule = document.getElementById("add-performer-re-exam-schedule");
	var modalComment = document.getElementById("add-performer-re-exam-comment");

	reExamForm.setAttribute('action', `/reception/employ/reexam/${id}?_method=PATCH`);

	modalName.innerHTML = name;
	modalBirth.innerHTML = birth;
	modalGender.innerHTML = gender;
	modalEmail.innerHTML = email;
	modalPhone.innerHTML = phone;
	modalAddress.innerHTML = address;
	modalCreateName.innerHTML = createName;
	modalService.innerHTML = service;
	modalSchedule.value = schedule;
	modalComment.innerHTML = comment;

})

//PATCH: load form and submit push performer rexamination forms


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
