document.addEventListener("DOMContentLoaded", function () {
	// function formatBytes(bytes, decimals = 2) {
	// 	if (!+bytes) return '0 Bytes'
	
	// 	const k = 1024
	// 	const dm = decimals < 0 ? 0 : decimals
	// 	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	
	// 	const i = Math.floor(Math.log(bytes) / Math.log(k))
	
	// 	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
	// }

	// const inputMultiImageReExam = document.getElementById('input-multi-images-re-exam');
	// const previewImg = document.querySelector('.preview-images-re-exam');
	// if(inputMultiImageReExam) {
	// 	inputMultiImageReExam.addEventListener('change', (e) => {
	// 		let files = e.target.files; //event.target.files;
	// 		imagesPreviewReExam(files);
	// 	})
	
	// 	let imagesPreviewReExam = function (files) {
	// 		if (!files.length) {
	// 			previewImg.innerHTML = "<p>No files selected!</p>";
	// 		} else {
	// 			previewImg.innerHTML = "";
	// 			const row = document.createElement("div");
	// 			row.classList.add('row');
	// 			for (let i = 0; i < files.length; i++) {
	// 				const file = files[i];
	// 				const col = document.createElement("div");
	// 				col.classList.add('col-xl-3', 'col-lg-3', 'col-md-3', 'col-sm-3');
	// 				const card = document.createElement("div");
	// 				card.classList.add('card', 'mb-3');
	// 				const img = document.createElement('img');
	// 				img.classList.add('img-fluid', 'obj', 'img-250wh');
	// 				img.id = i;
	// 				img.file = file;
	// 				const cardHeader = document.createElement('div');
	// 				cardHeader.classList.add('card-header', 'text-right');
	// 				const iconClose = document.createElement('i');
	// 				iconClose.classList.add('ti-close', 'text-dark');
	// 				const closeButtonWrapper = document.createElement('div');
	// 				closeButtonWrapper.id = i;
	// 				closeButtonWrapper.classList = 'btn btn-sm close-img';
	// 				closeButtonWrapper.appendChild(iconClose);
	// 				cardHeader.appendChild(closeButtonWrapper);
	// 				const cardBody = document.createElement('div');
	// 				cardBody.classList.add('card-body');
	// 				const cardTextName = document.createElement('p');
	// 				cardTextName.classList.add('card-text', 'text-left', 'mb-0');
	// 				cardTextName.innerHTML = `<label class='fw-bold mb-0'>Tên ảnh:</label> ${file.name}`;
	// 				const cardTextSize = document.createElement("p");
	// 				cardTextSize.classList.add('card-text', 'text-left');
	// 				cardTextSize.innerHTML = `<label class='fw-bold mb-0'>Dung lượng ảnh:</label> ${formatBytes(file.size)}`;
	// 				cardBody.append(cardTextName, cardTextSize);

	// 				// Tạo thanh tiến trình
	// 				const progress = document.createElement('div');
	// 				progress.id = 'progress';
	// 				progress.classList.add('progress');
	// 				progress.style.display = 'none';
	// 				const progressBar = document.createElement('div');
	// 				progressBar.id = 'progress-bar';
	// 				progressBar.classList.add('progress-bar', 'progress-bar-info');
	// 				progressBar.setAttribute('role', 'progressbar');
	// 				progressBar.setAttribute('aria-valuemin', '0');
	// 				progressBar.setAttribute('aria-valuemax', '100');
	// 				progress.appendChild(progressBar);
	// 				card.append(cardHeader, img, cardBody, progress);
	// 				col.appendChild(card);
	// 				row.appendChild(col);
	// 				img.src = URL.createObjectURL(file);
	// 				img.onload = () => {
	// 					URL.revokeObjectURL(img.src);
	// 				};
	// 				previewImg.appendChild(row);
	// 				let closeBtns = document.querySelectorAll('.close-img');
	// 				closeBtns.forEach(btn => {
	// 					btn.addEventListener('click', () => {
	// 						let cardHeaderParent = btn.parentElement;
	// 						let colParent = cardHeaderParent.parentElement;
	// 						let rowParent = colParent.parentElement;
	// 						let cardParent = rowParent.parentElement
	// 						console.log(cardParent);
	// 						cardParent.remove();
	// 					})
	// 				})
	// 			}
	// 		}
	// 	};
	// }

	// const inputMultiVideoReExam = document.getElementById('input-multi-videos-re-exam');
	// const previewVideo = document.querySelector('.preview-videos-re-exam');

	// if (inputMultiVideoReExam) {
	// 	inputMultiVideoReExam.addEventListener('change', (e) => {
	// 		let files = e.target.files;
	// 		videosPreviewReExam(files);
	// 	})
	
	// 	let videosPreviewReExam = function (files) {
	// 		if (!files.length) {
	// 			previewVideo.innerHTML = "<p>No files selected!</p>";
	// 		} else {
	// 			previewVideo.innerHTML = "";
	// 			const row = document.createElement("div");
	// 			row.classList.add('row')
	// 			for (let i = 0; i < files.length; i++) {
	// 				const file = files[i];
	// 				const blob = new Blob([file], { type: "video/*",})
	// 				const col = document.createElement("div");
	// 				col.classList.add('col-xl-3', 'col-lg-3', 'col-md-3', 'col-sm-3');
	// 				const card = document.createElement("div");
	// 				card.classList.add('card', 'mb-3');
	// 				const video = document.createElement('video');
	// 				video.classList.add('obj', 'video-241wh');
	// 				video.id = i;
	// 				video.file = file;
	// 				const cardHeader = document.createElement('div');
	// 				cardHeader.classList.add('card-header', 'text-right');
	// 				const iconClose = document.createElement('i');
	// 				iconClose.classList.add('ti-close', 'text-dark');
	// 				const closeButtonWrapper = document.createElement('div');
	// 				closeButtonWrapper.id = i;
	// 				closeButtonWrapper.classList = 'btn btn-sm close-video';
	// 				closeButtonWrapper.appendChild(iconClose);
	// 				cardHeader.appendChild(closeButtonWrapper);
	// 				const cardBody = document.createElement('div');
	// 				cardBody.classList.add('card-body', 'p-2');
	// 				const cardTextName = document.createElement('p');
	// 				cardTextName.classList.add('card-text', 'text-left', 'mb-0');
	// 				cardTextName.innerHTML = `<label class='fw-bold mb-0'>Tên video:</label> ${file.name}`;
	// 				const cardTextSize = document.createElement("p");
	// 				cardTextSize.classList.add('card-text', 'text-left');
	// 				cardTextSize.innerHTML = `<label class='fw-bold mb-0'>Dung lượng video:</label> ${formatBytes(file.size)}`;
	// 				cardBody.append(cardTextName, cardTextSize);
	// 				cardBody.append(cardTextName, cardTextSize);
	// 				card.append(cardHeader, video, cardBody);
	// 				col.appendChild(card);
	// 				row.appendChild(col);
	// 				const objURL = URL.createObjectURL(blob);
	// 				video.src = objURL;
	// 				video.controls = true;
	// 				video.onload = () => {
	// 					URL.revokeObjectURL(objURL);
	// 				};
	// 				previewVideo.appendChild(row);
	// 				let closeBtns = document.querySelectorAll('.close-video');
	// 				closeBtns.forEach(btn => {
	// 					btn.addEventListener('click', () => {
	// 						let cardHeaderParent = btn.parentElement;
	// 						let colParent = cardHeaderParent.parentElement;
	// 						let rowParent = colParent.parentElement;
	// 						let cardParent = rowParent.parentElement
	// 						cardParent.remove();
	// 					})
	// 				})
	// 			}
	// 		}
	// 	};
	// }
	
	// Khai báo thư viện DropzoneJS
	// const { Dropzone } = require("dropzone");

	
	// Sử dụng thư viện DropzoneJS
	// var myDropzone = new Dropzone("#input-multi-images-re-exam", {
		
	// 	// Đường dẫn tệp hoặc một hàm dẫn đến tệp
	// 	url: null,

	// 	// Cấu hình cho phép tải lên nhiều tệp
	// 	uploadMultiple: true,
		
	// 	// Giới hạn kích thước tệp tối đa
	// 	maxFilesize: 100,
		
	// 	// Thêm các hình ảnh đã chọn vào phần xem trước
	// 	previewTemplate: document.querySelector('#preview-images-re-exam').innerHTML,
	// 	previewsContainer: "#preview-images-re-exam",
	// 	clickable: true
	// });
	
	// Xóa tất cả các tệp đã chọn
	// document.querySelector("#clear-all").addEventListener("click", function() {
	// 	myDropzone.removeAllFiles(true);
	// });
});

