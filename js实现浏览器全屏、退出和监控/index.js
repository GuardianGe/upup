//全屏显示

launchFullscreen(element) {

    if(element.requestFullscreen) {
  
      element.requestFullscreen();
  
    } else if(element.mozRequestFullScreen) {
  
      element.mozRequestFullScreen();
  
    } else if(element.webkitRequestFullscreen) {
  
      element.webkitRequestFullscreen();
  
    } else if(element.msRequestFullscreen) {
  
      element.msRequestFullscreen();
  
    }
  
  },
  
  // 退出全屏
  
  exitFullscreen () {
  
    if(document.exitFullscreen) {
  
      document.exitFullscreen();
  
    } else if(document.mozCancelFullScreen) {
  
      document.mozCancelFullScreen();
  
    } else if(document.webkitExitFullscreen) {
  
      document.webkitExitFullscreen();
  
    }
  
  },
  
  //监听全屏状态，全屏返回dom，否则返回false
  
  watchFullScreen(){
  
    document.addEventListener("fullscreenchange", function () { 
  
            var isFull = document.fullscreenElement    ||
  
                    document.msFullscreenElement  ||
  
                    document.mozFullScreenElement ||
  
                    document.webkitFullscreenElement || false;
  
      }, false); 
  
      document.addEventListener("mozfullscreenchange", function () {
  
           var isFull = document.fullscreenElement    ||
  
                    document.msFullscreenElement  ||
  
                    document.mozFullScreenElement ||
  
                    document.webkitFullscreenElement || false;
  
      }, false); 
  
      document.addEventListener("webkitfullscreenchange", function () { 
  
             var isFull = document.fullscreenElement    ||
  
                    document.msFullscreenElement  ||
  
                    document.mozFullScreenElement ||
  
                    document.webkitFullscreenElement || false;
  
      }, false); 
  
      document.addEventListener("msfullscreenchange", function () { 
  
            var isFull = document.fullscreenElement    ||
  
                    document.msFullscreenElement  ||
  
                    document.mozFullScreenElement ||
  
                    document.webkitFullscreenElement || false;
  
      }, false);
  
  }