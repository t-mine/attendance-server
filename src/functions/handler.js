'use strict';

const login = require('./login.js');
const logout = require('./logout.js');

// ログインAPI
module.exports.login = (event, context) => {
  login(event, (error, result) => {
    const response = {
      statusCode: result.statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: result.user ? JSON.stringify(result.user) : '',
    };
    context.succeed(response);
  });
};

// ログアウトAPI
module.exports.logout = (event, context) => {
  logout(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(result),
    };
    context.succeed(response);
  });
};
