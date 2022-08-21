//Create re exam
var createExamForm = document.forms['create-re-exam-form'];
var createExamBtn = document.getElementById("create-re-exam-btn");
createExamBtn.addEventListener("click", () =>{
    createExamForm.submit();
})
var createExamModal = document.getElementById("create-re-examination-modal");
createExamModal.addEventListener("show.bs.modal", function (event) {

    var button = event.relatedTarget;

    var dataCustomerID = button.getAttribute("data-id");
    var dataImg = button.getAttribute("data-img");
    var dataName = button.getAttribute("data-name");
    var dataBirth = button.getAttribute("data-birth");
    var dataGender = button.getAttribute("data-gender");
    var dataEmail = button.getAttribute("data-email");
    var dataPhone = button.getAttribute("data-phone");
    var dataAddress = button.getAttribute("data-address");
    var dataService = button.getAttribute("data-service");
    var dataServiceNoteId = button.getAttribute("data-service-note-id");

    var customerID = document.getElementById("create-re-exam-customerID");
    var img = document.getElementById("create-re-exam-img")
    var name = document.getElementById("create-re-exam-firstLastName");
    var birth = document.getElementById("create-re-exam-birth");
    var gender = document.getElementById("create-re-exam-gender");
    var email = document.getElementById("create-re-exam-email");
    var phone = document.getElementById("create-re-exam-phone");
    var address = document.getElementById("create-re-exam-address");
    var serviced = document.getElementById("create-re-exam-serviced");
    var serviceNoteID = document.getElementById("create-service-note-id")

    createExamForm.setAttribute("action",'/business/employ/service-note/exam')


    if (dataImg === '') {
		img.setAttribute('src', '/img/user-icon.png');
	} else {
		img.setAttribute('src', '/img/uploads/customers/' + dataImg);
	}

    customerID.value = dataCustomerID;
    name.innerHTML = dataName;
    birth.innerHTML = dataBirth;
    gender.innerHTML = dataGender;
    email.innerHTML = dataEmail;
    phone.innerHTML = dataPhone;
    address.innerHTML = dataAddress;
    serviced.value = dataService;
    serviceNoteID.value = dataServiceNoteId;

   
})




//END Create re exam

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