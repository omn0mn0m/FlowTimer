// Resources
let breakSound = new Audio(config.resourcePaths.breakSoundPath);
let focusSound = new Audio(config.resourcePaths.focusSoundPath);

// Pomodoro variables
let pomoFocusDuration = config.pomodoro.focusDuration * 60000;
let pomoBreakDuration = config.pomodoro.breakDuration * 60000;
let pomoGoal = config.pomodoro.goal

// Flowtime variables
let focusRatio = config.focusRatio;

// Clock variables
let clock;

let focusCount = 0;
let breakCount = 0;

let startTime;
let pauseTime;

let totalFocusTime = 0;
let timeElapsed = 0;
let countdownDuration = 0;

const Mode = {
  Pomodoro: 'Pomodoro',
  Flowtime: 'Flowtime'
};

let mode = config.defaultMode;

const State = {
  Focus: 'Focus',
  Break: 'Break',
};

let state;

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('time').innerHTML = config.showHours ? "00:00:00" : "00:00";
});

ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
  if( flags.broadcaster && command == config.mainCommand ) {
    switch (message) {
      case "flowmode":
        mode = Mode.Flowtime;
        document.getElementById("phase").innerText = "Focus #" + focusCount;

        if (state == State.Focus) {
          setTimeDisplay(timeElapsed);
        }
        break;
      case "pomomode":
        mode = Mode.Pomodoro;
        document.getElementById("phase").innerText = "Pomo " + focusCount + "/" + pomoGoal;
        break;
      case "start":
      case "focus":
        clearInterval(clock);
        state = State.Focus;
        focusCount++;
        focusSound.play();
        ComfyJS.Say(config.messages.startFocus);
        startTime = Date.now();
        
        if (mode == Mode.Flowtime) {
          document.getElementById("phase").innerText = "Focus #" + focusCount;
        } else if (mode == Mode.Pomodoro) {
          countdownDuration =  pomoFocusDuration;
          document.getElementById("phase").innerText = "Pomo " + focusCount + "/" + pomoGoal;
        }

        runClock();
        break;
      case "break":
        clearInterval(clock);
        state = State.Break;
        
        if (mode == Mode.Flowtime) {
          countdownDuration = timeElapsed / focusRatio;
        } else if (mode == Mode.Pomodoro) {
          countdownDuration = pomoBreakDuration;
        }

        startTime = Date.now();
        breakSound.play();
        ComfyJS.Say(config.messages.startBreak);
        breakCount++;
        document.getElementById("phase").innerText = "Break #" + breakCount;
        runClock();
        break;
      case "check":
        const calculatedFocusTime = totalFocusTime / 1000;
        const hours = Math.floor(calculatedFocusTime / 3600);
        const minutes = Math.floor((calculatedFocusTime % 3600) / 60);
        const seconds = Math.floor((calculatedFocusTime % 3600) % 60);
        
        ComfyJS.Say(`${config.twitchStreamer} has focused a total of ${hours} hour(s), ${minutes} minute(s), and ${seconds} second(s).`);
        break;
      case "reset":
        pauseTime = 0;
        
        if (state == State.Focus) {
          startTime = Date.now();

          if (mode == Mode.Flowtime) {
            setTimeDisplay(0);
          } else if (mode == Mode.Pomodoro) {
            setTimerDisplay(pomoFocusDuration);
          }
        } else if (state == State.Break) {
          if (mode == Mode.Flowtime) {
            countdownDuration = timeElapsed / focusRatio;
          } else if (mode == Mode.Pomodoro) {
            countdownDuration = pomoBreakDuration;
          }

          setTimerDisplay(countdownDuration);
        }
        break;
      case "pause":
        pauseTime = Date.now();
        clearInterval(clock);
        break;
      case "unpause":
      case "resume":
        const offset = Date.now() - pauseTime;
        startTime += offset;
        runClock();
        break;
    }
  }
}
ComfyJS.Init(config.twitchBot, config.oauth, config.twitchStreamer);

function runClock() {
  const timeNow = Date.now();
  timeElapsed = timeNow - startTime;

  if (state == State.Focus) {
    totalFocusTime += 500; // not exact due to basing time off CPU count
  }

  if (state == State.Break || mode == Mode.Pomodoro) {
    // Timer counts down
    const countdown = countdownDuration - timeElapsed;

    if (countdown <= 0) {
      // Stop the clock
      clearInterval(clock);
      focusSound.play();
      ComfyJS.Say(config.messages.breakOver);
      setTimeDisplay(0);
      
      if (config.autostartFocusAfterBreak) {
        state = State.Focus;
        focusCount++;
        focusSound.play();
        ComfyJS.Say(config.messages.startFocus);
        startTime = Date.now();
        
        if (mode == Mode.Flowtime) {
          document.getElementById("phase").innerText = "Focus #" + focusCount;
        } else if (mode == Mode.Pomodoro) {
          countdownDuration =  pomoFocusDuration;
          document.getElementById("phase").innerText = "Pomo " + focusCount + "/" + pomoGoal;
        }

        clock = setTimeout(runClock, 500);
      }
    } else {
      setTimeDisplay(countdown);
      clock = setTimeout(runClock, 500);
    }
  } else {
    // Timer counts up
    setTimeDisplay(timeElapsed);
    clock = setTimeout(runClock, 500);
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
