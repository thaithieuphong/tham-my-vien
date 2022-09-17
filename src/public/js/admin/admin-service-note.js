
// // Handle select image from modal delete
// var deleteImg = document.getElementById("delete-img");
// var deleteAvt = document.getElementById("delete-avt");
// deleteImg.addEventListener("change", (e) => {
//   deleteAvt.src = URL.createObjectURL(e.target.files[0]);
// });

// // delete
// // Handle select image from modal delete
// var deleteImg = document.getElementById("delete-img");
// var deleteAvt = document.getElementById("delete-avt");
// deleteImg.addEventListener("change", (e) => {
// 	deleteAvt.src = URL.createObjectURL(e.target.files[0]);
// });

// Handle push data to delete modal
var deleteServiceNote = document.getElementById("delete-service-note-modal");
deleteServiceNote.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from delete button
	var serviceNoteId = button.getAttribute('data-delete-id');
	var service = button.getAttribute("data-delete-service");

	// Get element need embeded input
	var deleteServiceNote = document.getElementById("delete-service-note");

	deleteServiceNoteForm.setAttribute('action', `/admin/service-note/${serviceNoteId}?_method=DELETE`);
	deleteServiceNote.innerText = service;
});

// Handle delete info Customer
var deleteBtn = document.getElementById("delete-service-note-btn");
var deleteServiceNoteForm = document.forms["delete-service-note-form"];
deleteBtn.addEventListener("click", () => {
	deleteServiceNoteForm.submit();
});

document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () {
    $("#service_note_table").DataTable({
      paging: true,
      reponsive: true,
      scrollY: '300px',
      scrollCollapse: true,
    });
  });
});

var setColors = document.getElementsByClassName('status-color');
for(i=0; i < setColors.length; i++) {
	let value = setColors[i].innerHTML;
	console.log(value);
	if(value === 'Tạo mới') {
		console.log(setColors[i])
		setColors[i].classList.add('bg-danger', 'text-white');
	}
	if(value === 'Đang xử lý') {
		console.log(setColors[i])
		setColors[i].classList.add('bg-warning', 'text-white');
	}
	if(value === 'Hoàn thành') {
		console.log(setColors[i])
		setColors[i].classList.add('bg-success', 'text-white');
	}
}