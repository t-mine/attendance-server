'use strict';

const logout = require('./logout.js');

// ログアウトAPI
module.exports.logout = (event, context) => {
  logout(event, (error, result) => {
    const response = {
      statusCode: result.statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(result),
    };
    context.succeed(response);
  });
};
