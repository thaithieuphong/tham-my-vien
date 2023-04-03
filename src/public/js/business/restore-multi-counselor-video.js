// Restore counselor video
var restoreCounselorVideoForm = document.forms['restore-counselor-video-form'];
var checkAllRestoreCounselorVideo = $('#checkAllRestoreCounselorVideo');
var restoreCounselorVideoCheckbox = $('.restore-form-check-input-counselor-video');
var restoreCounselorVideoBtn = $('#restore-counselor-video');

// Khi nut chon tat ca video duoc click
checkAllRestoreCounselorVideo.change(function () {
    var isCheckedAll = $(this).prop('checked');
    restoreCounselorVideoCheckbox.prop('checked', isCheckedAll);
    renderRestoreButtonCounselorVideo();
});

// Khi nut chon mot video duoc click
restoreCounselorVideoCheckbox.change(function () {
    var isCheckedAll = restoreCounselorVideoCheckbox.length === $('.restore-form-check-input-counselor-video:checked').length;
    checkAllRestoreCounselorVideo.prop('checked', isCheckedAll);
    renderRestoreButtonCounselorVideo();
});

// Khoa submit form khi chua check
restoreCounselorVideoBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        restoreCounselorVideoForm.submit();
    }
})

// Render lai nut khôi phục
function renderRestoreButtonCounselorVideo() {
    var checkedCount = $('.restore-form-check-input-counselor-video:checked').length;
    if (checkedCount > 0) {
        restoreCounselorVideoBtn.removeClass('disabled');
    } else {
        restoreCounselorVideoBtn.addClass('disabled');
    }
}