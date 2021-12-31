---
emoji: 3️⃣
title: 42 Alert 프로젝트 회고
date: '2021-12-29 14:30:00'
author: seongsu
tags: Node.js Express Slack Heroku
categories: 프로젝트 회고
---

## 🤔 만들게 된 이유

<br/>

42 과정에는 `유튜브 미팅`, `멘토특강`, `본과정 시험`, `라피신 봉사`, `42 굿즈(옷, 스티커 등등..)나 여러 제품을 파는 월렛마켓` 등등 여러 이벤트를 자체 인트라넷에 알려주는 알림 서비스가 있다.

> 라피신 봉사나 멘토특강 등 특정 이벤트는 선착순이라 빠르면 1분안에 자리가 꽉찬다<br/>
> 42 월렛마켓에는 AWS $1000 Credit, 학장님과의 식사(학장님이 사주신다ㅋ) 등 재미난 상품들이 많다

<br/>

현재 존재하는 이벤트 알림이 있지만 지금 본과정에 들어온지 8개월 가량이 지났는데 선별과정(2월)부터 항상 인트라 알림 서비스에 불만이 있었다.<br/>
자체 API를 사용하지 않는이상 알림을 메일 또는 메신저로 받을 방법이 없고, 직접 사이트에 접속해서 확인을 해야 이벤트 등록이 가능하다보니 선착순으로 진행되는 이벤트는 놓치기 부지기수였다.

<br/>

그렇게 내가 편해지기 위해 `언제 한번 슬랙이나 이메일로 새로운 이벤트를 알려주는 서비스를 개발해야겠다!` 다짐을 한 뒤 반년이 넘는 시간이 지나고 어느날 갑자기 새벽감성에 젖어 개발에 시작하게 되었다 ..🤣<br/>

<br/>
<br/>

## 👨‍💻 개발 시작

<br/>

![skillset.png](./skillset.png)

> 이번 프로젝트의 개발환경

<br/>

일단 요즘 정말 맘에들어 배우는 중인 `Node.js`를 이용해 제작을 하였다.<br/>
그리고 배포 서버에 굉장히 많은 고민을 하였는데 `AWS`, `GCP`, `Naver Cloud Platform` 등등 여러 고민 끝에 `Heroku`를 선택하게 되었다.

<br/>

### 💻 Heroku 사용 이유

```Plain
깃과 연동이 잘 되는점이 정말 맘에 들었고
손쉬운 DB 추가기능이 진입장벽을 좀 낮춘것 같다.
그리고 문서화가 정말 잘되었으며 한글 문서도 굉장히 많아서 좋았다.
마지막으로 서비스 배포가 너무 쉬워서 Heroku를 선택하였다.
```

그 뒤 `Heroku`의 `ClearDB`를 통해 `MySQL`설정까지 모두 끝냈다.

> Heroku ClearDB 설정

- https://devcenter.heroku.com/articles/cleardb

<br/>

### 💾 데이터베이스 사용 이유

GMT +09:00 기준 08:00 ~ 24:00 동안 서버가 켜져있고<br/>
3초 간격으로 `42 API`를 호출하여 `Event` 항목을 확인한다.<br/>

> 운영진 분들이 퇴근하시기 때문에 새벽엔 Heroku 서버를 재워준다.

<br/>

그 때 생각한 개발 방향이 두가지로 나뉘었는데<br/>

<br/>

`데이터베이스를 사용하지 않고 이벤트 등록 시간과 현재 시간을 비교해 시간 차이가 n초 이내일 경우`

- 장점

  1. DB 연산이 빠져 성능상 이점이 있다.
  2. 데이터베이스 설정을 할 필요가 없다.

- 단점
  1. 이전 API 호출에서 새로운 이벤트가 발생하였을때 다음 API 호출에서 이전 이벤트가 슬랙에 전송 되었는지 알 수 없어 중복 전송 가능성이 크다.
  2. 위 문제를 해결하려 스택에 이전 이벤트의 PK를 갖고있자니 서버가 다운되면 이전 PK를 알 수 없으니 이미 전송된 이벤트가 한번 더 전송된다.
  3. 스택에 계속 저장하기도 사실 힘들며 여러개의 이벤트가 동시에 등록이 된다면 처리하기 곤란해진다.
  4. 42 API 응답 오류인 경우 에러 핸들링이 귀찮아진다.

<br/>

`모든 이벤트를 DB에 저장하며 저장된 이벤트의 PK와 새로운 이벤트의 PK를 비교하는 경우`

- 장점

  1. DB속 기존 이벤트와 비교를 하니 중복 전송 될 일이 없다.
  2. 서버가 다운돼도 다시 실행됐을 때 문제가 없다.

- 단점
  1. 서버 비용이 더 들어간다. (사실 무료 한도 내에서 사용중이다 🤣)
  2. 언제나 그렇지만 Node.js 내 ORM 설정이 정말 귀찮다.

<br/>

전자를 선택할 경우 서비스 상 심각한 문제가 생길 것 같아 결국 후자 방법을 선택하게 되었다 😝

<br/>
<br/>

## ⌨️ 개발 로직

<br/>

![flowchart.png](./flowchart.png)

> 프로세스 Flow Chart

<br/>

- 3초 간격으로 `Interval`실행

<br/>

- 42 Auth Token 발급

