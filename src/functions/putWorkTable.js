'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// 勤務表テーブル更新API
module.exports.handler = async (event, context) => {
  // リクエストボディ
  const requestBody = JSON.parse(event.body);
  console.log(event.body);

  let errCnt = 0;

  await Promise.all(
    // 配列をmapして要素をPromiseに変換
    requestBody.map(async (item) => {
      const params = {
        TableName: 'work_table',
        Item: {
          email: item.email,
          year: item.year,
          month: item.month,
          day: item.day,
          year_month_day: item.year + item.month + item.day,
          year_month: item.year + item.month,
          day_of_Week: item.dayOfWeek,
          start_time: item.startTime,
          end_time: item.endTime,
          memo: item.memo,
        },
      };
      // 勤務表テーブルにデータを追加
      try {
        await dynamoDb.put(params).promise();
      } catch (e) {
        console.log('DynamoDB登録失敗');
        console.log(e);
        errCnt++;
      }
    })
  );

  // レスポンス
  context.succeed({
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ errCnt: errCnt ? errCnt : 0 }),
  });
};
