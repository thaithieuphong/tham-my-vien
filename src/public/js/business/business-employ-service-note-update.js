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

		requiredService: function(value) {
            return value ? undefined : 'Vui lòng thêm dịch vụ và phí dịch vụ';
		},
        
        isNumCurrency: function (value) {
			let convertValue = parseFloat(value.replace(/\D/g,''), 10);
			var regex = /^[0-9]*$/;
			return regex.test(convertValue) ? undefined : 'Số tiền không được chứa chữ cái';
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
			input.addEventListener('add', handleClearError)
        }

        // ham thuc hien validate
        var errorMessage;
        function handleEmptyInput (event) {
            var rules = formRules[event.target.name];
			if(rules) {
				rules.some(rule => {
					errorMessage = rule(event.target.value);
					return errorMessage;
				})
			}

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

// var createCusInfoForm = document.forms['create-customer-information-form'];
// var createCusInfoBtn = document.getElementById('create-customer-information-btn');

// if (createCusInfoBtn) {
// 	createCusInfoBtn.addEventListener("click", () => {
// 		createCusInfoForm.submit();
// 	});
// }

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
	// let inputMultiImageCounselor = document.getElementById('input-multi-images-counselor');
	// if(inputMultiImageCounselor) {
	// 	inputMultiImageCounselor.addEventListener('change', (e) => {
	// 		let files = e.target;//event.target.files;
	// 		imagesPreviewCounselor(files);
	// 	})
	
	// 	let imagesPreviewCounselor = function (input) {
	// 		let inputFiles = Array.from(input.files);
	// 		if (input.files) {
	// 			for (let i = 0; i < inputFiles.length; i++) {
	// 				let reader = new FileReader();
	// 				let newImage = document.createElement('img');
	// 				let iconClose = document.createElement('i');
	// 				iconClose.setAttribute('class', 'ti-close');
	// 				let closeButtonLink = document.createElement('div');
	// 				closeButtonLink.append(iconClose);
	// 				let divMain = document.createElement('figure');
	// 				reader.addEventListener('load', (event) => {
	// 					let src = event.target.result;
	// 					divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure img-container position-relative mt-2';
	// 					divMain.id = i;
	// 					newImage.src = src;
	// 					newImage.classList = 'figure-img img-fluid rounded img-cover';
	// 					newImage.id = i;
	// 					closeButtonLink.id = i;
	// 					closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 mr-5 mt-2 close-img';
	// 					let imgc = document.querySelector('.preview-images-counselor');
	// 					divMain.append(newImage, closeButtonLink);
	// 					imgc.append(divMain);
	// 					let closeBtns = document.querySelectorAll('.close-img');
	// 					closeBtns.forEach(btn => {
	// 						btn.addEventListener('click', () => {
	// 							let parent = btn.parentElement;
	// 							parent.remove();
	// 						})
	// 					})
	// 				});
	// 				reader.readAsDataURL(inputFiles[i]);
	// 			}
	// 		}
	// 	};
	// }

	// let inputMultiVideoCounselor = document.getElementById('input-multi-videos-counselor');
	// if (inputMultiVideoCounselor) {
	// 	inputMultiVideoCounselor.addEventListener('change', (e) => {
	// 		let files = e.target;
	// 		console.log(files);
	// 		videosPreviewCounselor(files)
	// 		// let inputFiles = Array.from(files.files);
	// 		// if (files) {
	// 		// 	for (i = 0; i < files.length; i++) {
	// 		// 		let newVideo = document.createElement('video');
	// 		// 		let iconClose = document.createElement('i');
	// 		// 		iconClose.setAttribute('class', 'ti-close');
	// 		// 		let closeButtonLink = document.createElement('div');
	// 		// 		closeButtonLink.append(iconClose);
	// 		// 		let divMain = document.createElement('figure');
	// 		// 		// let src = event.target.result;
	// 		// 		let videoBlob = new Blob([new Uint8Array(files[i])], { type: 'video/*' });
	// 		// 		let url = URL.createObjectURL(videoBlob);
	// 		// 		divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure imgbox position-relative mt-2';
	// 		// 		divMain.id = i;
	// 		// 		// newVideo.src = url;
	// 		// 		console.log(url)
	// 		// 		newVideo.classList = 'img-fluid';
	// 		// 		newVideo.setAttribute('accept', 'video/*');
	// 		// 		newVideo.setAttribute('src', url);
	// 		// 		newVideo.controls = true;
	// 		// 		newVideo.id = i;
	// 		// 		closeButtonLink.type = 'button';
	// 		// 		closeButtonLink.id = i;
	// 		// 		closeButtonLink.ariaLabel = 'Close';
	// 		// 		closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 mr-4 mt-2 close-img';
	// 		// 		let videoc = document.querySelector('.preview-videos-counselor');
	// 		// 		divMain.append(newVideo, closeButtonLink);
	// 		// 		videoc.append(divMain);
	// 		// 		let closeBtn = document.querySelectorAll('.close-video');
	// 		// 		closeBtn.forEach(btn => {
	// 		// 			btn.addEventListener('click', (e) => {
	// 		// 				let parent = btn.parentElement;
	// 		// 				parent.remove();
	// 		// 			})
	// 		// 		})
	// 		// 		// let reader = new FileReader();
	// 		// 		// reader.onload = function (event) {
	// 		// 		// };
	// 		// 		// reader.readAsDataURL(inputFiles[i]);
	// 		// 	}
	// 		// }
	// 	})
	
	// 	let videosPreviewCounselor = function (input) {
	// 		let inputFiles = Array.from(input.files);
	// 		if (inputFiles) {
	// 			for (i = 0; i < inputFiles.length; i++) {
	// 				let newVideo = document.createElement('video');
	// 				let iconClose = document.createElement('i');
	// 				iconClose.setAttribute('class', 'ti-close');
	// 				let closeButtonLink = document.createElement('div');
	// 				closeButtonLink.append(iconClose);
	// 				let divMain = document.createElement('figure');
	// 				let reader = new FileReader();
	// 				reader.onload = function (event) {
	// 					let src = event.target.result;
	// 					divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure imgbox position-relative mt-2';
	// 					divMain.id = i;
	// 					newVideo.src = src;
	// 					newVideo.classList = 'img-fluid';
	// 					newVideo.controls = true;
	// 					newVideo.id = i;
	// 					closeButtonLink.type = 'button';
	// 					closeButtonLink.id = i;
	// 					closeButtonLink.ariaLabel = 'Close';
	// 					closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 mr-5 mt-2 close-video';
	// 					let videoc = document.querySelector('.preview-videos-counselor');
	// 					divMain.append(newVideo, closeButtonLink);
	// 					videoc.append(divMain);
	// 					let closeBtn = document.querySelectorAll('.close-video');
	// 					closeBtn.forEach(btn => {
	// 						btn.addEventListener('click', (e) => {
	// 							let parent = btn.parentElement;
	// 							parent.remove();
	// 						})
	// 					})
	// 				};
	// 				reader.readAsDataURL(inputFiles[i]);
	// 			}
	// 		}
	// 	};
	// }

	// let inputMultiImageBefore = document.getElementById('input-multi-images-before');
	// if(inputMultiImageBefore) {
	// 	inputMultiImageBefore.addEventListener('change', (e) => {
	// 		let files = e.target;//event.target.files;
	// 		imagesPreviewBefore(files);
	// 	})
	
	// 	let imagesPreviewBefore = function (input) {
	// 		let inputFiles = Array.from(input.files);
	// 		if (input.files) {
	// 			for (let i = 0; i < inputFiles.length; i++) {
	// 				let reader = new FileReader();
	// 				let newImage = document.createElement('img');
	// 				let iconClose = document.createElement('i');
	// 				iconClose.setAttribute('class', 'ti-close');
	// 				let closeButtonLink = document.createElement('div');
	// 				closeButtonLink.append(iconClose);
	// 				let divMain = document.createElement('figure');
	// 				reader.addEventListener('load', (event) => {
	// 					let src = event.target.result;
	// 					divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure img-container position-relative mt-2';
	// 					divMain.id = i;
	// 					newImage.src = src;
	// 					newImage.classList = 'figure-img img-fluid rounded img-cover';
	// 					newImage.id = i;
	// 					closeButtonLink.id = i;
	// 					closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 mr-5 mt-2 close-img';
	// 					let imgc = document.querySelector('.preview-images-before');
	// 					divMain.append(newImage, closeButtonLink);
	// 					imgc.append(divMain);
	// 					let closeBtns = document.querySelectorAll('.close-img');
	// 					closeBtns.forEach(btn => {
	// 						btn.addEventListener('click', () => {
	// 							let parent = btn.parentElement;
	// 							parent.remove();
	// 						})
	// 					})
	// 				});
	// 				reader.readAsDataURL(inputFiles[i]);
	// 			}
	// 		}
	// 	};
	// }

	// let inputMultiVideoBefore = document.getElementById('input-multi-videos-before');
	// if (inputMultiVideoBefore) {
	// 	inputMultiVideoBefore.addEventListener('change', (e) => {
	// 		let files = e.target;
	// 		videosPreviewBefore(files);
	// 	})
	
	// 	let videosPreviewBefore = function (input) {
	// 		let inputFiles = Array.from(input.files);
	// 		if (input.files) {
	// 			for (i = 0; i < inputFiles.length; i++) {
	// 				let reader = new FileReader();
	// 				reader.onload = function (event) {
	// 					let newVideo = document.createElement('video');
	// 					let closeButtonLink = document.createElement('button');
	// 					let divMain = document.createElement('figure');
	// 					let src = event.target.result;
	// 					divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure imgbox position-relative mt-2';
	// 					divMain.id = i;
	// 					newVideo.src = src;
	// 					newVideo.classList = 'img-fluid';
	// 					newVideo.controls = true;
	// 					newVideo.id = i;
	// 					closeButtonLink.type = 'button';
	// 					closeButtonLink.id = i;
	// 					closeButtonLink.ariaLabel = 'Close';
	// 					closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-5 mt-2 close-video';
	// 					let videoc = document.querySelector('.preview-videos-before');
	// 					divMain.append(newVideo, closeButtonLink);
	// 					videoc.append(divMain);
	// 					let closeBtn = document.querySelectorAll('.close-video');
	// 					closeBtn.forEach(btn => {
	// 						btn.addEventListener('click', (e) => {
	// 							let parent = btn.parentElement;
	// 							parent.remove();
	// 						})
	// 					})
	// 				};
	// 				reader.readAsDataURL(inputFiles[i]);
	// 			}
	// 		}
	// 	};
	// }

	// let inputMultiImageInSurgery = document.getElementById('input-multi-images-in-surgery');
	// if(inputMultiImageInSurgery) {
	// 	inputMultiImageInSurgery.addEventListener('change', (e) => {
	// 		let files = e.target; //event.target.files;
	// 		imagesPreviewInSurgery(files);
	// 	})
	
	// 	let imagesPreviewInSurgery = function (input) {
	// 		let inputFiles = Array.from(input.files);
	// 		if (input.files) {
	// 			for (let i = 0; i < inputFiles.length; i++) {
	// 				let reader = new FileReader();
	// 				let newImage = document.createElement('img');
	// 				let iconClose = document.createElement('i');
	// 				iconClose.setAttribute('class', 'ti-close');
	// 				let closeButtonLink = document.createElement('div');
	// 				closeButtonLink.append(iconClose);
	// 				let divMain = document.createElement('figure');
	// 				reader.addEventListener('load', (event) => {
	// 					let src = event.target.result;
	// 					divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure img-container position-relative mt-2';
	// 					divMain.id = i;
	// 					newImage.src = src;
	// 					newImage.classList = 'figure-img img-fluid rounded img-cover';
	// 					newImage.id = i;
	// 					closeButtonLink.id = i;
	// 					closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 mr-5 mt-2 close-img';
	// 					let imgc = document.querySelector('.preview-images-in-surgery');
	// 					divMain.append(newImage, closeButtonLink);
	// 					imgc.append(divMain);
	// 					let closeBtns = document.querySelectorAll('.close-img');
	// 					closeBtns.forEach(btn => {
	// 						btn.addEventListener('click', () => {
	// 							let parent = btn.parentElement;
	// 							parent.remove();
	// 						})
	// 					})
	// 				});
	// 				reader.readAsDataURL(inputFiles[i]);
	// 			}
	// 		}
	// 	};
	// }

	// let inputMultiVideoInSurgery = document.getElementById('input-multi-videos-in-surgery');
	// if (inputMultiVideoInSurgery) {
	// 	inputMultiVideoInSurgery.addEventListener('change', (e) => {
	// 		let files = e.target;
	// 		videosPreviewInSurgery(files);
	// 	})
	
	// 	let videosPreviewInSurgery = function (input) {
	// 		let inputFiles = Array.from(input.files);
	// 		if (input.files) {
	// 			for (i = 0; i < inputFiles.length; i++) {
	// 				let reader = new FileReader();
	// 				reader.onload = function (event) {
	// 					let newVideo = document.createElement('video');
	// 					let closeButtonLink = document.createElement('button');
	// 					let divMain = document.createElement('figure');
	// 					let src = event.target.result;
	// 					divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure imgbox position-relative mt-2';
	// 					divMain.id = i;
	// 					newVideo.src = src;
	// 					newVideo.classList = 'img-fluid';
	// 					newVideo.controls = true;
	// 					newVideo.id = i;
	// 					closeButtonLink.type = 'button';
	// 					closeButtonLink.id = i;
	// 					closeButtonLink.ariaLabel = 'Close';
	// 					closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-5 mt-2 close-video';
	// 					let videoc = document.querySelector('.preview-videos-in-surgery');
	// 					divMain.append(newVideo, closeButtonLink);
	// 					videoc.append(divMain);
	// 					let closeBtn = document.querySelectorAll('.close-video');
	// 					closeBtn.forEach(btn => {
	// 						btn.addEventListener('click', (e) => {
	// 							let parent = btn.parentElement;
	// 							parent.remove();
	// 						})
	// 					})
	// 				};
	// 				reader.readAsDataURL(inputFiles[i]);
	// 			}
	// 		}
	// 	};
	// }

	// let inputMultiImageAfter = document.getElementById('input-multi-images-after');
	// if(inputMultiImageAfter) {
	// 	inputMultiImageAfter.addEventListener('change', (e) => {
	// 		let files = e.target;//event.target.files;
	// 		imagesPreviewAfter(files);
	// 	})
	
	// 	let imagesPreviewAfter = function (input) {
	// 		let inputFiles = Array.from(input.files);
	// 		if (input.files) {
	// 			for (let i = 0; i < input.files.length; i++) {
	// 				let reader = new FileReader();
	// 				let newImage = document.createElement('img');
	// 				let iconClose = document.createElement('i');
	// 				iconClose.setAttribute('class', 'ti-close');
	// 				let closeButtonLink = document.createElement('div');
	// 				closeButtonLink.append(iconClose);
	// 				let divMain = document.createElement('figure');
	// 				reader.addEventListener('load', (event) => {
	// 					let src = event.target.result;
	// 					divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure img-container position-relative mt-2';
	// 					divMain.id = i;
	// 					newImage.src = src;
	// 					newImage.classList = 'figure-img img-fluid rounded img-cover';
	// 					newImage.id = i;
	// 					closeButtonLink.id = i;
	// 					closeButtonLink.classList = 'btn btn-dark position-absolute top-0 end-0 mr-5 mt-2 close-img';
	// 					let imgc = document.querySelector('.preview-images-after');
	// 					divMain.append(newImage, closeButtonLink);
	// 					imgc.append(divMain);
	// 					let closeBtns = document.querySelectorAll('.close-img');
	// 					closeBtns.forEach(btn => {
	// 						btn.addEventListener('click', () => {
	// 							let parent = btn.parentElement;
	// 							parent.remove();
	// 						})
	// 					})
	// 				});
	// 				reader.readAsDataURL(input.files[i]);
	// 			}
	// 		}
	// 	};
	// }

	// let inputMultiVideoAfter = document.getElementById('input-multi-videos-after');
	// if (inputMultiVideoAfter) {
	// 	inputMultiVideoAfter.addEventListener('change', (e) => {
	// 		let files = e.target;
	// 		videosPreviewAfter(files);
	// 	})
	
	// 	let videosPreviewAfter = function (input) {
	// 		let inputFiles = Array.from(input.files);
	// 		if (input.files) {
	// 			for (i = 0; i < inputFiles.length; i++) {
	// 				let reader = new FileReader();
	// 				reader.onload = function (event) {
	// 					let newVideo = document.createElement('video');
	// 					let closeButtonLink = document.createElement('button');
	// 					let divMain = document.createElement('figure');
	// 					let src = event.target.result;
	// 					divMain.classList = 'col-xl-6 col-lg-12 col-md-6 col-sm-6 col-xs-6 figure imgbox position-relative mt-2';
	// 					divMain.id = i;
	// 					newVideo.src = src;
	// 					newVideo.classList = 'img-fluid';
	// 					newVideo.controls = true;
	// 					newVideo.id = i;
	// 					closeButtonLink.type = 'button';
	// 					closeButtonLink.id = i;
	// 					closeButtonLink.ariaLabel = 'Close';
	// 					closeButtonLink.classList = 'btn-close btn-close-white position-absolute top-0 end-0 mr-5 mt-2 close-video';
	// 					let videoc = document.querySelector('.preview-videos-after');
	// 					divMain.append(newVideo, closeButtonLink);
	// 					videoc.append(divMain);
	// 					let closeBtn = document.querySelectorAll('.close-video');
	// 					closeBtn.forEach(btn => {
	// 						btn.addEventListener('click', (e) => {
	// 							let parent = btn.parentElement;
	// 							parent.remove();
	// 						})
	// 					})
	// 				};
	// 				reader.readAsDataURL(inputFiles[i]);
	// 			}
	// 		}
	// 	};
	// }

	
});

