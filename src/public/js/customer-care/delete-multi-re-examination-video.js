// Counselor Video
var deleteReExaminationVideoForm = document.forms['delete-re-examination-video-form'];
var checkAllReExaminationVideo = $('#checkAllReExaminationVideo');
var reExaminationVideoCheckbox = $('.delete-form-check-input-re-examination-video');
var deleteReExaminationVideoBtn = $('#delete-re-examination-video');

// Khi nut chon tat ca hinh anh duoc click
checkAllReExaminationVideo.change(function () {
    var isCheckedAll = $(this).prop('checked');
    reExaminationVideoCheckbox.prop('checked', isCheckedAll);
    renderDeleteButtonReExaminationVideo();
});

// Khi nut chon mot hinh anh duoc click
reExaminationVideoCheckbox.change(function () {
    var isCheckedAll = reExaminationVideoCheckbox.length === $('.delete-form-check-input-re-examination-video:checked').length;
    checkAllReExaminationVideo.prop('checked', isCheckedAll);
    renderDeleteButtonReExaminationVideo();
});

// Khoa submit form khi chua check
deleteReExaminationVideoBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        deleteReExaminationVideoForm.submit();
    }
})

// Render lai nut xoa
function renderDeleteButtonReExaminationVideo() {
    var checkedCount = $('.delete-form-check-input-re-examination-video:checked').length;
    if (checkedCount > 0) {
        deleteReExaminationVideoBtn.removeClass('disabled');
    } else {
        deleteReExaminationVideoBtn.addClass('disabled');
    }
}