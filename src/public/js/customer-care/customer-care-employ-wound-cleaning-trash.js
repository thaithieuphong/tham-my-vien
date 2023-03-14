document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#table-wound-cleaning-trash").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
	});
});

var restoreWoundCleaningBtn = document.getElementById('restoreWoundCleaningBtn');
var restoreWoundCleaningForm = document.getElementById('restoreWoundCleaningForm')
if (restoreWoundCleaningBtn) {
	restoreWoundCleaningBtn.addEventListener('click', () => {
		restoreWoundCleaningForm.submit();
	});
}

// // Xử lý modal khôi phục phiếu thay băng
var restoreWoundCleaningModal = document.getElementById("restoreWoundCleaningModal");
restoreWoundCleaningModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;

    var dataWoundCleaningID = button.getAttribute("data-wound-cleaning-id");
    var dataWoundCleaningCustomerID = button.getAttribute("data-wound-cleaning-customer-id");
    var dataWoundCleaningServiceNoteID = button.getAttribute("data-wound-cleaning-serviceNoteID");
    var dataWoundCleaningScheduleID = button.getAttribute("data-wound-cleaning-woundCleaningScheduleID");
    var dataWoundCleaningCustomerFullName = button.getAttribute("data-wound-cleaning-customer-fullName");

    var inputWoundCleaningCustomerID = document.getElementById("restore-wound-cleaning-customer-id");
    var inputWoundCleaningServiceNoteID = document.getElementById("restore-wound-cleaning-serviceNoteID");
    var inputWoundCleaningCustomerFullName = document.getElementById("restore-wound-cleaning-customer-fullName");
    var inputWoundCleaningScheduleID = document.getElementById("restore-wound-cleaning-woundCleaningScheduleID");
    var woundCleaningCustomerFullName = document.getElementById("restore-wound-cleaning-customer-fullname");

	inputWoundCleaningCustomerID.value = dataWoundCleaningCustomerID;
	inputWoundCleaningServiceNoteID.value = dataWoundCleaningServiceNoteID;
	inputWoundCleaningScheduleID.value = dataWoundCleaningScheduleID;
	inputWoundCleaningCustomerFullName.value = dataWoundCleaningCustomerFullName;
	woundCleaningCustomerFullName.innerHTML = dataWoundCleaningCustomerFullName;
	restoreWoundCleaningForm.setAttribute("action", `/customer-care/employ/wound-cleaning/${dataWoundCleaningID}/restore?_method=PATCH`);
});