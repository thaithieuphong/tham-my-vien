window.addEventListener('load',function(){
	// Handle push data to delete modal
	var deleteSchedule = document.getElementById("delete-schedule-modal");
	if (deleteSchedule) {
		deleteSchedule.addEventListener("show.bs.modal", function (event) {
			// Button that triggered the modal
			var button = event.relatedTarget;
			// Get data from delete button
			var serviceNoteId = button.getAttribute('data-delete-id');
			var firstName = button.getAttribute("data-delete-firstname");
			var lastName = button.getAttribute("data-delete-lastname");
			var cusID = button.getAttribute("data-delete-customerID");
			// Get element need embeded input
			var deleteSchedule = document.getElementById("delete-schedule");
			var deleteCusID = document.getElementById("delete-cusID");
			deleteScheduleForm.setAttribute('action', `/operating-room/nursing/schedule/${serviceNoteId}/delete?_method=DELETE`);
			deleteCusID.value = cusID;
			deleteSchedule.innerHTML = firstName + ' ' + lastName;
		});
	}

	// Handle delete info Customer
	var deleteBtn = document.getElementById("delete-schedule-btn");
	var deleteScheduleForm = document.forms["delete-schedule-form"];
	if (deleteBtn) {
		deleteBtn.addEventListener("click", () => {
			deleteScheduleForm.submit();
		});
	}

	// Handle create service note
	var createCusInfoBtn = document.getElementById("create-customer-information-btn");
	var createCusInfoForm = document.forms["create-customer-information-form"];
	if (createCusInfoBtn) {
		createCusInfoBtn.addEventListener("click", (e) => {
			createCusInfoForm.submit();
		});
	}
})