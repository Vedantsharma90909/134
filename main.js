object = [];
status = "";


function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    objectdetecter = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function preload() {}

function draw() {
    image(video, 0, 0, 380, 380);
    console.log("i am in draw function");
    if (status != '') {
        objectdetecter.detect(video, gotResults);
        console.log("i am inside if");
        for (i = 0; i < object.length; i++) {
            r = random(255);
            g = random(255);
            b = random(255);
            console.log("I am inside forloop");
            document.getElementById('status').innerHTML = 'Status: Detecting objects';
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected: " + objects.length;
            percent = floor(object[i].confidence * 100);
            fill(r, g, b);
            text(object[i].label, object[i].x, object[i].y);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }

}

function modelLoaded() {
    console.log("cocossd is loaded");
    status = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results);
    }
    object = results;

}