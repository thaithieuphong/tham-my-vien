// Restore counselor image
var restoreCounselorImgForm = document.forms['restore-counselor-img-form'];
var checkAllRestoreCounselorImg = $('#checkAllRestoreCounselorImg');
var restoreCounselorImgCheckbox = $('.restore-form-check-input-counselor-img');
var restoreCounselorImgBtn = $('#restore-counselor-img');

// Khi nut chon tat ca hinh anh duoc click
checkAllRestoreCounselorImg.change(function () {
    var isCheckedAll = $(this).prop('checked');
    restoreCounselorImgCheckbox.prop('checked', isCheckedAll);
    renderRestoreButtonCounselorImg();
});

// Khi nut chon mot hinh anh duoc click
restoreCounselorImgCheckbox.change(function () {
    var isCheckedAll = restoreCounselorImgCheckbox.length === $('.restore-form-check-input-counselor-img:checked').length;
    checkAllRestoreCounselorImg.prop('checked', isCheckedAll);
    renderRestoreButtonCounselorImg();
});

// Khoa submit form khi chua check
restoreCounselorImgBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        restoreCounselorImgForm.submit();
    }
})

// Render lai nut khôi phục
function renderRestoreButtonCounselorImg() {
    var checkedCount = $('.restore-form-check-input-counselor-img:checked').length;
    if (checkedCount > 0) {
        restoreCounselorImgBtn.removeClass('disabled');
    } else {
        restoreCounselorImgBtn.addClass('disabled');
    }
}