// Delete Counselor Image
var imageModalCounselor = document.getElementById('imageModalCounselor');

imageModalCounselor.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');

	var modalImageCounselor = document.getElementById('modal-img-counselor');
	var inputDeleteImageCounselor = document.getElementById('inputDeleteImageCounselor');

	modalImageCounselor.setAttribute('src', `${dataImgURL}`);
	// modalImageCounselor.setAttribute('src', `/counselor/img/${dataImg}`);
	inputDeleteImageCounselor.value = dataImgName;

});

// Restore Counselor Image
var restoreImageModalCounselor = document.getElementById('restoreImageModalCounselor');

restoreImageModalCounselor.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');

	var restoreImageCounselor = document.getElementById('restore-img-counselor');
	var inputRestoreImageCounselor = document.getElementById('inputRestoreImageCounselor');

	restoreImageCounselor.setAttribute('src', `${dataImgURL}`);
	// restoreImageCounselor.setAttribute('src', `/counselor/img/${dataImg}`);
	inputRestoreImageCounselor.value = dataImgName;

});


// Delete Counselor Video
var videoModalCounselor = document.getElementById('videoModalCounselor');

videoModalCounselor.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoName = button.getAttribute('data-name-video');
	var dataVideoURL = button.getAttribute('data-url-video');

	var modalVideoCounselor = document.getElementById('modal-video-counselor');
	var inputDeleteVideoCounselor = document.getElementById('inputDeleteVideoCounselor');

	modalVideoCounselor.setAttribute('src', `${dataVideoURL}`);
	// modalVideoCounselor.setAttribute('src', `/counselor/video/${dataVideo}`);
	inputDeleteVideoCounselor.value = dataVideoName;
});

