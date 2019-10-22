# ./package.json

### line:18
Node.js Server와의 HTTP 통신을 위해 Proxy를 설정함

# ./poke-site-server/api/api.util.js

### line:4-10
Error 메시지를 출력하는 fetch 함수를 정의하였음

# ./poke-site-server/api/index.js
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


