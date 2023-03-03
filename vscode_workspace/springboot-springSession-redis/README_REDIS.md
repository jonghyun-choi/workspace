# Redis 설치 [https://redis.io/docs/getting-started/installation/install-redis-on-windows/]

## WSL
1. install / enable WSL2 (Windows Subsystem for Linux) 
   - Microsoft's WSL install documents
   [https://learn.microsoft.com/en-us/windows/wsl/install]
   [https://learn.microsoft.com/en-us/windows/wsl/install-manual]
   [https://learn.microsoft.com/en-us/windows/wsl/install-on-server]

   - window powershell in administrator mode
    ```shell
        dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
        dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
    ```
    - restart the pc
    - upgrade version 1 to 2
    - 
2. install curl in linux
   - [https://linuxize.com/post/curl-command-examples/]
    ```bshell
        sudo apt update
        sudo apt install curl
    ```
3. launch redis
   ```bshell
        sudo service redis-server start
        redis-cli 
        127.0.0.1:6379> ping
        PONG
   ```

## msi
  - github repository for redis in windows
    [https://github.com/microsoftarchive/redis/releases]
  - korean guide
    [https://inpa.tistory.com/entry/REDIS-%F0%9F%93%9A-Window10-%ED%99%98%EA%B2%BD%EC%97%90-Redis-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0]


# Redis 사용
- set
- del
- select
- namespace 추가 예제 `set spring:session:init init_namespace`


# pom.xml
```xml
  <dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-data-redis</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework.session</groupId>
		<artifactId>spring-session-data-redis</artifactId>
	</dependency>
```
1. spring-boot-starter-data-redis
- provides the necessary dependencies to use Redis as a data store, including the Redis client library Lettuce.
2. spring-session-data-redis
- automatically registers the RedisHttpSessionConfiguration class, which provides the configuration required to store sessions in Redis. This class uses the spring-boot-starter-data-redis dependency to interact with Redis.



# redis structure
- 데이터베이스 schema는 숫자로 변경
  `SELECT #`

- {Key : Value} pair
- Value 내 {HashKey : Value} 으로 구성
  ```
  {
    key : myDataKey
    value : {
      hashkey1 : actualValue1,
      hashKey2 : actualValue2,
      ...
    }
  }
  ```

- Single thread
  command 시 blocking 여부 확인 필수 (시간 오래 걸리는 O(N) process는 O(1) 으로 변환)


# IDE tool : P3X REDIS UI 사용중.