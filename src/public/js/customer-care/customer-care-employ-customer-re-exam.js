// Tạo lịch tái khám
var createReExamScheduleForm = document.forms['create-re-exam-schedule-form'];
var createReExamScheduleModal = document.getElementById('create-re-exam-schedule-modal');
var createReExamScheduleBtn = document.getElementById('create-re-exam-schedule-btn');

if (createReExamScheduleBtn) {
	createReExamScheduleBtn.addEventListener("click", () => {
		createReExamScheduleForm.submit();
	});
}

if (createReExamScheduleModal) {
	createReExamScheduleModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let dataID = button.getAttribute("data-id");
		let dataCusId = button.getAttribute("data-cusId");
		let dataIdentification = button.getAttribute("data-identification");
		let dataFullName = button.getAttribute("data-fullName");
		let dataNickName = button.getAttribute("data-nickName");
		let dataGender = button.getAttribute("data-gender");
		let dataPhone = button.getAttribute("data-phone");
		createReExamScheduleForm.setAttribute('action', `/customer-care/employ/customers/${dataID}/create-re-exam-schedule`);
		
		let cusID = document.getElementById('create-re-exam-schedule-cusId');
		let identification = document.getElementById('create-re-exam-schedule-identification');
		let fullName = document.getElementById('create-re-exam-schedule-fullname');
		let nickName = document.getElementById('create-re-exam-schedule-nickname');
		let gender = document.getElementById('create-re-exam-schedule-gender');
		let phone = document.getElementById('create-re-exam-schedule-phone');
		cusID.value = dataCusId;
		identification.innerHTML = dataIdentification;
		fullName.innerHTML = dataFullName;
		nickName.innerHTML = dataNickName;
		gender.innerHTML = dataGender;
		phone.innerHTML = '0' + dataPhone;
	})
}

var inputSearch = document.getElementById('search-table'); // Lấy thẻ input từ giao diện
if(inputSearch) {
	inputSearch.addEventListener('keyup', () => {
		let value = inputSearch.value; // Lấy giá trị được nhập vào từ thẻ input
		getDataTable(value);
	});
}

function getDataTable(value) {
	// Declare variables
	var table, tr;
	let filter = value;
	table = document.getElementById("table-customer");
	tr = table.querySelectorAll(".text-value");
	tr.forEach(item => {
		let identifies = item.querySelectorAll(".text-identify");
		let fullNames = item.querySelectorAll(".text-fullName");
		let nickNames = item.querySelectorAll(".text-nickName");
		let phones = item.querySelectorAll(".text-phone");
		let statuses = item.querySelectorAll(".text-status");
		let identifyText, fullNameText, nickNameText, phoneText, statusText;
		identifies.forEach(identify => {
			return identifyText = identify.innerHTML.toLowerCase().trim();
		})
		fullNames.forEach(fullName => {
			let fullNameLink = fullName.querySelector(".fullName-link");
			return fullNameText = fullNameLink.innerHTML.toLowerCase().trim();
		})
		nickNames.forEach(nickName => {
			return nickNameText = nickName.innerHTML.toLowerCase().trim();
		})
		phones.forEach(phone => {
			return phoneText = phone.innerHTML.toLowerCase().trim();
		})
		statuses.forEach(status => {
			return statusText = status.innerHTML.toLowerCase().trim();
		})
		let obj = { fullName: fullNameText, nickName: nickNameText, identify: identifyText, phone: phoneText, status: statusText }
		if (obj.identify || obj.fullName || obj.nickName || obj.phone || obj.status !== undefined) {
			const isVisible = obj.identify.includes(filter) || obj.fullName.includes(filter) || obj.nickName.includes(filter) || obj.phone.includes(filter) || obj.status.includes(filter);
			item.classList.toggle('off', !isVisible);
		}
	})
}

document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#table-customer-re-exam").bootstrapTable({
			pagination: true,
			// search: true,
			// scrollY: 300,
		});
		
	});

	function searchSurgeryDay(value) {
		$("#table-customer-re-exam").bootstrapTable('filterBy', {
			id: value
		},
		{
			'filterAlgorithm': (row, filters) => {
				let filterValue = filters.id;
				let date = new Date(filterValue);
				let newDate = date.toLocaleString('vi-VI', { day: 'numeric', month: 'numeric', year: 'numeric' });
				let dateString = row[1];
				if (dateString !== 'Invalid Date') {
					return dateString === newDate;
				}
			}
		})
	}

	// nhập tìm kiếm
	var inputSearchSurgeryDay = document.getElementById('search-surgeryDay'); // Lấy thẻ input từ giao diện
	var filter = document.getElementById('filter');
	filter.addEventListener('click', () => {
		let value = inputSearchSurgeryDay.value; // Lấy giá trị được nhập vào từ thẻ input
		searchSurgeryDay(value);
	});
	
});