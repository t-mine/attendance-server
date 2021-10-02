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
  // https://stackoverflow.com/questions/43732835/getitem-from-secondary-index-with-dynamodb
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#query-property
  // https://qiita.com/sayama0402/items/fc7ce074f1f1747b1bef
  // https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/SQLtoNoSQL.ReadData.Query.html
  const params = {
    TableName: 'work_table',
    IndexName: 'gsi_email_year_month',
    KeyConditionExpression: 'email = :email and year_month = :yearMonth',
    ExpressionAttributeValues: {
      ':email': requestParam.email,
      ':yearMonth': requestParam.year + requestParam.month,
    },
  };

  // ユーザーテーブルを検索
  let workTables;
  try {
    const result = await dynamoDb.query(params).promise();
    workTables = result.Items;
    console.log('検索結果 : ' + JSON.stringify(result));
  } catch (e) {
    console.log('DynamoDB検索失敗');
    console.log(e);
    // TODO ここで失敗用のレスポンスを返したい。
  }

  // レスポンスを生成
  let statusCode = 200;
  let body = JSON.stringify(workTables);
  const response = {
    statusCode: statusCode,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: body,
  };

  // レスポンスを返す
  context.succeed(response);
};
