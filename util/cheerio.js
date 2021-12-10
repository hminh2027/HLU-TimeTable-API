const cheerio = require('cheerio')
const moment = require('moment')

const getSchedule = (html) => {
    let data = []
    const $ = cheerio.load(html)
    $('.cssRangeItem3', html).each((index, elem)=>{
        const subject = $(elem).find('td:eq(2)').text().replace(/\n/g, '').replace(/\t/g, '')
        const time = $(elem).find('td:eq(4)').text().replace(/\n/g, '').replace(/\t/g, '')
        data.push({subject,time})
    })
    return data
}

const getCredits = (html) => {
    let data = {
        total: 0,
        finished: 0
    }
    const $ = cheerio.load(html)
    $('.cssListItem', html).each((index, elem)=>{
        data.total += Number($(elem).find('td:eq(5)').text().replace(/\n/g, '').replace(/\t/g, ''))
        data.finished += Number($(elem).find('td:eq(6)').text().replace(/\n/g, '').replace(/\t/g, ''))
    })
    
    $('.cssListAlternativeItem', html).each((index, elem)=>{
        data.total += Number($(elem).find('td:eq(5)').text().replace(/\n/g, '').replace(/\t/g, ''))
        data.finished += Number($(elem).find('td:eq(6)').text().replace(/\n/g, '').replace(/\t/g, ''))
    })
    return data
}

const dateHandler = (schedule) => {
    const today = moment()

    let rs = [[],[],[],[],[],[]]
    let check = false

    schedule.map(e=>{
        const period = e.time.split(':')[0]
        const from = period.split(' ')[1]
        const to = period.split(' ')[3]
        if(today.diff(moment(from, "DD/MM/YYYY"), 'days') > 0 && today.diff(moment(to, "DD/MM/YYYY"), 'days') < 0) {
            const time = e.time.split(':')[1]
            const days = time.trim().split('\Thứ')
            days.map(d=>{
                if(d=='') return;
                const day = d.split('tiết')[0]
                const shift = d.split('tiết')[1]
                rs[day-2].push({
                    subject: e.subject.split('-')[0],
                    time: 'Tiết ' + shift
                })
            })
          check=true
        }
    })
    if(!check) return
    return rs;
}

module.exports = {getSchedule, getCredits, dateHandler}