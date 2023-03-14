document.addEventListener('DOMContentLoaded', function () {

	$(document).ready(function () {
		$("#table-schedule").bootstrapTable({
			pagination: true,
			search: true,
			// scrollY: 300,
		});
		
	});

});

var createWoundCleaningForm = document.forms['create-wound-cleaning-form'];
var createWoundCleaningModal = document.getElementById('create-wound-cleaning-modal');
var createWoundCleaningBtn = document.getElementById('create-wound-cleaning-btn');

if (createWoundCleaningModal) {
	createWoundCleaningModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let woundCleaningScheduleID = button.getAttribute("data-create-wound-cleaning-schedule-id");
		let customerID = button.getAttribute("data-create-wound-cleaning-cusID");
		let fullName = button.getAttribute("data-create-wound-cleaning-fullName");
		let serviceNoteID = button.getAttribute("data-create-wound-cleaning-serviceNoteID");

		let createWoundCleaningCusID = document.getElementById('create-wound-cleaning-cusID');
		let createWoundCleaningScheduleID = document.getElementById('create-wound-cleaning-schedule-id');
		let createWoundCleaningServiceNoteID = document.getElementById('create-wound-cleaning-serviceNote-id');
		let createWoundCleaningFullName = document.getElementById('create-wound-cleaning-fullname');
		createWoundCleaningCusID.value = customerID;
		createWoundCleaningScheduleID.value = woundCleaningScheduleID;
		createWoundCleaningFullName.innerHTML = fullName;
		createWoundCleaningServiceNoteID.value = serviceNoteID;
	})
}

if (createWoundCleaningBtn) {
	createWoundCleaningBtn.addEventListener("click", () => {
		createWoundCleaningForm.submit();
	});
}

var deleteWoundCleaningScheduleForm = document.forms['delete-wound-cleaning-schedule-form'];
var deleteWoundCleaningScheduleModal = document.getElementById('delete-wound-cleaning-schedule-modal');
var deleteWoundCleaningScheduleBtn = document.getElementById('delete-wound-cleaning-schedule-btn');
var deleteWoundCleaningScheduleCusID = document.getElementById('delete-wound-cleaning-schedule-cusID');
var deleteWoundCleaningScheduleServiceNoteID = document.getElementById('delete-wound-cleaning-schedule-serviceNoteID');
var deleteWoundCleaningScheduleFullName = document.getElementById('delete-wound-cleaning-schedule-fullName');

if (deleteWoundCleaningScheduleBtn) {
	deleteWoundCleaningScheduleBtn.addEventListener("click", () => {
		deleteWoundCleaningScheduleForm.submit();
	});
}

if (deleteWoundCleaningScheduleModal) {
	deleteWoundCleaningScheduleModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let id = button.getAttribute("data-wound-cleaning-schedule-id");
		let cusID = button.getAttribute("data-wound-cleaning-schedule-customer-id");
		let serviceNoteID = button.getAttribute("data-wound-cleaning-schedule-serviceNoteID");
		let fullName = button.getAttribute("data-wound-cleaning-schedule-customer-fullname");
		deleteWoundCleaningScheduleForm.setAttribute('action', `/customer-care/employ/wound-cleaning-schedule/${id}/delete?_method=DELETE`);

		let deleteFullName = document.getElementById('delete-wound-cleaning-schedule-fullname');
		deleteFullName.innerHTML = fullName;
		deleteWoundCleaningScheduleCusID.value = cusID;
		deleteWoundCleaningScheduleServiceNoteID.value = serviceNoteID;
		deleteWoundCleaningScheduleFullName.value = fullName;
	})
}

// Sửa lịch hẹn thay băng của customer care
var editWoundCleaningScheduleFormCustomerCare = document.forms['edit-wound-cleaning-schedule-form'];
var editWoundCleaningScheduleModalCustomerCare = document.getElementById('edit-wound-cleaning-schedule-modal');
var editWoundCleaningScheduleBtnCustomerCare = document.getElementById('edit-wound-cleaning-schedule-btn');
var editWoundCleaningScheduleInputCustomerCare = document.getElementById('edit-wound-cleaning-schedule-input');

