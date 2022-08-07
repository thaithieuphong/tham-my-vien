//Multiple images re xam

document.addEventListener('DOMContentLoaded', function () {
	let imagesPreviewReExam = function (input, placeToInsertImagePreview) {
		console.log(input);
		// console.log(input.files);
		if (input.files) {
			let filesAmount = input.files.length;
			for (i = 0; i < filesAmount; i++) {
				let reader = new FileReader();
				reader.onload = function (event) {
					$($.parseHTML("<img class='rounded'>"))
						.attr("src", event.target.result)
						.appendTo(placeToInsertImagePreview);
				};
				reader.readAsDataURL(input.files[i]);
			}
		}
	};
	var inputMultiImageReExam = document.getElementById('input-multi-images-re-exam');
	inputMultiImageReExam.addEventListener('change', (e) => {
		imagesPreviewReExam(e.target, "div.preview-images-re-exam");
		console.log(e.target.files);
	})

	let videosPreviewReExam = function (input, placeToInsertVideoPreview) {
		console.log(input);
		// console.log(input.files);
		if (input.files) {
			let filesAmount = input.files.length;
			for (i = 0; i < filesAmount; i++) {
				let reader = new FileReader();
				reader.onload = function (event) {
					$($.parseHTML("<video class='mt-3 mb-3'>"))
						.attr("src", event.target.result)
						.appendTo(placeToInsertVideoPreview);
				};
				reader.readAsDataURL(input.files[i]);
			}
		}
	};
	var inputMultiVideoReExam = document.getElementById('input-multi-videos-re-exam');
	inputMultiVideoReExam.addEventListener('change', (e) => {
		videosPreviewReExam(e.target, "div.preview-videos-re-exam");
		console.log(e.target.files);
	})
});

var reExamModal = document.getElementById('re-exam-modal');
var reExamForm = document.forms['upload-img-re-exam-form'];
var reExamSubmitBtn = document.getElementById('upload-img-re-exam-btn');

reExamSubmitBtn.addEventListener('click', () =>{
	reExamForm.submit()
	console.log('abc')
})

reExamModal.addEventListener('show.bs.modal', function(event){
    var button = event.relatedTarget;

	var reExamID = button.getAttribute("data-re-exam-id");

	reExamForm.setAttribute('action', `/operating-room/nursing/re-examination/reexam/${reExamID}`);
	console.log(reExamID);
})

//END Multiple images re xam

var subDoctorForm = document.forms['submit-re-exam-form'];
var subDoctorModal = document.getElementById('submit-re-exam-modal');
var subDoctorBtn = document.getElementById('submit-form-re-exam-btn');

subDoctorBtn.addEventListener("click", () => {
    subDoctorForm.submit();
    // console.log(123)
});

subDoctorModal.addEventListener('show.bs.modal', function(event){
	
    var button = event.relatedTarget;

    var id = button.getAttribute("data-id")

    subDoctorForm.setAttribute('action', `/operating-room/nursing/re-examination/${id}?_method=PATCH`)
    console.log(id)
})