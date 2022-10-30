var createCusInfoForm = document.forms['create-customer-information-form'];
var createCusInfoBtn = document.getElementById('create-customer-information-btn');

if (createCusInfoBtn) {
	createCusInfoBtn.addEventListener("click", () => {
		createCusInfoForm.submit();
	});
}

var submitCustomerForm = document.forms['submit-customer-form'];
var submitCusFormBtn = document.getElementById('submit-customer-form-btn');
if (submitCusFormBtn) {
	submitCusFormBtn.addEventListener("click", () => {
		submitCustomerForm.submit();
	});
}

var submitServiceForm = document.forms['submit-service-form'];
var submitServiceFormBtn = document.getElementById('submit-service-form-btn');
if (submitServiceFormBtn) {
	submitServiceFormBtn.addEventListener("click", () => {
		submitServiceForm.submit();
	});
}

var submitCounselorForm = document.forms['submit-counselor-form'];
var submitCounselorFormBtn = document.getElementById('submit-counselor-form-btn');
if (submitCounselorFormBtn) {
	submitCounselorFormBtn.addEventListener("click", () => {
		submitCounselorForm.submit();
	});
}

var submitBeforeForm = document.forms['submit-before-form'];
var submitBeforeFormBtn = document.getElementById('submit-before-form-btn');
if (submitBeforeFormBtn) {
	submitBeforeFormBtn.addEventListener("click", () => {
		submitBeforeForm.submit();
	});
}

var submitInSurgeryForm = document.forms['submit-inSurgery-form'];
var submitInSurgeryFormBtn = document.getElementById('submit-in-surgery-form-btn');
if (submitInSurgeryFormBtn) {
	submitInSurgeryFormBtn.addEventListener("click", () => {
		submitInSurgeryForm.submit();
	});
}

