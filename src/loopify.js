(function() {
  function loopify(uri, cb) {
    var context = new (window.AudioContext || window.webkitAudioContext)(),
      request = new XMLHttpRequest();

    request.responseType = "arraybuffer";
    request.open("GET", uri, true);

    // XHR failed
    request.onerror = function() {
      cb(new Error("Couldn't load audio from " + uri));
    };

    // XHR complete
    request.onload = function() {
      context.decodeAudioData(request.response, success, function(err) {
        // Audio was bad
        cb(new Error("Couldn't decode audio from " + uri));
      });
    };

    request.send();

    function success(buffer) {
      var source;
      var started;

      function play() {
        // console.log('loopify start');
        // Stop if it's already playing
        stopImmediate();

        // Create a new source (can't replay an existing source)
        source = context.createBufferSource();
        source.connect(context.destination);

        // Set the buffer
        source.buffer = buffer;
        source.loop = true;

        // Play it
        started = context.currentTime;
        source.start(0);
      }

      function stopImmediate() {
        // console.log('loopify stop immediate', !!source);
        // Stop and clear if it's playing
        if (source) {
          source.stop();
          source = null;
        }
      }

      function stop() {
        // console.log('loopify stop', !!source);
        // Stop and clear if it's playing
        if (source) {
          var elapsed = context.currentTime - started;
          var timeLeft =
            source.buffer.duration - (elapsed % source.buffer.duration);
          // console.log('elapsed', elapsed, 'left', timeLeft)
          setTimeout(function() {
            // console.log('loopify stop timeout', !!source);
            source.stop();
            source = null;
          }, timeLeft * 1000);
        }
      }

      cb(null, {
        play: play,
        stop: stop
      });
    }
  }

  loopify.version = "0.1";

  if (typeof define === "function" && define.amd) {
    define(function() {
      return loopify;
    });
  } else if (typeof module === "object" && module.exports) {
    module.exports = loopify;
  } else {
    this.loopify = loopify;
  }
})();
