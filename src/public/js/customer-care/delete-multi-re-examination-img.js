var deleteReExaminationImgForm = document.forms['delete-re-examination-img-form'];
var checkAllReExaminationImg = $('#checkAllReExaminationImg');
var reExaminationImgCheckbox = $('.delete-form-check-input-re-examination-img');
var deleteReExaminationImgBtn = $('#delete-re-examination-img');

// Khi nut chon tat ca hinh anh duoc click
checkAllReExaminationImg.change(function () {
    var isCheckedAll = $(this).prop('checked');
    reExaminationImgCheckbox.prop('checked', isCheckedAll);
    renderDeleteButtonReExaminationImg();
});

// Khi nut chon mot hinh anh duoc click
reExaminationImgCheckbox.change(function () {
    var isCheckedAll = reExaminationImgCheckbox.length === $('.delete-form-check-input-re-examination-img:checked').length;
    checkAllReExaminationImg.prop('checked', isCheckedAll);
    renderDeleteButtonReExaminationImg();
});

// Khoa submit form khi chua check
deleteReExaminationImgBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        deleteReExaminationImgForm.submit();
    }
})

// Render lai nut xoa
function renderDeleteButtonReExaminationImg() {
    var checkedCount = $('.delete-form-check-input-re-examination-img:checked').length;
    if (checkedCount > 0) {
        deleteReExaminationImgBtn.removeClass('disabled');
    } else {
        deleteReExaminationImgBtn.addClass('disabled');
    }
}