if (editWoundCleaningScheduleBtnCustomerCare) {
	editWoundCleaningScheduleBtnCustomerCare.addEventListener("click", () => {
		editWoundCleaningScheduleFormCustomerCare.submit();
	});
}

if (editWoundCleaningScheduleModalCustomerCare) {
	editWoundCleaningScheduleModalCustomerCare.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let id = button.getAttribute("data-edit-wound-cleaning-schedule-id");
		let cusID = button.getAttribute("data-edit-wound-cleaning-schedule-cusID");
		let fullName = button.getAttribute("data-edit-wound-cleaning-schedule-fullName");
		let nickName = button.getAttribute("data-edit-wound-cleaning-schedule-nickName");
		let gender = button.getAttribute("data-edit-wound-cleaning-schedule-gender");
		let phone = button.getAttribute("data-edit-wound-cleaning-schedule-phone");
		editWoundCleaningScheduleFormCustomerCare.setAttribute('action', `/customer-care/employ/wound-cleaning-schedule/${id}/edit?_method=PATCH`);

		let editCusID = document.getElementById('edit-wound-cleaning-schedule-input-cusID');
		let editFullName = document.getElementById('edit-wound-cleaning-schedule-fullname');
		let editNickName = document.getElementById('edit-wound-cleaning-schedule-nickname');
		let editGender = document.getElementById('edit-wound-cleaning-schedule-gender');
		let editPhone = document.getElementById('edit-wound-cleaning-schedule-phone');
		editCusID.value = cusID;
		editFullName.innerHTML = fullName;
		editNickName.innerHTML = nickName;
		editGender.innerHTML = gender;
		editPhone.innerHTML = '0' + phone;
	})
}

// Chi tiết lịch hẹn thay băng
var detailWoundCleaningScheduleModal = document.getElementById('detail-wound-cleaning-schedule-modal');

if (detailWoundCleaningScheduleModal) {
	detailWoundCleaningScheduleModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let dataIdentification = button.getAttribute("data-customer-identification");
		let dataFullName = button.getAttribute("data-customer-fullName");
		let dataNickName = button.getAttribute("data-customer-nickName");
		let dataGender = button.getAttribute("data-customer-gender");
		let dataBirth = button.getAttribute("data-customer-birth");
		let dataPhone = button.getAttribute("data-customer-phone");
		let dataTimes = button.getAttribute("data-times");
		let dataSurgeryDay = button.getAttribute("data-service-note-surgeryDay");
		let dataSchedule = button.getAttribute("data-schedule");

		let identification = document.getElementById('identification');
		let fullName = document.getElementById('fullName');
		let nickName = document.getElementById('nickName');
		let gender = document.getElementById('gender');
		let birth = document.getElementById('birth');
		let phone = document.getElementById('phone');
		let times = document.getElementById('times');
		let schedule = document.getElementById('schedule');
		let surgeryDay = document.getElementById('surgeryDay');
		identification.innerHTML = dataIdentification;
		fullName.innerHTML = dataFullName;
		nickName.innerHTML = dataNickName;
		gender.innerHTML = dataGender;
		birth.innerHTML = formatBirth(dataBirth);
		phone.innerHTML = '0' + dataPhone;
		times.innerHTML = dataTimes;
		schedule.innerHTML = formatShortDate(dataSchedule);
		surgeryDay.innerHTML = formatShortDate(dataSurgeryDay);
	})
}

function formatBirth (d) {
	let date = new Date(d);
	let newDate = date.toLocaleString('vi-VI', { day: 'numeric', month: 'numeric', year: 'numeric' });
	return newDate;
}

function formatShortDate(d) {
	let date = new Date(d);
	let newDate = date.toLocaleString('vi-VI', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
	return newDate;
}