
// var submitWoundCleaningForm = document.forms['submit-wound-cleaning-form'];
// var submitWoundCleaningFormBtn = document.getElementById('submit-wound-cleaning-form-btn');
// if (submitWoundCleaningFormBtn) {
// 	submitWoundCleaningFormBtn.addEventListener("click", () => {
// 		submitWoundCleaningForm.submit();
// 	});
// }

document.addEventListener("DOMContentLoaded", function () {

	// const inputMultiImageWoundCleaning = document.getElementById('input-multi-images-wound-cleaning');
	// const previewImg = document.querySelector('.preview-images-wound-cleaning');
	// if (inputMultiImageWoundCleaning) {
	// 	inputMultiImageWoundCleaning.addEventListener('change', (e) => {
	// 		let files = e.target.files; //event.target.files;
	// 		imagesPreviewWoundCleaning(files);
	// 	})

	// 	function imagesPreviewWoundCleaning(files) {
	// 		if (!files.length) {
	// 			previewImg.innerHTML = "<p>No files selected!</p>";
	// 		} else {
	// 			previewImg.innerHTML = "";
	// 			for (let i = 0; i < files.length; i++) {
	// 				const file = files[i];
	// 				const card = document.createElement("div");
	// 				card.classList.add('card', 'mb-3');
	// 				const row = document.createElement("div");
	// 				row.classList.add('row')
	// 				card.appendChild(row);
	// 				const col4 = document.createElement('div');
	// 				col4.classList.add('col-md-4', 'pe-0');
	// 				const img = document.createElement('img');
	// 				img.classList.add('img-fluid', 'obj');
	// 				img.id = i;
	// 				img.file = file;
	// 				col4.appendChild(img);
	// 				const col8 = document.createElement('div');
	// 				col8.classList.add('col-md-8', 'ps-0');
	// 				const cardHeader = document.createElement('div');
	// 				cardHeader.classList.add('card-header', 'position-relative', 'p-0', 'pt-1-25rem', 'pb-1-25rem');
	// 				const iconClose = document.createElement('i');
	// 				iconClose.classList.add('ti-close', 'text-dark');
	// 				const closeButtonWrapper = document.createElement('div');
	// 				closeButtonWrapper.id = i;
	// 				closeButtonWrapper.classList = 'btn btn-sm position-absolute top-50 end-0 translate-middle close-img';
	// 				closeButtonWrapper.appendChild(iconClose);
	// 				cardHeader.appendChild(closeButtonWrapper);
	// 				const cardBody = document.createElement('div');
	// 				cardBody.classList.add('card-body', 'ps-3', 'pt-0', 'pb-0', 'pe-0');
	// 				const cardTextName = document.createElement('p');
	// 				cardTextName.classList.add('card-text', 'text-left', 'mb-0');
	// 				cardTextName.innerHTML = `<label class='fw-bold mb-0'>Tên ảnh:</label> ${file.name}`;
	// 				const cardTextSize = document.createElement("p");
	// 				cardTextSize.classList.add('card-text', 'text-left');
	// 				cardTextSize.innerHTML = `<label class='fw-bold mb-0'>Dung lượng ảnh:</label> ${formatBytes(file.size)}`;
	// 				cardBody.append(cardTextName, cardTextSize);
	// 				col8.append(cardHeader, cardBody);
	// 				row.append(col4, col8);
	// 				card.appendChild(row)
	// 				img.src = URL.createObjectURL(file);
	// 				img.onload = () => {
	// 					URL.revokeObjectURL(img.src);
	// 				};
	// 				previewImg.appendChild(card);
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
	// 	}
	// }

	// const inputMultiVideoWoundCleaning = document.getElementById('input-multi-videos-wound-cleaning');
	// const previewVideo = document.querySelector('.preview-videos-wound-cleaning');
	// if (inputMultiVideoWoundCleaning) {
	// 	inputMultiVideoWoundCleaning.addEventListener('change', (e) => {
	// 		let files = e.target.files;
	// 		videosPreviewWoundCleaning(files);
	// 	})

	// 	function formatBytes(bytes, decimals = 2) {
	// 		if (!+bytes) return '0 Bytes'
		
	// 		const k = 1024
	// 		const dm = decimals < 0 ? 0 : decimals
	// 		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
		
	// 		const i = Math.floor(Math.log(bytes) / Math.log(k))
		
	// 		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
	// 	}

	// 	function videosPreviewWoundCleaning(files) {

	// 		if (!files.length) {
	// 			previewVideo.innerHTML = "<p>No files selected!</p>";
	// 		} else {
	// 			previewVideo.innerHTML = "";
	// 			for (let i = 0; i < files.length; i++) {
	// 				const file = files[i];
	// 				const blob = new Blob([file], { type: "video/*",})
	// 				console.log(blob);
	// 				const card = document.createElement("div");
	// 				card.classList.add('card', 'mb-3');
	// 				const row = document.createElement("div");
	// 				row.classList.add('row')
	// 				card.appendChild(row);
	// 				const col4 = document.createElement('div');
	// 				col4.classList.add('col-md-4', 'pe-0');
	// 				const video = document.createElement('video');
	// 				video.classList.add('obj', 'video-style');
	// 				video.id = i;
	// 				video.file = file;
	// 				col4.appendChild(video);
	// 				const col8 = document.createElement('div');
	// 				col8.classList.add('col-md-8', 'ps-0');
	// 				const cardHeader = document.createElement('div');
	// 				cardHeader.classList.add('card-header', 'position-relative', 'p-0', 'pt-1-25rem', 'pb-1-25rem');
	// 				const iconClose = document.createElement('i');
	// 				iconClose.classList.add('ti-close', 'text-dark');
	// 				const closeButtonWrapper = document.createElement('div');
	// 				closeButtonWrapper.id = i;
	// 				closeButtonWrapper.classList = 'btn btn-sm position-absolute top-50 end-0 translate-middle close-video';
	// 				closeButtonWrapper.appendChild(iconClose);
	// 				cardHeader.appendChild(closeButtonWrapper);
	// 				const cardBody = document.createElement('div');
	// 				cardBody.classList.add('card-body', 'ps-3', 'pt-0', 'pb-0', 'pe-0');
	// 				const cardTextName = document.createElement('p');
	// 				cardTextName.classList.add('card-text', 'text-left', 'mb-0');
	// 				cardTextName.innerHTML = `<label class='fw-bold mb-0'>Tên video:</label> ${file.name}`;
	// 				const cardTextSize = document.createElement("p");
	// 				cardTextSize.classList.add('card-text', 'text-left');
	// 				cardTextSize.innerHTML = `<label class='fw-bold mb-0'>Dung lượng video:</label> ${formatBytes(file.size)}`;
	// 				cardBody.append(cardTextName, cardTextSize);
	// 				col8.append(cardHeader, cardBody);
	// 				row.append(col4, col8);
	// 				card.appendChild(row)
	// 				const objURL = URL.createObjectURL(blob);
	// 				video.src = objURL;
	// 				video.controls = true;
	// 				video.onload = () => {
	// 					URL.revokeObjectURL(objURL);
	// 				};
	// 				previewVideo.appendChild(card);
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
	// 	}
	// }
});

