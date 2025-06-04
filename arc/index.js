const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let atoms = [];

const degToRad = (deg) => {
  return (deg / 180) * Math.PI;
};

const randomNum = (min, max) => {
  return Math.random() * (max - min) + min;
};

class Atom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = randomNum(1, 4);
    this.speedX = randomNum(-2, 2);
    this.speedY = randomNum(-2, 2);
  }

  updateSpeed() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  updateSize() {
    this.radius -= 0.1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, degToRad(0), degToRad(360));
    ctx.fill();
  }
}

const animationLoop = () => {
  atoms.forEach((atom, i) => {
    ctx.fillStyle = "white";
    atom.draw();
    atom.updateSpeed();
    atom.updateSize();
    if (atom.radius < 0.3) {
      atoms.splice(i, 1);
    }
  });
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  requestAnimationFrame(animationLoop);
};
animationLoop();

// canvas.addEventListener("mousemove", (e) => {
//   for (let i = 0; i < 20; i++) {
//     atoms.push(new Atom(e.x, e.y));
//   }
// });

const point = {
  x: 0,
  y: 0,
};

let degree = 0;

const generateAtoms = () => {
  atoms.push(
    new Atom(
      canvas.width / 2 + point.x * 200,
      canvas.height / 2 + point.y * 200
    )
  );
  point.x = Math.cos(degToRad(degree)); //osculate back and forth
  point.y = point.x * point.x; //parabola

  degree++;
  requestAnimationFrame(generateAtoms);
};
generateAtoms();
