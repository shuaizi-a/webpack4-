const axios = require('axios')

// 为给定 ID 的 user 创建请求
axios.get('/api/id')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });