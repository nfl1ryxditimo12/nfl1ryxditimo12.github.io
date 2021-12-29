---
emoji: 2️⃣
title: Node.js Typescript 설정
date: '2021-12-29 01:25:00'
author: seongsu
tags: Node.js Express Typescript
categories: Node.js Express
---

![typescript.jpeg](./typescript.jpeg)

<br/>

## 🧢 Typescript

`Javescript`를 사용하며 프로젝트를 진행했을 때 규모가 커질 수록 클래스 기반 객체지향 언어 `Java`, `C++`, `C#` 등에 익숙한 개발자에게 혼란을 야기할 수 있다.<br/>
이유는 단지 `Javascript`가 동적 타입 언어이기 때문이며 이의 문제를 극복하고자 정적 타입 언어인 `Typescript`를 도입하게 되었다.<br/>

> 애초에 언어가 잘 정제되기 전에 서두른 출시와 웹페이지의 보조적인 기능을 수행하던 `Javascript`의 태생적 한계이기도 하다.

<br/>

![typescript-superset.png](./typescript-superset.png)

> Typescript superset

<br/>

`TypeScript`는 `ES5`의 `Superset`이므로 기존의 `ES5` 문법을 그대로 사용할 수 있다. 또한, `ES6`의 새로운 기능들을 사용하기 위해 `Babel`과 같은 별도 `Transpiler`를 사용하지 않아도 `ES6`의 새로운 기능을 기존의 자바스크립트 엔진(현재의 브라우저 또는 Node.js)에서 실행할 수 있다.

이후 `ECMAScript`의 업그레이드에 따른 새로운 기능을 지속적으로 추가할 예정이여서 매년 업그레이드될 `ECMAScript`의 표준을 따라갈 수 있는 좋은 수단이 될 것이다.

<br/>
<br/>

## ⚙️ Setting

<br/>

먼저 `Typescript`를 설치해야한다 아래와 같이 `yarn`또는 `npm`을 통해 설치해 준다.

```
$ npm install -g typescript
또는
$ yarn global add typescript
```

<br/>
<br/>

`Typescript`컴파일은 `tsc`라는 명령어를 사용한다.
먼저 `init`명령어를 사용하여 `tsconfig.json`파일을 생성해준다.

```
$ tsc --init
```

> `tsconfig.json`파일은 프로젝트 루트임을 나타내며<br/>
> 프로젝트 컴파일에 필요한 루트 파일과 컴파일러 옵션을 지정한다

<br/>
<br/>

처음 생성된 `tsconfig.json`파일은 몇개 빼고 전부 주석처리가 되어있다.<br/>
맨 밑에 나와있는 옵션 설명을 보고 필요한 옵션만 사용하면 된다.

> 기본 설정된 옵션으로 연습해도 괜찮다.

<br/>
<br/>

그 뒤 `package.json`파일에서 `script`설정을 해줘야 한다.<br/>
먼저 `nodemon`과 `ts-node`를 설치해 주자

```
$ npm install --save-dev nodemon ts-node
또는
$ yarn add --dev nodemon ts-node
```

<br/>
<br/>

설치가 끝났으면 `package.json`에 다음과 같이 설정해준다.

```JSON
{
    "script": {
        "start": "nodemon --exec ts-node src/app.ts"
    },
}
```

<br/>
<br/>

이제 `Express`서버를 세팅한 후 `npm start` 또는 `yarn start`를 하면 바로 `Typescript`로 실행되는 프로젝트 설정이 끝이다..!

<br/>
<br/>

## 💭 Typescript 컴파일 옵션

<details>
<summary style="color: red">스압 주의</summary>
<div markdown="1">

