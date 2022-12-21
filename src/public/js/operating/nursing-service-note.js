//Search
function convert_vi_to_en(str) {
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
	str = str.replace(/đ/g, "d");
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
	str = str.replace(/Đ/g, "D");
	str = str.replace(
		/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
		" "
	);
	str = str.replace(/  +/g, " ");
	return str;
}

// Handle service note done modal
var updateDoneModal = document.getElementById("submit-discharge-from-hospital-modal");
updateDoneModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from edit button
	var serviceNoteID = button.getAttribute('data-id');
	var dataCusID = button.getAttribute('data-cusID');
	var fullName = button.getAttribute("data-fullName");
	var surgeryDay = button.getAttribute('data-surgeryDay')
	// Get element need embeded input
	var inputCusID = document.getElementById("input-cusID");
	var fullNameModal = document.getElementById("fullName-modal");
	var inputSurgeryDay = document.getElementById('input-surgeryDay');

	serviceNoteDoneForm.setAttribute('action', `/operating-room/nursing/service-note/${serviceNoteID}/discharge-from-hospital?_method=PATCH`);
	inputCusID.value = dataCusID;
	fullNameModal.innerHTML = fullName;
	inputSurgeryDay.value = surgeryDay;
});

// Handle service note form done
var doneBtn = document.getElementById("submit-service-note-discharge-from-hospital-btn");
var serviceNoteDoneForm = document.forms["submit-service-note-discharge-from-hospital-form"];
doneBtn.addEventListener("click", () => {
	serviceNoteDoneForm.submit();
});


var inputSearch = document.getElementById('search-service-note'); // Lấy thẻ input từ giao diện
inputSearch.addEventListener('keyup', (e) => {
	let value = e.target.value.toLowerCase(); // Lấy giá trị được nhập vào từ thẻ input
	getData(value);
});

function getData(value) {
	const cards = document.querySelectorAll('.card');
	cards.forEach(card => {
		let fullName = card.querySelector('.text-fullName');
		let nickName = card.querySelector('.text-nickName');
		let idendify = card.querySelector('.text-identify');
		let textFullName = fullName.innerHTML;
		let textNickName = nickName.innerHTML;
		let textIdentify = idendify.innerHTML;
		let obj = { fullName: textFullName, nickName: textNickName, idendify: textIdentify, element: card }
		const isVisible = obj.fullName.toLowerCase().includes(value) || obj.nickName.toLowerCase().includes(value) || obj.idendify.toLowerCase().includes(value);
		card.classList.toggle('off', !isVisible);
	})
}