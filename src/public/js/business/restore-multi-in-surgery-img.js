// Restore in surgery image
var restoreInSurgeryImgForm = document.forms['restore-in-surgery-img-form'];
var checkAllRestoreInSurgeryImg = $('#checkAllRestoreInSurgeryImg');
var restoreInSurgeryImgCheckbox = $('.restore-form-check-input-in-surgery-img');
var restoreInSurgeryImgBtn = $('#restore-in-surgery-img');

// Khi nut chon tat ca hinh anh duoc click
checkAllRestoreInSurgeryImg.change(function () {
    var isCheckedAll = $(this).prop('checked');
    restoreInSurgeryImgCheckbox.prop('checked', isCheckedAll);
    renderRestoreButtonInSurgeryImg();
});

// Khi nut chon mot hinh anh duoc click
restoreInSurgeryImgCheckbox.change(function () {
    var isCheckedAll = restoreInSurgeryImgCheckbox.length === $('.restore-form-check-input-in-surgery-img:checked').length;
    checkAllRestoreInSurgeryImg.prop('checked', isCheckedAll);
    renderRestoreButtonInSurgeryImg();
});

// Khoa submit form khi chua check
restoreInSurgeryImgBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        restoreInSurgeryImgForm.submit();
    }
})

// Render lai nut khôi phục
function renderRestoreButtonInSurgeryImg() {
    var checkedCount = $('.restore-form-check-input-in-surgery-img:checked').length;
    if (checkedCount > 0) {
        restoreInSurgeryImgBtn.removeClass('disabled');
    } else {
        restoreInSurgeryImgBtn.addClass('disabled');
    }
}