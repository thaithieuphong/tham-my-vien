// Restore before image
var restoreBeforeImgForm = document.forms['restore-before-img-form'];
var checkAllRestoreBeforeImg = $('#checkAllRestoreBeforeImg');
var restoreBeforeImgCheckbox = $('.restore-form-check-input-before-img');
var restoreBeforeImgBtn = $('#restore-before-img');

// Khi nut chon tat ca hinh anh duoc click
checkAllRestoreBeforeImg.change(function () {
    var isCheckedAll = $(this).prop('checked');
    restoreBeforeImgCheckbox.prop('checked', isCheckedAll);
    renderRestoreButtonBeforeImg();
});

// Khi nut chon mot hinh anh duoc click
restoreBeforeImgCheckbox.change(function () {
    var isCheckedAll = restoreBeforeImgCheckbox.length === $('.restore-form-check-input-before-img:checked').length;
    checkAllRestoreBeforeImg.prop('checked', isCheckedAll);
    renderRestoreButtonBeforeImg();
});

// Khoa submit form khi chua check
restoreBeforeImgBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        restoreBeforeImgForm.submit();
    }
})

// Render lai nut khôi phục
function renderRestoreButtonBeforeImg() {
    var checkedCount = $('.restore-form-check-input-before-img:checked').length;
    if (checkedCount > 0) {
        restoreBeforeImgBtn.removeClass('disabled');
    } else {
        restoreBeforeImgBtn.addClass('disabled');
    }
}