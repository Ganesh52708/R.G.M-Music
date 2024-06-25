console.log("Welcome to R.G.M");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let timebar = document.getElementById('timebar');
let currentTimeDisplay = document.getElementById('current-time');
let durationTimeDisplay = document.getElementById('duration-time');
let gif = document.getElementById('gif');
let volumeBar = document.getElementById('volume-bar');
let volumeIcon = document.getElementById('volume-icon');

let songs = [
    { songName: "Rim Jhim Yh Sawan", filepath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Barsaat Ki Dhun", filepath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Ghar se the chale", filepath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Jab Main Badal Ban jau", filepath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Khushi Jab Bhi Teri ", filepath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Khushi Jab Bhi Teri", filepath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Mast Nazron se Allah Bachaye", filepath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Pehle Baarish", filepath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Vasste Ja Bhi dhun", filepath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    // Other songs...
];

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    // Update the time bar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    timebar.value = progress;

    // Update the current time display
    let currentMinutes = Math.floor(audioElement.currentTime / 60);
    let currentSeconds = Math.floor(audioElement.currentTime % 60);
    if (currentSeconds < 10) { currentSeconds = '0' + currentSeconds; }
    currentTimeDisplay.innerText = `${currentMinutes}:${currentSeconds}`;

    // Update the duration display
    let durationMinutes = Math.floor(audioElement.duration / 60);
    let durationSeconds = Math.floor(audioElement.duration % 60);
    if (durationSeconds < 10) { durationSeconds = '0' + durationSeconds; }
    durationTimeDisplay.innerText = `${durationMinutes}:${durationSeconds}`;
});

timebar.addEventListener('input', () => {
    audioElement.currentTime = (timebar.value / 100) * audioElement.duration;
});

audioElement.addEventListener('loadedmetadata', () => {
    let durationMinutes = Math.floor(audioElement.duration / 60);
    let durationSeconds = Math.floor(audioElement.duration % 60);
    if (durationSeconds < 10) { durationSeconds = '0' + durationSeconds; }
    durationTimeDisplay.innerText = `${durationMinutes}:${durationSeconds}`;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitem')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

Array.from(document.getElementsByClassName('songitem')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('Previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('rewind').addEventListener('click', () => {
    audioElement.currentTime -= 10;
    if (audioElement.currentTime < 0) {
        audioElement.currentTime = 0;
    }
});

document.getElementById('forward').addEventListener('click', () => {
    audioElement.currentTime += 10;
    if (audioElement.currentTime > audioElement.duration) {
        audioElement.currentTime = audioElement.duration;
    }
});

audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

volumeBar.addEventListener('input', () => {
    audioElement.volume = volumeBar.value / 100;
    if (audioElement.volume === 0) {
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-mute');
    } else {
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-high');
    }
});
