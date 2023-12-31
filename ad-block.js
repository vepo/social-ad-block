console.log("Initializing....");

function findTweetCell(adCell) {
    if (adCell) {
        if (adCell.tagName.toLowerCase() == 'div' && adCell.hasAttribute('data-testid')) {
            return adCell;
        } else {
            return findTweetCell(adCell.parentElement);
        }
    }
    return null;
}

function replaceLogo() {
    // rgb(255, 255, 255)
    // rgb(21, 32, 43)
    // rgb(0, 0, 0)
    var bodyStyle = window.getComputedStyle(document.body, null);
    var logos = document.querySelectorAll('h1[role="heading"] svg[viewBox="0 0 24 24"], h1[role="heading"] img.my-logo');
    if (logos.length > 0) {
        let logo = logos[0];
        var imgElm = document.createElement("img");
        imgElm.classList.add('my-logo');
        if (bodyStyle.background.toLocaleLowerCase().indexOf('255') >= 0 ||
            bodyStyle.background.toLocaleLowerCase().indexOf('ff') >= 0) {
            imgElm.setAttribute("src", browser.runtime.getURL("resources/twitter-dark-icon.png"));
        } else {
            imgElm.setAttribute("src", browser.runtime.getURL("resources/twitter-white-icon.png"));
        }
        var style = window.getComputedStyle(logo, null);
        let width = style.getPropertyValue("width");
        let height = style.getPropertyValue("height");
        if (width > height) {
            imgElm.style.width = imgElm.style.height = width;
        } else {
            imgElm.style.width = imgElm.style.height = height;
        }
        logo.parentElement.appendChild(imgElm);
        logo.parentElement.removeChild(logo);
    }

    var favicon = document.querySelector('link[rel="shortcut icon"]');
    if (favicon) {
        favicon.setAttribute('href', 'https://twitter.com/favicon.ico');
    }
    if (document.title == 'X') {
        document.title = 'Twitter';
    } else {
        document.title = document.title.replace('/ X', '/ Twitter')
    }
}

function deleteAllAdsWithText(adText) {
    var xpath = `//span[text()='${adText}']`;
    var query = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        // DEBUG console.log(query.snapshotLength, i, query.snapshotItem(i));
        var tweetCell = findTweetCell(query.snapshotItem(i));
        if (tweetCell) {
            console.log("Deleting....", tweetCell);
            tweetCell.parentElement.removeChild(tweetCell);
        }
    }
}

function deleteAllAds() {
    deleteAllAdsWithText('Ad');
    deleteAllAdsWithText('Promovido');
}


deleteAllAds();

setInterval(replaceLogo, 1);
addEventListener("scroll", deleteAllAds);
