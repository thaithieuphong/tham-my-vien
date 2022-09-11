
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

        phone: function (value) {
            var phoneno = /^\d{10}$/;
            return phoneno.test(value) ? undefined : 'Vui lòng nhập đúng số điện thoại';
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