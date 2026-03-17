# IMU

IMU는 orientation과 acceleration 추정의 기반이 되는 핵심 센서다.

하지만 bias와 noise가 누적되기 쉽기 때문에 단독 사용만으로는 안정적인 위치 추정이 어렵다.

실제 시스템에서는 다음과 같이 본다.

- 고주기 입력 제공
- prediction 단계에서 중요
- drift 누적 가능성 높음
- 다른 센서와의 융합이 필수
