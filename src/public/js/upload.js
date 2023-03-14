
// // Tạo một phiên bản axios
// const instance = axios.create({
//     // Sử dụng baseURL này trong quá trình sản xuất
//     // baseURL: 'https://crm.drtuananh.vn'

//     // Sử dụng baseURL này trong quá trình phát triển
//     baseURL: 'http://localhost:3001'
// })

// const uploadImgBtn = document.getElementById('upload-img-btn');
// uploadImgBtn.addEventListener('click', () => {
//     uploadImages();
// })

// async function uploadImages() {
//     let messageElement = document.getElementById("message");
//     messageElement.innerHTML = "";
    
//     const inputImg = document.getElementById('input-multi-images-re-exam');
//     const arrayImg = document.getElementById('input-multi-images-re-exam').files;
//     const dataID = inputImg.getAttribute('data-re-exam-id');
//     const inputCusID = document.getElementById('cusID');
//     const dataCusID = inputCusID.value;
//     console.log(dataCusID);
//     const files = arrayImg;
//     if (files.length) {

//         let formData = new FormData();
    
//         for (const file of files) {
//             formData.append('reExamination', file);
//         }
        
//         formData.set('cusID', dataCusID)
    
//         const progressArray = document.querySelectorAll(".progress");
//         progressArray.forEach(progress => {

//             progress.style.display = "block";
//         })
//         let progressBarArr = document.querySelectorAll(".progress-bar");
//         progressBarArr.forEach(progressBar => {
//             progressBar.innerHTML = "0%";
//             progressBar.setAttribute("aria-valuenow", 0);
//             progressBar.style.width = "0%";
//         })
//         const onUploadProgress = (event) => {
//             let progressBarArr = document.querySelectorAll(".progress-bar");
//             progressBarArr.forEach(progressBar => {
//                 const percentage = Math.round((100 * event.loaded) / event.total);
//                 progressBar.innerHTML = percentage + "%";
//                 progressBar.setAttribute("aria-valuenow", percentage);
//                 progressBar.style.width = percentage + "%";
//             })
//         };
        
    
//         try {
//             const res = await instance.post(`/customer-care/employ/re-exam/${dataID}/uploadImages`, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data;",
//                 },
//                 maxBodyLength: Infinity,
//                 maxContentLength: Infinity,
//                 onUploadProgress,
//             });
        
//             const result = {
//                 status: res.status + "-" + res.statusText,
//                 headers: res.headers,
//                 data: res.data
//             };

//             const images = result.data.images;
//             const imageSizes = (images) => {
//                 images.forEach(image => {
//                     const imageSize = image.size.bytes;
//                     return imageSize;
//                 });
//             }
//             console.log(imageSizes);

//             let progressBarArr = document.querySelectorAll(".progress-bar");
//             progressBarArr.forEach(progressBar => {
//                 const percentage = Math.round((100 * event.loaded) / event.total);
//                 progressBar.innerHTML = percentage + "%";
//                 progressBar.setAttribute("aria-valuenow", percentage);
//                 progressBar.style.width = percentage + "%";
//             })
            
//             // messageElement.innerHTML = htmlizeResponse(result);
//         } catch (err) {
//             // messageElement.innerHTML = htmlizeResponse(err);
//         }
    
//         // function htmlizeResponse(res) {
//         //     return (
//         //       `<div class="alert alert-secondary mt-2" role="alert"><pre>` +
//         //       JSON.stringify(res, null, 2) +
//         //       "</pre></div>"
//         //     );
//         // }
//     }
// }



// function uploadImages() {
//     let messageElement = document.getElementById("message");
//     messageElement.innerHTML = "";
    
//     const inputImg = document.getElementById('input-multi-images-re-exam');
//     const arrayImg = document.getElementById('input-multi-images-re-exam').files;
//     const dataID = inputImg.getAttribute('data-re-exam-id');
//     const inputCusID = document.getElementById('cusID');
//     const dataCusID = inputCusID.value;

//     // Tạo đối tượng FormData để chứa dữ liệu
//     let formData = new FormData();

//     for (const file of arrayImg) {
//         formData.append('reExamination', file);
//     }
        
//     formData.set('cusID', dataCusID)
    
//     const progressArray = document.querySelectorAll(".progress");
//     progressArray.forEach(progress => {
//         progress.style.display = "block";
//     })

//     let progressBarArr = document.querySelectorAll(".progress-bar");
//     progressBarArr.forEach(progressBar => {
//         progressBar.innerHTML = "0%";
//         progressBar.setAttribute("aria-valuenow", 0);
//         progressBar.style.width = "0%";
//     })

