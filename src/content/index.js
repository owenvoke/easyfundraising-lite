document.onload(browser.runtime.sendMessage({
    hostname: window.location.hostname,
}))
