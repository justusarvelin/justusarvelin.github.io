let myImg;
let bodyPose;
let nose;
let letters2 = [];
let gap = 12;
let halfGap = Math.round(gap / 2);
let myFont;
let snapshotButton; // To hold the snapshot button

function preload() {
  bodyPose = ml5.bodyPose();
  myFont = loadFont('NoCommercialPotential-Regular.otf');
}

function setup() {
  createCanvas(640, 480);
  noStroke();
  rectMode(CENTER);
  textFont(myFont);

  // Initialize grid of letters
  for (let y = halfGap; y < height; y += gap) {
    for (let x = halfGap; x < width; x += gap) {
      letters2.push(new Letter());
    }
  }

  myImg = createCapture(VIDEO);
  myImg.size(width, height);
  myImg.hide();
  bodyPose.detectStart(myImg, gotPoses);

  // Create the snapshot button
  snapshotButton = createButton('Take Snapshot');
  snapshotButton.position(10, height + 10);  // Position the button
  snapshotButton.mousePressed(takeSnapshot);  // Call the function on click
}

function gotPoses(results) {
  if (results && results.length > 0) {
    nose = results[0].nose;
  }
}

function draw() {
  if (!nose) {
    return;
  }

  background(255);
  myImg.loadPixels();
  let letterIndex = 0;

  for (let y = halfGap; y < height; y += gap) {
    for (let x = halfGap; x < width; x += gap) {
      let pixelIndex = (y * width + x) * 4;
      let r = myImg.pixels[pixelIndex];
      let g = myImg.pixels[pixelIndex + 1];
      let b = myImg.pixels[pixelIndex + 2];

      // Pass RGB to the letter update method
      letters2[letterIndex].update(r, g, b);

      // Draw the letter
      push();
      translate(x, y);
      letters2[letterIndex].display();
      pop();

      letterIndex++;
    }
  }
}

function takeSnapshot() {
  saveCanvas('snapshot', 'png'); // Save the canvas as a PNG file
}

class Letter {
  constructor() {
    this.letters =
      "abcdefghijklmopqrstuvwxyzåäöABCDEFGHIJKLMOPQRSTUVWXYZÅÄÖ?!*:);(&#-–—/\\@<>1234567890";
    this.letter = this.letters[0];
    this.color = [255, 255, 255]; // Default color (white)
  }

  update(r, g, b) {
    let brightness = (r + g + b) / 3; // Average brightness
    let letterIndex = floor(map(brightness, 0, 255, this.letters.length - 1, 0));
    this.letter = this.letters[letterIndex];
    this.color = [r, g, b]; // Set color based on the image
  }

  display() {
    fill(this.color); // Use the color for the letter
    text(this.letter, 0, 0);
  }
}
