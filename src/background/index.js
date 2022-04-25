const RETAILERS_URL = 'https://api-data.easyfundraising.org.uk/retailers.json'

let retailers = browser.storage.local.get().retailers;

async function updateRetailers() {
    retailers = []

    await fetch(new Request(RETAILERS_URL, {
        method: 'GET'
    })).then(async (response) => {
        retailers = (await response.json()).retailers
    })

    browser.storage.local.set({
        retailers: retailers
    })

    console.log('easyfundraising lite - Retailer Cache Reloaded...')
}

async function update(message) {
    if (!retailers) {
        await updateRetailers()
    }

    const domain = message.hostname ?? ''
    const retailer = retailers.filter((retailer) => domain.includes(retailer.retailer_domain))[0] ?? null

    let tab = (await browser.tabs.query({active: true, currentWindow: true}))[0];

    browser.browserAction.setIcon({
        tabId: tab.id,
        path: {
            128: retailer !== null ? browser.runtime.getURL('dist/icons/icon-128.png') : browser.runtime.getURL('dist/icons/icon-grey-128.png'),
        }
    })

    browser.browserAction.setTitle({
        tabId: tab.id,
        title: retailer !== null ? `${retailer.name} - ${retailer.donation_message}` : 'No donation found.',
    })

    browser.browserAction.onClicked.addListener(tab => {
        browser.tabs.update(tab.id, {
            url: `https://www.easyfundraising.org.uk/retailer/${retailer.uri}/visit`,
        })
    })

    return true
}

browser.runtime.onMessage.addListener(update)
