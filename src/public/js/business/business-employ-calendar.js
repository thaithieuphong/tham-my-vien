document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#table-schedule").bootstrapTable({
			pagination: true,
			search: true,
			scrollY: 300
		});
	});
});

function formatDate(d) {
	let date = new Date(d);
	let newDate = date.toLocaleString('vi-VI', { weekday: "long", day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
	return newDate;
}

// Handle push data to edit schedule modal
var scheduleDetail = document.getElementById("detailScheduleModal");
if (scheduleDetail) {
	scheduleDetail.addEventListener("show.bs.modal", function (event) {
		// Button that triggered the modal
		var button = event.relatedTarget;
		// Get data from delete button
		var dataFullName = button.getAttribute("data-customer-fullName");
		var dataNickName = button.getAttribute("data-customer-nickName");
		var dataPhone = button.getAttribute("data-customer-phone");
		var dataBirth = button.getAttribute("data-customer-birth");
		var dataGender = button.getAttribute("data-customer-gender");
		var dataResource = button.getAttribute("data-customer-resource");
		var dataImgUrl = button.getAttribute("data-customer-img");
		var dataService = button.getAttribute("data-service");
		var dataUser = button.getAttribute("data-customer-user");
		var dataSchedule = button.getAttribute("data-schedule");
		var dataDeposit = button.getAttribute("data-deposit");
		var dataPriceBefore = button.getAttribute("data-priceBefore");
		// Get element need embeded input
		var fullName = document.getElementById("schedule-fullName");
		var nickName = document.getElementById("schedule-nickName");
		var phone = document.getElementById("schedule-phone");
		var birth = document.getElementById("schedule-birth");
		var gender = document.getElementById("schedule-gender");
		var resource = document.getElementById("schedule-resource");
		var img = document.getElementById("add-avt");
		var user = document.getElementById("schedule-user");
		var schedule = document.getElementById("schedule-schedule");
		var priceBefore = document.getElementById("schedule-priceBefore");
		var deposit = document.getElementById("schedule-deposit");
		
		if (dataImgUrl) {
			img.setAttribute('src', dataImgUrl);
		} else {
			img.setAttribute('src', '/img/user-icon.png');
		}
		var serviceArr = dataService.split(',');
		var wrapper = document.getElementById('wrapper');
		serviceArr.forEach(serviceElement => {
			var div = document.createElement('div');
			var label = document.createElement('label');
			div.classList.add('text-right', 'border-bottom', 'mb-2');
			label.classList.add('text-dark-yellow', 'mb-0');
			label.innerHTML = serviceElement;
			div.append(label);
			wrapper.append(div)
		});

		fullName.innerHTML = dataFullName;
		nickName.innerHTML = dataNickName;
		phone.innerHTML = `0${dataPhone}`;
		gender.innerHTML = dataGender;
		birth.innerHTML = dataBirth;
		resource.innerHTML = dataResource;
		user.innerHTML = dataUser;
		schedule.innerHTML = formatDate(dataSchedule);
		deposit.innerHTML = dataDeposit;
		priceBefore.innerHTML = dataPriceBefore;
	});
}

var deleteScheduleBtn = document.getElementById('deleteScheduleBtn');
var deleteScheduleForm = document.getElementById('deleteScheduleForm')
if (deleteScheduleBtn) {
	deleteScheduleBtn.addEventListener('click', () => {
		deleteScheduleForm.submit();
	})
}

// // Xử lý modal xóa lịch hẹn tư vấn
var deleteScheduleModal = document.getElementById("deleteScheduleModal");
deleteScheduleModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;

    var dataScheduleID = button.getAttribute("data-schedule-id");
    var dataCustomer = button.getAttribute("data-customer");
    var dataCustomerID = button.getAttribute("data-customer-id");
    var inputScheduleCustomerID = document.getElementById("delete-schedule-customer-id");
    var inputScheduleCustomerName = document.getElementById("delete-schedule-customer");
    inputScheduleCustomerName.innerHTML = dataCustomer;
	inputScheduleCustomerID.value = dataCustomerID;
	deleteScheduleForm.setAttribute("action", `/business/employ/schedule/${dataScheduleID}/delete?_method=DELETE`);
});