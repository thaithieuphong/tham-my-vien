// Counselor Video
var deleteWoundCleaningVideoForm = document.forms['delete-wound-cleaning-video-form'];
var checkAllWoundCleaningVideo = $('#checkAllWoundCleaningVideo');
var woundCleaningVideoCheckbox = $('.delete-form-check-input-wound-cleaning-video');
var deleteWoundCleaningVideoBtn = $('#delete-wound-cleaning-video');

// Khi nut chon tat ca hinh anh duoc click
checkAllWoundCleaningVideo.change(function () {
    var isCheckedAll = $(this).prop('checked');
    woundCleaningVideoCheckbox.prop('checked', isCheckedAll);
    renderDeleteButtonWoundCleaningVideo();
});

// Khi nut chon mot hinh anh duoc click
woundCleaningVideoCheckbox.change(function () {
    var isCheckedAll = woundCleaningVideoCheckbox.length === $('.delete-form-check-input-wound-cleaning-video:checked').length;
    checkAllWoundCleaningVideo.prop('checked', isCheckedAll);
    renderDeleteButtonWoundCleaningVideo();
});

// Khoa submit form khi chua check
deleteWoundCleaningVideoBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        deleteWoundCleaningVideoForm.submit();
    }
})

// Render lai nut xoa
function renderDeleteButtonWoundCleaningVideo() {
    var checkedCount = $('.delete-form-check-input-wound-cleaning-video:checked').length;
    if (checkedCount > 0) {
        deleteWoundCleaningVideoBtn.removeClass('disabled');
    } else {
        deleteWoundCleaningVideoBtn.addClass('disabled');
    }
}