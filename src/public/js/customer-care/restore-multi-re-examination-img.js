// Restore counselor image
var restoreReExaminationImgForm = document.forms['restore-re-examination-img-form'];
var checkAllRestoreReExaminationImg = $('#checkAllRestoreReExaminationImg');
var restoreReExaminationImgCheckbox = $('.restore-form-check-input-re-examination-img');
var restoreReExaminationImgBtn = $('#restore-re-examination-img');

// Khi nut chon tat ca hinh anh duoc click
checkAllRestoreReExaminationImg.change(function () {
    var isCheckedAll = $(this).prop('checked');
    restoreReExaminationImgCheckbox.prop('checked', isCheckedAll);
    renderRestoreButtonReExaminationImg();
});

// Khi nut chon mot hinh anh duoc click
restoreReExaminationImgCheckbox.change(function () {
    var isCheckedAll = restoreReExaminationImgCheckbox.length === $('.restore-form-check-input-re-examination-img:checked').length;
    checkAllRestoreReExaminationImg.prop('checked', isCheckedAll);
    renderRestoreButtonReExaminationImg();
});

// Khoa submit form khi chua check
restoreReExaminationImgBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        restoreReExaminationImgForm.submit();
    }
})

// Render lai nut khôi phục
function renderRestoreButtonReExaminationImg() {
    var checkedCount = $('.restore-form-check-input-re-examination-img:checked').length;
    if (checkedCount > 0) {
        restoreReExaminationImgBtn.removeClass('disabled');
    } else {
        restoreReExaminationImgBtn.addClass('disabled');
    }
}