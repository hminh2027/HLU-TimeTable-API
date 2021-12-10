const request = require('request');

const loginUrl = 'http://www.dangkyhoc.hlu.edu.vn/CMCSoft.IU.Web.Info/Login.aspx'
const originUrl = 'http://www.dangkyhoc.hlu.edu.vn'
const homeUrl = 'http://www.dangkyhoc.hlu.edu.vn/CMCSoft.IU.Web.Info/HomeUrl.aspx'

const getCookie = (username, password) => {
    var headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        'OriginUrl': originUrl,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Referer': `${loginUrl}?url=${homeUrl}`,
        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'Cookie': 'ASP.NET_SessionId=md0fuek2gdifx4ryhpe4opz3'
    };

    var dataString = '__EVENTTARGET=&txtUserName='+username+'&txtPassword=' + password + '&btnSubmit=%C4%90%C4%83ng+nh%E1%BA%ADp&hidUserId=&hidUserFullName=&hidTrainingSystemId=';

    var options = {
        url: `${loginUrl}?url=${homeUrl}`,
        method: 'POST',
        headers: headers,
        body: dataString
    };
    return new Promise((resolve, reject) => {
        request(options, (error ,response, body)=>{
            if (!error && response.headers['set-cookie'] != undefined) {
                const string =  response.headers['set-cookie'] + ''  
                const cookie = response.request.headers['Cookie'] + '; ' + string.split(";")[0]
                resolve(cookie)          
            }
        })
    })
}

module.exports = {getCookie}