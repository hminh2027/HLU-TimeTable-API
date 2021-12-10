const md5 = require('md5')
const { getCookie } = require('./util/cookie')
const { getScheduleSource, getCreditsSource } = require('./util/request')
const { getSchedule, getCredits, dateHandler } = require('./util/cheerio')

const schedule = async (username, password) => {
    const hashed = md5(password)
    const cookie = await getCookie(username, hashed)
    const html = await getScheduleSource(cookie)
    const schedule = getSchedule (html)
    const data = dateHandler(schedule)

    return data
}

const credits = async (username, password) => {
    const hashed = md5(password)
    const cookie = await getCookie(username, hashed)
    const html = await getCreditsSource(cookie)
    const credits = getCredits(html)

    return credits
}

module.exports = {schedule, credits}