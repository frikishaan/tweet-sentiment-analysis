const socket = io("https://salty-badlands-25926.herokuapp.com/");

// Tweet received
socket.on("tweet", res => {
  //   console.log(res.tweet.user);
  showTweet(res.tweet, res.intensity);
});

const tweets = document.querySelector(".container");

function showTweet(tweet, intensity) {
  let elem = `
        <img src="${tweet.user.profile_image_url_https}"/>
        <span class="name">${tweet.user.name} <span class="user_name">@${
    tweet.user.screen_name
  }</span> 
        ${
          tweet.user.verified ? '<i class="fa fa-check-circle"></i>' : ""
        } </span>
        <p class="text">${tweet.text}</p>
    `;

  let sentiment =
    intensity.compound >= 0.05
      ? "pos"
      : intensity.compound <= -0.05
      ? "neg"
      : "neutral";
  let t = document.createElement("div");
  t.classList.add("tweet");
  t.classList.add(sentiment);
  t.innerHTML = elem;

  tweets.prepend(t);
}
