# FlowTimer
Flowtime Technique timer widget for coworking/ studying livestreams.

The [Flowtime Technique](https://medium.com/@UrgentPigeon/the-flowtime-technique-7685101bd191) is an alternative to the Pomodoro Technique. While Pomodoro has set focus and break blocks, Flowtime attempts to take advantage of [flow (being in the zone)](https://en.wikipedia.org/wiki/Flow_(psychology)) by letting you work uninterrupted until you feel like you need a break.

This widget calculates a break countdown timer proportional to the amount of time focused. By default, it has a 5:1 ratio (i.e. 50 minutes of focus = 10 minutes of break, 85 minutes of focus = 17 minutes of break, etc.). This mimics the commonly used 50:10 Pomodoro block with flowtimey wimey stuff.

## Commands
### Main Commands
- `!focus` - starts the focus timer (counts up)
- `!break` - starts the break timer (counts down)

### Other Commands
- `!timer check` - shows how long you have focused this stream
- `!timer reset` - resets the current timer (00:00 if focusing, start of break if breaking)
- `!timer pause` - pauses the current timer
- `!timer resume` - resumes the current timer

## Installation
1. Download the code (click "<> Code" then click "Download ZIP")
2. Unzip the code to a folder
3. Add a browser source to OBS
  1. Check "Local file"
  2. Click "Browse" and select `index.html` in the unzipped code folder

## Configuration
All configuration is in `config.js` in the unzipped code folder.

### Required Configuration
This part of the config file must be edited before you can use it.

Go to https://twitchapps.com/tmi/ and log in **to your bot account** to get a oauth token. Copy the token. Keep it secret, keep it safe.

| Config Property | What Goes Here             | Example                            |
|-----------------|----------------------------|------------------------------------|
| twitchStreamer  | Your username              | "omn0mn0m"                         |
| twitchBot       | Your Twitch bot's username | "nommychan"                        |
| oauth           | The copied token           | "oauth:imnotgonnashowarealonehere" |

### Optional Configuration

| Config Property          | What Goes Here                               | Example  |
|--------------------------|----------------------------------------------|----------|
| focusRatio               | Ratio of focus to break time                 | 5        |
| autostartFocusAfterBreak | Whether to autostart the next focus timer    | false    |
| showHours                | Whether to show hours on the timer (00:00:00 | false    |

The resource paths are for customising the sounds that play. It is easiest to put the sound file in the `res` folder then reference it in the format currently used, but you can use an absolute path instead if you want.

Changing the messages should be pretty self-explanatory. Just make sure the message is in quotes.

## Contributing
Feel free to fork this and do whatever you want with it! Please feel free to make a pull request if you think it would be a nice general feature :)
