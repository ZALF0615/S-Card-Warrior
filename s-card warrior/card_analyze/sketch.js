let cam;
let threshold = 80;
let penlayer;
let inputImage;

function setup() {
  createCanvas(600, 600);
  cam = createCapture(VIDEO);
  penlayer = createImage(640, 480);
  cam.hide();
}

function draw() {
  image(cam, 0, 0);
  
  if (mouseIsPressed) {
    threshold = mouseY;
    penlayer = createImage(640, 480);
  }
  
  cam.loadPixels();
  penlayer.loadPixels();
  for (let y = 0; y < cam.height; y++) {
    for (let x = 0; x < cam.width; x++) {
      let index = (y * cam.width + x) * 4;
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let redity = r - (g + b) / 2;
    }
  }
  penlayer.updatePixels();

  rectMode(CENTER);
  strokeWeight(2);
  stroke(200, 200, 0);
  fill(0, 0);
  rect(width / 2, height / 2.5, 342.4 * 1.5, 215.92 * 1.5);
}

function keyTyped() {
  if (key === ' ') {
    //saveCanvas('card-image', 'png'); 
    captureAndRecognize(); // Capture the image and pass it to the OCR function
  }
}

async function captureAndRecognize() {
  let capturedImage = get(); // Get the current canvas as an image
  capturedImage.loadPixels(); 
  let processedImg = preprocessImage(capturedImage);
  processedImg.updatePixels(); 

  let img = processedImg.canvas.toDataURL(); // Convert the captured image to a data URL
  recognize_image(img); 
}

async function recognize_image(img) {
  const { createWorker } = Tesseract;
  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage('kor');
  await worker.initialize('kor');
  await worker.setParameters({ preserve_interword_spaces: '1' });
  const {
    data: { text },
  } = await worker.recognize(img);
  console.log(text);
  document.getElementById('output').innerText = text; 
  await worker.terminate();
}

function preprocessImage(canvas) {
  let processedImageData = canvas.pixels;
  applyGrayscale(processedImageData);
  applySharpen(processedImageData, canvas);
  invertColors(processedImageData);
  thresholdFilter(processedImageData, 0.4);
  return canvas;
}

function applyGrayscale(pixels) {
  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];
    let gray = 0.299 * r + 0.587 * g + 0.114 * b;
    pixels[i] = pixels[i + 1] = pixels[i + 2] = gray;
  }
}

function applySharpen(pixels, canvas) {
  const width = canvas.width;
  const height = canvas.height;
  const weights = [
    0, -1,  0,
    -1,  5, -1,
    0, -1,  0
  ];
  const side = Math.round(Math.sqrt(weights.length));
  const halfSide = Math.floor(side / 2);
  const src = new Uint8ClampedArray(pixels);
  const sw = width;
  const sh = height;
  const w = sw;
  const h = sh;
  const output = pixels;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sy = y;
      let sx = x;
      let r = 0, g = 0, b = 0, a = 0;
      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = sy + cy - halfSide;
          const scx = sx + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            const srcOffset = (scy * sw + scx) * 4;
            const wt = weights[cy * side + cx];
            r += src[srcOffset] * wt;
            g += src[srcOffset + 1] * wt;
            b += src[srcOffset + 2] * wt;
            a += src[srcOffset + 3] * wt;
          }
        }
      }
      const dstOffset = (y * w + x) * 4;
      output[dstOffset] = r;
      output[dstOffset + 1] = g;
      output[dstOffset + 2] = b;
      output[dstOffset + 3] = a;
    }
  }
}

// from https://github.com/processing/p5.js/blob/main/src/image/filters.js
function thresholdFilter(pixels, level) {
  if (level === undefined) {
    level = 0.5;
  }
  const thresh = Math.floor(level * 255);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    let val;
    if (gray >= thresh) {
      val = 255;
    } else {
      val = 0;
    }
    pixels[i] = pixels[i + 1] = pixels[i + 2] = val;
  }
}

// from https://css-tricks.com/manipulating-pixels-using-canvas/
function invertColors(pixels) {
  for (var i = 0; i < pixels.length; i+= 4) {
    pixels[i] = pixels[i] ^ 255; // Invert Red
    pixels[i+1] = pixels[i+1] ^ 255; // Invert Green
    pixels[i+2] = pixels[i+2] ^ 255; // Invert Blue
  }
}
