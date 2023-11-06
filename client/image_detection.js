import {loader, typeText, generateUniqueId, chatContainer, chatStripe} from "./utils.js";

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const content = document.getElementById('dropzone-content');
const loading = document.getElementById('loading-icon');
const uploadedImageContainer = document.getElementById('uploaded-image-container');
const uploadedImage = document.getElementById('uploaded-image-content');
const reUpload = document.getElementById('re-upload-button');

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

const getPaddingOffset = (image) => {
  const containerWidth = uploadedImage.clientWidth;
  const containerHeight = uploadedImage.clientHeight;

  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;

  const imageAspectRatio = imageWidth / imageHeight;
  const containerAspectRatio = containerWidth / containerHeight;

  const scaleFactor = imageAspectRatio > containerAspectRatio ?
    containerWidth / imageWidth :
    containerHeight / imageHeight;

  const scaledImageWidth = imageWidth * scaleFactor;
  const scaledImageHeight = imageHeight * scaleFactor;

  const offsetX = (containerWidth - scaledImageWidth) / 2;
  const offsetY = (containerHeight - scaledImageHeight) / 2;

  return { offsetX, offsetY }
}

const renderDetectedObject = async (image, objects) => {
  const { offsetX, offsetY } = getPaddingOffset(image)
  
  for (let i = 0; i < objects.length; i++) {
    const {
      x, y,
      width, height,
      name,
    } = objects[i]

    const object = document.createElement('div');

    object.style.width = `${width}px`
    object.style.height = `${height}px`
    object.style.left = `${offsetX + x}px`
    object.style.top = `${offsetY + y}px`
    object.className = 'detected-object'

    object.addEventListener('click', async function() {
      const keyword = object.firstChild.innerHTML;
      // const prompt = `Simply explain ${keyword} to a child in maximum 30 words`
      
      const response = await fetch('https://chatgpt-server-liart.vercel.app', {
        //request use http post method to send data to server
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
          prompt : `Simply explain ${keyword} to a child in maximum 30 words`
        })
      });

      const uniqueId = generateUniqueId();
      const ans = await response.json();
      const parsedData = ans.bot.trim();

      chatStripe(true, parsedData, uniqueId);
      document.getElementById("form").style.display = "block";
      document.getElementById("chat_container").style.display = "block";
      document.getElementById("object_detection_container").style.display = "none";
    });

    const nameObject = document.createElement('div');
    nameObject.innerText = name
    nameObject.className = 'detected-name'
    object.appendChild(nameObject)
    uploadedImage.appendChild(object);
  }
}

const handleFiles = async (files) => {
  console.log(files);
  const file = files[0]

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const imageUrl = event.target.result;
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.id = 'uploaded-image';

      uploadedImage.innerHTML = ''; // Clear any previously displayed image
      uploadedImage.appendChild(imgElement);

      imgElement.onload = function() {
        cocoSsd.load().then(model => {
          //detect objetcs in image
          model.detect(imgElement).then(predictions => {
            console.log(predictions)

            renderDetectedObject(imgElement, predictions.map(item => ({
              x: item.bbox[0],
              y: item.bbox[1],
              width: item.bbox[2],
              height: item.bbox[3],
              name: `${item.class}`,
            })))
          })
        });
      };
    };

    reader.readAsDataURL(file);
  } else {
    // If the selected file is not an image, you can show an error message or perform any other desired action
    alert('Please select an image file.');
  }

  uploadedImageContainer.style.display = 'block';
  dropzone.style.display = 'none';
}

dropzone.addEventListener('dragenter', function(event) {
  event.preventDefault();
  dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragover', function(event) {
  event.preventDefault();
});

dropzone.addEventListener('dragleave', function(event) {
  event.preventDefault();
  dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', function(event) {
  event.preventDefault();
  dropzone.classList.remove('dragover');

  const files = event.dataTransfer.files;
  handleFiles(files);
});

dropzone.addEventListener('click', function() {
  fileInput.click();
});

fileInput.addEventListener('change', function() {
  const files = fileInput.files;
  handleFiles(files);
});

reUpload.addEventListener('click', function() {
  uploadedImageContainer.style.display = 'none';
  dropzone.style.display = 'flex';
});
