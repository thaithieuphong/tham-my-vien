// Restore before image
var restoreWoundCleaningImgForm = document.forms['restore-wound-cleaning-img-form'];
var checkAllRestoreWoundCleaningImg = $('#checkAllRestoreWoundCleaningImg');
var restoreWoundCleaningImgCheckbox = $('.restore-form-check-input-wound-cleaning-img');
var restoreWoundCleaningImgBtn = $('#restore-wound-cleaning-img');

// Khi nut chon tat ca hinh anh duoc click
checkAllRestoreWoundCleaningImg.change(function () {
    var isCheckedAll = $(this).prop('checked');
    restoreWoundCleaningImgCheckbox.prop('checked', isCheckedAll);
    renderRestoreButtonWoundCleaningImg();
});

// Khi nut chon mot hinh anh duoc click
restoreWoundCleaningImgCheckbox.change(function () {
    var isCheckedAll = restoreWoundCleaningImgCheckbox.length === $('.restore-form-check-input-wound-cleaning-img:checked').length;
    checkAllRestoreWoundCleaningImg.prop('checked', isCheckedAll);
    renderRestoreButtonWoundCleaningImg();
});

// Khoa submit form khi chua check
restoreWoundCleaningImgBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        restoreWoundCleaningImgForm.submit();
    }
})

// Render lai nut khôi phục
function renderRestoreButtonWoundCleaningImg() {
    var checkedCount = $('.restore-form-check-input-wound-cleaning-img:checked').length;
    if (checkedCount > 0) {
        restoreWoundCleaningImgBtn.removeClass('disabled');
    } else {
        restoreWoundCleaningImgBtn.addClass('disabled');
    }
}