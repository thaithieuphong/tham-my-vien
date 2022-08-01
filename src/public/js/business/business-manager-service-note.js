// DELETE: Submit delete service note forms
var delServiceNoteForm = document.forms['delete-service-note-form'];
var updStoredStatusForm = document.forms['update-stored-status'];
var btnDelServiceNote = document.getElementById('btn-delete-service-note');
btnDelServiceNote.addEventListener("click", () => {
	delServiceNoteForm.submit();
});

var delServiceNote = document.getElementById("del-service-note-modal");
delServiceNote.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;

	var delServiceNoteID = button.getAttribute("data-del-service-note-id");

	delServiceNoteForm.setAttribute("action", `/business/manager/service-note/${delServiceNoteID}?_method=PATCH`)
});
// END DELETE: Submit delete service note forms



