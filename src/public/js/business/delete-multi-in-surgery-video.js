// Counselor Video
var deleteInSurgeryVideoForm = document.forms['delete-in-surgery-video-form'];
var checkAllInSurgeryVideo = $('#checkAllInSurgeryVideo');
var inSurgeryVideoCheckbox = $('.delete-form-check-input-in-surgery-video');
var deleteInSurgeryVideoBtn = $('#delete-in-surgery-video');

// Khi nut chon tat ca hinh anh duoc click
checkAllInSurgeryVideo.change(function () {
    var isCheckedAll = $(this).prop('checked');
    inSurgeryVideoCheckbox.prop('checked', isCheckedAll);
    renderDeleteButtonInSurgeryVideo();

});

// Khi nut chon mot hinh anh duoc click
inSurgeryVideoCheckbox.change(function () {
    var isCheckedAll = inSurgeryVideoCheckbox.length === $('.delete-form-check-input-in-surgery-video:checked').length;
    checkAllInSurgeryVideo.prop('checked', isCheckedAll);
    renderDeleteButtonInSurgeryVideo();
});

// Khoa submit form khi chua check
deleteInSurgeryVideoBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        deleteInSurgeryVideoForm.submit();
    }
})

// Render lai nut xoa
function renderDeleteButtonInSurgeryVideo() {
    var checkedCount = $('.delete-form-check-input-in-surgery-video:checked').length;
    if (checkedCount > 0) {
        deleteInSurgeryVideoBtn.removeClass('disabled');
    } else {
        deleteInSurgeryVideoBtn.addClass('disabled');
    }
}