// Restore Counselor Video
var restoreVideoModalCounselor = document.getElementById('restoreVideoModalCounselor');

restoreVideoModalCounselor.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoName = button.getAttribute('data-name-video');
	var dataVideoURL = button.getAttribute('data-url-video');

	var restoreVideoCounselor = document.getElementById('restore-video-counselor');
	var inputRestoreVideoCounselor = document.getElementById('inputRestoreVideoCounselor');

	restoreVideoCounselor.setAttribute('src', `${dataVideoURL}`);
	// restoreVideoCounselor.setAttribute('src', `/counselor/video/${dataVideo}`);
	inputRestoreVideoCounselor.value = dataVideoName;

});

// Delete Before Image
var imageModalBefore = document.getElementById('imageModalBefore');

imageModalBefore.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget
	
	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');
	
	var modalImageBefore = document.getElementById('modal-img-before');
	var inputDeleteImageBefore = document.getElementById('inputDeleteImageBefore');
	
	modalImageBefore.setAttribute('src', `${dataImgURL}`);
	// modalImageBefore.setAttribute('src', `/before/img/${dataImg}`);
	inputDeleteImageBefore.value = dataImgName;
})

// Restore Before Image
var restoreImageModalBefore = document.getElementById('restoreImageModalBefore');

restoreImageModalBefore.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');

	var restoreImageBefore = document.getElementById('restore-img-before');
	var inputRestoreImageBefore = document.getElementById('inputRestoreImageBefore');

	restoreImageBefore.setAttribute('src', `${dataImgURL}`);
	// restoreImageBefore.setAttribute('src', `/before/img/${dataImg}`);
	inputRestoreImageBefore.value = dataImgName;

});