// Delete WoundCleaning Image
var imageModalWoundCleaning = document.getElementById('imageModalWoundCleaning');

imageModalWoundCleaning.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');
	var modalImageWoundCleaning = document.getElementById('modal-img-wound-cleaning');
	var inputDeleteImgWoundCleaning = document.getElementById('inputDeleteImgWoundCleaning');

	modalImageWoundCleaning.setAttribute('src', `${dataImgURL}`);
	// modalImageWoundCleaning.setAttribute('src', `/wound-cleaning/img/${dataImg}`);
	inputDeleteImgWoundCleaning.value = dataImgName;

});

// Restore WoundCleaning Image
var restoreImageModalWoundCleaning = document.getElementById('restoreImageModalWoundCleaning');

restoreImageModalWoundCleaning.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgURL = button.getAttribute('data-url-img');
	var dataImgName = button.getAttribute('data-name-img');

	var restoreImageWoundCleaning = document.getElementById('restore-img-wound-cleaning');
	var inputRestoreImageWoundCleaning = document.getElementById('inputRestoreImageWoundCleaning');

	restoreImageWoundCleaning.setAttribute('src', `${dataImgURL}`);
	// restoreImageWoundCleaning.setAttribute('src', `/wound-cleaning/img/${dataImg}`);
	inputRestoreImageWoundCleaning.value = dataImgName;

});


// Delete WoundCleaning Video
var videoModalWoundCleaning = document.getElementById('videoModalWoundCleaning');

