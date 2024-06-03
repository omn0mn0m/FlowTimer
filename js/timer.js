let focusCount = 0;
let focusDuration = 0;
let focusRatio = config.focusRatio;
let breakCount = 0;
let breakDuration = 0;

let startTime;
let endTime;
let pauseTime;

let totalFocusTime = 0;

let stopwatch;
let timer;

let breakSound = new Audio(config.resourcePaths.breakSoundPath);
let focusSound = new Audio(config.resourcePaths.focusSoundPath);

const FlowState = {
  Focus: 'Focus',
  Break: 'Break'
};

let flowState;

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('time').innerHTML = config.showHours ? "00:00:00" : "00:00";
});

ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
  if( flags.broadcaster) {
    switch(command) {
      case "focus":
        clearInterval(timer);
        startTime = Date.now();
        runStopwatch();
        ComfyJS.Say(config.messages.startFocus);
        flowState = FlowState.Focus;

        focusCount++;
        document.getElementById("phase").innerText = "Focus #" + focusCount;
        break;
      case "break":
        clearInterval(stopwatch);
        let breakTime = focusDuration / focusRatio;
        endTime = Date.now() + breakTime;
        runTimer();
        breakSound.play();
        ComfyJS.Say(config.messages.startBreak);
        flowState = FlowState.Break;

        breakCount++;
        totalFocusTime += focusDuration;
        document.getElementById("phase").innerText = "Break #" + breakCount;
        focusDuration = 0;
        break;
      case "timer":
        switch (message){
          case "check":
            const calculatedFocusTime = (totalFocusTime + focusDuration) / 1000;
            const hours = Math.floor(calculatedFocusTime / 3600);
            const minutes = Math.floor((calculatedFocusTime % 3600) / 60);
            const seconds = Math.floor((calculatedFocusTime % 3600) % 60);
            
            ComfyJS.Say(`${config.twitchStreamer} has focused a total of ${hours} hour(s), ${minutes} minute(s), and ${seconds} second(s).`);
            break;
          case "reset":
            if (flowState == FlowState.Focus) {
              startTime = Date.now();
            } else if (flowState == FlowState.Break) {
              let breakTime = focusDuration / focusRatio;
              endTime = Date.now() + breakTime;
            } else {}
            
            setTimeDisplay(0);
            break;
          case "pause":
            pauseTime = Date.now();
            
            if (flowState == FlowState.Focus) {
              clearInterval(stopwatch);
            } else if (flowState == FlowState.Break) {
              clearInterval(timer);
            } else {}
            break;
          case "resume":
            const offset = Date.now() - pauseTime;
            
            if (flowState == FlowState.Focus) {
              startTime += offset;
              runStopwatch();
            } else if (flowState == FlowState.Break) {
              endTime += offset;
              runTimer();
            } else {}
            break;
        }
      default:
        break;
    }
  }
}
ComfyJS.Init(config.twitchBot, config.oauth, config.twitchStreamer);


function runStopwatch() {
  const timeNow = Date.now();
  focusDuration = timeNow - startTime;

  setTimeDisplay(focusDuration);
  stopwatch = setTimeout(runStopwatch, 500);
}

function runTimer() {
  const timeNow = Date.now();
  breakDuration = endTime - timeNow;
  
  if (breakDuration <= 0) {
    setTimeDisplay(0);
    clearInterval(timer);
    focusSound.play();
    ComfyJS.Say(config.messages.breakOver);

    if (config.autostartFocusAfterBreak) {
      // TODO autostart next focus
    }
  } else {
    setTimeDisplay(breakDuration);
    timer = setTimeout(runTimer, 500);
  }
}

// Adapted from https://github.com/mohamed-tayeh/Minimal-Pomo-Timer/blob/main/js/logic.js
function setTimeDisplay(time) {
  time = Math.floor(time / 1000); // convert ms to s
  
  const hr = Math.floor(time / 3600);
  const min = config.showHours
            ? Math.floor((time % 3600) / 60)
            : Math.floor(time / 60);
  const sec = Math.floor((time % 3600) % 60);

  const hrString = hr < 10 ? "0" + hr : hr;
  const minString = min < 10 ? "0" + min : min;
  const secString = sec < 10 ? "0" + sec : sec;
  
  document.getElementById('time').innerHTML = config.showHours
                                            ? `${hrString}:${minString}:${secString}`
                                            : `${minString}:${secString}`;
}
