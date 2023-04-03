var deleteBeforeImgForm = document.forms['delete-before-img-form'];
var checkAllBeforeImg = $('#checkAllBeforeImg');
var beforeImgCheckbox = $('.delete-form-check-input-before-img');
var deleteBeforeImgBtn = $('#delete-before-img');

// Khi nut chon tat ca hinh anh duoc click
checkAllBeforeImg.change(function () {
    var isCheckedAll = $(this).prop('checked');
    beforeImgCheckbox.prop('checked', isCheckedAll);
    renderDeleteButtonBeforeImg();
});

// Khi nut chon mot hinh anh duoc click
beforeImgCheckbox.change(function () {
    var isCheckedAll = beforeImgCheckbox.length === $('.delete-form-check-input-before-img:checked').length;
    checkAllBeforeImg.prop('checked', isCheckedAll);
    renderDeleteButtonBeforeImg();
});

// Khoa submit form khi chua check
deleteBeforeImgBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        deleteBeforeImgForm.submit();
    }
})

// Render lai nut xoa
function renderDeleteButtonBeforeImg() {
    var checkedCount = $('.delete-form-check-input-before-img:checked').length;
    if (checkedCount > 0) {
        deleteBeforeImgBtn.removeClass('disabled');
    } else {
        deleteBeforeImgBtn.addClass('disabled');
    }
}