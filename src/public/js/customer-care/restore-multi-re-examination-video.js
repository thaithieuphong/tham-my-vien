// Restore counselor video
var restoreReExaminationVideoForm = document.forms['restore-re-examination-video-form'];
var checkAllRestoreReExaminationVideo = $('#checkAllRestoreReExaminationVideo');
var restoreReExaminationVideoCheckbox = $('.restore-form-check-input-re-examination-video');
var restoreReExaminationVideoBtn = $('#restore-re-examination-video');

// Khi nut chon tat ca video duoc click
checkAllRestoreReExaminationVideo.change(function () {
    var isCheckedAll = $(this).prop('checked');
    restoreReExaminationVideoCheckbox.prop('checked', isCheckedAll);
    renderRestoreButtonReExaminationVideo();
});

// Khi nut chon mot video duoc click
restoreReExaminationVideoCheckbox.change(function () {
    var isCheckedAll = restoreReExaminationVideoCheckbox.length === $('.restore-form-check-input-re-examination-video:checked').length;
    checkAllRestoreReExaminationVideo.prop('checked', isCheckedAll);
    renderRestoreButtonReExaminationVideo();
});

// Khoa submit form khi chua check
restoreReExaminationVideoBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        restoreReExaminationVideoForm.submit();
    }
})

// Render lai nut khôi phục
function renderRestoreButtonReExaminationVideo() {
    var checkedCount = $('.restore-form-check-input-re-examination-video:checked').length;
    if (checkedCount > 0) {
        restoreReExaminationVideoBtn.removeClass('disabled');
    } else {
        restoreReExaminationVideoBtn.addClass('disabled');
    }
}