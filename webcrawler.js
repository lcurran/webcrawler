'use strict';
let internet = require(process.argv[2])
let start = internet.pages[0].address



//step one: visit page
//- start with first link
//- add successfully visited page to "success"
//- for each link, find address in array and repeat. if address is already in success array, skip. if it is not in internet, add to error array

let crawls = []
let results = {
    "success": [],
    "skipped": [],
    "error": []
}

const crawlInternet = (start) => {
    crawls.push(visitAddress(start))
    return Promise.all(crawls).then(console.log(results))
}

const visitAddress = (address) => {
    new Promise((resolve, reject)  => {
        if (results.success.includes(address)) {
            results.skipped.push(address)
            return resolve()
        }
        let page = internet.pages.find(page => page.address == address)
        if (page) {
            results.success.push(page.address)
            return resolve(crawlPage(page))
        } else {
            results.error.push(address)
            return resolve()
        }
    })
    
}

const crawlPage = (page) => {
    page.links.forEach((link) => {
        crawls.push(visitAddress(link))
    })
}

crawlInternet(start)

