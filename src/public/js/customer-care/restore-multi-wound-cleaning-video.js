// Restore before video
var restoreWoundCleaningVideoForm = document.forms['restore-wound-cleaning-video-form'];
var checkAllRestoreWoundCleaningVideo = $('#checkAllRestoreWoundCleaningVideo');
var restoreWoundCleaningVideoCheckbox = $('.restore-form-check-input-wound-cleaning-video');
var restoreWoundCleaningVideoBtn = $('#restore-wound-cleaning-video');

// Khi nut chon tat ca video duoc click
checkAllRestoreWoundCleaningVideo.change(function () {
    var isCheckedAll = $(this).prop('checked');
    restoreWoundCleaningVideoCheckbox.prop('checked', isCheckedAll);
    renderRestoreButtonWoundCleaningVideo();
});

// Khi nut chon mot video duoc click
restoreWoundCleaningVideoCheckbox.change(function () {
    var isCheckedAll = restoreWoundCleaningVideoCheckbox.length === $('.restore-form-check-input-wound-cleaning-video:checked').length;
    checkAllRestoreWoundCleaningVideo.prop('checked', isCheckedAll);
    renderRestoreButtonWoundCleaningVideo();
});

// Khoa submit form khi chua check
restoreWoundCleaningVideoBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        restoreWoundCleaningVideoForm.submit();
    }
})

// Render lai nut khôi phục
function renderRestoreButtonWoundCleaningVideo() {
    var checkedCount = $('.restore-form-check-input-wound-cleaning-video:checked').length;
    if (checkedCount > 0) {
        restoreWoundCleaningVideoBtn.removeClass('disabled');
    } else {
        restoreWoundCleaningVideoBtn.addClass('disabled');
    }
}