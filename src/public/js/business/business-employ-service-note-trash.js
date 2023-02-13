document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#table-service-note-trash").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
	});
});

var restoreServiceNoteBtn = document.getElementById('restoreServiceNoteBtn');
var restoreServiceNoteForm = document.getElementById('restoreServiceNoteForm')
if (restoreServiceNoteBtn) {
	restoreServiceNoteBtn.addEventListener('click', () => {
		restoreServiceNoteForm.submit();
	});
}

// // Xử lý modal xóa lịch hẹn tư vấn
var restoreServiceNoteModal = document.getElementById("restoreServiceNoteModal");
restoreServiceNoteModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;

    var dataServiceNoteID = button.getAttribute("data-service-note-id");
    var dataScheduleID = button.getAttribute("data-schedule-id");
    var dataCustomerID = button.getAttribute("data-customer-id");
    var dataCustomerFullName = button.getAttribute("data-customer-fullName");
    var dataCustomerNickName = button.getAttribute("data-customer-nickName");

    var inputScheduleID = document.getElementById("restore-schedule-id");
    var inputCustomerID = document.getElementById("restore-customer-id");
    var customerName = document.getElementById("restore-customer-name");

    inputScheduleID.value = dataScheduleID;
	inputCustomerID.value = dataCustomerID;
	customerName.innerHTML = `${dataCustomerFullName} - ${dataCustomerNickName}`;
	restoreServiceNoteForm.setAttribute("action", `/business/employ/service-note/${dataServiceNoteID}/restore?_method=PATCH`);
});