// Delete Before Video
var videoModalBefore = document.getElementById('videoModalBefore');

videoModalBefore.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoName = button.getAttribute('data-name-video');
	var dataVideoURL = button.getAttribute('data-url-video');

	var modalVideoBefore = document.getElementById('modal-video-before');
	var inputDeleteVideoBefore = document.getElementById('inputDeleteVideoBefore');

	modalVideoBefore.setAttribute('src', `${dataVideoURL}`);
	// modalVideoBefore.setAttribute('src', `/before/video/${dataVideo}`);
	inputDeleteVideoBefore.value = dataVideoName;

})

// Restore Before Video
var restoreVideoModalBefore = document.getElementById('restoreVideoModalBefore');

restoreVideoModalBefore.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoName = button.getAttribute('data-name-video');
	var dataVideoURL = button.getAttribute('data-url-video');

	var restoreVideoBefore = document.getElementById('restore-video-before');
	var inputRestoreVideoBefore = document.getElementById('inputRestoreVideoBefore');

	restoreVideoBefore.setAttribute('src', `${dataVideoURL}`);
	// restoreVideoBefore.setAttribute('src', `/before/video/${dataVideo}`);
	inputRestoreVideoBefore.value = dataVideoName;

});

// Delete Insurgery Image
var imageModalInSurgery = document.getElementById('imageModalInSurgery');

