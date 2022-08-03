//PATCH: load form and submit push performer forms
var pushPerformerBtn = document.getElementById("add-performer-btn");
var performerForm = document.forms['add-performer-form'];
// var userStateForm = document.forms['user-state-form'];
pushPerformerBtn.addEventListener("click", () => {
	performerForm.submit();
	// userStateForm.submit();
})


function getValueSelect(obj) {
	// Lấy danh sách các options
	var options = obj.children;

	// Biến lưu trữ các chuyên mục đa chọn
	var html = '';

	//Array userID
	var doctorIDs = [];

	// lặp qua từng option và kiểm tra thuộc tính selected
	for (var i = 0; i < options.length; i++) {
		if (options[i].selected) {
			html += '<input class="user-busy" name="operatingID[]" value="' + options[i].getAttribute("data-userID") + '">';

			document.getElementById("receive-performer").innerHTML = html;
		}
	}

	// var selectDoctor = document.getElementById('receive-performer');
	// selectDoctor.setAttribute('value', `${doctorIDs}`);
}

function getValueSelect1(obj) {
	// Lấy danh sách các options
	var options = obj.children;

	// Biến lưu trữ các chuyên mục đa chọn
	var html = '';

	//Array userID
	var nursingIDs = [];

	// lặp qua từng option và kiểm tra thuộc tính selected
	for (var i = 0; i < options.length; i++) {
		if (options[i].selected) {
			html += '<input class="user-busy" name="operatingID[]" value="' + options[i].getAttribute("data-userID") + '">';

			document.getElementById("receive-nursing").innerHTML = html;

		}
	}
}

var performerModal = document.getElementById("add-performer-modal");
performerModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from edit button
	var id = button.getAttribute("data-id");
	var customerID = button.getAttribute("data-customerID");
	var name = button.getAttribute("data-name");
	var birth = button.getAttribute("data-birth");
	var gender = button.getAttribute("data-gender");
	var email = button.getAttribute("data-email");
	var phone = button.getAttribute("data-phone");
	var address = button.getAttribute("data-address");
	var createName = button.getAttribute("data-createName");
	var service = button.getAttribute("data-service");
	var schedule = button.getAttribute("data-schedule");
	var comment = button.getAttribute("data-comment");

	// Get element need embeded input
	// var modalCustomerID = document.getElementById("customerID");
	var modalName = document.getElementById("add-performer-firstLastName");
	var modalBirth = document.getElementById("add-performer-birth");
	var modalGender = document.getElementById("add-performer-gender");
	var modalEmail = document.getElementById("add-performer-email");
	var modalPhone = document.getElementById("add-performer-phone");
	var modalAddress = document.getElementById("add-performer-address");
	var modalCreateName = document.getElementById("add-performer-createName");
	var modalService = document.getElementById("add-performer-service");
	var modalSchedule = document.getElementById("add-performer-schedule");
	var modalComment = document.getElementById("add-performer-comment");

	performerForm.setAttribute('action', `/reception/employ/service-note/${id}?_method=PATCH`);

	// userStateForm.setAttribute('action', `/reception/employ/service-note/${id}?_method=PATCH`)
	// modalCustomerID.value = customerID;
	modalName.innerHTML = name;
	modalBirth.innerHTML = birth;
	modalGender.innerHTML = gender;
	modalEmail.innerHTML = email;
	modalPhone.innerHTML = phone;
	modalAddress.innerHTML = address;
	modalCreateName.innerHTML = createName;
	modalService.innerHTML = service;
	modalSchedule.value = schedule;
	modalComment.innerHTML = comment;



	// var userID = document.getElementById("get-userID");
	// var getUserID = userID.getAttribute("data-userID");
	// var inpUserID = document.getElementById("input-userid");
})

//Detail service note

var detailServiceNoteModal = document.getElementById("detail-service-note-modal");
detailServiceNoteModal.addEventListener("show.bs.modal", function (event) {

	var button = event.relatedTarget;

	var dataFirstName = button.getAttribute("data-detail-first-name");
	var dataLastName = button.getAttribute("data-detail-last-name");
	var dataStatus = button.getAttribute("data-detail-status");
	var dataSchedule = button.getAttribute("data-detail-schedule");
	var dataService = button.getAttribute("data-detail-service");
	var dataPrice = button.getAttribute("data-detail-price");
	var dataCreateName = button.getAttribute("data-detail-create-name");
	var dataRecept = button.getAttribute("data-detail-recept");
	var dataPerformer = button.getAttribute("data-detail-performer");


	var name = document.getElementById("detail-service-note-name");
	var status = document.getElementById("detail-service-note-status");
	var schedule = document.getElementById("detail-service-note-schedule");
	var service = document.getElementById("detail-service-note-service");
	var price = document.getElementById("detail-service-note-price");
	var createName = document.getElementById("detail-service-note-createName");
	var recept = document.getElementById("detail-service-note-reception");
	var performer = document.getElementById("detail-service-note-doctor");

	name.innerHTML = dataFirstName + " " + dataLastName;
	status.innerHTML = dataStatus;
	schedule.innerHTML = dataSchedule
	service.innerHTML = dataService;
	price.innerHTML = dataPrice + ' VND';
	createName.innerHTML = dataCreateName;
	recept.innerHTML = dataRecept;
	performer.innerHTML = dataPerformer;


})
//END Detail service note





//END PATCH: load form and submit push performer forms

document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#customer_table").DataTable({
			paging: true,
			reponsive: true,
		});
	});
});

// Handle message
// var alertMessage = document.getElementById('alert-message');
