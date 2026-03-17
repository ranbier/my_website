# AUV System

수중 환경에서는 GPS 사용이 제한되고 센서 노이즈와 drift가 누적되기 쉽다.

따라서 AUV 시스템 설계에서는 다음이 중요하다.

- DVL과 IMU 기반 dead reckoning
- 제한적인 외부 기준 센서 활용
- 안정적인 estimation과 control 루프 유지

핵심은 완벽한 위치 추정보다, 불완전한 정보를 견디는 시스템 구조를 만드는 것이다.
