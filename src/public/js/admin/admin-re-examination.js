// Handle push data to delete modal
var deleteReExamination = document.getElementById("delete-re-examination-modal");
deleteReExamination.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from delete button
	var reExaminationId = button.getAttribute('data-delete-id');
	var reExamination = button.getAttribute("data-delete-re-examination");

	// Get element need embeded input
	var deleteReExamination = document.getElementById("delete-re-examination");

	deleteReExaminationForm.setAttribute('action', `/admin/re-examination/${reExaminationId}?_method=DELETE`);
	deleteReExamination.innerText = reExamination;
});

// Handle delete info Customer
var deleteBtn = document.getElementById("delete-re-examination-btn");
var deleteReExaminationForm = document.forms["delete-re-examination-form"];
deleteBtn.addEventListener("click", () => {
	deleteReExaminationForm.submit();
});

document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () {
    $("#re_examination_table").DataTable({
      paging: true,
      reponsive: true,
      scrollY: '300px',
      scrollCollapse: true,
    });
  });
});