// Delete Re-Examination Image
var imageModalReExam = document.getElementById('imageModalReExam');

imageModalReExam.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');
	var modalImageReExam = document.getElementById('modal-img-re-exam');
	var inputDeleteImgReExam = document.getElementById('inputDeleteImgReExam');

	modalImageReExam.setAttribute('src', `${dataImgURL}`);
	modalImageReExam.setAttribute('src', `/re-examination/img/${dataImgName}`);
	inputDeleteImgReExam.value = dataImgName;

});

// // Restore Re-Examination Image
var restoreImageModalReExam = document.getElementById('restoreImageModalReExam');

restoreImageModalReExam.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');

	var restoreImageReExam = document.getElementById('restore-img-re-exam');
	var inputRestoreImageReExam = document.getElementById('inputRestoreImageReExam');

	restoreImageReExam.setAttribute('src', `${dataImgURL}`);
	// restoreImageReExam.setAttribute('src', `/re-examination/img/${dataImgName}`);
	inputRestoreImageReExam.value = dataImgName;

});


// // Delete Re-Examination Video
var videoModalReExam = document.getElementById('videoModalReExam');

videoModalReExam.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoName = button.getAttribute('data-name-video');
	var dataVideoURL = button.getAttribute('data-url-video');

	var modalVideoReExam = document.getElementById('modal-video-re-exam');
	var inputDeleteVideoReExam = document.getElementById('inputDeleteVideoReExam');

	modalVideoReExam.setAttribute('src', `${dataVideoURL}`);
	// modalVideoReExam.setAttribute('src', `/re-examination/video/${dataVideoName}`);
	inputDeleteVideoReExam.value = dataVideoName;
});

