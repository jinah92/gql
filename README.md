<h1>Graphql 맛보기</h1>

## Structed Query Language(sql)이 구조적 차이

1.  목적

- sql은 데이터베이스 시스템에 저장된 데이터를 효율적으로 가져오는 것
- gql은 웹 클라이언트가 데이터를 서버로부터 효율적으로 가져오는 것

2. 작성/호출 시점

- sql : 서버
- gql : 클라이언트

## REST API와의 차이

### 1. Endpoint

- REST API는 URL/Method 등을 조합하기 때문에 다양한 Endpoint가 존재한다.
- gql API는 단 하나의 Endpoint가 존재한다.

### 2. 쿼리

- REST API는 각 Endpoint 마다 데이터베이스 SQL 쿼리가 달라짐
- gql API는 gql 스키마 타입마다 데이터베이스 SQL 쿼리가 달라짐

## typeDef(s)

GraphQL Schema를 정의하는 곳

- Object
- Query
- Mutation
- Input

gql과 Tagged Template Literals로 작성한다

## resolver(s)

Schema에 해당하는 구현을 하는 곳
요청을 받아 데이터를 조회, 수정, 삭제

### Mutation Type

GraphQL에서 데이터를 쓰는 API와 같은 호출방법
