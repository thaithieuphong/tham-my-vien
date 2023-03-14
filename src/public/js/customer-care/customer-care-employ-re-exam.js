document.addEventListener('DOMContentLoaded', function () {

	$(document).ready(function () {
		$("#table-re-exam").bootstrapTable({
			pagination: true,
			search: true,
			// scrollY: 300,
		});
		
	});

});

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
		let customerID = button.getAttribute("data-cusId");
		let serviceNoteID = button.getAttribute("data-service-note-id");
		let reExamScheduleID = button.getAttribute("data-re-exam-schedule-id");
		let fullName = button.getAttribute("data-fullName");
		submitReExaminationForm.setAttribute('action', `/customer-care/employ/re-exam/${id}/done?_method=PATCH`);

		let submitCustomerID = document.getElementById('submit-re-exam-done-cusID');
		let submitServiceNoteID = document.getElementById('submit-re-exam-done-serviceNoteID');
		let submitReExamScheduleID = document.getElementById('submit-re-exam-done-reExaminationScheduleID');
		let submitFullName = document.getElementById('submit-re-exam-fullname');
		submitCustomerID.value = customerID;
		submitServiceNoteID.value = serviceNoteID;
		submitReExamScheduleID.value = reExamScheduleID;
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
		let dataReExamID = button.getAttribute("data-re-exam-id");
		let dataCusID = button.getAttribute("data-re-exam-customer-id");
		let dataFullName = button.getAttribute("data-re-exam-customer-fullname");
		let dataServiceNoteID = button.getAttribute("data-re-exam-serviceNoteID");
		let dataReExamScheduleID = button.getAttribute("data-re-exam-reExamScheduleID");
		deleteReExaminationForm.setAttribute('action', `/customer-care/employ/re-exam/${dataReExamID}/delete?_method=DELETE`);

		let inputDeleteCusID = document.getElementById('delete-re-exam-cusID');
		let inputDeleteFullName = document.getElementById('delete-re-exam-fullName');
		let inputDeleteServiceNoteID = document.getElementById('delete-re-exam-serviceNoteID');
		let inputdeleteReExamScheduleID = document.getElementById('delete-re-exam-reExamScheduleID');
		let deleteFullName = document.getElementById('delete-re-exam-fullname');
		deleteFullName.innerHTML = dataFullName;
		inputDeleteCusID.value = dataCusID;
		inputDeleteServiceNoteID.value = dataServiceNoteID;
		inputdeleteReExamScheduleID.value = dataReExamScheduleID;
		inputDeleteFullName.value = dataFullName;
	})
}