imageModalInSurgery.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');

	var modalImageInSurgery = document.getElementById('modal-img-inSurgery');
	var inputDeleteImageInSurgery = document.getElementById('inputDeleteImageInSurgery');


	modalImageInSurgery.setAttribute('src', `${dataImgURL}`);
	// modalImageInSurgery.setAttribute('src', `/in-surgery/img/${dataImg}`);
	inputDeleteImageInSurgery.value = dataImgName;
});

// Restore In Surgery Image
var restoreImageModalInSurgery = document.getElementById('restoreImageModalInSurgery');

restoreImageModalInSurgery.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');

	var restoreImageInSurgery = document.getElementById('restore-img-in-surgery');
	var inputRestoreImageInSurgery = document.getElementById('inputRestoreImageInSurgery');

	restoreImageInSurgery.setAttribute('src', `${dataImgURL}`);
	// restoreImageInSurgery.setAttribute('src', `/in-surgery/img/${dataImg}`);
	inputRestoreImageInSurgery.value = dataImgName;

});

// Delete In Surgery Video
var videoModalInSurgery = document.getElementById('videoModalInSurgery');

videoModalInSurgery.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoName = button.getAttribute('data-name-video');
	var dataVideoURL = button.getAttribute('data-url-video');

	var modalVideoInSurgery = document.getElementById('modal-video-inSurgery');
	var inputDeleteVideoInSurgery = document.getElementById('inputDeleteVideoInSurgery');

	modalVideoInSurgery.setAttribute('src', `${dataVideoURL}`);
	// modalVideoInSurgery.setAttribute('src', `/in-surgery/video/${dataVideo}`);
	inputDeleteVideoInSurgery.value = dataVideoName;
});

// Restore In Surgery Video
var restoreVideoModalInSurgery = document.getElementById('restoreVideoModalInSurgery');

restoreVideoModalInSurgery.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoName = button.getAttribute('data-name-video');
	var dataVideoURL = button.getAttribute('data-url-video');

	var restoreVideoInSurgery = document.getElementById('restore-video-in-surgery');
	var inputRestoreVideoInSurgery = document.getElementById('inputRestoreVideoInSurgery');

	restoreVideoInSurgery.setAttribute('src', `${dataVideoURL}`);
	// restoreVideoInSurgery.setAttribute('src', `/in-surgery/video/${dataVideo}`);
	inputRestoreVideoInSurgery.value = dataVideoName;
});

// Delete After Image
var imageModalAfter = document.getElementById('imageModalAfter')

