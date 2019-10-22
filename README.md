# `./package.json`

### line:18
Node.js Server와의 HTTP 통신을 위해 Proxy를 설정함

# `./poke-site-server/api/api.util.js`

### line:4-10
Error 메시지를 출력하는 fetch 함수를 정의하였음

# `./poke-site-server/api/index.js`
API 요청을 통해 807종에 달하는 포켓몬 정보와 타입, 서식지 정보를 저장하기 위한 라우터

### line:18-32
포켓몬의 Habitat(서식지)에 대한 정보를 저장하기 위한 라우터로, 먼저 DB 내에 서식지에 대한 정보가 아직 저장되지 않았는지 판단 후, API요청 작업을 수행함

### line:34-44
fetch를 통해 가져온 배열 타입의 서식지 정보를 매핑하고, DB에 저장하는 함수로, async-await를 통해 정보 입력이 완료되기까지 대기한 후 다음 작업을 수행

### line:46-72
포켓몬의 Type(타입)에 대한 정보를 저장하기 위한 라우터로, 로직은 서식지 정보 업데이트 라우터와 동일함

### line:74
포켓몬의 정보를 저장하기 위한 라우터

### line:75-78
포켓몬 도감 번호 순으로 저장하기 위해 1-900에 해당하는 배열을 생성하고 이를 매핑하면서 Insert 작업 수행

### line:80
API를 통한 포켓몬 정보 요청 과정에서 responseError가 없는 데이터만을 추출하여 서식지, 타입 정보 Insert 작업을 수행

### line:92
DB에 해당 포켓몬이 이미 존재하는지 먼저 판단 후 다음 작업 수행

### line:104
API구조 상 첫 번째 URI에는 포켓몬의 한글 이름 정보가 존재하지 않으므로 다른 URL로 변경, 포켓몬 번호를 인자로 전달한 URI의 names 9 번째 요소에 한글 이름 정보가 존재함

### line:119
Promise의 배열을 정의하고, 순차적으로 작업을 수행

### line:123-157
responseError가 존재하지 않는 pokeIdList를 인자로 전달받아 서식지 정보를 Insert하는 작업을 수행, 마찬가지로 Promise의 배열로 정의하고 순차적으로 수행

### line:159-191
responseError가 존재하지 않는 pokeIdList를 인자로 전달받아 타입 정보를 Insert하는 작업을 수행, 마찬가지로 Promise의 배열로 정의하고 순차적으로 수행

### line:192
모든 작업이 완료되면 홈페이지로 redirect함

# `./poke-site-server/class/Database.js`
Node.js 서버에서 database connection을 Promise로 처리하기 위해 정의한 클래스

# `./poke-site-server/class/query.js`
성격 테스트를 통해 비슷한 유형의 포켓몬을 도출하기 위한 query 작성

### line:1-26
7가지의 Boolean 타입 변수를 전달받아, Boolean값에 매칭되는 서식지와 타입을 Habitat,Type테이블에서 각각 가져오고, poke_info 테이블과 Habitat, Type테이블을 각각 연결하는 poke_habitat, poke_type에서 포켓몬 도감 번호를 가져옴, 최종적으로 해당하는 도감번호의 포켓몬 정보를 가져옴

### line:28-44
서식지 정보가 존재하지 않는 포켓몬도 있기 때문에, 2^7가지의 경우의 수에 매칭되지 않는 경우도 있음, 그 경우는 Type에 해당하는 2^4가지의 경우의 수로만 판단

# `./poke-site-server/user/user.util.js`
user폴더는 Front-end와의 HTTP 통신을 위한 로직이 정의되어 있음

### line:5-15
param으로 전달되는 값이 양의 정수인지, 최대 페이지 수보다 큰지를 판단하여 boolean 값으로 return

### line:17-27
JOIN문을 활용하여 포켓몬의 서식지와 타입 정보를 가져오는 쿼리, WHERE 문법에서 도감 번호를 기준으로 OFFSET, LIMIT을 정의하였지만, OFFSET과 LIMIT문법을 활용한 형태로도 작성 가능

### line:35-48
포켓몬 이름 검색 시 활용하는 함수로, 해당하는 이름의 포켓몬이 DB에 존재하는 지 판단하여 boolean값을 return

### line:50-62
포켓몬의 이름을 통해 정보를 가져오는 쿼리

# `./poke-site-server/user/index.js`

### line:12
Page에 따른 포켓몬의 정보를 응답하기 위한 라우터

### line:13-15
한 페이지 당 20 종씩, DB에 저장된 포켓몬의 갯수를 구하여 최대 페이지 갯수를 구하기 위한 로직

### line:17-18
Client에서 전달받은 Param에 Error가 있는 지를 boolean값으로 저장

### line:20-29
paramError가 true면 Error메세지를, false면 포켓몬의 정보를 응답

### line:33
Client로부터 전달받은 문자열과 매칭되는 포켓몬의 정보를 응답하기 위한 라우터

### line:37-45
paramError가 true면 Error메시지를, false면 포켓몬의 정보를 응답

### line:50
Client로부터 전달받은 7개의 Boolean값을 통해 DB요청을 하기 위한 라우터

### line:63-66
2^7개의 경우의 수 중 매칭되는 정보가 없다면 Type에 해당하는 2^4개의 경우의 수만을 고려하여 탐색

# `./poke-site-server/util/index.js`
공통 유틸을 정의한 파일

### line:1-7
Offset과 Limit을 전달하면, 해당하는 정수의 배열을 return


