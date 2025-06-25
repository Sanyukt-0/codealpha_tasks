const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

const songs = [
  { title: "Take My Breath", artist: "The Weeknd", src: "songs/Take My Breath.mp3" },
  { title: "Timeless", artist: "The Weeknd, Playboi Carti", src: "songs/Timeless.mp3" },
  { title: "Mmm Yeah", artist: "Austin Mahone ft. Pitbull", src: "songs/Mmm Yeah.mp3" },
  { title: "I'm Still Standing", artist: "Elton John", src: "songs/I'm Still Standing.mp3" },
  { title: "I'm A Freak", artist: "Enrique Iglesias ft. Pitbull", src: "songs/I'm A Freak.mp3" }
];

let songIndex = 0;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;

  current.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
}

function setProgress(e) {
  const width = e.target.clientWidth;
  const clickX = e.offsetX;
  const time = (clickX / width) * audio.duration;
  audio.currentTime = time;
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

function populatePlaylist() {
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.onclick = () => {
      songIndex = index;
      loadSong(song);
      audio.play();
      playPauseBtn.textContent = "⏸️";
    };
    playlistEl.appendChild(li);
  });
}

loadSong(songs[songIndex]);
populatePlaylist();
