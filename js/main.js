import MusicPlayer from './MusicPlayer.js';

const COVER = document.querySelector('.cover');
const SONG_INFO = document.querySelector('.song-info');
const PLAY = document.querySelector('.control-block__play');
const NEXT_SONG = document.querySelector('.control-block__forward');
const PREV_SONG = document.querySelector('.control-block__backward');
const AUDIO = document.querySelector('.player');
const TIME_LINE = document.querySelector('.control-block__progress-track');

fetch('../data.json')
   .then((response) => {
      return response.json();
   })
   .then((data) => {
      ARRDATA(data);
   })
   .catch((err) => {
      alert(`HTML error: ${err}`);
   });

const ARRDATA = (data) => {
   const PLAYER = new MusicPlayer(data.audio, COVER, SONG_INFO, PLAY, NEXT_SONG, PREV_SONG, AUDIO, TIME_LINE);
   PLAYER.render();
}