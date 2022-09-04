
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
var deleteCustomer = document.getElementById("delete-customer-modal");
deleteCustomer.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from delete button
	var customerId = button.getAttribute('data-delete-id');
	var firstName = button.getAttribute("data-delete-firstname");
	var lastName = button.getAttribute("data-delete-lastname");

	// Get element need embeded input
	var deleteUser = document.getElementById("delete-customer");

	deleteCustomerForm.setAttribute('action', `/admin/customer/${customerId}?_method=DELETE`);
	deleteUser.innerText = `${firstName} ${lastName}`;
});

// Handle delete info Customer
var deleteBtn = document.getElementById("delete-customer-btn");
var deleteCustomerForm = document.forms["delete-customer-form"];
deleteBtn.addEventListener("click", () => {
	deleteCustomerForm.submit();
});

document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () {
    $("#customer_table").DataTable({
      paging: true,
      reponsive: true,
      scrollY: '300px',
      scrollCollapse: true,
    });
  });

  // $(document).ready(function () {
  //   $("#ctv_table").DataTable({
  //     paging: true,
  //     reponsive: true,
  //   });
  // });
});