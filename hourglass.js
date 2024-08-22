const { Engine, Render, World, Bodies } = Matter;
// const PIXI = require('pixi.js');

// engine
const engine = Engine.create();

// renderer
const render = Render.create({
    element: document.getElementById('canvas-container'),
    engine: engine,
    options: {
        width: window.innerWidth/2,
        height: window.innerHeight,
        wireframeBackground: 'transparent', 
        background: 'transparent',
    }
});
var canvas = render.canvas;
canvas.id = 'matter-js-canvas';

const app = new PIXI.Application({
    width: window.innerWidth/2,
    height: window.innerHeight,
    transparent: true,
    antialias: true,
});
app.view.style.zIndex = '10'; // Set a higher z-index if needed
app.view.id = 'pixi-js-canvas'; // Set a higher z-index if needed

document.getElementById('canvas-container').appendChild(app.view);

// document.getElementById('hourglass-container').append(canvas);
let topRectangles = [];
let bottomRectangles = [];
let PixiWalls = [];
let centerX = render.options.width / 2;
let centerY = render.options.height / 2;
let rectWalls; 
const width = 10;
let canvasWidth = render.options.width;
let canvasHeight = render.options.height;

async function createHourglass() {
    const height = 200;
    const thickness = 400;
    const angle = -50 * (Math.PI / 180); // degrees to radians

    const topWall = Bodies.rectangle(centerX, centerY - (height*1.8), (thickness*1.5), width, { isStatic: true });
    const topWallLeft = Bodies.rectangle(centerX - thickness / 2 + width / 2, centerY - (height*1.25), width, height, { isStatic: true });
    const topWallRight = Bodies.rectangle(centerX + thickness / 2 - width / 2, centerY - (height*1.25), width, height, { isStatic: true });

    const topAngleLeft=  Bodies.rectangle(centerX - thickness / 2 + width / 2, centerY , width, height+10, { isStatic: true });
    const topAngleRight = Bodies.rectangle(centerX + thickness / 2 - width / 2, centerY , width, height+10, { isStatic: true });
    Matter.Body.rotate(topAngleLeft, angle);
    Matter.Body.translate(topAngleLeft, { x: 80, y: -80 });
    Matter.Body.rotate(topAngleRight, -angle);
    Matter.Body.translate(topAngleRight, { x: -80, y: -80 });

    const bottomAngleLeft= Bodies.rectangle(centerX - thickness / 2 + width / 2, centerY, width, height+10, { isStatic: true });
    const bottomAngleRight = Bodies.rectangle(centerX + thickness / 2 - width / 2, centerY, width, height+10, { isStatic: true });

    Matter.Body.rotate(bottomAngleLeft, -angle);
    Matter.Body.translate(bottomAngleLeft, { x: 80, y: 80 });
    Matter.Body.rotate(bottomAngleRight, angle);
    Matter.Body.translate(bottomAngleRight, { x: -80, y: 80 });

    const bottomWallLeft =  Bodies.rectangle(centerX - thickness / 2 + width / 2, centerY + (height*1.25), width, height, { isStatic: true });
    const bottomWallRight = Bodies.rectangle(centerX + thickness / 2 - width / 2, centerY + (height*1.25), width, height, { isStatic: true });
    const bottomWall = Bodies.rectangle(centerX, centerY + (height*1.8), (thickness*1.5), width, { isStatic: true });
    rectWalls = [topWall,topWallLeft,topWallRight, topAngleLeft,topAngleRight, bottomAngleLeft,bottomAngleRight, bottomWallLeft,bottomWallRight,bottomWall];
    World.add(engine.world, [topWall,topWallLeft,topWallRight, topAngleLeft,topAngleRight, bottomAngleLeft,bottomAngleRight, bottomWallLeft,bottomWallRight,bottomWall]);

    rectWalls.forEach((each_wall)=>{
        const rectGraphic = new PIXI.Graphics();
        rectGraphic.beginFill(0x87ceeb); 
        rectGraphic.drawRect(
            -each_wall.bounds.max.x,
            -each_wall.bounds.max.y,
            200,
            10
        );
        rectGraphic.endFill();
        app.stage.addChild(rectGraphic);
        PixiWalls.push(rectGraphic);
    })
    
}

function createTopRectangle(newsrect,i) {
    for (let j=0; j< newsrect.length; j++){
        const rectWidth = newsrect[j].offsetWidth;
        const rectHeight = newsrect[j].offsetHeight;
        var xRandom = Math.floor(Math.random() * (centerX+100 - (centerX-100) + 1)) + (centerX-100);
        var rect = Bodies.rectangle(xRandom, centerY-250, rectWidth, rectHeight, {isStatic: false,
            friction: 0.8, 
            restitution: 0.1, 
            collisionFilter: {
                category: 0x0001,
                mask: 0x0001 
            }});
        newsrect[j].id = rect.id;    
        topRectangles.push(rect);
        World.add(engine.world, rect);
    }
}

