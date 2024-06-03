const config = {
  "twitchStreamer": "", // your channel's username
  "twitchBot": "", // bot username
  "oauth": "", // "oauth:whatever"
  "focusRatio": 5, // 5 = 50 minutes of focus, 10 minutes of break
  "autostartFocusAfterBreak": false, // TODO make this do something
  "showHours": false, // false = 75:00, true = 1:15:00
  "resourcePaths": {
    "focusSoundPath": "res/workSound.riff", // sound that plays on !focus command
    "breakSoundPath": "res/breakSound.riff" // sound that plays on !break command
  },
  "messages": {
    "startFocus": "Starting the focus timer. See you during the break!",
    "startBreak": "Starting the break countdown. Make sure to drink water!",
    "breakOver": "Time to go back to work! Type !focus to start the timer."
  }
};
