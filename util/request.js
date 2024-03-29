const request = require('request');

const homeUrl = 'http://www.dangkyhoc.hlu.edu.vn/CMCSoft.IU.Web.Info/HomeUrl.aspx'
const registerUrl = 'http://www.dangkyhoc.hlu.edu.vn/CMCSoft.IU.Web.info/StudyRegister/StudyRegister.aspx'
const originUrl = 'http://www.dangkyhoc.hlu.edu.vn'
const creditUrl = 'http://www.dangkyhoc.hlu.edu.vn/CMCSoft.IU.Web.Info/CourseByFieldTree.aspx'

const getScheduleSource = (cookie) => {
    var headers = {
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Referer': homeUrl,
        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'Cookie': cookie
    };
    
    var options = {
        url: registerUrl,
        method: 'GET',
        headers: headers
    };
    
    return new Promise((resolve, reject) => {
        request(options, (error ,response, body)=>{
            if (!error && response.statusCode == 200) {
                resolve(body)
            }         
        });
    })
}

const getCreditsSource = (cookie) => {
    var headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        'OriginUrl': originUrl,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Referer': creditUrl,
        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'Cookie': cookie
    };

    var dataString = '__VIEWSTATE=%2FwEPDwUKMTMwMDcwMDg3OA9kFgICAQ9kFiACAQ9kFgwCAQ8PFgIeBFRleHQFLkjhu4YgVEjhu5BORyBUSMOUTkcgVElOIFRSxq%2Fhu5xORyDEkOG6oEkgSOG7jENkZAICD2QWAmYPDxYEHwAFBlRob8OhdB4QQ2F1c2VzVmFsaWRhdGlvbmhkZAIDDxAPFgYeDURhdGFUZXh0RmllbGQFBmt5aGlldR4ORGF0YVZhbHVlRmllbGQFAklEHgtfIURhdGFCb3VuZGdkEBUBAlZOFQEgQzVERjczNjAyNURFNEMyRkFDRUIwNjlCNUM0RDFFNDEUKwMBZxYBZmQCBA8PFgIeCEltYWdlVXJsBSgvQ01DU29mdC5JVS5XZWIuSW5mby9JbWFnZXMvVXNlckluZm8uZ2lmZGQCBQ9kFggCAQ8PFgIfAAUaTMOqIEjhu5NuZyBUaG%2FhuqFpKDQ0MTk0MSlkZAIFDw8WAh8ABQpTaW5oIHZpw6puZGQCBw8PFgIeB1Zpc2libGVoZGQCCQ8PFgIfAAUQSOG7mXAgdGluIG5o4bqvbmRkAgcPDxYCHwAFdiA8c3BhbiBzdHlsZT0iZm9udC1zaXplOjEwcHgiPj48L3NwYW4%2BIDxhIGhyZWY9Ii9DTUNTb2Z0LklVLldlYi5JbmZvL0NvdXJzZUJ5RmllbGRUcmVlLmFzcHgiPkNoxrDGoW5nIHRyw6xuaCBo4buNYzwvYT5kZAIDD2QWAmYPZBYCAgEPDxYCHwBkZGQCBQ9kFgJmDw8WAh8BaGRkAgcPZBYCZg8PFgQfAAUGVGhvw6F0HwFoZGQCCQ8QDxYGHwIFBE5hbWUfAwUCSWQfBGdkEBUGCELhurFuZyAyC0NoacyBbmggcXV5CkNodXnDqm4gVHULTeG7nyBS4buZbmcMTmfhuq9uIEjhuqFuDFThuqFpIGNo4bupYxUGIDMwZDZiNWMyNDBlYjQwYzY5MTBkOGVmOGM0MjkyOThjIDlERjMxNDUxMDkwMzQwRUE5NUVBRjQyRjk1MUJGRDVBIGRhYzA2ZTRkNzc0NDQ5ZjE5MjJmYjBlOWMzNjQ3M2FmIDMwOTE4MzdkNzg2ZjQ5N2RiNjA2OWQwZTdjM2Q3OTg3IGUyMTE5NmI4ZjgyMTRhOGU4ZWUxNTlkMmM0M2RmMjY4IDQ1OWFlNDZmMjE4NjRkNDdhM2I3OWRjZGI1OTk4YmYzFCsDBmdnZ2dnZxYBAgFkAgsPEA8WBh8CBQRDb2RlHwMFAklkHwRnZBAVBAZDQU9IT0MCQ0QEREhDUQROR0NTFQQgRDU0NEQzMkQ4RjNBNDNFQjk0QTAwQjc2M0QzMTE0Q0EgNzEzOUY0QjA3QTA4NEVBRUFDRkVGMDM1N0ZCMzczNzUgZGRhMTQyNGU0NWRkNDY3NmFkNWZiMjVkMzNhMzFiNDMgNEE5NzA0NjMwNzk1NEIzMUE1OEQwRkQyQURGRUU3MTQUKwMEZ2dnZxYBAgJkAhUPEA8WBh8CBQZBeU5hbWUfAwUCSWQfBGdkEBUQCEtob8OhIDM0CEtob8OhIDM1CEtow7NhIDM2CEtow7NhIDM3CEtow7NhIDM4CEtow7NhIDM5CEtow7NhIDQwCEtow7NhIDQxCEtow7NhIDQyCEtow7NhIDQzCEtow7NhIDQ0CEtow7NhIDQ1CEtow7NhIDQ2F0szMyBUcuG7nyB24buBIHRyxrDhu5tjFUxpw6puIHRow7RuZyBraMOzYSAwMRVMacOqbiB0aMO0bmcga2jDs2EgMDIVECA2QTlGQjM4MDJFMTk0NTgyOTZGNkUxRjA4NzM4REY0NSA2OTQ3OTcwNUM0ODc0NDg4OUM1QzJCQkM3NkE0QTEwOCA2M0U3NUUxNzJEOTA0OUM0QjEzNjE5M0JFMjA4Q0I3QiAxOUQ2RDhGQ0REMDk0Q0U4OERGMjREOTBGM0Q5MDFEQSBBMDM4NTIxOEEyNzg0NjI5ODUzNjQxNzIyRDNGNjZENSA4NkYyMDNBODZEQzE0QUE2QUY1ODcyMkNEODBCMzkwQSA1ODJGQjNDNkFDRkI0MDAzOTQ4RTE3NzNERDcxMDA5RCAyNjMxQTcwMkVGMkM0QjZCQTY4NkFEQTNDMEU1OERGRiBBMEYzQjZEQjM2QkY0MTVCQjgwRDVDRUI5QjQ1MTg2OSA4Qzc5MEM1NTM3QUI0MzMzQUFBOTkwOEI3NEUyOEI5RiBGRjE2ODJGMjk1REM0NEI2QUIyNzQwMEUwRTNEMUREOCAzOEFDMEEzMERFNjg0RUREOEUxQzBGMzkyQTRFODlDNyA5Q0I4QTM0NDhCQTY0MjYzOURENzAwRkFCMDQ1QjhFRiBFMjA0QjVBNEIzQ0Y0MjY2OTA5OUNDNzgyREQ1MjMxMyAzNjgyRUUzMjYxOTY0MUNCQUI0QjVDNUY4MkEzMkY1QSBBM0QyODQ5QzZGRkI0RTZEQUQwMjUyQzM3NzQ1QUY2QRQrAxBnZ2dnZ2dnZ2dnZ2dnZ2dnFgECCmQCFw8PFgIfAAV7Q2jGsMahbmcgdHLDrG5oIMSR4bqhbyB04bqhbyBj4bunYSA8c3BhbiBzdHlsZT0nY29sb3I6Ymx1ZSc%2BIG5nw6BuaCA8L3NwYW4%2BPHNwYW4gc3R5bGU9J2NvbG9yOiMwMDY2MDAnPk5nw6BuaCBMdeG6rXQ8L3NwYW4%2BZGQCGQ8QDxYCHgdDaGVja2VkZ2RkZGQCGw8QDxYCHwdoZGRkZAIdDxAPFgYfAwUHRmllbGRJZB8CBQdBeUZpZWxkHwRnZBAVAgMtLS0YS2jDs2EgNDQgLSBOZ8OgbmggTHXhuq10FQIAIEUzM0EzNDhBRTAzRDQ2QUU4RjAxN0M4MzRCRTNDRUQyFCsDAmdnFgFmZAIfDxAPFgYfAwUSU3RhZ2VPZkVkdWNhdGlvbklkHwIFCkZpZWxkTGV2ZWwfBGdkEBUCAy0tLSAyMkMyMEE1RDAwMzU0NEZDOUNGNDIzQzc3RjdDNUE0NBUCAAJGSRQrAwJnZxYBZmQCIQ8UKwACZDwrABIDABYEHg9Db21wb25lbnRUYXJnZXQLKacBSW5mcmFnaXN0aWNzLldlYlVJLlVsdHJhV2ViTmF2aWdhdG9yLkNvbXBvbmVudFRhcmdldCwgSW5mcmFnaXN0aWNzLldlYlVJLlVsdHJhV2ViTmF2aWdhdG9yLnYzLjEsIFZlcnNpb249My4xLjIwMDQxLjIwLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPTdkZDVjMzE2M2YyY2QwY2IBHhREZWZhdWx0U2VsZWN0ZWRJbWFnZQUVaWdfdHJlZUZvbGRlck9wZW4uZ2lmBRYBFCsABRYGHgdkYXRhS2V5BQItMR4EdGV4dAUOS2jDs2EgS2jDs2EgNDQeA3RhZwUCQVkWBjwrAAUBABYGHwsFJkx14bqtdCAobGnDqm4ga%2BG6v3QgduG7m2kgxJBIIEFyaXpvbmEpHwoFIDI4MTAzQjM3N0IyMzQ2RDU4MzQ0N0ZBQ0I2QzgxNjc4HwwFAkZJPCsABQEAFgYfCwUNTmfDoG5oIEx14bqtdB8KBSBFMzNBMzQ4QUUwM0Q0NkFFOEYwMTdDODM0QkUzQ0VEMh8MBQJGSTwrAAUBABYGHwsFEk5nw6BuaCBMdeG6rXQgVE1RVB8KBSA2QjNDMkU3M0I5Njc0NUM2OEU3MkMyMTJGRkY4Q0Y1RR8MBQJGSTwrAAUBABYGHwsFIU5nw6BuaCBMdeG6rXQgY2jhuqV0IGzGsOG7o25nIGNhbx8KBSA4NEYyQjJBQTU1NTA0RTU1QjdGODNDQjU2RkVDNDA4MR8MBQJGSTwrAAUBABYGHwsFF05nw6BuaCBMdeG6rXQga2luaCB04bq%2FHwoFIEI4QzYxQTRCMTYyQTQzQTVBMkIxRDEzODY2MzQzNjVFHwwFAkZJPCsABQEAFgYfCwUWTmfDoG5oIG5nw7RuIG5n4buvIEFuaB8KBSA3ODc0NkQxMjg1ODA0Q0FBOUE2RkJDNTZDNjUzNTNBQh8MBQJGSWRkZAYWAhYEHgVJbmRleGYeCkNoZWNrQm94ZXMLKaIBSW5mcmFnaXN0aWNzLldlYlVJLlVsdHJhV2ViTmF2aWdhdG9yLkNoZWNrQm94ZXMsIEluZnJhZ2lzdGljcy5XZWJVSS5VbHRyYVdlYk5hdmlnYXRvci52My4xLCBWZXJzaW9uPTMuMS4yMDA0MS4yMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj03ZGQ1YzMxNjNmMmNkMGNiARYEHw0CAR8OCysFAWQCIw8WAh8GZ2QCJQ8WAh8GaBYCZg88KwALAQAPFggeCERhdGFLZXlzFgAeC18hSXRlbUNvdW50AgQeCVBhZ2VDb3VudAIBHhVfIURhdGFTb3VyY2VJdGVtQ291bnQCBGQWAmYPZBYMZg8PZBYCHgdvbmNsaWNrBRJTZWxlY3RHcm91cCh0aGlzKTtkAgEPD2QWAh8TBRJTZWxlY3RHcm91cCh0aGlzKTsWEGYPZBYEAgEPDxYCHwAFATFkZAIDDw8WAh8ABQExZGQCAQ9kFgICAQ8PFgIfAAUyR2nDoW8gZOG7pWMgY2h1ecOqbiBuZ2hp4buHcCAtIHBo4bqnbiBi4bqvdCBideG7mWMWAh8TBRtyZXR1cm4gT3BlblBvcHVwTGlzdCh0aGlzKTtkAgIPZBYEAgEPEA8WBh8EZx8DBQJJZB8CBQROYW1lZBAVAwxC4bqvdCBideG7mWMZTOG7sWEgY2jhu41uIGLhuq90IGJ14buZYwtU4buxIGNo4buNbhUDIDVDRDEzRUVDMDkwMDQ2REU4NjZDQUE4NEMyODkxRDcxIDAyOENDMjA2MUJFNDQ1RkU5NDg4N0ZDQTlGNTk1Nzg1IEQzRUI4OTQwRENFMjQ5MUE4QkExQkQ0NDU5NDZFNjcyFCsDA2dnZxYBZmQCAw8PFgIfAAUgNUNEMTNFRUMwOTAwNDZERTg2NkNBQTg0QzI4OTFENzFkZAIDD2QWAgIBDw8WAh8ABQUzMC8zMGRkAgQPZBYCAg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%2BG7uSBuxINuZxYCHxMFG3JldHVybiBPcGVuUG9wdXBMaXN0KHRoaXMpO2QCAg9kFgQCAQ8QDxYGHwRnHwMFAklkHwIFBE5hbWVkEBUDDELhuq90IGJ14buZYxlM4buxYSBjaOG7jW4gYuG6r3QgYnXhu5ljC1Thu7EgY2jhu41uFQMgNUNEMTNFRUMwOTAwNDZERTg2NkNBQTg0QzI4OTFENzEgMDI4Q0MyMDYxQkU0NDVGRTk0ODg3RkNBOUY1OTU3ODUgRDNFQjg5NDBEQ0UyNDkxQThCQTFCRDQ0NTk0NkU2NzIUKwMDZ2dnFgFmZAIDDw8WAh8ABSA1Q0QxM0VFQzA5MDA0NkRFODY2Q0FBODRDMjg5MUQ3MWRkAgMPZBYCAgEPDxYCHwAFBTYwLzYwZGQCBA9kFgICAQ8PFgIfAAUHMTM4LzEzOGRkAgUPZBYEAgEPDxYCHwAFAjQ0ZGQCAw8PFgIfAAUCNDRkZAIGD2QWAgIBDw8WAh8ABQE3ZGQCBw9kFgQCAw8WAh8UBSA3Qzc2Njg1NUJFMTI0RTIzQTFDRjAyQjY0NzIzODA0NWQCBQ8PFgIfAAUgZmU2YTU2Y2ViMjc3NGRjN2E5YzJhNDRkNTdhMmVjOTdkZAIFDw9kFgIfEwUSU2VsZWN0R3JvdXAodGhpcyk7ZAInD2QWCGYPDxYCHwAFCUVtcHR5RGF0YWRkAgEPZBYCZg8PFgIfAWhkZAICD2QWAmYPDxYEHwAFBlRob8OhdB8BaGRkAgMPDxYCHwAFygU8YSBocmVmPSIjIiBvbmNsaWNrPSJqYXZhc2NyaXB0OndpbmRvdy5wcmludCgpIj48ZGl2IHN0eWxlPSJGTE9BVDpsZWZ0Ij4JPGltZyBzcmM9Ii9DTUNTb2Z0LklVLldlYi5JbmZvL2ltYWdlcy9wcmludC5wbmciIGJvcmRlcj0iMCI%2BPC9kaXY%2BPGRpdiBzdHlsZT0iRkxPQVQ6bGVmdDtQQURESU5HLVRPUDo2cHgiPkluIHRyYW5nIG7DoHk8L2Rpdj48L2E%2BPGEgaHJlZj0ibWFpbHRvOj9zdWJqZWN0PUhlIHRob25nIHRob25nIHRpbiBJVSZhbXA7Ym9keT1odHRwOi8vd3d3LmRhbmdreWhvYy5obHUuZWR1LnZuL0NNQ1NvZnQuSVUuV2ViLkluZm8vQ291cnNlQnlGaWVsZFRyZWUuYXNweCI%2BPGRpdiBzdHlsZT0iRkxPQVQ6bGVmdCI%2BPGltZyBzcmM9Ii9DTUNTb2Z0LklVLldlYi5JbmZvL2ltYWdlcy9zZW5kZW1haWwucG5nIiAgYm9yZGVyPSIwIj48L2Rpdj48ZGl2IHN0eWxlPSJGTE9BVDpsZWZ0O1BBRERJTkctVE9QOjZweCI%2BR%2BG7rWkgZW1haWwgdHJhbmcgbsOgeTwvZGl2PjwvYT48YSBocmVmPSIjIiBvbmNsaWNrPSJqYXZhc2NyaXB0OmFkZGZhdigpIj48ZGl2IHN0eWxlPSJGTE9BVDpsZWZ0Ij48aW1nIHNyYz0iL0NNQ1NvZnQuSVUuV2ViLkluZm8vaW1hZ2VzL2FkZHRvZmF2b3JpdGVzLnBuZyIgIGJvcmRlcj0iMCI%2BPC9kaXY%2BPGRpdiBzdHlsZT0iRkxPQVQ6bGVmdDtQQURESU5HLVRPUDo2cHgiPlRow6ptIHbDoG8gxrBhIHRow61jaDwvZGl2PjwvYT5kZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WBAULcmRvVmlld0NURFQFGHJkb0NoZWNrUGFzc2VkU3RhZ2VCeXN0dQUYcmRvQ2hlY2tQYXNzZWRTdGFnZUJ5c3R1BQh0cmVlVmlld%2F4RU9m4PJdugJd0h5zxNXzd4FsFaKD30ZWgTsRlcJX%2F&hidStageId=22C20A5D003544FC9CF423C77F7C5A44&hidStudentId=257f5ce432b042aca7b74814ff7b5e5b&drpAcademicYear=FF1682F295DC44B6AB27400E0E3D1DD8&CTDT=rdoCheckPassedStageBystu';

    var options = {
        url: creditUrl,
        method: 'POST',
        headers: headers,
        body: dataString
    };

    return new Promise((resolve, reject) => {
        request(options, (error ,response, body)=>{
            if (!error && response.statusCode == 200) {
                resolve(body)
            }        
        });
    })
}

module.exports = {getScheduleSource, getCreditsSource}