//     const onUploadProgress = (event) => {
//         let progressBarArr = document.querySelectorAll(".progress-bar");
//         progressBarArr.forEach(progressBar => {
//             const percentage = Math.round((100 * event.loaded) / event.total);
//             progressBar.innerHTML = percentage + "%";
//             progressBar.setAttribute("aria-valuenow", percentage);
//             progressBar.style.width = percentage + "%";
//         })
//     };

//     fetch(`/customer-care/employ/re-exam/${dataID}/uploadImages`, {
//         method: 'POST',
//         body: formData,
//         onUploadProgress,
//     })
//     .then(response => response.json())
//     .then(data => {

//         const images = data.images;
//         const imageSizes = (images) => {
//             images.forEach(image => {
//                 const imageSize = image.size.bytes;
//                 return imageSize;
//             });
//         }
//         console.log(imageSizes);

//         progressBarArr.forEach(progressBar => {
//             const percentage = Math.round((100 * event.loaded) / event.total);
//             progressBar.innerHTML = percentage + "%";
//             progressBar.setAttribute("aria-valuenow", percentage);
//             progressBar.style.width = percentage + "%";
//         })

//         // messageElement.innerHTML = htmlizeResponse(data);
//     })
//     .catch(error => {
//         // messageElement.innerHTML = htmlizeResponse(error);
//     });

//     // function htmlizeResponse(res) {
//     //     return (
//     //       `<div class="alert alert-secondary mt-2" role="alert"><pre>` +
//     //       JSON.stringify(res, null, 2) +
//     //       "</pre></div>"
//     //     );
//     // }
// }

// Khai báo sử dụng plugin
FilePond.registerPlugin(FilePondPluginImagePreview);
FilePond.registerPlugin(FilePondPluginFileValidateType);
FilePond.registerPlugin(FilePondPluginImageResize);

// Get a reference to the file input element
const inputElement = document.querySelector('#preview-images-re-exam');

// Create a FilePond instance
const pond = FilePond.create(inputElement, {
    acceptedFileTypes: ['image/*'],
    allowMultiple: true,
    labelIdle: 'Kéo và thả hình ảnh hoặc <span class="filepond--label-action">Chọn ảnh từ thư mục</span>',
    labelInvalidField: 'Tệp bạn chọn không phải hình ảnh',
    imageResizeTargetWidth: 512,
    imageResizeTargetHeight: 1024,
    labelFileProcessing: 'Đang tải lên',
    labelFileProcessingComplete: 'Quá trình tải ảnh hoàn tất',
    labelFileProcessingAborted: 'Đã hủy quá trình tải ảnh lên',
    labelFileProcessingError: 'Lỗi khi đang tải ảnh',
    labelFileProcessingRevertError: 'Lỗi khi đang hoàn tác tải ảnh',
    labelFileRemoveError: 'Lỗi xóa ảnh',
    labelTapToCancel: 'Nhấp để hủy bỏ',
    labelTapToRetry: 'Nhấp để thử lại',
    labelTapToUndo: 'Nhấp để hoàn tác',
    labelButtonAbortItemLoad: 'Hủy tải lên hình ảnh',
    labelButtonRetryItemLoad: 'Thử lại',
    labelButtonAbortItemProcessing: ' Hủy tải lên',
    labelButtonUndoItemProcessing: 'Hoàn tác',
    labelButtonRetryItemProcessing: 'Thử tải ảnh lại',
    labelButtonProcessItem: 'Tải lên'
});
FilePond.setOptions({
    server: {
        process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
            // fieldName is the name of the input field
            // file is the actual file object to send
            const formData = new FormData();
            formData.append(fieldName, file, file.name);

            const request = new XMLHttpRequest();
            request.open('POST', '/customer-care/employ/re-exam/6404633836474cb401019e76/uploadImages');

            // Should call the progress method to update the progress to 100% before calling load
            // Setting computable to false switches the loading indicator to infinite mode
            request.upload.onprogress = (e) => {
                progress(e.lengthComputable, e.loaded, e.total);
            };

            // Should call the load method when done and pass the returned server file id
            // this server file id is then used later on when reverting or restoring a file
            // so your server knows which file to return without exposing that info to the client
            request.onload = function () {
                if (request.status >= 200 && request.status < 300) {
                    // the load method accepts either a string (id) or an object
                    load(request.responseText);
                } else {
                    // Can call the error method if something is wrong, should exit after
                    error('oh no');
                }
            };

            request.send(formData);

            // Should expose an abort method so the request can be cancelled
            return {
                abort: () => {
                    // This function is entered if the user has tapped the cancel button
                    request.abort();

                    // Let FilePond know the request has been cancelled
                    abort();
                },
            };
        },
        revert: './revert',
        restore: './restore/',
        load: './load/',
        fetch: './fetch/',
    },
});