```JS
// eventToken에 42 Authorization Token이 담긴다.

const eventToken = await axios({
        method: "post",
        url: process.env.FT_TOKEN_URL,
        params: {
            grant_type: "client_credentials",
            client_id: process.env.FT_EVENT_UID,
            client_secret: process.env.FT_EVENT_SECRET,
        },
    });
```

> 인트라넷에서 미리 API 사용 등록을 하여 `UID`와 `SECRET KEY`를 발급받자

<br/>

- Event API 호출

```JS
// axios 호출이 완료되면 newEvent 함수에서 DB 검증을 통해 새로운 이벤트를 반환해준다.

axios({
    method: "get",
    url: "https://api.intra.42.fr/v2/campus/29/events",
    headers: { Authorization: `Bearer ${accessToken.eventToken}` },
})
    .then(async (value) => {
        const newEventValue = await newEvent(value.data, "event");

        if (newEventValue.length > 0)
            newEventValue.map(async (event) => sendAlert(event, "event"));
    })
    .catch((err) => {
        console.log(err);
        console.log("\x1b[31m[Event] - 42 API 호출에 실패하였습니다.\x1b[m");
});
```

<br/>

- 최신 이벤트인지 비교

```JS
// DB에서 PK값 기준 기존 이벤트를 가져온 후 새로운 이벤트와 PK 비교한다.
// 새로운 이벤트들은 배열에 담아 반환해준다.

module.exports = async (data, flag) => {
    const eventApi = data;
    eventApi.sort((a, b) => b.id - a.id);
    const nowEvent = flag === "event" ? await Event.findAll({}) : await Exam.findAll({});
    nowEvent.sort((a, b) => b.dataValues.id - a.dataValues.id);

    if (flag === "event") {
        return eventApi.filter((event) => event.id > nowEvent[0].dataValues.id);
    } else {
        return eventApi.filter((event) => {

            // 가끔 서울 캠퍼스 이벤트가 아니거나 테스트용으로 이벤트가 올라와서 예외처리를 해준다.
            if (
                event.cursus[0].slug === "42cursus" &&
                event.name.indexOf("test") === -1 &&
                event.location.indexOf("test") === -1
            )
                return event.id > nowEvent[0].dataValues.id;
        });
    }
};
```

<br/>

- 최신 이벤트 Slack 전송

```JS
// 사실 슬랙으로 전송하는 로직은 간단하다.
// 나중에 슬랙 API 사용법 포스팅을 해야것다

const { WebClient } = require("@slack/web-api");

const web = new WebClient(process.env.SLACK_TOKEN);
const channelName = process.env.SLACK_CHANNEL;

const getText = require("./formatText");

module.exports = (event, flag) => {
    web.chat
        .postMessage({
            username: "42Alert",
            channel: channelName,
            // getText 함수는 직접 만들었는데 Slack에 이쁘게 전송하기 위해 문자열을 꾸며주는 함수다
            text: getText(event, flag),
        })
}
```

<br/>
<br/>

## 📨 완성된 모습

<br/>

![notification.png](./notification.png)

<br/>

새로운 이벤트가 등록되면 위 사진과 같이 슬랙에 전송이 된다!!<br/>
아주 성공적으로 개발이 되었고 `Heroku`도 처음 사용해 봤고 `Node.js`도 입문자 수준이라 4일 밤낮으로 아주 개고생을 하였다..😩<br/>

<br/>
<br/>

## 📝 프로젝트 후기

<br/>

![42alert.png](./42alert.png)

> 원래 본과정 워크스페이스에 등록하려 했던 앱..

<br/>

한가지 아쉬웠던 점은 본과정 워크스페이스 `42born2code`에는 이 앱을 42 Paris 관리자가 거절하여 등록을 못하였고, `허광남`멘토님과 여러 멘토님의 도움으로 멘토님들이 운영하시는 `42seoul_cuckoo` 워크스페이스에 등록을 했다......😩

> TMI ⭐️ `허광남` 멘토님은 https://okky.kr 개발자이시다..! (대단하신분 😮)

<br/>

사실 여기 작성하진 않았지만 개발이 끝나고 서비스 배포까지 아주 고단했다..<br/>

> 아마 처음이라 힘들었던것 같다

<br/>

지금은 모두 끝나고 개운하긴 하지만 3개월이 지난 지금 다시 코드를 돌아보니 고칠 부분히 `상당히` 많은것 같다....<br/>
처음 배우며 시작했던 프로젝트라 그런지 현재 하나도 마음에 들지 않는다ㅠ<br/>
현재 하고있는 프로젝트가 마무리 되거나 도중에 시간이 나면 `TypeScript`를 적용해 전체 리팩토링을 해보려 한다 🤩<br/>

<br/>

![alert-user.png](./alert-user.png)

> 멘토님이 `42 Alert` 서비스를 위해 만들어주신 채널 `#agenda-alert`

<br/>

개발이 끝나고 3개월 후 현재 `224명`의 본과정 분들이 사용해 주시고 있다!!<br/>
이분들도 현재 인트라넷 알림 서비스의 불편함을 느끼고 내가 만든 서비스를 사용해주시는게 감사할 따름이다 🙏<br/>

<br/>

사실 엄청난 기술이 들어가고 기능이 있는건 아니지만..<br/>
없던 기능, 필요한 기능을 제작하는 일은 재밌고 제작 후 매우 뿌듯한 것 같다!

> 물론 사용해주는 분들이 계셔서 더 그런것 같다

<br/>
<br/>

## 📚 Github 주소

<br/>

> https://github.com/nfl1ryxditimo12/42Alert

<br/>
<br/>

```toc

```
