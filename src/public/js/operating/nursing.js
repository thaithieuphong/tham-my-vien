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

// Multiple images before
// document.addEventListener('DOMContentLoaded', function () {
// 	let imagesPreviewBefore = function (input, placeToInsertImagePreview) {
// 		console.log(input);
// 		// console.log(input.files);
// 		if (input.files) {
// 			let filesAmount = input.files.length;
// 			for (i = 0; i < filesAmount; i++) {
// 				let reader = new FileReader();
// 				reader.onload = function (event) {
// 					$($.parseHTML("<img class='rounded'>"))
// 						.attr("src", event.target.result)
// 						.appendTo(placeToInsertImagePreview);
// 				};
// 				reader.readAsDataURL(input.files[i]);
// 			}
// 		}
// 	};
// 	var inputMultiImageBefore = document.getElementById('input-multi-images-before');
// 	inputMultiImageBefore.addEventListener('change', (e) => {
// 		imagesPreviewBefore(e.target, "div.preview-images-before");
// 		console.log(e.target.files);
// 	})

// 	let videosPreviewBefore = function (input, placeToInsertVideoPreview) {
// 		console.log(input);
// 		// console.log(input.files);
// 		if (input.files) {
// 			let filesAmount = input.files.length;
// 			for (i = 0; i < filesAmount; i++) {
// 				let reader = new FileReader();
// 				reader.onload = function (event) {
// 					$($.parseHTML("<video class='mt-3 mb-3'>"))
// 						.attr("src", event.target.result)
// 						.appendTo(placeToInsertVideoPreview);
// 				};
// 				reader.readAsDataURL(input.files[i]);
// 			}
// 		}
// 	};
// 	var inputMultiVideoBefore = document.getElementById('input-multi-videos-before');
// 	inputMultiVideoBefore.addEventListener('change', (e) => {
// 		videosPreviewBefore(e.target, "div.preview-videos-before");
// 		console.log(e.target.files);
// 	})
// });

var beforeModal = document.getElementById('before-modal');
var beforeForm = document.forms['upload-img-before-form'];
var beforeSubmitBtn = document.getElementById('upload-img-before-btn');

beforeSubmitBtn.addEventListener('click', () =>{
	beforeForm.submit()
})

beforeModal.addEventListener('show.bs.modal', function(event){
    var button = event.relatedTarget;

	var beforeID = button.getAttribute("data-before-id");

	beforeForm.setAttribute('action', `/operating-room/nursing/service-note/before/${beforeID}`);
})



// END Multiple images before

//Multiple images after
document.addEventListener('DOMContentLoaded', function () {
	let imagesPreviewAfter = function (input, placeToInsertImagePreview) {
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
	var inputMultiImageAfter = document.getElementById('input-multi-images-after');
	inputMultiImageAfter.addEventListener('change', (e) => {
		imagesPreviewAfter(e.target, "div.preview-images-after");
		console.log(e.target.files);
	})

	let videosPreviewAfter = function (input, placeToInsertVideoPreview) {
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
	var inputMultiVideoAfter = document.getElementById('input-multi-videos-after');
	inputMultiVideoAfter.addEventListener('change', (e) => {
		videosPreviewAfter(e.target, "div.preview-videos-after");
		console.log(e.target.files);
	})
});

var afterModal = document.getElementById('after-modal');
var afterForm = document.forms['upload-img-after-form'];
var afterSubmitBtn = document.getElementById('upload-img-after-btn');

afterSubmitBtn.addEventListener('click', () =>{
	afterForm.submit()
})

afterModal.addEventListener('show.bs.modal', function(event){
    var button = event.relatedTarget;

	var afterID = button.getAttribute("data-after-id");

	afterForm.setAttribute('action', `/operating-room/nursing/service-note/after/${afterID}`);
})
//END Multiple images after


