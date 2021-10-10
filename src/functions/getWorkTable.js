'use strict';

const DynamoDb = require('../clients/dynamoDBClient');
const dynamoDb = DynamoDb.create();

// 勤務表取得API
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
    // 属性
    ProjectionExpression: '#day, day_of_week, start_time, end_time, memo',
    ExpressionAttributeNames: {
      '#day': 'day',
    },
    // GSI
    IndexName: 'gsi_email_year_month',
    // 検索条件
    KeyConditionExpression: 'email = :email and year_month = :yearMonth',
    ExpressionAttributeValues: {
      ':email': requestParam.email,
      ':yearMonth': requestParam.year + requestParam.month,
    },
  };

  // 勤務表を検索
  let result;
  try {
    result = await dynamoDb.query(params).promise();
    console.log('検索結果 : ' + JSON.stringify(result));
  } catch (e) {
    console.log('DynamoDB検索失敗');
    console.log(e);
    // レスポンスを返す
    context.succeed({
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }

  // レスポンスを返す
  context.succeed({
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(result.Items),
  });
};
