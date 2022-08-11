//PATCH: load form and submit push performer rexamination forms
var reExamBtn = document.getElementById("add-performer-re-exam-btn");
var reExamForm = document.forms['add-performer-re-exam-form'];
// var userStateForm = document.forms['user-state-form'];
reExamBtn.addEventListener("click", () => {
	reExamForm.submit();
})
var reExamModal = document.getElementById("add-performer-re-exam-modal");
reExamModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from edit button
	var id = button.getAttribute("data-re-exam-id");
	var customerID = button.getAttribute("data-re-exam-customerID");
	var name = button.getAttribute("data-re-exam-name");
	var birth = button.getAttribute("data-re-exam-birth");
	var gender = button.getAttribute("data-re-exam-gender");
	var email = button.getAttribute("data-re-exam-email");
	var phone = button.getAttribute("data-re-exam-phone");
	var address = button.getAttribute("data-re-exam-address");
	var createName = button.getAttribute("data-re-exam-createName");
	var service = button.getAttribute("data-re-exam-service");
	var schedule = button.getAttribute("data-re-exam-schedule");
	var comment = button.getAttribute("data-re-exam-comment");

	// Get element need embeded input
	// var modalCustomerID = document.getElementById("customerID");
	var modalName = document.getElementById("add-performer-re-exam-firstLastName");
	var modalBirth = document.getElementById("add-performer-re-exam-birth");
	var modalGender = document.getElementById("add-performer-re-exam-gender");
	var modalEmail = document.getElementById("add-performer-re-exam-email");
	var modalPhone = document.getElementById("add-performer-re-exam-phone");
	var modalAddress = document.getElementById("add-performer-re-exam-address");
	var modalCreateName = document.getElementById("add-performer-re-exam-createName");
	var modalService = document.getElementById("add-performer-re-exam-service");
	var modalSchedule = document.getElementById("add-performer-re-exam-schedule");
	var modalComment = document.getElementById("add-performer-re-exam-comment");

	reExamForm.setAttribute('action', `/reception/employ/reexam/${id}?_method=PATCH`);

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

})

//Seach
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

function myFunction() {
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById("myInput");
	filter = convert_vi_to_en(input.value.toUpperCase());
	ul = document.getElementById("search-items");
	li = ul.getElementsByClassName("card");
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByClassName("text-name")[0];
		txtValue = convert_vi_to_en(a.textContent) || convert_vi_to_en(a.innerText) ;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}

var checkList = document.getElementById('list1');
	checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
		if (checkList.classList.contains('visible'))
			checkList.classList.remove('visible');
		else
			checkList.classList.add('visible');
	}