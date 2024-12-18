const config = {
  "twitchStreamer": "", // your channel's username
  "twitchBot": "", // bot username
  "oauth": "", // "oauth:whatever"
  "focusRatio": 5, // 5 = 50 minutes of focus, 10 minutes of break
  "autostartFocusAfterBreak": true, // whether to start the next focus after break
  "showHours": false, // false = 75:00, true = 1:15:00
  "mainCommand": "timer", // the first part of command i.e. !timer pause
  "defaultMode": "Pomodoro", // either "Flowtime" or "Pomodoro"
  "resourcePaths": {
    "focusSoundPath": "res/workSound.riff", // sound that plays on !timer focus command
    "breakSoundPath": "res/breakSound.riff" // sound that plays on !timer break command
  },
  "pomodoro": {
    "focusDuration": 50, // time in minutes
    "breakDuration": 10, // time in minutes
    "goal": 5
  },
  "messages": {
    "startFocus": "Starting the focus timer. See you during the break!",
    "startBreak": "Starting the break countdown. Make sure to drink water!",
    "breakOver": "Time to go back to work! Type !focus to start the timer."
  }
};
