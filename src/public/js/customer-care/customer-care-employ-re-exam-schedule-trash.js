document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#table-re-exam-schedule-trash").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
	});
});

var restoreReExamScheduleBtn = document.getElementById('restoreReExamScheduleBtn');
var restoreReExamScheduleForm = document.getElementById('restoreReExamScheduleForm')
if (restoreReExamScheduleBtn) {
	restoreReExamScheduleBtn.addEventListener('click', () => {
		restoreReExamScheduleForm.submit();
	});
}

// // Xử lý modal xóa lịch hẹn tư vấn
var restoreReExamScheduleModal = document.getElementById("restoreReExamScheduleModal");
restoreReExamScheduleModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;

    var dataReExamScheduleID = button.getAttribute("data-re-exam-schedule-id");
    var dataReExamScheduleCustomerID = button.getAttribute("data-re-exam-schedule-customer-id");
    var dataReExamScheduleServiceNoteID = button.getAttribute("data-re-exam-schedule-serviceNoteID");
    var dataReExamScheduleCustomerFullName = button.getAttribute("data-re-exam-schedule-customer-fullName");

    var inputReExamScheduleCustomerID = document.getElementById("restore-re-exam-schedule-customer-id");
    var inputReExamScheduleServiceNoteID = document.getElementById("restore-re-exam-schedule-serviceNoteID");
    var inputReExamScheduleCustomerFullName = document.getElementById("restore-re-exam-schedule-customer-fullName");
    var reExamScheduleCustomerFullName = document.getElementById("restore-re-exam-customer-fullname");

	inputReExamScheduleCustomerID.value = dataReExamScheduleCustomerID;
	inputReExamScheduleServiceNoteID.value = dataReExamScheduleServiceNoteID;
	inputReExamScheduleCustomerFullName.value = dataReExamScheduleCustomerFullName;
	reExamScheduleCustomerFullName.innerHTML = dataReExamScheduleCustomerFullName;
	restoreReExamScheduleForm.setAttribute("action", `/customer-care/employ/re-exam-schedule/${dataReExamScheduleID}/restore?_method=PATCH`);
});