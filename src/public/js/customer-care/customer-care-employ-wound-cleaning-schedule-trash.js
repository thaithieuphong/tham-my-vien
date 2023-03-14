document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#table-wound-cleaning-schedule-trash").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
	});
});

var restoreWoundCleaningScheduleBtn = document.getElementById('restoreWoundCleaningScheduleBtn');
var restoreWoundCleaningScheduleForm = document.getElementById('restoreWoundCleaningScheduleForm')
if (restoreWoundCleaningScheduleBtn) {
	restoreWoundCleaningScheduleBtn.addEventListener('click', () => {
		restoreWoundCleaningScheduleForm.submit();
	});
}

// // Xử lý modal xóa lịch hẹn tư vấn
var restoreWoundCleaningScheduleModal = document.getElementById("restoreWoundCleaningScheduleModal");
restoreWoundCleaningScheduleModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;

    var dataWoundCleaningScheduleID = button.getAttribute("data-wound-cleaning-schedule-id");
    var dataWoundCleaningScheduleCustomerID = button.getAttribute("data-wound-cleaning-schedule-customer-id");
    var dataWoundCleaningScheduleServiceNoteID = button.getAttribute("data-wound-cleaning-schedule-serviceNoteID");
    var dataWoundCleaningScheduleCustomerFullName = button.getAttribute("data-wound-cleaning-schedule-customer-fullName");

    var inputWoundCleaningScheduleCustomerID = document.getElementById("restore-wound-cleaning-schedule-customer-id");
    var inputWoundCleaningScheduleServiceNoteID = document.getElementById("restore-wound-cleaning-schedule-serviceNoteID");
    var inputWoundCleaningScheduleCustomerFullName = document.getElementById("restore-wound-cleaning-schedule-customer-fullName");
    var woundCleaningScheduleCustomerFullName = document.getElementById("restore-wound-cleaning-customer-fullname");

	inputWoundCleaningScheduleCustomerID.value = dataWoundCleaningScheduleCustomerID;
	inputWoundCleaningScheduleServiceNoteID.value = dataWoundCleaningScheduleServiceNoteID;
	inputWoundCleaningScheduleCustomerFullName.value = dataWoundCleaningScheduleCustomerFullName;
	woundCleaningScheduleCustomerFullName.innerHTML = dataWoundCleaningScheduleCustomerFullName;
	restoreWoundCleaningScheduleForm.setAttribute("action", `/customer-care/employ/wound-cleaning-schedule/${dataWoundCleaningScheduleID}/restore?_method=PATCH`);
});