import { VoiceRSS } from "./VoiceRSS.js";

import { API_KEY, button, audioElement } from "./constantVar.js";
///////////////////////////////////////////////////////////////////
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, "%20");
  // VoiceRSS Speech Parameters
  VoiceRSS.speech({
    key: API_KEY,
    src: jokeString,
    hl: "en-gb",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
    v: "Harry",
  });
}

// Get jokes from API
async function getJokes() {
  let joke = "";
  const apiURL = "https://v2.jokeapi.dev/joke/Programming";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.type === "twopart") {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Passing Joke to VoiceRSS API
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Cath Error Here
    console.error(error);
  }
}

function toggleButton() {
  button.disabled = !button.disabled;
}
// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
