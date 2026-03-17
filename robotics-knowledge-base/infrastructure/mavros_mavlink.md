# MAVROS / MAVLink

## 역할

ROS와 FCU(Pixhawk)를 연결

## 데이터 흐름

센서 -> FCU -> MAVLink -> MAVROS -> ROS

## 핵심

FCU는 센서 데이터를 활용해 다음을 수행한다.

- 자세 안정화
- 비행 및 항행 제어

MAVROS는 상위 소프트웨어 스택과 비행 제어기 사이의 중요한 브리지다.