// // Restore Re-Examination Video
var restoreVideoModalReExam = document.getElementById('restoreVideoModalReExam');

restoreVideoModalReExam.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoName = button.getAttribute('data-name-video');
	var dataVideoURL = button.getAttribute('data-url-video');

	var restoreVideoReExam = document.getElementById('restore-video-re-exam');
	var inputRestoreVideoReExam = document.getElementById('inputRestoreVideoReExam');

	restoreVideoReExam.setAttribute('src', `${dataVideoURL}`);
	// restoreVideoReExam.setAttribute('src', `/re-examination/video/${dataVideoName}`);
	inputRestoreVideoReExam.value = dataVideoName;

});

var submitReExaminationForm = document.forms['submit-re-exam-form-done'];
var submitReExaminationModal = document.getElementById('submit-re-exam-modal-done');
var submitReExaminationBtn = document.getElementById('submit-re-exam-btn-done');

if (submitReExaminationBtn) {
	submitReExaminationBtn.addEventListener("click", () => {
		submitReExaminationForm.submit();
	});
}

if (submitReExaminationModal) {
	submitReExaminationModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let id = button.getAttribute("data-id");
		let customerID = button.getAttribute("data-cusId");
		let serviceNoteID = button.getAttribute("data-service-note-id");
		let reExamScheduleID = button.getAttribute("data-re-exam-schedule-id");
		let fullName = button.getAttribute("data-fullName");
		submitReExaminationForm.setAttribute('action', `/customer-care/employ/re-exam/${id}/done?_method=PATCH`);

		let submitCustomerID = document.getElementById('submit-re-exam-done-cusID');
		let submitServiceNoteID = document.getElementById('submit-re-exam-done-serviceNoteID');
		let submitReExamScheduleID = document.getElementById('submit-re-exam-done-reExaminationScheduleID');
		let submitFullName = document.getElementById('submit-re-exam-fullname');
		submitCustomerID.value = customerID;
		submitServiceNoteID.value = serviceNoteID;
		submitReExamScheduleID.value = reExamScheduleID;
		submitFullName.innerHTML = fullName;

	})
}

let slideIndex = 1;
showSlidesAfterImg(slideIndex);
showSlidesAfterVideo(slideIndex);

// Next/previous controls

function plusSlidesAfterImg(n) {
	showSlidesAfterImg(slideIndex += n);
}

function plusSlidesAfterVideo(n) {
	showSlidesAfterVideo(slideIndex += n);
}

// Thumbnail image controls

function currentSlideAfterImg(n) {
	showSlidesAfterImg(slideIndex = n);
}

function currentSlideAfterVideo(n) {
	showSlidesAfterVideo(slideIndex = n);
}

