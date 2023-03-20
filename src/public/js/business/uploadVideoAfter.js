// Khai báo sử dụng plugin
FilePond.registerPlugin(FilePondPluginFileMetadata);
FilePond.registerPlugin(FilePondPluginFileValidateType);
FilePond.registerPlugin(FilePondPluginImageTransform);
FilePond.registerPlugin(FilePondPluginMediaPreview);

// Get a reference to the file input element
const previewAfterVideo = document.querySelector('#preview-videos-after');

const inputAfterImg = document.querySelector('#input-multi-videos-after');
const dataAfterID = inputAfterImg.getAttribute('data-after-id');
const dataAfterCusID = inputAfterImg.getAttribute('data-after-customer-id');

// Create a FilePond instance

const uploadAfterVideo = FilePond.create(previewAfterVideo, {
    name: 'after',
    acceptedFileTypes: ['video/*'],
    allowVideoPreview: true,    // default true
    allowAudioPreview: true , 
    allowMultiple: true,
    labelIdle: 'Kéo và thả video hoặc <span class="filepond--label-action">Chọn video từ thư mục</span>',
    labelInvalidField: 'Tệp bạn chọn không phải hình ảnh',
    imageResizeTargetWidth: 1024,
    imageResizeTargetHeight: 768,
    labelFileProcessing: 'Đang tải lên',
    labelFileProcessingComplete: 'Quá trình tải video hoàn tất',
    labelFileProcessingAborted: 'Đã hủy quá trình tải video lên',
    labelFileProcessingError: 'Lỗi khi đang tải video',
    labelFileProcessingRevertError: 'Lỗi khi đang hoàn tác tải video',
    labelFileRemoveError: 'Lỗi xóa video',
    labelTapToCancel: 'Nhấp để hủy bỏ',
    labelTapToRetry: 'Nhấp để thử lại',
    labelTapToUndo: 'Nhấp để hoàn tác',
    labelButtonAbortItemLoad: 'Hủy tải lên video',
    labelButtonRetryItemLoad: 'Thử lại',
    labelButtonAbortItemProcessing: ' Hủy quá trình tải lên',
    labelButtonUndoItemProcessing: 'Hoàn tác quá trình tải lên',
    labelButtonRetryItemProcessing: 'Thử tải lại video',
    labelButtonProcessItem: 'Tải lên',
});

uploadAfterVideo.setOptions({
    fileMetadataObject: {
        cusID: dataAfterCusID,
    },
    server: {
        process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
            // fieldName is the name of the input field
            // file is the actual file object to send
            const formData = new FormData();
            formData.append(fieldName, file, file.name);
            formData.set('cusID', metadata.cusID);
            
            const request = new XMLHttpRequest();
            request.open('POST', `/business/employ/service-note/${dataAfterID}/uploadAfterVideos`);
        
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
    }
});

// const uploadVideoBtn = document.querySelector('#upload-video-btn');
// uploadVideoBtn.addEventListener('click', () => {
//     FilePond.setOptions({server: { process: processFunction }});
// })