imageModalAfter.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');

	var modalImageAfter = document.getElementById('modal-img-after');
	var inputDeleteImgAfter = document.getElementById('inputDeleteImgAfter');

	modalImageAfter.setAttribute('src', `${dataImgURL}`);
	// modalImageAfter.setAttribute('src', `/after/img/${dataImg}`);
	inputDeleteImgAfter.value = dataImgName;

})

// Restore After Image
var restoreImageModalAfter = document.getElementById('restoreImageModalAfter');

restoreImageModalAfter.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataImgName = button.getAttribute('data-name-img');
	var dataImgURL = button.getAttribute('data-url-img');

	var restoreImageAfter = document.getElementById('restore-img-after');
	var inputRestoreImageAfter = document.getElementById('inputRestoreImageAfter');

	restoreImageAfter.setAttribute('src', `${dataImgURL}`);
	// restoreImageAfter.setAttribute('src', `/after/img/${dataImg}`);
	inputRestoreImageAfter.value = dataImgName;

});

// Delete After Video
var videoModalAfter = document.getElementById('videoModalAfter')

videoModalAfter.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoName = button.getAttribute('data-name-video');
	var dataVideoURL = button.getAttribute('data-url-video');

	var modalVideoAfter = document.getElementById('modal-video-after');
	var inputDeleteVideoAfter = document.getElementById('inputDeleteVideoAfter');

	modalVideoAfter.setAttribute('src', `${dataVideoURL}`);
	// modalVideoAfter.setAttribute('src', `/after/video/${dataVideo}`);
	inputDeleteVideoAfter.value = dataVideoName;

})

// Restore In Surgery Video
var restoreVideoModalAfter = document.getElementById('restoreVideoModalAfter');

restoreVideoModalAfter.addEventListener('show.bs.modal', function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget

	// Extract info from data-bs-* attributes
	var dataVideoName = button.getAttribute('data-name-video');
	var dataVideoURL = button.getAttribute('data-url-video');

	var restoreVideoAfter = document.getElementById('restore-video-after');
	var inputRestoreVideoAfter = document.getElementById('inputRestoreVideoAfter');

	restoreVideoAfter.setAttribute('src', `${dataVideoURL}`);
	// restoreVideoAfter.setAttribute('src', `/after/video/${dataVideo}`);
	inputRestoreVideoAfter.value = dataVideoName;
});

function totalMoneyFn(before, current) {
	return before + current.price;
}

// Hàm tạo dịch vụ mới
var serviceContainer = document.getElementById('service-container');
var createService = function() {
	let divContainer = document.createElement('div');
	divContainer.setAttribute('class', 'input-group input-group-sm mb-2 form-group');
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
	inputPrice.setAttribute('rules', 'isNum');
	divContainer.append(inputService, inputPrice, btnClose);
	serviceContainer.append(divContainer);
}

var addServicesBtn = document.getElementById('add-services');
var selectServices = document.getElementById('select-service');
var totalInput = document.getElementById('total');
var totalServiceCharge = document.getElementById('totalServiceCharge');
var depositInput = document.getElementById('deposit');
var priceBefore = document.getElementById('price-before');
var discount = document.getElementById('discount');
var amountToBePaid = document.getElementById('amount-to-be-paid');
var messageTotalServiceCharge = document.getElementById('messageTotalServiceCharge');

// Thêm dịch vụ
var addServices = function() {
	let serviceArr = [];
	let serviceElement = serviceContainer.children;
	for (let i = 0; i < serviceElement.length; i++) {
		let serviceInput = serviceElement[i].children[1];
		serviceInput.setAttribute('id', i);
		serviceArr.push({ 'index': i, 'price': parseFloat(serviceInput.value.replace(/\D/g,''), 10)});
		serviceInput.addEventListener('focus', (e) => {
			serviceInput.value = null;
		});
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
			// Cộng tổng phí dịch vụ
			let totalServiceMoney = serviceArr.reduce(totalMoneyFn, 0);

			// Hiển thị tổng phí dịch vụ trên giao diện
			totalServiceCharge.value = totalServiceMoney.toLocaleString();
			if (totalServiceCharge.classList.contains('invalid') || messageTotalServiceCharge.classList.contains('text-danger')) {
                totalServiceCharge.classList.remove('invalid');
                if (messageTotalServiceCharge) {
                    messageTotalServiceCharge.innerText = '';
                }
            }

			let convertTotalServiceCharge = parseFloat(totalServiceCharge.value.replace(/\D/g,''), 10);

			// Chuyển đổi tiền đặt cọc
			let convertDeposit = parseFloat(depositInput.value.replace(/\D/g,''), 10);

			// Chuyển đổi tiền giảm giá
			let convertDiscount = parseFloat(discount.value.replace(/\D/g,''), 10);
			let trucoc = convertTotalServiceCharge - convertDeposit - convertDiscount;
			amountToBePaid.value = trucoc.toLocaleString();
			totalInput.value = convertTotalServiceCharge.toLocaleString();
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
				let totalServiceMoney = serviceArr.reduce(totalMoneyFn, 0);
				console.log(totalServiceMoney)

				// Hiển thị tổng phí dịch vụ trên giao diện
				totalServiceCharge.value = totalServiceMoney.toLocaleString();
				// totalServiceCharge.value = '';

				let convertTotalServiceCharge = parseFloat(totalServiceCharge.value.replace(/\D/g,''), 10);
				let convertDeposit = parseFloat(depositInput.value.replace(/\D/g,''), 10);
				// Chuyển đổi tiền giảm giá
				let convertDiscount = parseFloat(discount.value.replace(/\D/g,''), 10);
				let trucoc = convertTotalServiceCharge - convertDeposit - convertDiscount;
				amountToBePaid.value = trucoc.toLocaleString();
				totalInput.value = convertTotalServiceCharge.toLocaleString();
			})
			parent.remove();
		})
	}
}
discount.addEventListener('input', (e) => {
	let discountValue = e.target.value;
	// Chuyển đổi tiền giảm giá
	let convertDiscount = parseFloat(discountValue.replace(/\D/g,''), 10);

	// Chuyển đổi tiền đặt cọc
	let convertDeposit = parseFloat(depositInput.value.replace(/\D/g,''), 10);

	discount.value = convertDiscount.toLocaleString();

	// Chuyển đổi tổng phí dịch vụ
	let convertTotalServiceCharge = parseFloat(totalServiceCharge.value.replace(/\D/g,''), 10);
	// console.log(convertTotalServiceCharge)
	let subtraction = convertTotalServiceCharge - convertDeposit - convertDiscount;
	amountToBePaid.value = subtraction.toLocaleString();
});

