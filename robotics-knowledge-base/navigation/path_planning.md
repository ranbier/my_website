# Path Planning

Path planning의 핵심은 목적지까지 가는 한 줄의 경로를 찾는 것이 아니라, 현재 상태와 제약조건 안에서 추종 가능한 경로를 만드는 것이다.

중요한 고려 요소는 다음과 같다.

- 현재 위치와 heading
- waypoint 간 연결 방식
- local path 추출 범위
- controller가 따라갈 수 있는 곡률

계획과 제어는 분리되어야 하지만, 완전히 독립적으로 보면 실제 시스템에서 어긋난다.
