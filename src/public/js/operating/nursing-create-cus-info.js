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


// var restoreSchedule = document.getElementById("restore-schedule-modal");
// if (restoreSchedule) {
// 	restoreSchedule.addEventListener("show.bs.modal", function (event) {
// 		// Button that triggered the modal
// 		var button = event.relatedTarget;
// 		// Get data from delete button
// 		var scheduleId = button.getAttribute('data-restore-id');
// 		var nickName = button.getAttribute("data-restore-nickname");
// 		var cusID = button.getAttribute("data-restore-cusID");
	
// 		// Get element need embeded input
// 		var restoreCusNickName = document.getElementById("restore-schedule");
// 		var restoreCusID = document.getElementById("restore-input-cusID");
// 		restoreScheduleForm.setAttribute('action', `/operating-room/nursing/schedule/${scheduleId}/restore?_method=PATCH`);
// 		restoreCusNickName.innerText = `${nickName}`;
//         restoreCusID.value = cusID;
// 	});
	
// 	// Handle delete info Customer
// 	var restoreScheduleBtn = document.getElementById("restore-schedule-btn");
// 	var restoreScheduleForm = document.forms["restore-schedule-form"];
// 	restoreScheduleBtn.addEventListener("click", () => {
// 		restoreScheduleForm.submit();
// 	});
// }