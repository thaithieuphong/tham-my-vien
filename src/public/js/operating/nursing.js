var subDoctorForm = document.forms['submit-doctor-form'];
var subDoctorModal = document.getElementById('submit-doctor-modal');
var subDoctorBtn = document.getElementById('submit-form-doctor-btn');

if (subDoctorBtn) {
	subDoctorBtn.addEventListener("click", () => {
		subDoctorForm.submit();
	
	});
}

if (subDoctorModal) {
	subDoctorModal.addEventListener('show.bs.modal', function(event){
		var button = event.relatedTarget;
		var id = button.getAttribute("data-id")
		subDoctorForm.setAttribute('action', `/operating-room/nursing/service-note/${id}?_method=PATCH`)
	})
}

document.addEventListener("DOMContentLoaded", function () {
	let inputMultiImageCounselor = document.getElementById('input-multi-images-counselor');
	if(inputMultiImageCounselor) {
		inputMultiImageCounselor.addEventListener('change', (e) => {
			let files = e.target;//event.target.files;
			imagesPreviewCounselor(files);
		})
	
		let imagesPreviewCounselor = function (input) {
			let inputFiles = Array.from(input.files);
			if (input.files) {
				// let filesAmount = inputFiles.length
				for (let i = 0; i < inputFiles.length; i++) {
					let reader = new FileReader();
					let newImage = document.createElement('img');
					let closeButtonLink = document.createElement('button');
					let divMain = document.createElement('figure');
					reader.addEventListener('load', (event) => {
						// newImage.setAttribute('alt', filesAmount)
						let src = event.target.result;
						divMain.classList = 'col-md-4 col-sm figure img-container position-relative mt-2';
						divMain.id = i;
						newImage.src = src;
						newImage.classList = 'figure-img img-fluid rounded img-cover';
						newImage.id = i;
						closeButtonLink.id = i;
						closeButtonLink.type = 'button';
						closeButtonLink.ariaLabel = 'Close';
						closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-4 mt-2 close-img';
						let imgc = document.querySelector('.preview-images-counselor');
						divMain.append(newImage, closeButtonLink);
						imgc.append(divMain);
						let closeBtns = document.querySelectorAll('.close-img');
						closeBtns.forEach(btn => {
							btn.addEventListener('click', () => {
								let parent = btn.parentElement;
								parent.remove();
							})
						})
					});
					reader.readAsDataURL(inputFiles[i]);
				}
			}
		};
	}

	let inputMultiVideoCounselor = document.getElementById('input-multi-videos-counselor');
	if (inputMultiVideoCounselor) {

		inputMultiVideoCounselor.addEventListener('change', (e) => {
			let files = e.target;//event.target.files;
			videosPreviewCounselor(files);
		})
	
		let videosPreviewCounselor = function (input) {
			let inputFiles = Array.from(input.files);
			if (input.files) {
				for (i = 0; i < inputFiles.length; i++) {
					let reader = new FileReader();
					reader.onload = function (event) {
						let newVideo = document.createElement('video');
						let closeButtonLink = document.createElement('button');
						let divMain = document.createElement('figure');
						let src = event.target.result;
						divMain.classList = 'col-md-4 col-sm figure imgbox position-relative mt-2';
						divMain.id = i;
						newVideo.src = src;
						newVideo.classList = 'img-fluid';
						newVideo.controls = true;
						newVideo.id = i;
						closeButtonLink.type = 'button';
						closeButtonLink.id = i;
						closeButtonLink.ariaLabel = 'Close';
						closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-4 mt-2 close-video';
						let videoc = document.querySelector('.preview-videos-counselor');
						divMain.append(newVideo, closeButtonLink);
						videoc.append(divMain);
						let closeBtn = document.querySelectorAll('.close-video');
						closeBtn.forEach(btn => {
							btn.addEventListener('click', (e) => {
								let parent = btn.parentElement;
								parent.remove();
							})
						})
					};
					reader.readAsDataURL(inputFiles[i]);
				}
			}
		};
	}

	let inputMultiImageBefore = document.getElementById('input-multi-images-before');
	if(inputMultiImageBefore) {
		inputMultiImageBefore.addEventListener('change', (e) => {
			let files = e.target;//event.target.files;
			imagesPreviewBefore(files);
		})
	
		let imagesPreviewBefore = function (input) {
			let inputFiles = Array.from(input.files);
			if (input.files) {
				// let filesAmount = inputFiles.length
				for (let i = 0; i < inputFiles.length; i++) {
					let reader = new FileReader();
					let newImage = document.createElement('img');
					let closeButtonLink = document.createElement('button');
					let divMain = document.createElement('figure');
					reader.addEventListener('load', (event) => {
						// newImage.setAttribute('alt', filesAmount)
						let src = event.target.result;
						divMain.classList = 'col-md-4 col-sm figure img-container position-relative mt-2';
						divMain.id = i;
						newImage.src = src;
						newImage.classList = 'figure-img img-fluid rounded img-cover';
						newImage.id = i;
						closeButtonLink.id = i;
						closeButtonLink.type = 'button';
						closeButtonLink.ariaLabel = 'Close';
						closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-4 mt-2 close-img';
						let imgc = document.querySelector('.preview-images-before');
						divMain.append(newImage, closeButtonLink);
						imgc.append(divMain);
						let closeBtns = document.querySelectorAll('.close-img');
						closeBtns.forEach(btn => {
							btn.addEventListener('click', () => {
								let parent = btn.parentElement;
								parent.remove();
							})
						})
					});
					reader.readAsDataURL(inputFiles[i]);
				}
			}
		};
	}

	let inputMultiVideoBefore = document.getElementById('input-multi-videos-before');
	if (inputMultiVideoBefore) {
		inputMultiVideoBefore.addEventListener('change', (e) => {
			let files = e.target;//event.target.files;
			videosPreviewBefore(files);
		})
	
		let videosPreviewBefore = function (input) {
			let inputFiles = Array.from(input.files);
			if (input.files) {
				for (i = 0; i < inputFiles.length; i++) {
					let reader = new FileReader();
					reader.onload = function (event) {
						let newVideo = document.createElement('video');
						let closeButtonLink = document.createElement('button');
						let divMain = document.createElement('figure');
						let src = event.target.result;
						divMain.classList = 'col-md-4 col-sm figure imgbox position-relative mt-2';
						divMain.id = i;
						newVideo.src = src;
						newVideo.classList = 'img-fluid';
						newVideo.controls = true;
						newVideo.id = i;
						closeButtonLink.type = 'button';
						closeButtonLink.id = i;
						closeButtonLink.ariaLabel = 'Close';
						closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-4 mt-2 close-video';
						let videoc = document.querySelector('.preview-videos-before');
						divMain.append(newVideo, closeButtonLink);
						videoc.append(divMain);
						let closeBtn = document.querySelectorAll('.close-video');
						closeBtn.forEach(btn => {
							btn.addEventListener('click', (e) => {
								let parent = btn.parentElement;
								parent.remove();
							})
						})
					};
					reader.readAsDataURL(inputFiles[i]);
				}
			}
		};
	}

	let inputMultiImageAfter = document.getElementById('input-multi-images-after');
	if (inputMultiImageAfter) {
		inputMultiImageAfter.addEventListener('change', (e) => {
			let files = e.target;//event.target.files;
			imagesPreviewAfter(files);
		})
	
		let imagesPreviewAfter = function (input) {
			let inputFiles = Array.from(input.files);
			if (input.files) {
				// let filesAmount = inputFiles.length
				for (let i = 0; i < inputFiles.length; i++) {
					let reader = new FileReader();
					let newImage = document.createElement('img');
					let closeButtonLink = document.createElement('button');
					let divMain = document.createElement('figure');
					reader.addEventListener('load', (event) => {
						// newImage.setAttribute('alt', filesAmount)
						let src = event.target.result;
						divMain.classList = 'col-md-4 col-sm figure img-container position-relative mt-2';
						divMain.id = i;
						newImage.src = src;
						newImage.classList = 'figure-img img-fluid rounded img-cover';
						newImage.id = i;
						closeButtonLink.id = i;
						closeButtonLink.type = 'button';
						closeButtonLink.ariaLabel = 'Close';
						closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-4 mt-2 close-img';
						let imgc = document.querySelector('.preview-images-after');
						divMain.append(newImage, closeButtonLink);
						imgc.append(divMain);
						let closeBtns = document.querySelectorAll('.close-img');
						closeBtns.forEach(btn => {
							btn.addEventListener('click', () => {
								let parent = btn.parentElement;
								parent.remove();
							})
						})
					});
					reader.readAsDataURL(inputFiles[i]);
				}
			}
		};
	}

	let inputMultiVideoAfter = document.getElementById('input-multi-videos-after');
	if (inputMultiVideoAfter) {
		inputMultiVideoAfter.addEventListener('change', (e) => {
			let files = e.target;//event.target.files;
			videosPreviewAfter(files);
		})
	
		let videosPreviewAfter = function (input) {
			let inputFiles = Array.from(input.files);
			if (input.files) {
				for (i = 0; i < inputFiles.length; i++) {
					let reader = new FileReader();
					reader.onload = function (event) {
						let newVideo = document.createElement('video');
						let closeButtonLink = document.createElement('button');
						let divMain = document.createElement('figure');
						let src = event.target.result;
						divMain.classList = 'col-md-4 col-sm figure imgbox position-relative mt-2';
						divMain.id = i;
						newVideo.src = src;
						newVideo.classList = 'img-fluid';
						newVideo.controls = true;
						newVideo.id = i;
						closeButtonLink.type = 'button';
						closeButtonLink.id = i;
						closeButtonLink.ariaLabel = 'Close';
						closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-4 mt-2 close-video';
						let videoc = document.querySelector('.preview-videos-after');
						divMain.append(newVideo, closeButtonLink);
						videoc.append(divMain);
						let closeBtn = document.querySelectorAll('.close-video');
						closeBtn.forEach(btn => {
							btn.addEventListener('click', (e) => {
								let parent = btn.parentElement;
								parent.remove();
							})
						})
					};
					reader.readAsDataURL(inputFiles[i]);
				}
			}
		};
	}
});

