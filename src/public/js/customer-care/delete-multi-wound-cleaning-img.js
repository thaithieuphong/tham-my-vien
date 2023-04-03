var deleteWoundCleaningImgForm = document.forms['delete-wound-cleaning-img-form'];
var checkAllWoundCleaningImg = $('#checkAllWoundCleaningImg');
var woundCleaningImgCheckbox = $('.delete-form-check-input-wound-cleaning-img');
var deleteWoundCleaningImgBtn = $('#delete-wound-cleaning-img');

// Khi nut chon tat ca hinh anh duoc click
checkAllWoundCleaningImg.change(function () {
    var isCheckedAll = $(this).prop('checked');
    woundCleaningImgCheckbox.prop('checked', isCheckedAll);
    renderDeleteButtonWoundCleaningImg();
});

// Khi nut chon mot hinh anh duoc click
woundCleaningImgCheckbox.change(function () {
    var isCheckedAll = woundCleaningImgCheckbox.length === $('.delete-form-check-input-wound-cleaning-img:checked').length;
    checkAllWoundCleaningImg.prop('checked', isCheckedAll);
    renderDeleteButtonWoundCleaningImg();
});

// Khoa submit form khi chua check
deleteWoundCleaningImgBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        deleteWoundCleaningImgForm.submit();
    }
})

// Render lai nut xoa
function renderDeleteButtonWoundCleaningImg() {
    var checkedCount = $('.delete-form-check-input-wound-cleaning-img:checked').length;
    if (checkedCount > 0) {
        deleteWoundCleaningImgBtn.removeClass('disabled');
    } else {
        deleteWoundCleaningImgBtn.addClass('disabled');
    }
}