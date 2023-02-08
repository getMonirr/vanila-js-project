// grab the element with dom

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggle = player.querySelector(".toggle");
const videoSkip = player.querySelectorAll("[data-skip]");
const progress = player.querySelectorAll('input[type=range]');
const progressBar = player.querySelector('.progress__filled');
const progressLength = player.querySelector('.progress');




// all function goes here
function togglePlayVideo(){
    video[video.paused ? 'play' : 'pause']();
}

// function updateButton(){

// }
function buttonUpdate(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skipHandle(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate(){
    video[this.name] = this.value;
}

function progressBarUpdate(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}
function scrub(e) {
    const scrubTime = (e.offsetX / progressLength.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }
// all event listener fire here

video.addEventListener('click', togglePlayVideo);
video.addEventListener('play', buttonUpdate);
video.addEventListener('pause', buttonUpdate);
video.addEventListener('timeupdate',progressBarUpdate);


toggle.addEventListener('click', togglePlayVideo);
videoSkip.forEach(skip => skip.addEventListener('play', skipHandle));

progress.forEach(range => range.addEventListener('click',rangeUpdate));
progress.forEach(range => range.addEventListener('mousemove',rangeUpdate));

let mousedown = false;
progressLength.addEventListener('click', scrub);
progressLength.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressLength.addEventListener('mousedown', () => mousedown = true);
progressLength.addEventListener('mouseup', () => mousedown = false);