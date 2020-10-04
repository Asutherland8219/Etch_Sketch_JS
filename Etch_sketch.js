const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 30;

const {width, height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);


// set up for drawing
console.log(width,height);
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

ctx.beginPath(); 
ctx.moveTo(x,y);
ctx.lineTo(x,y);
ctx.stroke();


function draw({ key }) {
    hue += 5; 
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    console.log(key);

// start the path
    ctx.beginPath();
    ctx.moveTo(x, y);

// move x and why depending on key command
switch (key) {
    case 'ArrowUp':
        y -= MOVE_AMOUNT;
        break;

    case 'ArrowDown':
        y += MOVE_AMOUNT;
        break;
        
    case 'ArrowRight':
        x += MOVE_AMOUNT;
        break;

    case 'ArrowLeft':
        x -= MOVE_AMOUNT;
        break;
        default: 
        break;
}

    ctx.lineTo(x,y);
    ctx.stroke();
}

// create the shake function 
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0,0,width,height);
    canvas.addEventListener(
        'animationend',
        function() {
            console.log('Done the shake!');
            canvas.classList.remove('shake');
        },
        {once : true }
    );
}

function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key });
        console.log(e.key);
        console.log('HANDLING KEY');
    }
}

window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);


