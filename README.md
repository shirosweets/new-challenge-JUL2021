# New Challange

# Requierements

1. Serverless (requiere [Node](https://nodejs.org/en/)>=v6)

```bash
sudo npm install -g serverless
```

```
serverless --version
```

2. Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html#cliv2-linux-install), and configure:
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
- [Files](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)

> `~/.aws/credentials`
```
[local]
aws_access_key_id = 1234567890
aws_secret_access_key = dorimeadmin
[default]
aws_access_key_id = 1234567890
aws_secret_access_key = dorimeadmin
```

> `~/.aws/config`
```
[local]
region = us-east-1
output = json
[default]
region = us-east-1
output = json
```

Or:

```bash
export AWS_PROFILE=local
```
```bash
export AWS_REGION=us-east-1
```
```bash
export AWS_PROFILE=local
```

Then:

```bash
aws --endpoint-url=http://localhost:4572/ configure set region us-east-1 --profile local
```

Check your configuration:
```
aws --endpoint-url=http://localhost:4572/ configure list
```

```bash
shirosweets@shiro:~/Desktop/Kew/new-challenge$ aws configure list
      Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                    local           manual    --profile
access_key     ****************7890              env
secret_key     ****************dmin              env
    region                us-east-1      config-file    ~/.aws/config
```

3. Install [serverless-localstack plugin](https://github.com/localstack/serverless-localstack) [npm](https://www.npmjs.com/package/serverless-localstack)

```bash
sudo npm install --save-dev serverless-localstack
```

4. Install localstack

```bash
pip install --upgrade pip
```
Then:
```bash
pip install --save-dev awscli-local
```

5. Create `serverless.yml` and config

```bash
serverless config --autoupdate
```

6. Install [Docker](https://docs.docker.com/get-docker/) and create `docker-compose.yml`

7. Run localstack:

```bash
docker-compose up -d
```

```bash
docker run -p 4567-4578:4567-4578 -p 8080:8080 localstack/localstack
```

```bash
docker start localstack_demo
```

8. Create the S3 bucket:

```bash
awslocal s3 mb s3://perfect-bucket --region us-east-1
```

or

```bash
aws --endpoint-url=http://localhost:4572/ s3 mb s3://perfect-bucket --region us-east-1
```
> Output: `make_bucket: perfect-bucket`

```bash
awslocal s3api put-bucket-acl --bucket perfect-bucket --acl public-read
```

or

```bash
aws --endpoint-url=http://localhost:4572/ s3api put-bucket-acl --bucket perfect-bucket --acl public-read
```

# How to run

```bash
localstack start
```

**Local function**
```bash
$ serverless invoke local --function hello
```
or
```bash
sls invoke -f functionName --stage local
```

# How to deploy
```bash
sls deploy --stage local --region us-east-1
```

# Commands
**View lastest version image from Docker hub**
```bash
docker images | grep localstack
```

**List all containers docker**
```bash
docker container ls
```

**Stop docker service**
```bash
sudo service docker stop
```

**List domain names**
```bash
aws --endpoint-url=http://localhost:4566 es list-domain-names
```

**List all buckets**
```bash
aws --endpoint-url=http://localhost:4572 s3 ls
```

**Create the queue**
```bash
aws \
sqs create-queue \
--queue-name local-queue \
--endpoint-url http://localhost:4576
--region us-east-1 \
```

**Create the topic**
```bash
aws \
sns create-topic \
--name local-topic \
--endpoint-url http://localhost:4575 \
--region us-east-1
```

**Create subscription**
```bash
aws \
sns subscribe \
--notification-endpoint http://localhost:4576/queue/local-queue \
--topic-arn arn:aws:sns:us-east-1:123456789012:local-topic \
--protocol sqs \
--endpoint-url=http://localhost:4575 \
--region us-east-1
```

# Refences
- [LocalStack](https://github.com/localstack/localstack)
- [LocalStack AWS CLI](https://github.com/localstack/awscli-local)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/)
- [Serverless](https://www.serverless.com/)
- [Postman - Automated testing](https://www.postman.com/automated-testing/)
- [CORS](https://serverless.com/framework/docs/providers/aws/events/apigateway#enabling-cors)
- [S3](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html)
- [S3 Limits](https://docs.aws.amazon.com/AmazonS3/latest/userguide/BucketRestrictions.html)
- [UserGuide: S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-userguide.pdf)
- [Serverless enviromen variables](https://www.serverless.com/framework/docs/environment-variables/)
- [Serverless Dotenv plugin](https://github.com/neverendingqs/serverless-dotenv-plugin)

##
- [](https://hub.docker.com/r/localstack/localstack/)


# Descarted

- Serverless offline (not working local credentials)
- Node.js

# Troubleshooting

## 'Namespace' object has no attribute 'cli_binary_format'
```bash
pip install -U awscli aws-shell
```

---

```bash
shirosweets@shiro:~/Desktop/Kew/new-challenge$ npm install -g serverless
npm ERR! code EACCES
npm ERR! syscall rename
npm ERR! path /usr/lib/node_modules/serverless
npm ERR! dest /usr/lib/node_modules/.serverless-5tkDMkLP
npm ERR! errno -13
npm ERR! Error: EACCES: permission denied, rename '/usr/lib/node_modules/serverless' -> '/usr/lib/node_modules/.serverless-5tkDMkLP'
npm ERR!  [Error: EACCES: permission denied, rename '/usr/lib/node_modules/serverless' -> '/usr/lib/node_modules/.serverless-5tkDMkLP'] {
npm ERR!   errno: -13,
npm ERR!   code: 'EACCES',
npm ERR!   syscall: 'rename',
npm ERR!   path: '/usr/lib/node_modules/serverless',
npm ERR!   dest: '/usr/lib/node_modules/.serverless-5tkDMkLP'
npm ERR! }
npm ERR!
npm ERR! The operation was rejected by your operating system.
npm ERR! It is likely you do not have the permissions to access this file as the current user
npm ERR!
npm ERR! If you believe this might be a permissions issue, please double-check the
npm ERR! permissions of the file and its containing directories, or try running
npm ERR! the command again as root/Administrator.

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/shirosweets/.npm/_logs/2021-08-05T14_30_30_176Z-debug.log
```

```bash
shirosweets@shiro:~/Desktop/Kew/new-challenge$ aws --endpoint-url=http://localhost:4572/ s3 mb s3://perfect-bucket --region us-east-1
make_bucket failed: s3://perfect-bucket Connection was closed before we received a valid response from endpoint URL: "http://localhost:4572/perfect-bucket".
```

```
docker: Error response from daemon: driver failed programming external connectivity on endpoint keen_albattani (80c7b8ff68a1c055cb2a9d2b9fb4f90c1db08e79364fef20f4992f910933dfd2): Bind for 0.0.0.0:4578 failed: port is already allocated.
ERRO[0000] error waiting for container: context canceled
```