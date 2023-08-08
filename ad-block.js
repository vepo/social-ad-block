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

function deleteAllAds() {
    var xpath = "//span[text()='Ad']";
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


deleteAllAds();

addEventListener("scroll", (event) => {
    deleteAllAds();
});
