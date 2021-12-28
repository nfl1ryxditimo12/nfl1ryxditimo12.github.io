---
emoji: 1️⃣
title: Express 디자인 패턴
date: '2021-12-17 18:52:00'
author: seongsu
tags: Node.js Express
categories: Node.js Express
---

![nodejs.png](./nodejs.png)

<br/>

어느 프레임워크/언어 간에 `디자인 패턴`이 지켜지지 않은채 개발을 시작하게 되면 후에 유지보수, 가독성, 비효율적인 코드의 문제에 직면하게 된다.<br/>
`디자인 패턴`이 올바르게 지켜진 채 개발을 하게 되면 코드의 중복을 피해주며 안정성이 높아지며 유지보수에 많은 도움이 된다.<br/>
이번에 프로젝트를 진행하며 배우게 된 `Express`설계를 포스팅 해보려 한다.

<br/>

---

<br/>

## 🚀 Express.js 프레임워크

<br/>

- Node.js 상에서 구동되는 서버 프레임워크
- MVC 패턴을 사용한다.
- 많은 Method 및 Middleware를 통해 쉬운 API 작성

<br/>

---

<br/>

## 🌀 MVC 패턴

<br/>

![mvc.png](./mvc.png)

### Model

- 모델은 클라이언트에 노출되지 않는다.
- 연산처리 및 DB 처리가 주 된 목적이다.
- `service`에서 요청이 들어오면 해당 연산처리 후 정보를 `return`한다.

### View

- 클라이언트에 나타나는 부분이다.
- HTML/CSS/Javascript 등으로 꾸미고, 움직이고, 표현하는게 가능하다.

> 뷰는 사용자에게 보여지는 반드시 필요한 부분이다. 가공된 정보를 사용자가 보기 쉽게 나타내야 하는 곳이다.

### Controller

- 사용자의 요청을 받고 응답을 해준다.
- 데이터 가공이 이뤄지는 곳이다.
- `Model`과 `View` 사이의 과정이 모두 이뤄진다.

> `View` 요청 -> `Model` 연산 -> 가공된 데이터 -> `View` 응답

<br/>

---

<br/>

## 🎨 디자인 패턴

<br/>

```\
├── app.js          # 실행 주체
├── package.json    # yarn 패키지 관리
├── yarn.lock       # yarn 패키지 잠금
└── src             # 소스 폴더
    ├── modules         # 사용자 지정 모듈
    ├── routes          # 요청에 따른 분리
    ├── controllers     # API 요청/응답 실행
    ├── services        # 데이터 가공
    ├── repository      # DB CRUD
    └── entities        # Model과 동일
```

<br/>

로직은 `routes` -> `controllers` -> `services` -> `repository` 로 분리되며<br/>

<br/>

`routes`는 API 요청에 따른 라우팅만<br/>
`controllers`는 API 요청/응답에 관한 로직만 작성한다.<br/>

<br/>

> ☠️ 비즈니스 로직은 이 부분에 들어가면 안된다!!<br/>

세부적인 로직을 `routes`또는 `controllers`에서 담당하면 코드가 복잡해지며 가독성이 떨어지고 유지보수가 힘들어진다.<br/>

<br/>

`repository`에는 데이터베이스에서 기본적인 CRUD 작업을 하며 정제되지 않은 데이터를 반환한다.<br/>
그뒤 `services`에서 비즈니스 로직을 담당하며 데이터를 가공해서 `controllers`에 반환해준다.<br/>

<br/>

---

<br/>

## 🚧 절대 경로 / 상대경로

<br/>

`package.json`

```json
"_moduleAlias": {
    "@routes/*": "./dist/routes/*",
    "@controllers/*": "./dist/controllers/*",
    "@services/*": "./dist/services/*",
    "@repository/*": "./dish/repository/*",
    "@entities/*": "./dist/entities/*",
    "@modules/*": "./dist/modules/*"
}
```

> Typescript 절대경로 예시

<br/>

보통 프로젝트를 진행하며 해당하는 `code convention`에 따라 정해진다.<br/>
`절대경로`를 사용하며 프로젝트를 진행하게 되면 성능상 느린것 등 단점이 있을 수 있지만 유지보수에 용이하다는 장점이 있어 협업에 도움이 된다.<br/>

밑의 표는 `절대경로`/`상대경로`의 장단점을 나타낸 자료이다.<br/>

<br/>

![path.png](./path.png)

<br/>

---

<br/>

## 📚 참고 자료

<br/>

> 견고한 Node.js 프로젝트 설계하기

- <https://softwareontheroad.com/ideal-nodejs-project-structure/>

<br/>

> 모듈화와 MVC 패턴

- <https://velog.io/@jinybear/TIL-6.-%EB%AA%A8%EB%93%88%ED%99%94%EC%99%80-MVC-%ED%8C%A8%ED%84%B4-1>

<br/>
<br/>

```toc

```
