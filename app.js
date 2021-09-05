// variable to store current music index
let currentMusic = 0;

// select every element that needs to add some behaviour
const music = document.querySelector("#audio");

const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration");
const playBtn = document.querySelector(".play-btn");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");

playBtn.addEventListener("click", () => {
  if (playBtn.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }
  playBtn.classList.toggle("pause");
  disk.classList.toggle("play");
});

// setup music

const setMusic = (i) => {
  seekBar.value = 0; // set range slide value to 0;
  let song = songs[i]; // get song from songs array
  currentMusic = i; // set current music index
  music.src = song.path; // set music source

  songName.innerHTML = song.name; // set song name
  artistName.innerHTML = song.artist; // set artist name
  disk.style.backgroundImage = `url('${song.cover}')`; // set cover image

  currentTime.innerHTML = "00:00"; // set current time to 00:00
  setTimeout(() => {
    seekBar.max = music.duration; // set max value of range slide to duration of music
    // console.log(music.duration);
    musicDuration.innerHTML = formatTime(music.duration);
  }, 300);
};

setMusic(0);

// formatting time in min and seconds format

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
};

// seek bar
setInterval(() => {
  seekBar.value = music.currentTime; // set range slide value to current time
  currentTime.innerHTML = formatTime(music.currentTime);
}, 500); // update current time every 500ms

// change event to jump in between song time
seekBar.addEventListener("change", () => {
  music.currentTime = seekBar.value;
});

// forward and backward button
forwardBtn.addEventListener("click", () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playBtn.click();
});

backwardBtn.addEventListener("click", () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playBtn.click();
});
