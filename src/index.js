(function(loopify) {
  const svg = document.getElementById("keychainsvg");
  // const audios = document.querySelectorAll("audio");
  // let currentIdx = 0;
  // let nowPlaying = false;

  // function initAudios() {
  //   audios.forEach(audio => {
  //     audio.addEventListener("ended", () => {
  //       if (nowPlaying) {
  //         audio.currentTime = 0;
  //         audio.play();
  //       }
  //     });
  //   });
  // }

  // function startPlaying(idx) {
  //   nowPlaying = true;
  //   currentIdx = idx;
  //   audios[currentIdx].currentTime = 0;
  //   audios[currentIdx].play();
  // }

  // function stopPlaying() {
  //   nowPlaying = false;
  //   // audios[currentIdx].pause();
  // }

  function initButtonEvents() {
    // get the inner DOM of svg
    var svgDoc = svg.contentDocument;
    // get the inner element by id
    for (let i = 1; i < 9; i++) {
      const idxStr = i.toString().padStart(2, "0");
      const btn = svgDoc.getElementById(`button${idxStr}`);
      loopify(`assets/sound${idxStr}.mp3`, function(err, loop) {
        // If something went wrong, `err` is supplied
        if (err) {
          return console.err(err);
        }

        const handleMouseDown = e => {
          if (e.cancelable) {
            e.preventDefault();
          } else {
            console.log('Down not cancelable');
          }
          loop.play();
          btn.style.opacity = 0.8;
        };

        const handleMouseUp = e => {
          if (e.cancelable) {
            e.preventDefault();
          } else {
            console.log('Up not cancelable');
          }
          loop.stop();
          btn.style.opacity = 1;
          console.log('stop');
        };

        btn.addEventListener("mousedown", handleMouseDown, false);
        btn.addEventListener("touchstart", handleMouseDown, false);
        btn.addEventListener("mouseup", handleMouseUp, false);
        btn.addEventListener("mouseleave", (e) => {
          if (e.buttons === 1) {
            handleMouseUp(e);
          } else {
            // console.log('Not down');
          }
        }, false);
        btn.addEventListener("touchend", handleMouseUp, false);
        btn.addEventListener("touchcancel", handleMouseUp, false);
      });
    }
  }

  // It's important to add an load event listener to the object,
  // as it will load the svg doc asynchronously
  svg.addEventListener("load", initButtonEvents, false);
  // initAudios();
})(loopify);