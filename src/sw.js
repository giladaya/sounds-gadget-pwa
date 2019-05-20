// version: 1.6.9
"use strict";

console.log("Hello from SW");

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("the-80s-cache").then(function(cache) {
      console.log("Caching all the things!");
      return cache.addAll([
        "/",
        "/index.html",
        "/index.js",
        "/install.js",
        "/index.css",
        "/manifest.json",
        "/loopify.js",
        "/assets/sound01.mp3",
        "/assets/sound02.mp3",
        "/assets/sound03.mp3",
        "/assets/sound04.mp3",
        "/assets/sound05.mp3",
        "/assets/sound06.mp3",
        "/assets/sound07.mp3",
        "/assets/sound08.mp3",
        "/assets/icons/icon-192x192.png",
        "/assets/icons/icon-384x384.png",
        "/assets/icons/icon-72x72.png",
        "/assets/icons/icon-96x96.png",
        "/assets/icons/icon-152x152.png",
        "/assets/icons/icon-512x512.png",
        "/assets/icons/icon-144x144.png",
        "/assets/icons/icon-128x128.png",
        "/assets/executor_icon.png",
        "/assets/executor_keychain_plain.svg",
        "/assets/80s-retro-sci-fi-background.jpg",
      ]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log(`Fetching ${event.request.url} from cache`);
        return response;
      } else {
        console.log(`Fetching ${event.request.url} from server`);
        return fetch(event.request);
      }
    })
  );
});
