//img = ""; not used in this project
sound = "";
Status = "";
objects = [];
baby_found = "";
sound_played = "";
function preload() {
  //  img = loadImage("dog_cat.jpg"); not used in this project
  sound = loadSound("alarm.mp3");
}


function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    Status = true;
}

function gotResult(error, results) {
    if(error) {
        console.error();
    }

    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if( Status != "") {
        r = random(255);
        g = random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);

        if(objects.length <= 0) {
            document.getElementById("baby_status").innerHTML = "Baby Not Found";
            sound.setVolume(1);
            sound.rate(1);
            sound.play();

        }

        for(var i = 0, baby_found = 0, sound_played = false; i < objects.length; i++) {

            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Is " + objects.length;

            if(objects[i].label == "person") {
                document.getElementById("baby_status").innerHTML = "Baby Found";
                sound.stop();
                baby_found ++;
                console.log("Baby Found: " + baby_found + " Times");
            }

           /* else {
                document.getElementById("baby_status").innerHTML = "Baby Not Found";
                sound.setVolume(1);
                sound.rate(1);
                sound.play();

            }
            replaced by above if and below if
            */
            percent = floor(objects[i].confidence * 100);
            noStroke();
            fill(r,g,b);
            textFont("Comic Sans MS");
            textSize(20);
            text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 20);
            stroke(r,g,b);
            noFill();
            strokeWeight(2);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
        if(baby_found < 1 && sound_played == false) {
            document.getElementById("baby_status").innerHTML = "Baby Not Found";
                sound.setVolume(1);
                sound.rate(1);
                sound.play();
                sound_played = true;
        }
    }
}