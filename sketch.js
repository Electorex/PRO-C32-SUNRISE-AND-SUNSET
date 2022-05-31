const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var hour;

var bg = "sunrise.png";

function preload() {
    getBackgroundImg();

}

function setup() {
    var canvas = createCanvas(1200, 700);
    engine = Engine.create();
    world = engine.world;
    hour = 00;
}

function draw() {
    if (backgroundImg)
        background(backgroundImg);

    Engine.update(engine);

    fill("black");
    textSize(30);

    if (hour >= 12) {
        text("Time : " + hour, 50, 100);
    } else if (hour == 00) {
        text("Time : 12 AM", 100, 100);
    } else {
        text("Time : " + hour, 50, 100);
    }

}

async function getBackgroundImg() {

    // write code to fetch time from API
        var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
        //change the data in JSON format and store it in variable responseJSON
        var responseJSON = await response.json();
        console.log("responseJSON: " + responseJSON);

        //fetch datetime from responseJSON    
        var currentDateTime = responseJSON.datetime;

        // slice the datetime to extract hour    
        hour = currentDateTime.slice(11, 13);
        console.log(hour);
        
        if (hour >= 05 && hour < 18) {
            bg = "sunrise.png";
        }
        else {
            bg = "sunset.png"
        }

        backgroundImg = loadImage(bg);
    }

