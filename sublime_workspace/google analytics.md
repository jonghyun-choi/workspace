# Google Analytics

## 계정 구조 [https://support.google.com/analytics/answer/9679158?hl=ko&ref_topic=12156336,12153943,2986333,&visit_id=637976022981403574-2033610864&rd=1]
1. 계정
  - 회사, 법인 등 지역별 서비스 약관이 적용되는 단위
2. 속성
  - 하나의 사용자층에 대한 데이터 단위
3. 데이터스트림
  - App / Web .. 플랫폼 단위
  - 추천 데이터스트림 구조 : App(IOS), App(Android), Web

- 계정 구조 예제
```
CASE 1 : 회사 a 는 각 속성별 해당 브랜드/비지니스와 관련된 데이터를 수집 중
계정 A (회사 a)
  - 속성 1 (자동차 관련 데이터)
    - 데이터스트림 i : App(IOS)
    - 데이터스트림 ii : App(Android)
    - 데이터스트림 iii : Web
  - 속성 2 (생활용품 관련 데이터)
    - ...
  - 속성 3 (소비자 가전 관련 데이터)
    - ...

CASE 2 : 모든 속성에 단일 데이터 전송. 제품 간 연계 판매 및 교차 판매 목적
계정 B (기업 B)
  - 속성 1
    - 데이터스트림 i : App(IOS)
    - 데이터스트림 ii : App(Android)
    - 데이터스트림 iii : Web
  - 속성 2 (속성 1과 동일)
    - ...
  - 속성 3 (속성 1, 2와 동일)
    - ...

CASE 3 : 소규모 비지니스로 모든 구매 데이터를 단일 속성에 저장
계정 C (사업 c)
  - 속성 1
    - 데이터스트림 i : App(IOS)
    - 데이터스트림 ii : App(Android)
    - 데이터스트림 iii : Web

```


## 저장 기본 단위
- pageview
- event
- transaction


## gtag.js (구글태그 라이브러리)

- import gtag
```html

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=<Google Analytics ID>"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '<Google Analytics ID>');
</script>

```

### gtag.js 포함하여 console에서 테스트 시 예제 및 결과
- SPA상 수동으로 페이지 추적 시 사용할 수동 페이지 조회.
- https://developers.google.com/analytics/devguides/collection/gtagjs/pages?hl=ko#default_behavior
```javascript
// 코드 삽입 1
gtag('event', 'console-test', {'test' : 'test1'});
/*
  이벤트 이름 별 이벤트 수
  console-test : 1
  console-test > test : test1
  - test1
*/

// 코드 삽입 2
gtag('event', 'page_view', {
  page_title: 'test2',            // document.title - 차세대 Pantos view                    <- + 화면 타이틀
  page_location: '/test2',        // location.href  - 'http://view2loc.lxpantos.com:8080/' <- action
  page_path: 'localhost/test2',   // location.pathname - '/' pgm001                        <- id
  send_to: 'G-KNKBSCVDRG'         // Google Analytics tracking ID
})

/*
  페이지 제목 및 화면 이름 별 조회수
  test2 : 1

  이벤트 이름 별 이벤트 수
  page_view : page_view + 1
  page_view > page_title : test2
  page_view > page_location : /test2
  page_view > page_path : localhost/test2
*/

// 코드 삽입 3
gtag('event', 'page_view', {
  page_title: 'test3',
  page_location: '/test3',
  page_path: 'localhost/test3',
  send_to: 'G-KNKBSCVDRG'
})

/*
  페이지 제목 및 화면 이름 별 조회수
  test3 : 1

  이벤트 이름 별 이벤트 수
  page_view : page_view + 1
  page_view > page_title : test3
  page_view > page_location : /test3
  page_view > page_path : localhost/test3
*/

```

### gtag specs documentation reference
- https://developers.google.com/tag-platform/gtagjs/reference?hl=ko
```javascript

gtag(<command>, <command parameters>);

command
  - config
  - get
  - set
  - event
  - consent

```

## Reports
### Monitor collection
- Realtime
```
Use-cases
1. effects of SNS postings / promotions to service
2. verify tracking code is working

Data shown
1. Users [Users in last 30 mins, New users, Revisited users]

We recommend that you refer to the Acquisition reports for the most accurate attribution information.
https://support.google.com/analytics/answer/9271392?hl=en&ref_topic=9303476
```
### Life cycle collection
- Acquisition  - origin of the traffic
```
Populating data
1. Auto-tagging [https://support.google.com/analytics/answer/11242870#auto-tagging]
2. Manually tagging [https://support.google.com/analytics/answer/10917952#zippy=%2Cin-this-article]

Data shown
1. Acquisition [overview, user, traffic(session), google ads]

```
- Engagement   - measure events and conversion events
```
Data shown
1. overview
2. user stickiness (active users ratio)
3. window / tab foregrounded duration
4. event / convension trigger population
5. pages / screens population

https://support.google.com/analytics/answer/10999789?hl=en&ref_topic=9303476
```
- Monetization - revenue
- Retention    - frequency and time users spend
### User collection
- Demographics - classification of user by age, location, language, gender ...etc
- Tech         - traffic by the technology audience uses
### Developer collection
- Games        
- Firebase
- Debugview

## Comparisons
[https://support.google.com/analytics/answer/9269518]

## User
[https://support.google.com/analytics/answer/3123663?hl=ko#zippy=%2C%EC%9D%B4-%EB%8F%84%EC%9B%80%EB%A7%90%EC%97%90-%EB%82%98%EC%99%80-%EC%9E%88%EB%8A%94-%EB%82%B4%EC%9A%A9%EC%9D%80-%EB%8B%A4%EC%9D%8C%EA%B3%BC-%EA%B0%99%EC%8A%B5%EB%8B%88%EB%8B%A4]