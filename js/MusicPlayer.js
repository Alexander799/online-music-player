export default class MusicPlayer {
   index = 0;
   cover;
   songInfo;
   play;
   next;
   prev;
   audio;
   timeLine;
   isPrevPaused;

   constructor(data, ...elements) {
      this.data = data;
      this.elements = elements;
      this.cover = this.elements[0];
      this.songInfo = this.elements[1];
      this.play = this.elements[2];
      this.next = this.elements[3];
      this.prev = this.elements[4];
      this.audio = this.elements[5];
      this.timeLine = this.elements[6];
      this.playOrPause = this.playOrPause.bind(this);
      this.nextSong = this.nextSong.bind(this);
      this.prevSong = this.prevSong.bind(this);
      this.controlTimeLine = this.controlTimeLine.bind(this);
   }

   render(isPaused = true) {
      if (isPaused) {
         this.audio.src = this.data[this.index].audioFile;
      }
      this.cover.children[0].src = this.data[this.index].audioCover;
      this.songInfo.children[0].children[0].textContent = this.data[this.index].audioName;
      this.songInfo.children[1].children[0].textContent = this.data[this.index].audioArtist;
      this.play.addEventListener('click', this.playOrPause);
      this.next.addEventListener('click', this.nextSong);
      this.prev.addEventListener('click', this.prevSong);
      this.audio.addEventListener('timeupdate', (e) => { this.controlTimeLine(e) });
      this.timeLine.parentElement.parentElement.addEventListener('click', (e) => {
         this.audio.currentTime = this.audio.duration / this.timeLine.parentElement.clientWidth * e.offsetX;
      });
   }

   playOrPause() {
      const IS_PLAYING = this.play.classList.value.indexOf('control-block__play_play') !== -1;
      const ICON_PLAY = !IS_PLAYING ? '../img/play.svg' : '../img/pause.svg';
      if (IS_PLAYING) {
         this.audio.play();
         this.play.children[0].src = ICON_PLAY;
         this.play.classList.toggle('control-block__play_play');
      } else {
         this.audio.pause();
         this.play.children[0].src = ICON_PLAY;
         this.play.classList.toggle('control-block__play_play');
      }
   }

   checkPaused(isPaused) {
      if (!isPaused) {
         const IS_PLAYING = this.play.classList.value.indexOf('control-block__play_play') !== -1;
         this.audio.src = this.data[this.index].audioFile;
         this.audio.play();
      } else return;
   }

   nextSong() {
      this.timeLine.style.width = '0';
      this.isPrevPaused = this.audio.paused;
      if (this.index >= this.data.length - 1) {
         this.index = 0;
      } else {
         ++this.index;
      }
      this.checkPaused(this.isPrevPaused);
      this.render(this.audio.paused);
   }

   prevSong() {
      this.timeLine.style.width = '0';
      this.isPrevPaused = this.audio.paused;
      if (this.index <= 0) {
         this.index = this.data.length - 1;
      } else {
         --this.index;
      }
      this.checkPaused(this.isPrevPaused);
      this.render(this.audio.paused);
   }

   controlTimeLine(event) {
      this.timeLine.style.width = `${event.target.currentTime / event.target.duration * 100}%`;
      this.timeLine.parentElement.children[1].children[0].textContent = `${this.formatTime(event.target.currentTime)}`;
      if (event.target.currentTime >= event.target.duration - 1) {
         this.nextSong();
      }
   }

   formatTime(sec) {
      const MINUTES = Math.floor(sec / 60);
      const SECONDS = Math.floor((sec / 60 - MINUTES) * 60);
      const CORRECT_SEC = SECONDS < 10 ? `0${SECONDS}` : `${SECONDS}`;
      return `${MINUTES}:${CORRECT_SEC}`;
   }
}