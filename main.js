var harrypotter = "";

var peter_pan = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

status =  ""; 

function preload(){
    peter_pan = loadSound("music2.mp3");
    harrypotter = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#42c5f5");
    stroke("#42c5f5");

    music_status_1 = peter_pan.isPlaying();
    music_status_2 = harrypotter.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20); 
        peter_pan.play();

        if((0<leftWristX && leftWristX<= 300) && (0<leftWristY &&leftWristY<=300))
        {
         if(music_status_1 == false){
           peter_pan.play();
           harrypotter.stop();
         }

         document.getElementById("song").innerHTML = "Song Name - Peter Pan";
        }
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20); 
        harrypotter.play();

        if((0<rightWristX && rightWristX<= 300) && (0<rightWristY &&rightWristY<=300))
        {
         if(music_status_2 == false){
           harrypotter.play();
           peter_pan.stop();
         }

         document.getElementById("song").innerHTML = "Song Name - Harry Potter";
        }
    }
}

function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " +rightWristY);
    }
}

