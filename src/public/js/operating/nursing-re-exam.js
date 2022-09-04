//Multiple images re xam

document.addEventListener('DOMContentLoaded', function () {
	$(document).ready(function(){
		$('.input-images-re-examination').imageUploader({
			label: 'Kéo và thả hoặc bấm chọn hình ảnh',
			imagesInputName: 're-examination',
			preloadedInputName:'preloaded'
		});
		$('.input-videos-re-examination').imageUploader({
			label: 'Kéo và thả hoặc bấm chọn video',
			imagesInputName: 're-examination',
			preloadedInputName:'preloaded'
		});
	});
});


//END Multiple images re xam

var subDoctorForm = document.forms['submit-re-exam-form'];
var subDoctorModal = document.getElementById('submit-re-exam-modal');
var subDoctorBtn = document.getElementById('submit-form-re-exam-btn');

subDoctorBtn.addEventListener("click", () => {
    subDoctorForm.submit();
});

subDoctorModal.addEventListener('show.bs.modal', function(event){
    var button = event.relatedTarget;
    var id = button.getAttribute("data-id");
    subDoctorForm.setAttribute('action', `/operating-room/nursing/re-examination/${id}?_method=PATCH`);
})