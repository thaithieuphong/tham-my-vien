var subDoctorForm = document.forms['submit-doctor-form'];
var subDoctorModal = document.getElementById('submit-doctor-modal');
var subDoctorBtn = document.getElementById('submit-form-doctor-btn');

subDoctorBtn.addEventListener("click", () => {
    subDoctorForm.submit();
});

subDoctorModal.addEventListener('show.bs.modal', function(event){
	
    var button = event.relatedTarget;

    var id = button.getAttribute("data-id")

    subDoctorForm.setAttribute('action', `/operating/doctor/service-note/${id}?_method=PUT`)
})