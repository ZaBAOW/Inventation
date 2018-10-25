const IMG_UPLOAD_ENDPOINT = "https://api.cloudinary.com/v1_1/zabaow/image/upload";
const API_KEY = "638832767114418";

function apiSignature(timestamp, uid) {
    let signatureString = "public_id=" + uid + "&timestamp=" + timestamp + "KtoSOxrHph-EpcGXUHW3x2eA3MA";
    return $.sha1(signatureString);
}

$('#website-container').on('submit', function (event) {
    event.preventDefault();

    console.log('image upload starting');
    console.log($(this).find('.file-select'));
    const file = $(this).find('.file-select')[0].files[0];
    //    const title = $(this).find('.frame-title-val').val();
    //    console.log('title', title);
    console.log('file', file);
    uploadImage(file);
});

function uploadImage(file) {
    console.log('file = ', file);
    let uid = uuidv1(10);
    let timestamp = new Date().getTime();
    let data = new FormData();

    data.append('file', file);
    data.append('add_tag', uid);
    data.append('timestamp', timestamp);
    data.append('public_id', uid);
    data.append('api_key', API_KEY);
    data.append('signature', apiSignature(timestamp, uid));
    console.log('data =', data);

    $.ajax({
            type: "POST",
            url: IMG_UPLOAD_ENDPOINT,
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json'
        })
        .done(function (result) {
            let uploadDataObject = {
                'userImageUrl': result.secure_url,
            }
            // addImageToDb(uploadDataObject);
            console.log(result.secure_url);
            console.log(result.original_filename);
            var upload_url = result.secure_url;
            var prev = document.getElementsByClassName("prev");
            var next = document.getElementsByClassName("next");
            saveSession(upload_url);
            prev[0].style.display = "block"
            next[0].style.display = "block"
            var newImageTemplate = "<div class='mySlides fade'><div class='numbertext'>4 /4</div><img src='" + result.secure_url + ">";
            var imageNumber = $('.dot-container span').length
            var newDotTemplate = '<span class="dot" onclick="currentSlide(' + imageNumber + ')"></span>'
            $('.dot-container').append(newDotTemplate);
            $('.slideshow-container').prepend(newImageTemplate);
        });
}
