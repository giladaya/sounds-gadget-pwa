const divInstall = document.getElementById("installContainer");
const butInstall = document.getElementById("butInstall");

window.addEventListener("beforeinstallprompt", event => {
  console.log("👍", "beforeinstallprompt", event);
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install button container
  divInstall.classList.toggle("hidden", false);
});

butInstall.addEventListener("click", (ev) => {
  console.log("👍", "butInstall-clicked");
  ev.preventDefault();
  // Hide the install button.
  divInstall.classList.toggle("hidden", true);
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  promptEvent.userChoice.then(result => {
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
  });
});

window.addEventListener("appinstalled", event => {
  console.log("👍", "appinstalled", event);
});
