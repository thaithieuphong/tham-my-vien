// Restore InSurgery video
var restoreInSurgeryVideoForm = document.forms['restore-in-surgery-video-form'];
var checkAllRestoreInSurgeryVideo = $('#checkAllRestoreInSurgeryVideo');
var restoreInSurgeryVideoCheckbox = $('.restore-form-check-input-in-surgery-video');
var restoreInSurgeryVideoBtn = $('#restore-in-surgery-video');

// Khi nut chon tat ca video duoc click
checkAllRestoreInSurgeryVideo.change(function () {
    var isCheckedAll = $(this).prop('checked');
    restoreInSurgeryVideoCheckbox.prop('checked', isCheckedAll);
    renderRestoreButtonInSurgeryVideo();
});

// Khi nut chon mot video duoc click
restoreInSurgeryVideoCheckbox.change(function () {
    var isCheckedAll = restoreInSurgeryVideoCheckbox.length === $('.restore-form-check-input-in-surgery-video:checked').length;
    checkAllRestoreInSurgeryVideo.prop('checked', isCheckedAll);
    renderRestoreButtonInSurgeryVideo();
});

// Khoa submit form khi chua check
restoreInSurgeryVideoBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        restoreInSurgeryVideoForm.submit();
    }
})

// Render lai nut khôi phục
function renderRestoreButtonInSurgeryVideo() {
    var checkedCount = $('.restore-form-check-input-in-surgery-video:checked').length;
    if (checkedCount > 0) {
        restoreInSurgeryVideoBtn.removeClass('disabled');
    } else {
        restoreInSurgeryVideoBtn.addClass('disabled');
    }
}