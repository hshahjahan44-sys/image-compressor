const uploadFile = document.getElementById('uploadFile');
const previewContainer = document.getElementById('previewContainer');
const originalImage = document.getElementById('originalImage');
const compressedImage = document.getElementById('compressedImage');
const originalSize = document.getElementById('originalSize');
const compressedSize = document.getElementById('compressedSize');
const qualityRange = document.getElementById('quality');
const qualityValue = document.getElementById('qualityValue');
const compressBtn = document.getElementById('compressBtn');
const downloadBtn = document.getElementById('downloadBtn');

let uploadedImg = null;

// 1. Image Upload hone par
uploadFile.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // File size dikhana (KB/MB mein)
    originalSize.innerText = `Size: ${(file.size / 1024).toFixed(2)} KB`;

    const reader = new FileReader();
    reader.onload = function(event) {
        uploadedImg = new Image();
        uploadedImg.src = event.target.result;
        
        uploadedImg.onload = function() {
            originalImage.src = uploadedImg.src;
            previewContainer.style.display = 'flex';
            compressImage(); // Default compression run karein
        }
    }
    reader.readAsDataURL(file);
});

// 2. Slider change hone par value update karein
qualityRange.addEventListener('input', function() {
    qualityValue.innerText = this.value + "%";
});

// 3. Compress Button dabane par
compressBtn.addEventListener('click', compressImage);

function compressImage() {
    if (!uploadedImg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Canvas ko image ke size ka banayein
    canvas.width = uploadedImg.width;
    canvas.height = uploadedImg.height;

    // Image ko canvas par draw karein
    ctx.drawImage(uploadedImg, 0, 0, canvas.width, canvas.height);

    // Image ko compress karein (Quality: 0.1 to 1.0)
    const quality = parseInt(qualityRange.value) / 100;
    
    // Naya data URL generate karein (JPEG format usually compresses best)
    const dataUrl = canvas.toDataURL('image/jpeg', quality);

    // Compressed image show karein
    compressedImage.src = dataUrl;
    
    // Naya size calculate karein
    const head = 'data:image/jpeg;base64,';
    const fileSize = Math.round((dataUrl.length - head.length) * 3 / 4) / 1024;
    compressedSize.innerText = `Size: ${fileSize.toFixed(2)} KB`;

    // Download link update karein
    downloadBtn.href = dataUrl;
  }
