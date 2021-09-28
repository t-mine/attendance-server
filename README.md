# attendance-server

## Project setup

```
npm install -g serverless
npm install
```

## Deploy

```
serverless deploy --verbose
serverless deploy function -f login --stage dev --verbose
```

## Curl

```
curl -X POST -kv https://XXXXXXXXX.execute-api.ap-northeast-1.amazonaws.com/dev/login -d "{\"email\":\"tanaka@example.com\",\"password\":\"tanaka\"}"
curl -X DELETE -kv https://XXXXXXXXX.execute-api.ap-northeast-1.amazonaws.com/dev/logout
```

## Remove resources

```
serverless remove --verbose
```
