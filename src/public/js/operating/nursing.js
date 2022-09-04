var subDoctorForm = document.forms['submit-doctor-form'];
var subDoctorModal = document.getElementById('submit-doctor-modal');
var subDoctorBtn = document.getElementById('submit-form-doctor-btn');

subDoctorBtn.addEventListener("click", () => {
    subDoctorForm.submit();

});

subDoctorModal.addEventListener('show.bs.modal', function(event){
	
    var button = event.relatedTarget;

    var id = button.getAttribute("data-id")

    subDoctorForm.setAttribute('action', `/operating-room/nursing/service-note/${id}?_method=PATCH`)

})

document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function(){
		$('.input-images-before').imageUploader({
			label: 'Kéo và thả hoặc bấm chọn hình ảnh',
			imagesInputName: 'before',
		});
		$('.input-videos-before').imageUploader({
			label: 'Kéo và thả hoặc bấm chọn video',
			imagesInputName: 'before',
		});
		$('.input-images-after').imageUploader({
			label: 'Kéo và thả hoặc bấm chọn hình ảnh',
			imagesInputName: 'after',
		});
		$('.input-videos-after').imageUploader({
			label: 'Kéo và thả hoặc bấm chọn video',
			imagesInputName: 'after',
		});
	});

});


