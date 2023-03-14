document.addEventListener('DOMContentLoaded', function () {
	$(document).ready(function () {
		$("#table-wound-cleaning").bootstrapTable({
			pagination: true,
			search: true,
			// scrollY: 300,
		});
		
	});

});

var deleteWoundCleaningForm = document.forms['delete-wound-cleaning-form'];
var deleteWoundCleaningModal = document.getElementById('delete-wound-cleaning-modal');
var deleteWoundCleaningBtn = document.getElementById('delete-wound-cleaning-btn');

if (deleteWoundCleaningBtn) {
	deleteWoundCleaningBtn.addEventListener("click", () => {
		deleteWoundCleaningForm.submit();
	});
}

if (deleteWoundCleaningModal) {
	deleteWoundCleaningModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let woundCleaningID = button.getAttribute("data-wound-cleaning-id");
		let cusID = button.getAttribute("data-wound-cleaning-customer-id");
		let fullName = button.getAttribute("data-wound-cleaning-customer-fullname");
		let serviceNoteID = button.getAttribute("data-wound-cleaning-serviceNoteID");
		let woundCleaningScheduleID = button.getAttribute("data-wound-cleaning-woundCleaningScheduleID");
		deleteWoundCleaningForm.setAttribute('action', `/customer-care/employ/wound-cleaning/${woundCleaningID}/delete?_method=DELETE`);

		var deleteWoundCleaningCusID = document.getElementById('delete-wound-cleaning-cusID');
		var deleteWoundCleaningFullName = document.getElementById('delete-wound-cleaning-fullName');
		var deleteFullName = document.getElementById('delete-wound-cleaning-fullname');
		var deleteWoundCleaningServiceNoteID = document.getElementById('delete-wound-cleaning-serviceNoteID');
		var deleteWoundCleaningScheduleID = document.getElementById('delete-wound-cleaning-woundCleaningScheduleID');
		deleteFullName.innerHTML = fullName;
		deleteWoundCleaningCusID.value = cusID;
		deleteWoundCleaningFullName.value = fullName;
		deleteWoundCleaningServiceNoteID.value = serviceNoteID;
		deleteWoundCleaningScheduleID.value = woundCleaningScheduleID;
	})
}


// Modal move to re-examination
var submitWoundCleaningForm = document.forms['submit-wound-cleaning-form'];
var submitWoundCleaningModal = document.getElementById('submit-wound-cleaning-modal-done');
var submitWoundCleaningBtn = document.getElementById('submit-wound-cleaning-btn');

if (submitWoundCleaningBtn) {
	submitWoundCleaningBtn.addEventListener("click", () => {
		submitWoundCleaningForm.submit();
	});
}

if (submitWoundCleaningModal) {
	submitWoundCleaningModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let dataWoundCleaningID = button.getAttribute("data-wound-cleaning-id");
		let dataCusID = button.getAttribute("data-wound-cleaning-customer-id");
		let dataFullName = button.getAttribute("data-wound-cleaning-cutomer-fullName");
		let dataServiceNoteID = button.getAttribute("data-wound-cleaning-serviceNoteID");
		let dataWoundCleaningScheduleID = button.getAttribute("data-wound-cleaning-woundCleaningScheduleID");

		submitWoundCleaningForm.setAttribute('action', `/customer-care/employ/wound-cleaning/${dataWoundCleaningID}/done?_method=PATCH`);

		var inputCusID = document.getElementById('submit-wound-cleaning-cusID');
		var inputFullName = document.getElementById('submit-wound-cleaning-fullName');
		var labelFullName = document.getElementById('submit-wound-cleaning-fullname');
		var inputServiceNoteID = document.getElementById('submit-wound-cleaning-serviceNoteID');
		var inputWoundCleaningScheduleID = document.getElementById('submit-wound-cleaning-woundCleaningScheduleID');
		labelFullName.innerHTML = dataFullName;
		inputCusID.value = dataCusID;
		inputFullName.value = dataFullName;
		inputServiceNoteID.value = dataServiceNoteID;
		inputWoundCleaningScheduleID.value = dataWoundCleaningScheduleID;
	})
}