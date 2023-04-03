// Counselor Video
var deleteBeforeVideoForm = document.forms['delete-before-video-form'];
var checkAllBeforeVideo = $('#checkAllBeforeVideo');
var beforeVideoCheckbox = $('.delete-form-check-input-before-video');
var deleteBeforeVideoBtn = $('#delete-before-video');

// Khi nut chon tat ca hinh anh duoc click
checkAllBeforeVideo.change(function () {
    var isCheckedAll = $(this).prop('checked');
    beforeVideoCheckbox.prop('checked', isCheckedAll);
    renderDeleteButtonBeforeVideo();
});

// Khi nut chon mot hinh anh duoc click
beforeVideoCheckbox.change(function () {
    var isCheckedAll = beforeVideoCheckbox.length === $('.delete-form-check-input-before-video:checked').length;
    checkAllBeforeVideo.prop('checked', isCheckedAll);
    renderDeleteButtonBeforeVideo();
});

// Khoa submit form khi chua check
deleteBeforeVideoBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        deleteBeforeVideoForm.submit();
    }
})

// Render lai nut xoa
function renderDeleteButtonBeforeVideo() {
    var checkedCount = $('.delete-form-check-input-before-video:checked').length;
    if (checkedCount > 0) {
        deleteBeforeVideoBtn.removeClass('disabled');
    } else {
        deleteBeforeVideoBtn.addClass('disabled');
    }
}