video = "";
Status = "";
objects = [];

function setup(){
  canvas = createCanvas(380,380);
  canvas.center();
}

function preload()
{
video = createVideo("video.mp4");
video.hide();
}

function draw()
{
image(video, 0, 0, 380, 380);
if(Status != ""){
 objectDetector.detect(video, gotResult);
 for(i = 0; i < objects.length; i++){
document.getElementById("status").innerHTML = "Status : Objects Detected";
document.getElementById("NOB").innerHTML = "Number of objects detected : " + objects.length;

fill("red");
percent = floor(objects[i].confidence * 100);
text(objects[i].label + "  " + percent + "%", objects[i].x + 15, objects[i].y + 15);
noFill();
stroke("red");
rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
 } 
}
}

function gotResult(error, results)
{
if(error){
  console.log(error);
}
console.log(results);
objects = results;
}

function start()
{
objectDetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects"; 
}

function modelLoaded ()
{
console.log(" Blame Cocossd for mistakes. ");
Status = true;
video.loop();
video.volume(0);
video.speed(1);
}