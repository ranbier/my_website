# System Architecture

## 전체 흐름

Sensor -> State Estimation -> Planning -> Control -> Actuation

## 구성 요소

### 1. Sensor Layer

- IMU
- DVL
- GPS

### 2. Estimation Layer

- EKF (Pixhawk / ROS)

### 3. Planning Layer

- Waypoint System
- Path Generation

### 4. Control Layer

- PID / MPC

## 핵심 포인트

- 모든 레이어는 느슨하게 결합
- 센서 교체 가능 구조
- 실시간 처리 고려
