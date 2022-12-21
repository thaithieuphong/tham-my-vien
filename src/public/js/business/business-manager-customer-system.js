//Check all customer
var customerItemCheckbox = document.querySelectorAll('.check-box-customer');
var checkCusAll = document.getElementById("check-customer-all");
//check all click
checkCusAll.addEventListener("change", () => {
	var isCheckedAll = $(checkCusAll).prop('checked');
	$(customerItemCheckbox).prop('checked', isCheckedAll);
	renderCheckallBtn();
});
//check items click
for (i = 0; i < document.querySelectorAll('.check-box-customer').length; i++) {
	customerItemCheckbox[i].addEventListener("change", () => {
		var isCheckedAll = document.querySelectorAll('.check-box-customer').length === document.querySelectorAll('.check-box-customer:checked').length
		$(checkCusAll).prop('checked', isCheckedAll);
		renderCheckallBtn();
	});
}
//Render button check all submit
var checkAllSubmitBtn = document.getElementById("add-user-customer-btn");
function renderCheckallBtn() {
	var checkCount = document.querySelectorAll('.check-box-customer:checked').length;
	if (checkCount) {
		checkAllSubmitBtn.classList.remove("disabled");
	} else {
		checkAllSubmitBtn.classList.add("disabled")
	};
}
//Check all submit button click
var addUserCusForm = document.forms['add-user-customer-form'];
var addUseridToCustomerBtn = document.getElementById("add-userid-to-customer");
var addUseridToCustomerModal = document.getElementById("add-userid-to-customer-modal");
addUseridToCustomerModal.addEventListener("show.bs.modal", function (event) {
	var button = event.relatedTarget;

	addUserCusForm.setAttribute('action', `/business/manager/userid`)
})

addUseridToCustomerBtn.addEventListener("click", () => {
	addUserCusForm.submit();
})

document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#customer_table").DataTable({
			paging: true,
			reponsive: true,
		});
	});
});