function showSlidesAfterImg(n) {
	let i;
	let slides = document.getElementsByClassName("slide-after-img");
	if(slides) {
		let dots = document.getElementsByClassName("dot");
		if (n > slides.length) {slideIndex = 1}
		if (n < 1) {slideIndex = slides.length}
		for (i = 0; i < slides.length; i++) {
		  slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
		  dots[i].className = dots[i].className.replace(" active-click", "");
		}
		if (slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";
		if (dots[slideIndex-1]) {
			dots[slideIndex-1].className += " active-click";
		}
	}
}

function showSlidesAfterVideo(n) {
	let i;
	let slides = document.getElementsByClassName("slide-after-video");
	if(slides) {
		let dots = document.getElementsByClassName("dot");
		if (n > slides.length) {slideIndex = 1}
		if (n < 1) {slideIndex = slides.length}
		for (i = 0; i < slides.length; i++) {
		  slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
		  dots[i].className = dots[i].className.replace(" active-click", "");
		}
		if (slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";
		if (dots[slideIndex-1]) {
			dots[slideIndex-1].className += " active-click";
		}
	}
}

function validate(formSelector) {
    function getParent (element, selector) {
        elementParent = element.parentElement;
        while (elementParent) {
            if (elementParent.matches(selector)) {
                return elementParent;
            }
            element = elementParent;
        }
    } 
    var formRules = {};
    var validateRules = {
        required: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },

        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập đúng email';
        },

        password: function (value) {
            return value ? undefined : 'Mật khẩu chưa đúng';
        },

        isNum: function (value) {
			var regex = /^[0-9]*$/;
			return regex.test(value) ? undefined : 'Số điện thoại không được chứa chữ cái';
		},

        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự`;
            }
        },

        max: function (max) {
            return function (value) {
                return value.length >= min ? undefined : `Vui lòng nhập nhiều nhất ${min} ký tự`;
            }
        },

        equal: function (equal) {
            return function (value) {
                return value.length == equal ? undefined : `Vui lòng nhập đủ ${equal} chữ số`;
            }
        },

        phone: function (value) {
            var phoneno = /^\d{10}$/;
            return phoneno.test(value) ? undefined : 'Số điện thoại không được chứa ký tự chữ cái và phải đủ 10 ký tự';
        }
    }
    var formElement = document.querySelector(formSelector);
    if (formElement) {
        var inputs = document.querySelectorAll('[name][rules]');
        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules) {
                var ruleParam;
                var isRuleHasValue = rule.includes(':');

                if (isRuleHasValue) {
                    ruleParam = rule.split(':');
                    rule = ruleParam[0];
                }

                var ruleFunction = validateRules[rule];

                if (isRuleHasValue) {
                    ruleFunction = ruleFunction(ruleParam[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunction);
                } else {
                    formRules[input.name] = [ruleFunction];
                }
            }

            // Listen event (blur, change, input)
            input.addEventListener('blur', handleEmptyInput);
            input.addEventListener('input', handleClearError);
        }

        // ham thuc hien validate
        var errorMessage;
        function handleEmptyInput (event) {
            var rules = formRules[event.target.name];
            rules.some(rule => {
                errorMessage = rule(event.target.value);
                return errorMessage;
            })

            // Neu co loi thi hien thi message loi ra UI
            if (errorMessage) {
                var formGroup = getParent(event.target, '.form-group');
                if (formGroup) {
                    var formMessage = formGroup.querySelector('.form-message');
                    var formInput = formGroup.querySelector('.form-control');
                    formInput.classList.add('invalid');
                    if (formMessage) {
                        formMessage.innerText = errorMessage;
                        formMessage.classList.add('text-danger');
                    }
                }
            }
            return !errorMessage;
        }

        function handleClearError(event) {
            var formGroup = getParent(event.target, '.form-group');
            var formInput = formGroup.querySelector('.form-control');
            var formMessage = formGroup.querySelector('.form-message');
            if (formInput.classList.contains('invalid') || formMessage.classList.contains('text-danger')) {
                formInput.classList.remove('invalid');
                if (formMessage) {
                    formMessage.innerText = '';
                }
            }
        }
    }

    // Xu ly hanh vi submit form
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        var inputs = document.querySelectorAll('[name][rules]');
        var isValid = true;
        for (var input of inputs) {
            if (!handleEmptyInput({target: input})) {
                isValid = false;
            };
        }
        
        // Khi khong co loi thi submit form
        if (isValid) {
            formElement.submit();
        }
    });

}

// const uploadImgBtn = document.getElementById('upload-img-btn');
// const uploadImgForm = document.getElementById('submit-re-exam-form-upload-img');
// uploadImgBtn.addEventListener('click', () => {
//     uploadImgForm.submit();
// })