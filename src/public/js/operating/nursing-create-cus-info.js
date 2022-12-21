window.addEventListener('load',function(){
	// Handle push data to delete modal
	var deleteSchedule = document.getElementById("delete-schedule-modal");
	if (deleteSchedule) {
		deleteSchedule.addEventListener("show.bs.modal", function (event) {
			// Button that triggered the modal
			var button = event.relatedTarget;
			// Get data from delete button
			var serviceNoteId = button.getAttribute('data-delete-id');
			var firstName = button.getAttribute("data-delete-firstname");
			var lastName = button.getAttribute("data-delete-lastname");
			var cusID = button.getAttribute("data-delete-customerID");
			// Get element need embeded input
			var deleteSchedule = document.getElementById("delete-schedule");
			var deleteCusID = document.getElementById("delete-cusID");
			deleteScheduleForm.setAttribute('action', `/operating-room/nursing/schedule/${serviceNoteId}/delete?_method=DELETE`);
			deleteCusID.value = cusID;
			deleteSchedule.innerHTML = firstName + ' ' + lastName;
		});
	}

	// Handle delete info Customer
	var deleteBtn = document.getElementById("delete-schedule-btn");
	var deleteScheduleForm = document.forms["delete-schedule-form"];
	if (deleteBtn) {
		deleteBtn.addEventListener("click", () => {
			deleteScheduleForm.submit();
		});
	}

	// Handle create service note
	var createCusInfoBtn = document.getElementById("create-customer-information-btn");
	var createCusInfoForm = document.forms["create-customer-information-form"];
	if (createCusInfoBtn) {
		createCusInfoBtn.addEventListener("click", (e) => {
			createCusInfoForm.submit();
		});
	}

	// Handle push data to edit schedule modal
	var editSchedule = document.getElementById("edit-schedule-modal");
	if (editSchedule) {
		editSchedule.addEventListener("show.bs.modal", function (event) {
			// Button that triggered the modal
			var button = event.relatedTarget;
			// Get data from delete button
			var scheduleId = button.getAttribute('data-edit-id');
			var fullName = button.getAttribute("data-edit-fullName");
			var nickName = button.getAttribute("data-edit-nickName");
			var phone = button.getAttribute("data-edit-phone");
			// Get element need embeded input
			var editFullName = document.getElementById("edit-schedule-fullname");
			var editNickName = document.getElementById("edit-schedule-nickname");
			var editPhone = document.getElementById("edit-schedule-phone");
			editScheduleForm.setAttribute('action', `/operating-room/nursing/schedule/${scheduleId}/edit?_method=PATCH`);
			editFullName.innerHTML = fullName;
			editNickName.innerHTML = nickName;
			editPhone.innerHTML = phone;
		});
	}

	// Handle edit schedule form
	var editBtn = document.getElementById("edit-schedule-btn");
	var editScheduleForm = document.forms["edit-schedule-form"];
	if (editBtn) {
		editBtn.addEventListener("click", () => {
			editScheduleForm.submit();
		});
	}

})
	
var inputSearch = document.getElementById('search-schedule'); // Lấy thẻ input từ giao diện
inputSearch.addEventListener('keyup', (e) => {
	let value = e.target.value.toLowerCase(); // Lấy giá trị được nhập vào từ thẻ input
	getData(value);
});

function getData(value) {
	const cards = document.querySelectorAll('.card');
	cards.forEach(card => {
		let fullName = card.querySelector('.text-fullName');
		let nickName = card.querySelector('.text-nickName');
		let phone = card.querySelector('.text-phone');
		let textFullName = fullName.innerHTML;
		let textNickName = nickName.innerHTML;
		let textPhone = phone.innerHTML;
		let obj = { fullName: textFullName, nickName: textNickName, phone: textPhone, element: card }
		const isVisible = obj.fullName.toLowerCase().includes(value) || obj.nickName.toLowerCase().includes(value) || obj.phone.toLowerCase().includes(value);
		card.classList.toggle('off', !isVisible);
	})
}