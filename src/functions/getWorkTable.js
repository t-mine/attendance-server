'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// ワークテーブル取得API
module.exports.handler = async (event, context) => {
  // クエリ文字列
  // ※クエリ文字列はリクエストボディと違いJSON形式文字列ではなく
  //   オブジェクトとしてeventに格納されているためパース不要
  console.log(event);
  const requestParam = event.queryStringParameters;

  // 検索条件を作成
  const params = {
    TableName: 'work_table',
    // TODO たぶん、GSIの検索の仕方があるので調べる
    Key: {
      email: requestParam.email,
      year_month: requestParam.year + requestParam.month,
    },
  };

  // ユーザーテーブルを検索
  let workTable;
  try {
    const result = await dynamoDb.get(params).promise();
    workTable = result.Item;
    console.log('検索結果 : ' + JSON.stringify(workTable));
  } catch (e) {
    console.log('DynamoDB検索失敗');
    console.log(e);
    // TODO ここで失敗用のレスポンスを返したい。
  }

  // レスポンスを生成
  let statusCode = 200;
  let body = JSON.stringify(workTable);
  const response = {
    statusCode: statusCode,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: body,
  };

  // レスポンスを返す
  context.succeed(response);
};
