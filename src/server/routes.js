const {test,postPredictHandler,getHistoriesHandler} = require('./handler')

const routes = [
    
    {
        method : 'GET',
        path : '/',
        handler : test
    },
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
        options: {
          payload: {
            allow: 'multipart/form-data',
            multipart: true
          }
        }
      },
      {
        path: '/predict/histories',
        method: 'GET',
        handler: getHistoriesHandler,
      }
]

module.exports = routes;