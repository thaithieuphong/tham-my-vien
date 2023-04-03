var deleteCounselorImgForm = document.forms['delete-counselor-img-form'];
var checkAllCounselorImg = $('#checkAllCounselorImg');
var counselorImgCheckbox = $('.delete-form-check-input-counselor-img');
var deleteCounselorImgBtn = $('#delete-counselor-img');

// Khi nut chon tat ca hinh anh duoc click
checkAllCounselorImg.change(function () {
    var isCheckedAll = $(this).prop('checked');
    counselorImgCheckbox.prop('checked', isCheckedAll);
    renderDeleteButtonCounselorImg();
});

// Khi nut chon mot hinh anh duoc click
counselorImgCheckbox.change(function () {
    var isCheckedAll = counselorImgCheckbox.length === $('.delete-form-check-input-counselor-img:checked').length;
    checkAllCounselorImg.prop('checked', isCheckedAll);
    renderDeleteButtonCounselorImg();
});

// Khoa submit form khi chua check
deleteCounselorImgBtn.click(function (e) {
    e.preventDefault();
    var isSubmitable = !$(this).hasClass('disabled');
    if (isSubmitable) {
        deleteCounselorImgForm.submit();
    }
})

// Render lai nut xoa
function renderDeleteButtonCounselorImg() {
    var checkedCount = $('.delete-form-check-input-counselor-img:checked').length;
    if (checkedCount > 0) {
        deleteCounselorImgBtn.removeClass('disabled');
    } else {
        deleteCounselorImgBtn.addClass('disabled');
    }
}