# obs-timer
Timer widget for coworking/ studying livestreams 

## Commands
### Main Commands
- `!timer focus` or `!timer start` - starts the focus timer
- `!timer break` - starts the break timer

### Other Commands
- `!timer flowmode` - switches to flowtime mode (focus timer goes up, break timer goes down)
- `!timer pomomode` - switches to pomodoro mode (focus timer goes down, break timer goes down)
- `!timer check` - shows how long you have focused this stream
- `!timer reset` - resets the current timer
- `!timer pause` - pauses the current timer
- `!timer resume` or `!timer unpause` - resumes the current timer

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

| Config Property          | What Goes Here                                    | Example    |
|--------------------------|---------------------------------------------------|------------|
| focusRatio               | Ratio of focus to break time (in flowtime mode)   | 5          |
| autostartFocusAfterBreak | Whether to autostart the next focus timer         | false      |
| showHours                | Whether to show hours on the timer (00:00:00)     | false      |
| mainCommand              | First part of command i.e. "!timer pause"         | "timer"    |
| defaultMode              | Whether to use "Pomodoro" mode or "Flowtime" mode | "Pomodoro" |


| Pomodoro Property        | What Goes Here                     | Example    |
|--------------------------|------------------------------------|------------|
| focusDuration            | How long to focus for (in minutes) | 50         |
| breakDuration            | How long to break for (in minutes) | 10         |
| goal                     | How many pomodoro sessions to have | 5          |

The resource paths are for customising the sounds that play. It is easiest to put the sound file in the `res` folder then reference it in the format currently used, but you can use an absolute path instead if you want.

Changing the messages should be pretty self-explanatory. Just make sure the message is in quotes.

## Contributing
Feel free to fork this and do whatever you want with it! Please feel free to make a pull request if you think it would be a nice general feature :)