videoModalWoundCleaning.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoURL = button.getAttribute('data-url-video');
	var dataVideoName = button.getAttribute('data-name-video');
	var modalVideoWoundCleaning = document.getElementById('modal-video-wound-cleaning');
	var inputDeleteVideoWoundCleaning = document.getElementById('inputDeleteVideoWoundCleaning');

	modalVideoWoundCleaning.setAttribute('src', `${dataVideoURL}`);
	// modalVideoWoundCleaning.setAttribute('src', `/wound-cleaning/video/${dataVideo}`);
	inputDeleteVideoWoundCleaning.value = dataVideoName;
});

// Restore WoundCleaning Video
var restoreVideoModalWoundCleaning = document.getElementById('restoreVideoModalWoundCleaning');

restoreVideoModalWoundCleaning.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoURL = button.getAttribute('data-url-video');
	var dataVideoName = button.getAttribute('data-name-video');
	var restoreVideoWoundCleaning = document.getElementById('restore-video-wound-cleaning');
	var inputRestoreVideoWoundCleaning = document.getElementById('inputRestoreVideoWoundCleaning');

	restoreVideoWoundCleaning.setAttribute('src', `${dataVideoURL}`);
	// restoreVideoWoundCleaning.setAttribute('src', `/wound-cleaning/video/${dataVideo}`);
	inputRestoreVideoWoundCleaning.value = dataVideoName;

});

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
	if (slides) {
		let dots = document.getElementsByClassName("dot");
		if (n > slides.length) { slideIndex = 1 }
		if (n < 1) { slideIndex = slides.length }
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(" active-click", "");
		}
		if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
		if (dots[slideIndex - 1]) {
			dots[slideIndex - 1].className += " active-click";
		}
	}
}

function showSlidesAfterVideo(n) {
	let i;
	let slides = document.getElementsByClassName("slide-after-video");
	if (slides) {
		let dots = document.getElementsByClassName("dot");
		if (n > slides.length) { slideIndex = 1 }
		if (n < 1) { slideIndex = slides.length }
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(" active-click", "");
		}
		if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
		if (dots[slideIndex - 1]) {
			dots[slideIndex - 1].className += " active-click";
		}
	}
}

function validate(formSelector) {
	function getParent(element, selector) {
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
		function handleEmptyInput(event) {
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
			if (!handleEmptyInput({ target: input })) {
				isValid = false;
			};
		}

		// Khi khong co loi thi submit form
		if (isValid) {
			formElement.submit();
		}
	});

}

// Modal move to re-examination
var submitWoundCleaningForm = document.forms['submit-wound-cleaning-done-form'];
var submitWoundCleaningModal = document.getElementById('submit-wound-cleaning-modal-done');
var submitWoundCleaningBtn = document.getElementById('submit-wound-cleaning-btn');

if (submitWoundCleaningBtn) {
	submitWoundCleaningBtn.addEventListener("click", () => {
		submitWoundCleaningForm.submit();
	});
}

if (submitWoundCleaningModal) {
	submitWoundCleaningModal.addEventListener('show.bs.modal', function (event) {
		var button = event.relatedTarget;
		let dataWoundCleaningID = button.getAttribute("data-wound-cleaning-id");
		let dataCusID = button.getAttribute("data-wound-cleaning-customer-id");
		let dataFullName = button.getAttribute("data-wound-cleaning-cutomer-fullName");
		let dataServiceNoteID = button.getAttribute("data-wound-cleaning-serviceNoteID");
		let dataWoundCleaningScheduleID = button.getAttribute("data-wound-cleaning-woundCleaningScheduleID");

		submitWoundCleaningForm.setAttribute('action', `/customer-care/employ/wound-cleaning/${dataWoundCleaningID}/done?_method=PATCH`);

		var inputCusID = document.getElementById('submit-wound-cleaning-cusID');
		var inputFullName = document.getElementById('submit-wound-cleaning-fullName');
		var labelFullName = document.getElementById('submit-wound-cleaning-fullname');
		var inputServiceNoteID = document.getElementById('submit-wound-cleaning-serviceNoteID');
		var inputWoundCleaningScheduleID = document.getElementById('submit-wound-cleaning-woundCleaningScheduleID');
		labelFullName.innerHTML = dataFullName;
		inputCusID.value = dataCusID;
		inputFullName.value = dataFullName;
		inputServiceNoteID.value = dataServiceNoteID;
		inputWoundCleaningScheduleID.value = dataWoundCleaningScheduleID;
	})
}