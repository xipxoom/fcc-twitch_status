# fcc-twitch_status
Free Code Camp Twitch.tv status display

## Summary
The [final intermediate front end development project](https://www.freecodecamp.com/challenges/use-the-twitchtv-json-api) for [Free Code Camp](https://www.freecodecamp.com) is a [twitch.tv](https://www.twitch.tv) app to show the status of various channels.  The plan is to have the user input a list of streams they're interested in (saved to localStorage) and then display the status of those streams below.

## Objective
Build a [CodePen.io](https://codepen.io) app that is functionally similar to the [example project](http://codepen.io/FreeCodeCamp/full/adBpOw).

### Rules
1. Don't look at the example project's code.  Figure it out for yourself.
2. Fulfill the below user stories.  Use whichever libraries or APIs you need.  Give it your own personal style.

### User Stories
* I can see whether Free Code Camp is currently streaming on Twitch.tv.
* I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel.
* If a Twitch user is currently streaming, I can see additional details about what they are streaming.
* I will see a placeholder notification if a streamer has closed their Twitch account (or the account never existed).  You can verify this works by adding "brunofin" and "comster404" to your array of Twitch streamers.

### Hints
1. See an [example call](https://github.com/FreeCodeCamp/FreeCodeCamp/wiki/Front-End-Project-Use-the-Twitchtv-JSON-API) to Twitch.tv's JSONP API.
2. The [relevant documentation](https://github.com/justintv/Twitch-API/blob/master/v3_resources/streams.md#get-streamschannel) about this API call.
3. Here's an array of the Twitch.tv usernames of people who regularly stream coding: ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "Beohoff"].

### Libraries
* [Bootstrap](https://getbootstrap.com)
* [jQuery](https://jquery.com/)

### Todo
* Add animation on show/hide active streams.
* Deal with refresh while offline/online stream checkbox is checked.

### Notes:
Hosted on [codepen](http://codepen.io/xipxoom/full/wGjMve/).
