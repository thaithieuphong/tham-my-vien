var deleteInSurgeryImgForm = document.forms['delete-in-surgery-img-form'];
var checkAllInSurgeryImg = $('#checkAllInSurgeryImg');
var inSurgeryImgCheckbox = $('.delete-form-check-input-in-surgery-img');
var deleteInSurgeryImgBtn = $('#delete-in-surgery-img');

// Khi nut chon tat ca hinh anh duoc click
checkAllInSurgeryImg.change(function () {
    var isCheckedAll = $(this).prop('checked');
    inSurgeryImgCheckbox.prop('checked', isCheckedAll);
    renderDeleteButtonInSurgeryImg();
});

// Khi nut chon mot hinh anh duoc click
inSurgeryImgCheckbox.change(function () {
    var isCheckedAll = inSurgeryImgCheckbox.length === $('.delete-form-check-input-in-surgery-img:checked').length;
    checkAllInSurgeryImg.prop('checked', isCheckedAll);
    renderDeleteButtonInSurgeryImg();
});

// Khoa submit form khi chua check
deleteInSurgeryImgBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        deleteInSurgeryImgForm.submit();
    }
})

// Render lai nut xoa
function renderDeleteButtonInSurgeryImg() {
    var checkedCount = $('.delete-form-check-input-in-surgery-img:checked').length;
    if (checkedCount > 0) {
        deleteInSurgeryImgBtn.removeClass('disabled');
    } else {
        deleteInSurgeryImgBtn.addClass('disabled');
    }
}