var restoreServiceNote = document.getElementById("restore-service-note-modal");
restoreServiceNote.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from delete button
	var serviceNoteId = button.getAttribute('data-restore-id');
	var firstName = button.getAttribute("data-restore-firstname");
	var lastName = button.getAttribute("data-restore-lastname");

	// Get element need embeded input
	var restoreUser = document.getElementById("restore-service-note");

	restoreServiceNoteForm.setAttribute('action', `/operating-room/nursing/service-note/${serviceNoteId}/restore?_method=PATCH`);
	restoreUser.innerText = `${firstName} ${lastName}`;
});

// Handle delete info Customer
var restoreServiceNoteBtn = document.getElementById("restore-service-note-btn");
var restoreServiceNoteForm = document.forms["restore-service-note-form"];
restoreServiceNoteBtn.addEventListener("click", () => {
	restoreServiceNoteForm.submit();
});