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