```JSON
{
    /* https://aka.ms/tsconfig.json 를 방문하면 해당 파일에 대한 더 많은 정보를 얻을 수 있습니다. */
    // 옵션은 아래와 같은 형식으로 구성되어 있습니다.
    // "모듈 키": 모듈 값 /* 설명: 사용가능 옵션 (설명이 "~ 여부"인 경우 'true', 'false') */

    /* 기본 옵션 */
    "incremental": true, /* 증분 컴파일 설정 여부 */
    "target": "es5", /* 사용할 특정 ECMAScript 버전 설정: 'ES3' (기본), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 혹은 'ESNEXT'. */
    "module": "commonjs", /* 모듈을 위한 코드 생성 설정: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "lib": [], /* 컴파일에 포함될 라이브러리 파일 목록 */
    "allowJs": true, /* 자바스크립트 파일 컴파일 허용 여부 */
    "checkJs": true, /* .js 파일의 오류 검사 여부 */
    "jsx": "preserve", /* JSX 코드 생성 설정: 'preserve', 'react-native', 혹은 'react'. */
    "declaration": true, /* '.d.ts' 파일 생성 여부. */
    "declarationMap": true, /* 각 '.d.ts' 파일의 소스맵 생성 여부. */
    "sourceMap": true, /* '.map' 파일 생성 여부. */
    "outFile": "./", /* 단일 파일로 합쳐서 출력합니다. */
    "outDir": "./", /* 해당 디렉토리로 결과 구조를 보냅니다. */
    "rootDir": "./", /* 입력 파일의 루트 디렉토리(rootDir) 설정으로 --outDir로 결과 디렉토리 구조를 조작할 때 사용됩니다. */
    "composite": true, /* 프로젝트 컴파일 여부 */
    "tsBuildInfoFile": "./", /* 증분 컴파일 정보를 저장할 파일 */
    "removeComments": true, /* 주석 삭제 여부 */
    "noEmit": true, /* 결과 파일 내보낼지 여부 */
    "importHelpers": true, /* 'tslib'에서 헬퍼를 가져올 지 여부 */
    "downlevelIteration": true, /* 타겟이 'ES5', 'ES3'일 때에도 'for-of', spread 그리고 destructuring 문법 모두 지원 */
    "isolatedModules": true, /* 각 파일을 분리된 모듈로 트랜스파일 ('ts.transpileModule'과 비슷합니다). */

    /* 엄격한 타입-확인 옵션 */
    "strict": true, /* 모든 엄격한 타입-체킹 옵션 활성화 여부 */
    "noImplicitAny": true, /* 'any' 타입으로 구현된 표현식 혹은 정의 에러처리 여부 */
    "strictNullChecks": true, /* 엄격한 null 확인 여부 */
    "strictFunctionTypes": true, /* 함수 타입에 대한 엄격한 확인 여부 */
    "strictBindCallApply": true, /* 함수에 엄격한 'bind', 'call' 그리고 'apply' 메소드 사용 여부 */
    "strictPropertyInitialization": true, /* 클래스의 값 초기화에 엄격한 확인 여부 */
    "noImplicitThis": true, /* 'any' 타입으로 구현된 'this' 표현식 에러처리 여부 */
    "alwaysStrict": true, /* strict mode로 분석하고 모든 소스 파일에 "use strict"를 추가할 지 여부 */

    /* 추가적인 확인 */
    "noUnusedLocals": true, /* 사용되지 않은 지역 변수에 대한 에러보고 여부 */
    "noUnusedParameters": true, /* 사용되지 않은 파라미터에 대한 에러보고 여부 */
    "noImplicitReturns": true, /* 함수에서 코드의 모든 경로가 값을 반환하지 않을 시 에러보고 여부 */
    "noFallthroughCasesInSwitch": true, /* switch문에서 fallthrough 케이스에 대한 에러보고 여부 */

    /* 모듈 해석 옵션 */
    "moduleResolution": "node", /* 모듈 해석 방법 설정: 'node' (Node.js) 혹은 'classic' (TypeScript pre-1.6). */
    "baseUrl": "./", /* non-absolute한 모듈 이름을 처리할 기준 디렉토리 */
    "paths": {}, /* 'baseUrl'를 기준으로 불러올 모듈의 위치를 재지정하는 엔트리 시리즈 */
    "rootDirs": [], /* 결합된 컨텐츠가 런타임에서의 프로젝트 구조를 나타내는 루트 폴더들의 목록 */
    "typeRoots": [], /* 타입 정의를 포함할 폴더 목록, 설정 안 할 시 기본적으로 ./node_modules/@types로 설정 */
    "types": [], /* 컴파일중 포함될 타입 정의 파일 목록 */
    "allowSyntheticDefaultImports": true, /* default export이 아닌 모듈에서도 default import가 가능하게 할 지 여부, 해당 설정은 코드 추출에 영향은 주지 않고, 타입확인에만 영향을 줍니다. */
    "esModuleInterop": true, /* 모든 imports에 대한 namespace 생성을 통해 CommonJS와 ES Modules 간의 상호 운용성이 생기게할 지 여부, 'allowSyntheticDefaultImports'를 암시적으로 승인합니다. */
    "preserveSymlinks": true, /* symlik의 실제 경로를 처리하지 않을 지 여부 */
    "allowUmdGlobalAccess": true, /* UMD 전역을 모듈에서 접근할 수 있는 지 여부 */

    /* 소스 맵 옵션 */
    "sourceRoot": "", /* 소스 위치 대신 디버거가 알아야 할 TypeScript 파일이 위치할 곳 */
    "mapRoot": "", /* 생성된 위치 대신 디버거가 알아야 할 맵 파일이 위치할 곳 */
    "inlineSourceMap": true, /* 분리된 파일을 가지고 있는 대신, 단일 파일을 소스 맵과 가지고 있을 지 여부 */
    "inlineSources": true, /* 소스맵과 나란히 소스를 단일 파일로 내보낼 지 여부, '--inlineSourceMap' 혹은 '--sourceMap'가 설정되어 있어야 한다. */

    /* 실험적 옵션 */
    "experimentalDecorators": true, /* ES7의 decorators에 대한 실험적 지원 여부 */
    "emitDecoratorMetadata": true, /* decorator를 위한 타입 메타데이터를 내보내는 것에 대한 실험적 지원 여부 */

    /* 추가적 옵션 */
    "skipLibCheck": true, /* 정의 파일의 타입 확인을 건너 뛸 지 여부 */
    "forceConsistentCasingInFileNames": true /* 같은 파일에 대한 일관되지 않은 참조를 허용하지 않을 지 여부 */

}

```

> 출처: https://geonlee.tistory.com/214 [빠리의 택시 운전사]

</div>
</details>

<br/>
<br/>

## 📚 참고 자료

> TypeScript 소개와 개발 환경 구축

- https://poiemaweb.com/typescript-introduction

<br/>

> TypeScript-Handbook

- https://typescript-kr.github.io/

<br/>
<br/>

```toc

```