var submitAfterForm = document.forms['submit-after-form'];
var submitAfterFormBtn = document.getElementById('submit-after-form-btn');
if (submitAfterFormBtn) {
	submitAfterFormBtn.addEventListener("click", () => {
		submitAfterForm.submit();
	});
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
					let iconClose = document.createElement('i');
					iconClose.setAttribute('class', 'ti-close');
					let closeButtonLink = document.createElement('div');
					closeButtonLink.append(iconClose);
					let divMain = document.createElement('figure');
					reader.addEventListener('load', (event) => {
						let src = event.target.result;
						divMain.classList = 'col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-6 figure img-container position-relative mt-2';
						divMain.id = i;
						newImage.src = src;
						newImage.classList = 'figure-img img-fluid rounded img-cover';
						newImage.id = i;
						closeButtonLink.id = i;
						closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 mr-4 mt-2 close-img';
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
			let files = e.target;
			videosPreviewCounselor(files);
		})
	
		let videosPreviewCounselor = function (input) {
			let inputFiles = Array.from(input.files);
			if (input.files) {
				for (i = 0; i < inputFiles.length; i++) {
					let reader = new FileReader();
					reader.onload = function (event) {
						let newVideo = document.createElement('video');
						let iconClose = document.createElement('i');
						iconClose.setAttribute('class', 'ti-close');
						let closeButtonLink = document.createElement('div');
						closeButtonLink.append(iconClose);
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
						// closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-4 mt-2 close-video';
						closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 mr-4 mt-2 close-img';
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
					let iconClose = document.createElement('i');
					iconClose.setAttribute('class', 'ti-close');
					let closeButtonLink = document.createElement('div');
					closeButtonLink.append(iconClose);
					let divMain = document.createElement('figure');
					reader.addEventListener('load', (event) => {
						let src = event.target.result;
						divMain.classList = 'col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-6 figure img-container position-relative mt-2';
						divMain.id = i;
						newImage.src = src;
						newImage.classList = 'figure-img img-fluid rounded img-cover';
						newImage.id = i;
						closeButtonLink.id = i;
						closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 mr-4 mt-2 close-img';
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
			let files = e.target;
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

	let inputMultiImageInSurgery = document.getElementById('input-multi-images-in-surgery');
	if(inputMultiImageInSurgery) {
		inputMultiImageInSurgery.addEventListener('change', (e) => {
			let files = e.target; //event.target.files;
			imagesPreviewInSurgery(files);
		})
	
		let imagesPreviewInSurgery = function (input) {
			let inputFiles = Array.from(input.files);
			if (input.files) {
				// let filesAmount = inputFiles.length
				for (let i = 0; i < inputFiles.length; i++) {
					let reader = new FileReader();
					let newImage = document.createElement('img');
					let iconClose = document.createElement('i');
					iconClose.setAttribute('class', 'ti-close');
					let closeButtonLink = document.createElement('div');
					closeButtonLink.append(iconClose);
					let divMain = document.createElement('figure');
					reader.addEventListener('load', (event) => {
						let src = event.target.result;
						divMain.classList = 'col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-6 figure img-container position-relative mt-2';
						divMain.id = i;
						newImage.src = src;
						newImage.classList = 'figure-img img-fluid rounded img-cover';
						newImage.id = i;
						closeButtonLink.id = i;
						closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 mr-4 mt-2 close-img';
						let imgc = document.querySelector('.preview-images-in-surgery');
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

	let inputMultiVideoInSurgery = document.getElementById('input-multi-videos-in-surgery');
	if (inputMultiVideoInSurgery) {
		inputMultiVideoInSurgery.addEventListener('change', (e) => {
			let files = e.target;
			videosPreviewInSurgery(files);
		})
	
		let videosPreviewInSurgery = function (input) {
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
						let videoc = document.querySelector('.preview-videos-in-surgery');
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
	if(inputMultiImageAfter) {
		inputMultiImageAfter.addEventListener('change', (e) => {
			let files = e.target;//event.target.files;
			imagesPreviewAfter(files);
		})
	
		let imagesPreviewAfter = function (input) {
			let inputFiles = Array.from(input.files);
			if (input.files) {
				for (let i = 0; i < inputFiles.length; i++) {
					let reader = new FileReader();
					let newImage = document.createElement('img');
					let iconClose = document.createElement('i');
					iconClose.setAttribute('class', 'ti-close');
					let closeButtonLink = document.createElement('div');
					closeButtonLink.append(iconClose);
					let divMain = document.createElement('figure');
					reader.addEventListener('load', (event) => {
						let src = event.target.result;
						divMain.classList = 'col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-6 figure img-container position-relative mt-2';
						divMain.id = i;
						newImage.src = src;
						newImage.classList = 'figure-img img-fluid rounded img-cover';
						newImage.id = i;
						closeButtonLink.id = i;
						closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 mr-4 mt-2 close-img';
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
			let files = e.target;
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


function totalMoneyFn(before, current) {
	console.log('before', before);
	console.log('current', current);
	return before + current.price;
}

// Hàm tạo dịch vụ mới
var serviceContainer = document.getElementById('service-container')
var createService = function(str) {
	let divInputGroup = document.createElement('div');
	let inputLabelHidden = document.createElement('input');
	inputLabelHidden.hidden = true;
	inputLabelHidden.value = str;
	inputLabelHidden.setAttribute('name', 'service');
	divInputGroup.setAttribute('class', 'input-group mb-3 input-group-service');
	let divContainer = document.createElement('div');
	divContainer.setAttribute('class', 'form-floating');
	let btnClose = document.createElement('button');
	btnClose.setAttribute('class', 'btn btn-danger close-btn');
	let iconClose = document.createElement('i');
	iconClose.setAttribute('class', 'ti-close');
	btnClose.append(iconClose);
	let inputService = document.createElement('label');
	inputService.innerHTML = str;
	inputService.setAttribute('class', 'form-control bg-transparent text-wrap text-dark-yellow');
	let inputPrice = document.createElement('input');
	inputPrice.setAttribute('class', 'form-control text-right input-price bg-transparent text-light');
	inputPrice.setAttribute('name', 'price');
	inputPrice.setAttribute('value', 0);
	divContainer.append(inputPrice, inputService);
	divInputGroup.append(divContainer, btnClose, inputLabelHidden)
	serviceContainer.append(divInputGroup)
}

var addServicesBtn = document.getElementById('add-services');
var selectServices = document.getElementById('select-service');
var totalInput = document.getElementById('total');
var depositInput = document.getElementById('deposit');
var priceBefore = document.getElementById('price-before');

if (addServicesBtn) {
	// totalInput.value = priceBefore.value
	/* Khi người dùng click nút thêm dịch vụ sẽ tiến hành thêm dịch vụ mới và thẻ input để nhập giá tiền kèm nút xóa */
	// Lắng nghe nút thêm dịch vụ
	addServicesBtn.addEventListener('click', (e) => {
		e.preventDefault();
		let textService = selectServices.value;
		// Cắt ngắn tên dịch vụ cho vừa khung
		// textService.length > 20 ? textService = textService.slice(0, 20) + '...' : textService;
		// Gọi đến hàm tạo dịch vụ khi click
		createService(textService);
		let serviceArr = [];
		let serviceElement = document.getElementById('service-container').children;
		for (let i = 0; i < serviceElement.length; i++) {
			let inputGroup = serviceElement[i];
			serviceElement[i].setAttribute('id', i);
			let formFloating = inputGroup.children[0];
			let serviceInput = formFloating.children[0];
			serviceInput.setAttribute('id', i);
			serviceArr.push({ 'index': i,'price': parseFloat(serviceInput.value.replace(/\D/g,''), 10)});
			serviceInput.addEventListener('focus', (e) => {
				serviceInput.value = null;
			})
			serviceInput.addEventListener('input', (e) => {
				let valueMoney = e.target.value;
				let id = serviceInput.getAttribute('id');
				let convertMoney = parseFloat(valueMoney.replace(/\D/g,''), 10);
				convertMoney === NaN ? convertMoney = 0 : convertMoney;
				serviceArr.filter((service) => {
					if (parseInt(id) === service.index) {
						service.price = convertMoney;
					}
				})
				let totalMoney = serviceArr.reduce(totalMoneyFn, 0);
				let convertDeposit = parseFloat(depositInput.value.replace(/\D/g,''), 10);
				let trucoc = totalMoney - convertDeposit;
				totalInput.value = trucoc.toLocaleString()
				let convertedMoney = convertMoney.toLocaleString();
				serviceInput.value = convertedMoney;
			})

			let serviceClose = inputGroup.children[1];
			console.log(serviceClose)
			serviceClose.setAttribute('id', i);
			serviceClose.addEventListener('click', (e) => {
				e.preventDefault();
				let parent = serviceClose.parentElement;
				let id = serviceClose.getAttribute('id');
				console.log(parent)
				serviceArr.forEach((service) => {
					if (parseInt(id) === service.index) {
						let index = serviceArr.indexOf(service)
						serviceArr.splice(index, 1);
					}
					let totalMoney = serviceArr.reduce(totalMoneyFn, 0);
					let convertDeposit = parseFloat(depositInput.value.replace(/\D/g,''), 10);
					let trucoc = totalMoney - convertDeposit;
					totalInput.value = trucoc.toLocaleString();
				})
				parent.remove();
			})
		}
	});
}

let slideIndex = 1;
showSlidesBeforeCounselorImg(slideIndex);


// Next/previous controls
function plusSlidesBeforeCounselorImg(n) {
	showSlidesBeforeCounselorImg(slideIndex += n);
}

// Thumbnail image controls
function currentSlideBeforeCounselorImg(n) {
	showSlidesBeforeCounselorImg(slideIndex = n);
}

function showSlidesBeforeCounselorImg(n) {
	let i;
	let slides = document.getElementsByClassName("slide-before-counselor-img");
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
		slides[slideIndex-1].style.display = "block";
		dots[slideIndex-1].className += " active-click";
	}
}