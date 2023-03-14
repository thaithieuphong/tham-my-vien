document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#table-re-exam-trash").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
	});
});

var restoreReExamBtn = document.getElementById('restoreReExamBtn');
var restoreReExamForm = document.getElementById('restoreReExamForm')
if (restoreReExamBtn) {
	restoreReExamBtn.addEventListener('click', () => {
		restoreReExamForm.submit();
	});
}

// // Xử lý modal khôi phục phiếu thay băng
var restoreReExamModal = document.getElementById("restoreReExamModal");
restoreReExamModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;

    var dataReExamID = button.getAttribute("data-re-exam-id");
    var dataReExamCustomerID = button.getAttribute("data-re-exam-customer-id");
    var dataReExamServiceNoteID = button.getAttribute("data-re-exam-serviceNoteID");
    var dataReExamScheduleID = button.getAttribute("data-re-exam-reExamScheduleID");
    var dataReExamCustomerFullName = button.getAttribute("data-re-exam-customer-fullName");

    var inputReExamCustomerID = document.getElementById("restore-re-exam-customer-id");
    var inputReExamServiceNoteID = document.getElementById("restore-re-exam-serviceNoteID");
    var inputReExamCustomerFullName = document.getElementById("restore-re-exam-customer-fullName");
    var inputReExamScheduleID = document.getElementById("restore-re-exam-reExamScheduleID");
    var reExamCustomerFullName = document.getElementById("restore-re-exam-customer-fullname");

	inputReExamCustomerID.value = dataReExamCustomerID;
	inputReExamServiceNoteID.value = dataReExamServiceNoteID;
	inputReExamScheduleID.value = dataReExamScheduleID;
	inputReExamCustomerFullName.value = dataReExamCustomerFullName;
	reExamCustomerFullName.innerHTML = dataReExamCustomerFullName;
	restoreReExamForm.setAttribute("action", `/customer-care/employ/re-exam/${dataReExamID}/restore?_method=PATCH`);
});