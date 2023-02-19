document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#table-schedule-trash").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
	});
});

var restoreScheduleBtn = document.getElementById('restoreScheduleBtn');
var restoreScheduleForm = document.getElementById('restoreScheduleForm')
if (restoreScheduleBtn) {
	restoreScheduleBtn.addEventListener('click', () => {
		restoreScheduleForm.submit();
	})
}

// // Xử lý modal xóa lịch hẹn tư vấn
var restoreScheduleModal = document.getElementById("restoreScheduleModal");
restoreScheduleModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;

    var dataScheduleID = button.getAttribute("data-schedule-id");
    var dataCustomer = button.getAttribute("data-customer");
    var dataCustomerID = button.getAttribute("data-customer-id");
    var inputScheduleCustomerName = document.getElementById("restore-schedule-customer");
    var inputScheduleCustomerID = document.getElementById("restore-schedule-customer-id");
	console.log(dataCustomer)
    inputScheduleCustomerName.innerHTML = dataCustomer;
	inputScheduleCustomerID.value = dataCustomerID;
	restoreScheduleForm.setAttribute("action", `/business/employ/schedule/${dataScheduleID}/restore?_method=PATCH`);
});

function formatDate(d){
	let date = new Date(d);
	let newDate = date.toLocaleString('vi-VI', { weekday: "long", day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
	return newDate;
}

function formatBirth(d) {
	let date = new Date(d);
	let newDate = date.toLocaleString('vi-VI', { day: 'numeric', month: 'numeric', year: 'numeric' });
	return newDate;
}

// // Xử lý modal chi tiết lịch hẹn tư vấn
var detailScheduleModal = document.getElementById("detailScheduleModal");
detailScheduleModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;

    var dataCustomerImg = button.getAttribute("data-img");
    var dataCustomerFullName = button.getAttribute("data-customer-fullName");
    var dataCustomerNickName = button.getAttribute("data-customer-nickName");
    var dataCustomerBirth = button.getAttribute("data-customer-birth");
    var dataCustomerGender = button.getAttribute("data-customer-gender");
    var dataCustomerPhone = button.getAttribute("data-customer-phone");
    var dataCustomerResource = button.getAttribute("data-customer-resource");
    var dataUser = button.getAttribute("data-customer-user");
    var dataSchedule = button.getAttribute("data-schedule");
    var dataService = button.getAttribute("data-service");
    var dataPriceBefore = button.getAttribute("data-priceBefore");
    var dataDeposit = button.getAttribute("data-deposit");

    var customerImg = document.getElementById("add-avt");
    var customerFullName = document.getElementById("schedule-fullName");
    var customerNickName = document.getElementById("schedule-nickName");
    var customerBirth = document.getElementById("schedule-birth");
    var customerGender = document.getElementById("schedule-gender");
    var customerPhone = document.getElementById("schedule-phone");
    var customerResource = document.getElementById("schedule-resource");
    var user = document.getElementById("schedule-user");
    var schedule = document.getElementById("schedule-schedule");
    var wrapper = document.getElementById("wrapper");
    var deposit = document.getElementById("schedule-deposit");
    var priceBefore = document.getElementById("schedule-priceBefore");
	
    dataCustomerImg !== '' ? customerImg.setAttribute('src', dataCustomerImg) : customerImg.setAttribute('src', '/img/user-ray.png');
	customerFullName.innerHTML = dataCustomerFullName;
	customerNickName.innerHTML = dataCustomerNickName;
	customerBirth.innerHTML = formatBirth(dataCustomerBirth);
	customerGender.innerHTML = dataCustomerGender;
	customerPhone.innerHTML = `0${dataCustomerPhone}`;
	customerResource.innerHTML = dataCustomerResource;
	user.innerHTML = dataUser;
	schedule.innerHTML = formatDate(dataSchedule);
	customerFullName.innerHTML = dataCustomerFullName;
	console.log(dataService)
	var serviceArr = dataService.split(',');
	console.log(serviceArr)
	serviceArr.forEach(serviceElement => {
		var div = document.createElement('div');
		var label = document.createElement('label');
		div.classList.add('text-right', 'border-bottom', 'mb-2');
		label.classList.add('text-dark-yellow', 'mb-0');
		label.innerHTML = serviceElement;
		div.append(label);
		wrapper.append(div)
	});
	deposit.innerHTML = dataDeposit;
	priceBefore.innerHTML = dataPriceBefore;
});