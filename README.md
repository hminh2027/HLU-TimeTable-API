# HLU-TimeTable-API
This is a NodeJS library with Javascript support NodeJS Server
## Installation
```javascript
npm i hlu-timetable-api
```
## Usage
### Requisition
```javascript
const api = require('hlu-timetable-api')
```
### 1. Get Schedule
Get the timetable on HLU QLDT website with the current date
```javascript
api.schedule(username, password).then(data=>console.log(data))
```
  >If current date is not a school day, there is no return schedule

  >If account (username + password) is invalid, wrong information or deactived will return nothing
### 2. Get Credits
Get the total credits and the completed credits since college until now
```javascript
api.credits(username, password).then(data=>console.log(data))
```
## Contact
**Vu Hoang Minh - [Facebook](https://www.facebook.com/swag.lauch/)**
## Summary
If you enjoy using this library, give me a star on Github and share it to your friends :)

If you have an error caused by the api, please submit an Issue on the repository!
