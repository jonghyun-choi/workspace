# Cloud logging overview

## References
documentation - https://cloud.google.com/logging/docs/overview
pricing - https://cloud.google.com/stackdriver/pricing

## Log collecting patterns [https://cloud.google.com/logging/docs/agent-or-library]
1. logging api in application
2. ops agent
3. logging agent
4. upstream fluentd
5. third party solutions

## Create / record log through in-code works
https://cloud.google.com/logging/docs/setup/java
https://cloud.google.com/logging/docs/reference/libraries#client-libraries-install-java

## Read / manage log
- Cloud console 로그 탐색기 접속
	-https://console.cloud.google.com/logs/query?referrer=search&hl=ko&project=pjt-pantos-nff-dev-2106-1
- programming 언어에 맞는 client library 통한 logging api 호출
	-https://cloud.google.com/logging/docs/reference/libraries#client-libraries-install-java
- logging api rest endpoint 호출
	-https://cloud.google.com/logging/docs/reference/v2/rest
- gcloud cli : gcloud logging 
	-https://cloud.google.com/logging/docs/reference/tools/gcloud-logging
-- https://developer.mozilla.org/en-US/docs/Web/API/Window/error_event
-- https://stackoverflow.com/questions/19846078/how-to-read-from-chromes-console-in-javascript
-- https://www.bespinglobal.com/cloud-logging/
## Abilities
1. 