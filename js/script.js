const wrapper = document.querySelector('.wrapper'),
    musicImg = wrapper.querySelector('.img-area img'),
    musicName = wrapper.querySelector('.song-details .name'),
    musicArtist = wrapper.querySelector('.song-details .artist'),
    mainAudio = wrapper.querySelector('#main-audio'),
    playPauseBtn = wrapper.querySelector('.play-pause'),
    prevBtn = wrapper.querySelector('#prev'),
    nextBtn = wrapper.querySelector('#next'),
    progressArea = wrapper.querySelector('.progress-area'),
    progressBar = wrapper.querySelector('.progress-bar');

let musicIndex = 1;

window.addEventListener('load', () => {
    loadMusic(musicIndex);
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

function playMusic() {
    wrapper.classList.add('paused');
    playPauseBtn.querySelector('i').innerText = 'pause';
    mainAudio.play();
}
function pauseMusic() {
    wrapper.classList.remove('paused');
    playPauseBtn.querySelector('i').innerText = 'play_arrow';
    mainAudio.pause();
}

function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
}
function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
}
playPauseBtn.addEventListener('click', () => {
    const isMusicPaused = wrapper.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic();
});

nextBtn.addEventListener('click', () => {
    nextMusic();
});
prevBtn.addEventListener('click', () => {
    prevMusic();
});

mainAudio.addEventListener('timeupdate', e => {
    //console.log(e);
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector('.current'),
        musicDuration = wrapper.querySelector('.duration');

    mainAudio.addEventListener('loadeddata', () => {
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener('click', e => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
});
