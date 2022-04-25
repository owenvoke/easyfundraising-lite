document.getElementById('refreshQueryCacheButton').addEventListener('click', () => {
    browser.storage.local.set({})

    browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.runtime.getURL('dist/icons/icon-128.png'),
        "title": 'easyfundraising lite',
        "message": 'Successfully reset retailer cache.'
    });
})
