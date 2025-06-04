const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "stevejobs.png";

let shouldUseColors = true;
let brightnessArr = [];
let particlesArr = [];
let rbgArr = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.brightness = 0;
    this.velocity = Math.random() * 3 + 0.1;
    this.radius = Math.random() * 1.5 + 1;
  }

  update() {
    this.y += this.velocity;

    if (this.y >= canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }

    //match the particle brightness to the brightness of the corresponding pixel
    this.brightness = brightnessArr[this.getBrightnessIndex()];
  }

  draw() {
    ctx.beginPath();
    if (shouldUseColors) {
      ctx.fillStyle = rbgArr[this.getBrightnessIndex()];
    } else {
      ctx.fillStyle = "white";
    }
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  getBrightnessIndex() {
    //We use X + Y values to access the correct element in a 1-dimensional array
    return Math.floor(this.y - 1) * canvas.width + Math.floor(this.x);
  }
}

img.onload = function () {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //build a brightness array by looping over all pixel data
  for (let i = 0; i < imgData.data.length; i++) {
    //Array of RGBA color values in order
    const red = imgData.data[i * 4];
    const green = imgData.data[i * 4 + 1];
    const blue = imgData.data[i * 4 + 2];

    //average colors together
    const brightness = (red + green + blue) / 3;
    brightnessArr.push(brightness);
    rbgArr.push(`rgb(${red}, ${green}, ${blue})`);
  }

  //create particles
  for (let i = 0; i < 10000; i++) {
    particlesArr.push(new Particle());
  }

  //Animate particles
  const animate = () => {
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particlesArr.forEach((p) => {
      p.update();
      ctx.globalAlpha = p.brightness * 0.01;
      p.draw();
    });
    requestAnimationFrame(animate);
  };

  animate();
};

function useWhite() {
  shouldUseColors = false;
}

function useColors() {
  shouldUseColors = true;
}
