document.addEventListener('DOMContentLoaded', function () {
	$(document).ready(function () {
		$("#table-re-exam-schedule").bootstrapTable({
			pagination: true,
			search: true,
			// scrollY: 300,
		});
	});

});

var createReExamForm = document.forms['create-re-exam-form'];
var createReExamModal = document.getElementById('create-re-exam-modal');
var createReExamBtn = document.getElementById('create-re-exam-btn');

if (createReExamModal) {
	createReExamModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let reExamScheduleID = button.getAttribute("data-create-re-exam-schedule-id");
		let customerID = button.getAttribute("data-create-re-exam-cusID");
		let fullName = button.getAttribute("data-create-re-exam-fullName");
		let serviceNoteID = button.getAttribute("data-create-re-exam-serviceNoteID");

		let createReExamCusID = document.getElementById('create-re-exam-cusID');
		let createReExamScheduleID = document.getElementById('create-re-exam-schedule-id');
		let createReExamServiceNoteID = document.getElementById('create-re-exam-serviceNote-id');
		let createReExamFullName = document.getElementById('create-re-exam-fullname');

		createReExamCusID.value = customerID;
		createReExamScheduleID.value = reExamScheduleID;
		createReExamFullName.innerHTML = fullName;
		createReExamServiceNoteID.value = serviceNoteID;
	})
}

if (createReExamBtn) {
	createReExamBtn.addEventListener("click", () => {
		createReExamForm.submit();
	});
}

var deleteReExamScheduleForm = document.forms['delete-re-exam-schedule-form'];
var deleteReExamScheduleModal = document.getElementById('delete-re-exam-schedule-modal');
var deleteReExamScheduleBtn = document.getElementById('delete-re-exam-schedule-btn');
var deleteReExamScheduleCusID = document.getElementById('delete-re-exam-schedule-cusID');
var deleteReExamScheduleServiceNoteID = document.getElementById('delete-re-exam-schedule-serviceNoteID');
var deleteReExamScheduleFullName = document.getElementById('delete-re-exam-schedule-fullName');

if (deleteReExamScheduleBtn) {
	deleteReExamScheduleBtn.addEventListener("click", () => {
		deleteReExamScheduleForm.submit();
	});
}

if (deleteReExamScheduleModal) {
	deleteReExamScheduleModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let id = button.getAttribute("data-re-exam-schedule-id");
		let cusID = button.getAttribute("data-re-exam-schedule-customer-id");
		let serviceNoteID = button.getAttribute("data-re-exam-schedule-serviceNoteID");
		let fullName = button.getAttribute("data-re-exam-schedule-customer-fullname");
		deleteReExamScheduleForm.setAttribute('action', `/customer-care/employ/re-exam-schedule/${id}/delete?_method=DELETE`);

		let deleteFullName = document.getElementById('delete-re-exam-schedule-fullname');
		deleteFullName.innerHTML = fullName;
		deleteReExamScheduleCusID.value = cusID;
		deleteReExamScheduleServiceNoteID.value = serviceNoteID;
		deleteReExamScheduleFullName.value = fullName;
	})
}

// Sửa lịch hẹn tái khám
var editReExamScheduleFormCustomerCare = document.forms['edit-re-exam-schedule-form'];
var editReExamScheduleModalCustomerCare = document.getElementById('edit-re-exam-schedule-modal');
var editReExamScheduleBtnCustomerCare = document.getElementById('edit-re-exam-schedule-btn');
var editReExamScheduleInputCustomerCare = document.getElementById('edit-re-exam-schedule-input');

if (editReExamScheduleBtnCustomerCare) {
	editReExamScheduleBtnCustomerCare.addEventListener("click", () => {
		editReExamScheduleFormCustomerCare.submit();
	});
}

if (editReExamScheduleModalCustomerCare) {
	editReExamScheduleModalCustomerCare.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let id = button.getAttribute("data-edit-re-exam-schedule-id");
		let cusID = button.getAttribute("data-edit-re-exam-schedule-cusID");
		let fullName = button.getAttribute("data-edit-re-exam-schedule-fullName");
		let nickName = button.getAttribute("data-edit-re-exam-schedule-nickName");
		let gender = button.getAttribute("data-edit-re-exam-schedule-gender");
		let phone = button.getAttribute("data-edit-re-exam-schedule-phone");
		editReExamScheduleFormCustomerCare.setAttribute('action', `/customer-care/employ/re-exam-schedule/${id}/edit?_method=PATCH`);

		let editCusID = document.getElementById('edit-re-exam-schedule-input-cusID');
		let editFullName = document.getElementById('edit-re-exam-schedule-fullname');
		let editNickName = document.getElementById('edit-re-exam-schedule-nickname');
		let editGender = document.getElementById('edit-re-exam-schedule-gender');
		let editPhone = document.getElementById('edit-re-exam-schedule-phone');
		editCusID.value = cusID;
		editFullName.innerHTML = fullName;
		editNickName.innerHTML = nickName;
		editGender.innerHTML = gender;
		editPhone.innerHTML = '0' + phone;
	})
}

// Chi tiết lịch hẹn tái khám
var detailReExamScheduleModal = document.getElementById('detail-re-exam-schedule-modal');

if (detailReExamScheduleModal) {
	detailReExamScheduleModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let dataIdentification = button.getAttribute("data-identification");
		let dataFullName = button.getAttribute("data-fullName");
		let dataNickName = button.getAttribute("data-nickName");
		let dataGender = button.getAttribute("data-gender");
		let dataBirth = button.getAttribute("data-birth");
		let dataPhone = button.getAttribute("data-phone");
		let dataTimes = button.getAttribute("data-times");
		let dataSchedule = button.getAttribute("data-schedule");
		let dataSurgeryDay = button.getAttribute("data-surgeryDay");

		let identification = document.getElementById('identification');
		let fullName = document.getElementById('fullName');
		let nickName = document.getElementById('nickName');
		let gender = document.getElementById('gender');
		let birth = document.getElementById('birth');
		let phone = document.getElementById('phone');
		let times = document.getElementById('times');
		let surgeryDay = document.getElementById('surgeryDay');
		let schedule = document.getElementById('schedule');
		identification.innerHTML = dataIdentification;
		fullName.innerHTML = dataFullName;
		nickName.innerHTML = dataNickName;
		gender.innerHTML = dataGender;
		birth.innerHTML = formatBirth(dataBirth);
		times.innerHTML = dataTimes;
		surgeryDay.innerHTML = formatShortDate(dataSurgeryDay);
		schedule.innerHTML = formatShortDate(dataSchedule);
		phone.innerHTML = '0' + dataPhone;
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