function createBottomRectangle(newsrect,i) {
    for (let j=0; j< newsrect.length; j++){
        // newsrect[j].id = `box-${i}-newsrect-${j}`;
        const rectWidth = newsrect[j].offsetWidth;
        const rectHeight = newsrect[j].offsetHeight;
        var xRandom = Math.floor(Math.random() * (centerX+100 - (centerX-100) + 1)) + (centerX-100);
        var rect = Bodies.rectangle(xRandom, centerY+100, rectWidth, rectHeight, {isStatic: false,
            friction: 0.8, 
            restitution: 0.1, 
            collisionFilter: {
                category: 0x0001,
                mask: 0x0001 
            }});
        newsrect[j].id = rect.id; 
        bottomRectangles.push(rect);
        World.add(engine.world, rect);
    }
}

async function createBoxes(boxesDom) {
    const midpoint = Math.ceil(boxesDom.length / 2);
    boxesDom.slice(0, midpoint).forEach((rectangle,i) => {
        createTopRectangle([...rectangle.children],i);
    });
    boxesDom.slice(midpoint).forEach((rectangle,i) => {
        createBottomRectangle([...rectangle.children],(i+midpoint));
    });
}


async function createElements() {
    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(async () => {
            let boxesDom = document.querySelectorAll('.news-container');
            if ([...boxesDom].length > 0) {
                await createBoxes([...boxesDom]);
                // Using requestAnimationFrame for animation logic
                window.requestAnimationFrame(function() {
                    update_positions();
                });
                window.addEventListener("resize", function() {
                    window.requestAnimationFrame(function() {
                        update_positions(); 
                    });
                });
    
                // document.addEventListener('click', function(event) {
                //     clickHandler(event, boxArrayInfo);
                // });
            } 
        }, 2000); 
    });
}

function update_positions() {
    let newsArray = [...document.querySelectorAll('.news-container')];
    const midpoint = Math.ceil(newsArray.length / 2);
    newsArray.forEach(function (item, i) {
        var boxDom = item;
        let itemChildren = [...boxDom.children];
        if (i < midpoint) {
            topRectangles.forEach((each_rect)=>{
                itemChildren.forEach((each_box)=>{
                    if (each_box.id == each_rect.id){
                        const rectangle = each_rect.angle;
                        const angleDegrees = rectangle * (180 / Math.PI);
                        each_box.style.transform = "translate( " + (each_rect.position.x - each_box.offsetWidth / 2) + "px, " + (each_rect.position.y - each_box.offsetHeight / 2) + "px ) rotate(" + angleDegrees + "deg)";
                    }
                });  
            });
        } else {
            bottomRectangles.forEach((each_rect)=>{
                itemChildren.forEach((each_box)=>{
                    if (each_box.id == each_rect.id){
                        const rectangle = each_rect.angle;
                        const angleDegrees = rectangle * (180 / Math.PI);
                        each_box.style.transform = "translate( " + (each_rect.position.x - each_box.offsetWidth / 2) + "px, " + (each_rect.position.y - each_box.offsetHeight / 2) + "px ) rotate(" + angleDegrees + "deg)";
                    }
                });  
            });
        }
    });
    PixiWalls.forEach((each_wall, i)=>{
        each_wall.position.set(rectWalls[i].position.x, rectWalls[i].position.y);
        each_wall.rotation = rectWalls[i].angle; // Update rotation to match the body
    });

    window.requestAnimationFrame(function() {
        update_positions();
    });
}

function createMound(){
    bottomRectangles.forEach(rect => {
        const forceDirection = rect.position.x < centerX ? 1 : -1;
        const distanceToCenterX = Math.abs(centerX - rect.position.x);
        const forceMagnitude = 0.001 * distanceToCenterX; 
        const forceX = forceMagnitude * forceDirection;
        Matter.Body.applyForce(rect, rect.position, { x: forceX, y: -0.02 });
    });
}
function pullDown(){
    function increaseForce(rect,intervalID,forceMagnitude){
        return function() {
            forceMagnitude += 0.00001;
            if (forceMagnitude > 0.015) {
                forceMagnitude = 0.00;
                // clearInterval(intervalID);
            }
            var forceVector = { x: 0, y: forceMagnitude }; // Applying force downwards
            // Apply the force to the rectangle
            Matter.Body.applyForce(rect, rect.position, forceVector);
        };
    }
    topRectangles.forEach((rect)=>{
        var forceMagnitude = 0.01; // test magnitute index
        var intervalID = setInterval(increaseForce(rect,intervalID,forceMagnitude),10);
    });
}

async function initiateHourglass(){
    await createHourglass();
    await createElements(); 
    // updateHtmlElement();
    // window.addEventListener('resize', updateHtmlElement);
    // setInterval(createMound(),100);
    // pullDown(); 
    Matter.Runner.run(engine);
    Render.run(render);  

}

initiateHourglass();