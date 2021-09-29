'use strict';

// ログアウトAPI
module.exports.handler = async (event, context) => {
  // レスポンスを生成
  const response = {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
  };

  // レスポンスを返す
  context.succeed(response);
};
