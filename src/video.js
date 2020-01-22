export const videoScript = () => {
 const video = document.querySelector("#video");
 const playButton = document.querySelector('.about__video-play');

 playButton.addEventListener('click', function () {
  if (video.paused) {
    video.play();
    
    video.muted=false;
    video.currentTime = 0;
  
  }   
  if (video.played) {
    video.play();
    
    video.muted=false;
    video.currentTime = 0;
  
  }
  else {
    video.pause();
    video.play();
  }
 });
};