REGION ?= us-east-1

.DEFAULT_TARGET: help-cmds

.PHONY: help-cmds
help-cmds:		## This help.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: dkr-clean
dkr-clean:		## Clean up all local deps.
	-rm -Rf cloud-custodian

setup-s3:
	awslocal s3 mb s3://perfect-bucket --region us-east-1

	awslocal s3api put-bucket-acl --bucket perfect-bucket --acl public-read