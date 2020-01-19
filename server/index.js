const io = require("socket.io")(process.env.PORT || 8000);
const cfg = require("./config.json");
const tw = require("node-tweet-stream")(cfg);
const vader = require("vader-sentiment");

// hashtags to track (Add as many as you want)
tw.track("100daysofcode");
tw.track("javascript");

// tweet event
tw.on("tweet", function(tweet) {
  // Check polarity of tweet
  const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(
    tweet.text
  );

  // Emit tweet event to client
  io.emit("tweet", { tweet: tweet, intensity: intensity });
});