// Handle push data to delete modal
var deleteSchedule = document.getElementById("delete-schedule-modal");
if (deleteSchedule) {
	deleteSchedule.addEventListener("show.bs.modal", function (event) {
		// Button that triggered the modal
		var button = event.relatedTarget;
		// Get data from delete button
		var serviceNoteId = button.getAttribute('data-delete-id');
		var firstName = button.getAttribute("data-delete-firstname");
		var lastName = button.getAttribute("data-delete-lastname");
		var cusID = button.getAttribute("data-delete-customerID");
		// Get element need embeded input
		var deleteSchedule = document.getElementById("delete-schedule");
		var deleteCusID = document.getElementById("delete-cusID");
		deleteScheduleForm.setAttribute('action', `/operating-room/nursing/${serviceNoteId}/schedule?_method=DELETE`);
	
		deleteCusID.value = cusID;
		deleteSchedule.innerHTML = firstName + ' ' + lastName;
	});
}

// Handle delete info Customer
var deleteBtn = document.getElementById("delete-schedule-btn");
var deleteScheduleForm = document.forms["delete-schedule-form"];
if (deleteBtn) {
	deleteBtn.addEventListener("click", () => {
		deleteScheduleForm.submit();
	});
}


var restoreServiceNote = document.getElementById("restore-service-note-modal");
if (restoreServiceNote) {
	restoreServiceNote.addEventListener("show.bs.modal", function (event) {
		// Button that triggered the modal
		var button = event.relatedTarget;
		// Get data from delete button
		var serviceNoteId = button.getAttribute('data-restore-id');
		var firstName = button.getAttribute("data-restore-firstname");
		var lastName = button.getAttribute("data-restore-lastname");
	
		// Get element need embeded input
		var restoreUser = document.getElementById("restore-service-note");
	
		restoreServiceNoteForm.setAttribute('action', `/operating-room/nursing/schedule/${serviceNoteId}/restore?_method=PATCH`);
		restoreUser.innerText = `${firstName} ${lastName}`;
	});
	
	// Handle delete info Customer
	var restoreServiceNoteBtn = document.getElementById("restore-service-note-btn");
	var restoreServiceNoteForm = document.forms["restore-service-note-form"];
	restoreServiceNoteBtn.addEventListener("click", () => {
		restoreServiceNoteForm.submit();
	});
}




