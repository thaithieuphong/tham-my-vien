// Restore before video
var restoreBeforeVideoForm = document.forms['restore-before-video-form'];
var checkAllRestoreBeforeVideo = $('#checkAllRestoreBeforeVideo');
var restoreBeforeVideoCheckbox = $('.restore-form-check-input-before-video');
var restoreBeforeVideoBtn = $('#restore-before-video');

// Khi nut chon tat ca video duoc click
checkAllRestoreBeforeVideo.change(function () {
    var isCheckedAll = $(this).prop('checked');
    restoreBeforeVideoCheckbox.prop('checked', isCheckedAll);
    renderRestoreButtonBeforeVideo();
});

// Khi nut chon mot video duoc click
restoreBeforeVideoCheckbox.change(function () {
    var isCheckedAll = restoreBeforeVideoCheckbox.length === $('.restore-form-check-input-before-video:checked').length;
    checkAllRestoreBeforeVideo.prop('checked', isCheckedAll);
    renderRestoreButtonBeforeVideo();
});

// Khoa submit form khi chua check
restoreBeforeVideoBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        restoreBeforeVideoForm.submit();
    }
})

// Render lai nut khôi phục
function renderRestoreButtonBeforeVideo() {
    var checkedCount = $('.restore-form-check-input-before-video:checked').length;
    if (checkedCount > 0) {
        restoreBeforeVideoBtn.removeClass('disabled');
    } else {
        restoreBeforeVideoBtn.addClass('disabled');
    }
}