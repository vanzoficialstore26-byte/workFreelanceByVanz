const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const saveBtn = document.getElementById('saveBtn');

let uploadedFiles = [];

// Buka file picker saat area diklik
dropArea.addEventListener('click', () => fileInput.click());

// Drag & drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
  dropArea.style.borderColor = '#4f46e5';
  dropArea.style.backgroundColor = '#eff6ff';
}

function unhighlight() {
  dropArea.style.borderColor = '#cbd5e1';
  dropArea.style.backgroundColor = 'white';
}

// Handle drop
dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles(files);
}

fileInput.addEventListener('change', () => {
  handleFiles(fileInput.files);
});

function handleFiles(files) {
  [...files].forEach(file => {
    if (!file.type.match('image.*')) return;
    uploadedFiles.push(file);
    const url = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.src = url;
    preview.appendChild(img);
  });
  showNotification(`${files.length} file ditambahkan`, 'success');
}

// Simpan (simulasi)
saveBtn.addEventListener('click', () => {
  if (uploadedFiles.length === 0) {
    showNotification('Belum ada file yang diupload!', 'info');
    return;
  }
  // Simpan ke localStorage (simulasi)
  localStorage.setItem('portfolioCount', uploadedFiles.length);
  showNotification('Portofolio berhasil disimpan!', 'success');
});