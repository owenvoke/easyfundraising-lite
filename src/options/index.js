document.getElementById('refreshQueryCacheButton').addEventListener('click', () => {
    browser.storage.local.set({})

    browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.runtime.getURL('dist/icons/icon.png'),
        "title": 'easyfundraising lite',
        "message": 'The retailer cache has been reset.'
    });
})