if (addServicesBtn) {
	// totalInput.value = priceBefore.value
	/* Khi người dùng click nút thêm dịch vụ sẽ tiến hành thêm dịch vụ mới và thẻ input để nhập giá tiền kèm nút xóa */
	// Lắng nghe nút thêm dịch vụ
	addServicesBtn.addEventListener('click', (e) => {
		e.preventDefault();
		// Gọi đến hàm tạo dịch vụ khi click
		createService();
		addServices();
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

/* Counselor Img*/
// Checkbox all change
var checkboxAllImgCounselor = $('#checkboxAllImgCounselor');
var imgCounselorCheckbox = $('.inputCheckImgCounselor');
checkboxAllImgCounselor.change(function () {
	var isCheckedAll = $(this).prop('checked');
	imgCounselorCheckbox.prop('checked', isCheckedAll);
	renderDeleteImgCounselorBtn();
})

// Img checkbox change
imgCounselorCheckbox.change(function () {
	var isCheckedAllLength = imgCounselorCheckbox.length === $('.inputCheckImgCounselor:checked').length;
	checkboxAllImgCounselor.prop('checked', isCheckedAllLength);
	renderDeleteImgCounselorBtn();
})

function renderDeleteImgCounselorBtn() {
	var checkedCount = $('.inputCheckImgCounselor:checked').length;
	checkedCount ? $('#deleteImgCounselorBtn').removeClass('disabled') : $('#deleteImgCounselorBtn').addClass('disabled');
}

/* Counselor Video*/
// Checkbox all change
var checkboxAllVideoCounselor = $('#checkboxAllVideoCounselor');
var videoCounselorCheckbox = $('.inputCheckVideoCounselor');
checkboxAllVideoCounselor.change(function () {
	var isCheckedAll = $(this).prop('checked');
	videoCounselorCheckbox.prop('checked', isCheckedAll);
	renderDeleteVideoCounselorBtn();
})

// Img checkbox change
videoCounselorCheckbox.change(function () {
	var isCheckedAllLength = videoCounselorCheckbox.length === $('.inputCheckVideoCounselor:checked').length;
	checkboxAllVideoCounselor.prop('checked', isCheckedAllLength);
	renderDeleteVideoCounselorBtn();
})

function renderDeleteVideoCounselorBtn() {
	var checkedCount = $('.inputCheckVideoCounselor:checked').length;
	checkedCount ? $('#deleteVideoCounselorBtn').removeClass('disabled') : $('#deleteVideoCounselorBtn').addClass('disabled');
}


/* Before Img*/
// Checkbox all change
var checkboxAllImgBefore = $('#checkboxAllImgBefore');
var imgBeforeCheckbox = $('.inputCheckImgBefore');
checkboxAllImgBefore.change(function () {
	var isCheckedAll = $(this).prop('checked');
	imgBeforeCheckbox.prop('checked', isCheckedAll);
	renderDeleteImgBeforeBtn();
})

// Img checkbox change
imgBeforeCheckbox.change(function () {
	var isCheckedAllLength = imgBeforeCheckbox.length === $('.inputCheckImgBefore:checked').length;
	checkboxAllImgBefore.prop('checked', isCheckedAllLength);
	renderDeleteImgBeforeBtn();
})

function renderDeleteImgBeforeBtn() {
	var checkedCount = $('.inputCheckImgBefore:checked').length;
	checkedCount ? $('#deleteImgBeforeBtn').removeClass('disabled') : $('#deleteImgBeforeBtn').addClass('disabled');
}

/* Before Video*/
// Checkbox all change
var checkboxAllVideoBefore = $('#checkboxAllVideoBefore');
var videoBeforeCheckbox = $('.inputCheckVideoBefore');
checkboxAllVideoBefore.change(function () {
	var isCheckedAll = $(this).prop('checked');
	videoBeforeCheckbox.prop('checked', isCheckedAll);
	renderDeleteVideoBeforeBtn();
})

// Img checkbox change
videoBeforeCheckbox.change(function () {
	var isCheckedAllLength = videoBeforeCheckbox.length === $('.inputCheckVideoBefore:checked').length;
	checkboxAllVideoBefore.prop('checked', isCheckedAllLength);
	renderDeleteVideoBeforeBtn();
})

function renderDeleteVideoBeforeBtn() {
	var checkedCount = $('.inputCheckVideoBefore:checked').length;
	checkedCount ? $('#deleteVideoBeforeBtn').removeClass('disabled') : $('#deleteVideoBeforeBtn').addClass('disabled');
}


/* Insurgery Img*/
// Checkbox all change
var checkboxAllImgInSurgery = $('#checkboxAllImgInSurgery');
var imgInSurgeryCheckbox = $('.inputCheckImgInSurgery');
checkboxAllImgInSurgery.change(function () {
	var isCheckedAll = $(this).prop('checked');
	imgInSurgeryCheckbox.prop('checked', isCheckedAll);
	renderDeleteImgInSurgeryBtn();
})

// Img checkbox change
imgInSurgeryCheckbox.change(function () {
	var isCheckedAllLength = imgInSurgeryCheckbox.length === $('.inputCheckImgInSurgery:checked').length;
	checkboxAllImgInSurgery.prop('checked', isCheckedAllLength);
	renderDeleteImgInSurgeryBtn();
})

function renderDeleteImgInSurgeryBtn() {
	var checkedCount = $('.inputCheckImgInSurgery:checked').length;
	checkedCount ? $('#deleteImgInSurgeryBtn').removeClass('disabled') : $('#deleteImgInSurgeryBtn').addClass('disabled');
}

/* Insurgery Video*/
// Checkbox all change
var checkboxAllVideoInSurgery = $('#checkboxAllVideoInSurgery');
var videoInSurgeryCheckbox = $('.inputCheckVideoInSurgery');
checkboxAllVideoInSurgery.change(function () {
	var isCheckedAll = $(this).prop('checked');
	videoInSurgeryCheckbox.prop('checked', isCheckedAll);
	renderDeleteVideoInSurgeryBtn();
})

// Img checkbox change
videoInSurgeryCheckbox.change(function () {
	var isCheckedAllLength = videoInSurgeryCheckbox.length === $('.inputCheckVideoInSurgery:checked').length;
	checkboxAllVideoInSurgery.prop('checked', isCheckedAllLength);
	renderDeleteVideoInSurgeryBtn();
})

function renderDeleteVideoInSurgeryBtn() {
	var checkedCount = $('.inputCheckVideoInSurgery:checked').length;
	checkedCount ? $('#deleteVideoInSurgeryBtn').removeClass('disabled') : $('#deleteVideoInSurgeryBtn').addClass('disabled');
}


/* After Img*/
// Checkbox all change
var checkboxAllImgAfter = $('#checkboxAllImgAfter');
var imgAfterCheckbox = $('.inputCheckImgAfter');
checkboxAllImgAfter.change(function () {
	var isCheckedAll = $(this).prop('checked');
	imgAfterCheckbox.prop('checked', isCheckedAll);
	renderDeleteImgAfterBtn();
})

// Img checkbox change
imgAfterCheckbox.change(function () {
	var isCheckedAllLength = imgAfterCheckbox.length === $('.inputCheckImgAfter:checked').length;
	checkboxAllImgAfter.prop('checked', isCheckedAllLength);
	renderDeleteImgAfterBtn();
})

function renderDeleteImgAfterBtn() {
	var checkedCount = $('.inputCheckImgAfter:checked').length;
	checkedCount ? $('#deleteImgAfterBtn').removeClass('disabled') : $('#deleteImgAfterBtn').addClass('disabled');
}

/* After Video*/
// Checkbox all change
var checkboxAllVideoAfter = $('#checkboxAllVideoAfter');
var videoAfterCheckbox = $('.inputCheckVideoAfter');
checkboxAllVideoAfter.change(function () {
	var isCheckedAll = $(this).prop('checked');
	videoAfterCheckbox.prop('checked', isCheckedAll);
	renderDeleteVideoAfterBtn();
})

// Img checkbox change
videoAfterCheckbox.change(function () {
	var isCheckedAllLength = videoAfterCheckbox.length === $('.inputCheckVideoAfter:checked').length;
	checkboxAllVideoAfter.prop('checked', isCheckedAllLength);
	renderDeleteVideoAfterBtn();
})

function renderDeleteVideoAfterBtn() {
	var checkedCount = $('.inputCheckVideoAfter:checked').length;
	checkedCount ? $('#deleteVideoAfterBtn').removeClass('disabled') : $('#deleteVideoAfterBtn').addClass('disabled');
}