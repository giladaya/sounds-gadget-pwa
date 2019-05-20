"use strict";

(function(loopify) {
  const SVG_URL = "assets/executor_keychain_plain.svg";
  const svgContainer = document.getElementById("keychainsvgContainer");

  // load SVG and inline
  fetch(SVG_URL)
    .then(response => response.text())
    .then(data => {
      svgContainer.innerHTML = "";
      svgContainer.insertAdjacentHTML("afterbegin", data);
      const svgEl = svgContainer.querySelector("svg");

      initButtonEvents(svgEl);
    });

  function initButtonEvents(svgDoc) {
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
            console.log("Down not cancelable");
          }
          loop.play();
          btn.style.opacity = 0.8;
        };

        const handleMouseUp = e => {
          if (e.cancelable) {
            e.preventDefault();
          } else {
            console.log("Up not cancelable");
          }
          loop.stop();
          btn.style.opacity = 1;
          console.log("stop");
        };

        btn.addEventListener("mousedown", handleMouseDown, false);
        btn.addEventListener("touchstart", handleMouseDown, false);
        btn.addEventListener("mouseup", handleMouseUp, false);
        btn.addEventListener(
          "mouseleave",
          e => {
            if (e.buttons === 1) {
              handleMouseUp(e);
            } else {
              // console.log('Not down');
            }
          },
          false
        );
        btn.addEventListener("touchend", handleMouseUp, false);
        btn.addEventListener("touchcancel", handleMouseUp, false);
      });
    }
  }
})(loopify);
