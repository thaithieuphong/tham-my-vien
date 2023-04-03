// Counselor Video
var deleteCounselorVideoForm = document.forms['delete-counselor-video-form'];
var checkAllCounselorVideo = $('#checkAllCounselorVideo');
var counselorVideoCheckbox = $('.delete-form-check-input-counselor-video');
var deleteCounselorVideoBtn = $('#delete-counselor-video');

// Khi nut chon tat ca hinh anh duoc click
checkAllCounselorVideo.change(function () {
    var isCheckedAll = $(this).prop('checked');
    counselorVideoCheckbox.prop('checked', isCheckedAll);
    renderDeleteButtonCounselorVideo();
});

// Khi nut chon mot hinh anh duoc click
counselorVideoCheckbox.change(function () {
    var isCheckedAll = counselorVideoCheckbox.length === $('.delete-form-check-input-counselor-video:checked').length;
    checkAllCounselorVideo.prop('checked', isCheckedAll);
    renderDeleteButtonCounselorVideo();
});

// Khoa submit form khi chua check
deleteCounselorVideoBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        deleteCounselorVideoForm.submit();
    }
})

// Render lai nut xoa
function renderDeleteButtonCounselorVideo() {
    var checkedCount = $('.delete-form-check-input-counselor-video:checked').length;
    if (checkedCount > 0) {
        deleteCounselorVideoBtn.removeClass('disabled');
    } else {
        deleteCounselorVideoBtn.addClass('disabled');
    }
}