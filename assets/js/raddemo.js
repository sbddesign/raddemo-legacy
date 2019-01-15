// RadDemo v0.1
// https://github.com/sbddesign/raddemo

function radDemo(pausePoints){
    //Variables
    var video = document.getElementById("demo-video");
    var interval = 200;
    if(typeof pausePoints !== 'object') {
        var pausePoints = [
            2,
            4,
            6,
            8,
            10
        ];
    }
    var reportCurrentTime,
        prevPausePoint,
        currentPausePoint,
        nextPausePoint,
        currentTime;

    //Function that starts the RadDemo
    function startRadDemo(video){
        video.play();
        if(!video.paused) {
            reportCurrentTime = setInterval(function(){
                if(video.readyState > 0) {
                    currentTime = video.currentTime;

                    pausePoints.forEach(function(value, index){

                        // console.log(index);
                        //If current time is within .1s of this pause point
                        if( currentTime > value - .1 && currentTime < value + .1) {
                            stopRadDemo(video);
                            redefinePausePoints(index)
                        }
                    });
                }
            }, interval);
        }
    }

    //Function that stops the RadDemo
    function stopRadDemo(video){
        video.pause();
        clearInterval(reportCurrentTime);
    }

    function restartRadDemo(video){
        stopRadDemo(video);
        startRadDemo(video);
    }

    //Function that toggles the RadDemo
    function toggleRadDemo(video) {
        if(video.paused) {
            startRadDemo(video);
        } else {
            stopRadDemo(video);
        }
    }

    function navigateRadDemo(video, destination) {

        if(pausePoints[destination] === undefined) {
            video.currentTime = 0;
            redefinePausePoints(0);
        } else {
            video.currentTime = pausePoints[destination];
            redefinePausePoints(destination);
        }

        restartRadDemo(video);
    }

    function redefinePausePoints(index) {
        currentPausePoint=index;
        prevPausePoint = currentPausePoint-1;
        nextPausePoint = currentPausePoint+1;
    }

    //Bind the spacebar to start and stop the RadDemo
    keyboardJS.bind('space', function(e) {
        toggleRadDemo(video);
    });

    //Bind the right arrow to go to next pause point
    keyboardJS.bind('right', function(e) {
        navigateRadDemo(video, nextPausePoint);
    });

    //Bind the escape key and left arrow to go back to previous pause point
    keyboardJS.bind(['escape', 'left'], function(e) {
        navigateRadDemo(video, prevPausePoint);
    });
}