var serviceContainer = document.getElementById('service-container')
var createService = function(str) {
	let divContainer = document.createElement('div');
	divContainer.setAttribute('class', 'input-group input-group-sm mb-1');
	let btnClose = document.createElement('button');
	btnClose.setAttribute('class', 'btn btn-danger btn-sm close-btn');
	let iconClose = document.createElement('i');
	iconClose.setAttribute('class', 'ti-close');
	btnClose.append(iconClose);
	let inputService = document.createElement('span');
	inputService.innerHTML = str;
	inputService.setAttribute('class', 'input-group-text text-light bg-info text-wrap');
	let inputPrice = document.createElement('input');
	inputPrice.setAttribute('class', 'form-control text-right input-price');
	divContainer.append(inputService, inputPrice, btnClose)
	serviceContainer.append(divContainer)
}

let funMoney = function sum(a) {
	
	return total += a;
}

var addServicesBtn = document.getElementById('add-services');
var selectServices = document.getElementById('select-service');
var totalInput = document.getElementById('total');
var priceBefore = document.getElementById('price-before');



if (addServicesBtn) {
	totalInput.value = priceBefore.value
	addServicesBtn.addEventListener('click', () => {
		let textService = selectServices.value;
		textService.length > 20 ? textService = textService.slice(0, 20) + '...' : textService;
		let arrMoney = [];
		let moneyBefore = Number(totalInput.value.replace(/[^0-9.-]+/g,""));
		createService(textService);
		let inputPrice = document.querySelectorAll('.input-price');
		var formatter = new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		});
		inputPrice.forEach((item, index) => {
			item.setAttribute('id', index);
			item.addEventListener('input', function(e) {
				let total = 0;
				var convertMoney = parseFloat(e.target.value.replace(/\D/g,''), 10);
				let convertedMoney = convertMoney.toLocaleString();
				this.value = convertedMoney;
				let totalMoney = moneyBefore + (total += convertMoney);
				  
				let totalFinal = formatter.format(totalMoney);
				totalInput.value = totalMoney;
			});
		});
		let closeBtn = document.querySelectorAll('.close-btn');
		closeBtn.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				let parent = btn.parentElement;
				parent.remove();
			})
		})
	});
}