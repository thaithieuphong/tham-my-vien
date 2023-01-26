document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#table-schedule-trash").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
	});
});

var restoreScheduleBtn = document.getElementById('restoreScheduleBtn');
var restoreScheduleForm = document.getElementById('restoreScheduleForm')
if (restoreScheduleBtn) {
	restoreScheduleBtn.addEventListener('click', () => {
		restoreScheduleForm.submit();
	})
}

// // Xử lý modal xóa lịch hẹn tư vấn
var restoreScheduleModal = document.getElementById("restoreScheduleModal");
restoreScheduleModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;

    var dataScheduleID = button.getAttribute("data-schedule-id");
    var dataCustomer = button.getAttribute("data-customer");
    var dataCustomerID = button.getAttribute("data-customer-id");
    var inputScheduleCustomerName = document.getElementById("restore-schedule-customer");
    var inputScheduleCustomerID = document.getElementById("restore-schedule-customer-id");
	console.log(dataCustomer)
    inputScheduleCustomerName.innerHTML = dataCustomer;
	inputScheduleCustomerID.value = dataCustomerID;
	restoreScheduleForm.setAttribute("action", `/business/employ/schedule/${dataScheduleID}/restore?_method=PATCH`);
});