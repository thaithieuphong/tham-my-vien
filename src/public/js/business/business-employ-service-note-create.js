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
            return value ? undefined : 'Không được để trống';
        },

        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập đúng email';
        },

		isNum: function (value) {
			var regex = /^[0-9]*$/;
			return regex.test(value) ? undefined : 'Số tiền không được chứa chữ cái';
		},

        
        isNumCurrency: function (value) {
			var regex = /^(?!0\.00)\d{1,3}(,\d{3})*(\.\d\d)?$/;
			return regex.test(value) ? undefined : 'Số tiền không được chứa chữ cái';
		},

        password: function (value) {
            return value ? undefined : 'Mật khẩu chưa đúng';
        },

        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự`;
            }
        },

        max: function (max) {
            return function (value) {
                return value.length <= max ? undefined : `Vui lòng nhập nhiều nhất ${max} ký tự`;
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

// var inputScheduleID = document.getElementById('create-schedule-id');

// var inputDeposit = document.getElementById('create-schedule-deposit');
// inputDeposit.addEventListener('input', (e) => {
//     let inputVal = e.target.value;
//     let parseFloatVal = parseFloat(inputVal.replace(/\D/g,''), 10);
//     inputDeposit.value = parseFloatVal.toLocaleString()
// });

// var inputPriceBefore = document.getElementById('create-schedule-priceBefore');
// inputPriceBefore.addEventListener('input', (e) => {
//     let inputVal = e.target.value;
//     let parseFloatVal = parseFloat(inputVal.replace(/\D/g,''), 10);
//     inputPriceBefore.value = parseFloatVal.toLocaleString()
// });

var createCusInfoForm = document.forms['create-customer-information-form'];
var createCusInfoBtn = document.getElementById('create-customer-information-btn');

if (createCusInfoBtn) {
	createCusInfoBtn.addEventListener("click", () => {
		createCusInfoForm.submit();
	});
}

// var submitCustomerForm = document.forms['submit-customer-form'];
// var submitCusFormBtn = document.getElementById('submit-customer-form-btn');
// if (submitCusFormBtn) {
// 	submitCusFormBtn.addEventListener("click", () => {
// 		submitCustomerForm.submit();
// 	});
// }

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
						divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure img-container position-relative mt-2';
						divMain.id = i;
						newImage.src = src;
						newImage.classList = 'figure-img img-fluid rounded img-cover';
						newImage.setAttribute('accept', 'image/*');
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
			console.log(files);
			videosPreviewCounselor(files)
			// let inputFiles = Array.from(files.files);
			// if (files) {
			// 	for (i = 0; i < files.length; i++) {
			// 		let newVideo = document.createElement('video');
			// 		let iconClose = document.createElement('i');
			// 		iconClose.setAttribute('class', 'ti-close');
			// 		let closeButtonLink = document.createElement('div');
			// 		closeButtonLink.append(iconClose);
			// 		let divMain = document.createElement('figure');
			// 		// let src = event.target.result;
			// 		let videoBlob = new Blob([new Uint8Array(files[i])], { type: 'video/*' });
			// 		let url = URL.createObjectURL(videoBlob);
			// 		divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure imgbox position-relative mt-2';
			// 		divMain.id = i;
			// 		// newVideo.src = url;
			// 		console.log(url)
			// 		newVideo.classList = 'img-fluid';
			// 		newVideo.setAttribute('accept', 'video/*');
			// 		newVideo.setAttribute('src', url);
			// 		newVideo.controls = true;
			// 		newVideo.id = i;
			// 		closeButtonLink.type = 'button';
			// 		closeButtonLink.id = i;
			// 		closeButtonLink.ariaLabel = 'Close';
			// 		closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 mr-4 mt-2 close-img';
			// 		let videoc = document.querySelector('.preview-videos-counselor');
			// 		divMain.append(newVideo, closeButtonLink);
			// 		videoc.append(divMain);
			// 		let closeBtn = document.querySelectorAll('.close-video');
			// 		closeBtn.forEach(btn => {
			// 			btn.addEventListener('click', (e) => {
			// 				let parent = btn.parentElement;
			// 				parent.remove();
			// 			})
			// 		})
			// 		// let reader = new FileReader();
			// 		// reader.onload = function (event) {
			// 		// };
			// 		// reader.readAsDataURL(inputFiles[i]);
			// 	}
			// }
		})
	
		let videosPreviewCounselor = function (input) {
			let inputFiles = Array.from(input.files);
			if (inputFiles) {
				for (i = 0; i < inputFiles.length; i++) {
					let newVideo = document.createElement('video');
					let iconClose = document.createElement('i');
					iconClose.setAttribute('class', 'ti-close');
					let closeButtonLink = document.createElement('div');
					closeButtonLink.append(iconClose);
					let divMain = document.createElement('figure');
					let reader = new FileReader();
					reader.onload = function (event) {
						let src = event.target.result;
						divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure imgbox position-relative mt-2';
						divMain.id = i;
						newVideo.src = src;
						newVideo.classList = 'img-fluid';
						newVideo.setAttribute('accept', 'video/*');
						newVideo.controls = true;
						newVideo.id = i;
						closeButtonLink.type = 'button';
						closeButtonLink.id = i;
						closeButtonLink.ariaLabel = 'Close';
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
						divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure img-container position-relative mt-2';
						divMain.id = i;
						newImage.src = src;
						newImage.classList = 'figure-img img-fluid rounded img-cover';
						newImage.setAttribute('accept', 'image/*');
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
						divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure imgbox position-relative mt-2';
						divMain.id = i;
						newVideo.src = src;
						newVideo.classList = 'img-fluid';
						newVideo.setAttribute('accept', 'video/*');
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
						divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure img-container position-relative mt-2';
						divMain.id = i;
						newImage.src = src;
						newImage.classList = 'figure-img img-fluid rounded img-cover';
						newImage.setAttribute('accept', 'image/*');
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
						divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure imgbox position-relative mt-2';
						divMain.id = i;
						newVideo.src = src;
						newVideo.classList = 'img-fluid';
						newVideo.setAttribute('accept', 'video/*');
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
						divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure img-container position-relative mt-2';
						divMain.id = i;
						newImage.src = src;
						newImage.classList = 'figure-img img-fluid rounded img-cover';
						newImage.setAttribute('accept', 'image/*');
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
						divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure imgbox position-relative mt-2';
						divMain.id = i;
						newVideo.src = src;
						newVideo.classList = 'img-fluid';
						newVideo.setAttribute('accept', 'video/*');
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
	return before + current.price;
}

// Hàm tạo dịch vụ mới
var serviceContainer = document.getElementById('service-container')
var createService = function(str) {
	let divContainer = document.createElement('div');
	divContainer.setAttribute('class', 'input-group input-group-sm mb-2');
	let btnClose = document.createElement('button');
	btnClose.setAttribute('class', 'btn btn-danger close-btn ');
	let iconClose = document.createElement('i');
	iconClose.setAttribute('class', 'ti-close');
	btnClose.append(iconClose);
	let inputService = document.createElement('input');
	inputService.setAttribute('class', 'form-control text-wrap pl-3');
	inputService.setAttribute('name', 'service[]');
	inputService.setAttribute('type', 'text');
	let inputPrice = document.createElement('input');
	inputPrice.setAttribute('class', 'form-control text-right input-price');
	inputPrice.setAttribute('name', 'price[]');
	inputPrice.setAttribute('value', 0);
	divContainer.append(inputService, inputPrice, btnClose);
	serviceContainer.append(divContainer);
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
		// let textService = selectServices.value;
		// Cắt ngắn tên dịch vụ cho vừa khung
		// textService.length > 20 ? textService = textService.slice(0, 20) + '...' : textService;
		// Gọi đến hàm tạo dịch vụ khi click
		createService();
		let serviceArr = [];
		let serviceElement = serviceContainer.children;
		for (let i = 0; i < serviceElement.length; i++) {
			let serviceInput = serviceElement[i].children[1];
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
				totalInput.value = trucoc.toLocaleString();
				let convertedMoney = convertMoney.toLocaleString();
				serviceInput.value = convertedMoney;
			})

			let serviceClose = serviceElement[i].children[2];
			serviceClose.setAttribute('id', i);
			serviceClose.addEventListener('click', (e) => {
				e.preventDefault();
				let parent = serviceClose.parentElement;
				let id = serviceClose.getAttribute('id');
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

// Hàm cộng tổng
function sumTotal(price) {
	return price += price;
}

var serviceTable = document.querySelectorAll('.table-row');
var totalServiceTable = [];
serviceTable.forEach(serviceRow => {
	let price = parseFloat(serviceRow.childNodes[5].innerText.replace(/\D/g,''), 10)
	totalServiceTable.push(price);
})

var total = totalServiceTable.reduce((price, num) => {
	return price += num;
}, 0);

totalInput.value = total.toLocaleString();

let slideIndex = 1;
showSlidesCounselorImg(slideIndex);
showSlidesCounselorVideo(slideIndex);
showSlidesBeforeImg(slideIndex);
showSlidesBeforeVideo(slideIndex);
showSlidesInImg(slideIndex);
showSlidesInVideo(slideIndex);
showSlidesAfterImg(slideIndex);
showSlidesAfterVideo(slideIndex);

// Next/previous controls
function plusSlidesCounselorImg(n) {
	showSlidesCounselorImg(slideIndex += n);
}
function plusSlidesCounselorVideo(n) {
	showSlidesCounselorVideo(slideIndex += n);
}

function plusSlidesBeforeImg(n) {
	showSlidesBeforeImg(slideIndex += n);
}

function plusSlidesBeforeVideo(n) {
	showSlidesBeforeVideo(slideIndex += n);
}

function plusSlidesInImg(n) {
	showSlidesInImg(slideIndex += n);
}

function plusSlidesInVideo(n) {
	showSlidesInVideo(slideIndex += n);
}

function plusSlidesAfterImg(n) {
	showSlidesAfterImg(slideIndex += n);
}

function plusSlidesAfterVideo(n) {
	showSlidesAfterVideo(slideIndex += n);
}

// Thumbnail image controls
function currentSlideCounselorImg(n) {
	showSlidesCounselor(slideIndex = n);
}
function currentSlideCounselorVideo(n) {
	showSlidesCounselorVideo(slideIndex = n);
}

function currentSlideBeforeImg(n) {
	showSlidesBeforeImg(slideIndex = n);
}

function currentSlideBeforeVideo(n) {
	showSlidesBeforeVideo(slideIndex = n);
}

function currentSlideInImg(n) {
	showSlidesInImg(slideIndex = n);
}

function currentSlideInVideo(n) {
	showSlidesInVideo(slideIndex = n);
}

function currentSlideAfterImg(n) {
	showSlidesAfterImg(slideIndex = n);
}

function currentSlideAfterVideo(n) {
	showSlidesAfterVideo(slideIndex = n);
}

function showSlidesCounselorImg(n) {
	let i;
	let slides = document.getElementsByClassName("slide-counselor-img");
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

function showSlidesCounselorVideo(n) {
	let i;
	let slides = document.getElementsByClassName("slide-counselor-video");
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

function showSlidesBeforeImg(n) {
	let i;
	let slides = document.getElementsByClassName("slide-before-img");
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

function showSlidesBeforeVideo(n) {
	let i;
	let slides = document.getElementsByClassName("slide-before-video");
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

function showSlidesInImg(n) {
	let i;
	let slides = document.getElementsByClassName("slide-in-img");
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

function showSlidesInVideo(n) {
	let i;
	let slides = document.getElementsByClassName("slide-in-video");
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

// Handle push data to edit modal
var deleteService = document.getElementById("deleteService");
deleteService.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from edit button
	var dataServiceID = button.getAttribute('data-service-id');
	var dataServiceName = button.getAttribute('data-service-name');
	// Get element need embeded input
	var serviceID = document.getElementById("serviceID");
	var serviceName = document.getElementById("serviceName");
	serviceID.value = dataServiceID;
	serviceName.innerText = dataServiceName;
});

// Handle edit info Customer
var deleteServiceBtn = document.getElementById("deleteServiceBtn");
var deleteServiceForm = document.forms["deleteServiceForm"];
deleteServiceBtn.addEventListener("click", () => {
	deleteServiceForm.submit();
});