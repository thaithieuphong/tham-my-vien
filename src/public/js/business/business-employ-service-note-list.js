document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#table-service-note-list").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
	});
});

// Delete service note
var deleteServiceNoteForm = document.forms['deleteServiceNoteForm'];
var deleteServiceNoteBtn = document.getElementById("deleteServiceNoteBtn");
deleteServiceNoteBtn.addEventListener("click", () =>{
    deleteServiceNoteForm.submit();
})

var deleteServiceNoteModal = document.getElementById("deleteServiceNoteModal");
deleteServiceNoteModal.addEventListener("show.bs.modal", function (event) {

    var button = event.relatedTarget;

    var dataCustomerID = button.getAttribute("data-customer-id");
    var dataServiceNoteID = button.getAttribute("data-service-note-id");
    var dataScheduleID = button.getAttribute("data-schedule-id");
    var dataCustomerFullName = button.getAttribute("data-customer-fullName");
    var dataCustomerNickName = button.getAttribute("data-customer-nickName");

    var scheduleID = document.getElementById("scheduleID");
    var customerID = document.getElementById("customerID");
    var serviceNoteCustomerNickName = document.getElementById("service-note-customer");
    
    deleteServiceNoteForm.setAttribute("action",`/business/employ/service-note/${dataServiceNoteID}/delete?_method=DELETE`)

    scheduleID.value = dataScheduleID;
    customerID.value = dataCustomerID;
    serviceNoteCustomerNickName.innerHTML = `${dataCustomerFullName} - ${dataCustomerNickName}`;
})

// END Delete Service Note

var taskArr = document.querySelectorAll('.task');
taskArr.forEach(task => {
    console.log(task.getAttribute('data-isVisible'));
    taskData = task.getAttribute('data-isVisible');
    if (taskData) {
        task.classList.replace('bg-danger', 'bg-success');
    }
})