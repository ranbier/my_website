# Sensor Fusion

## 사용 센서

- IMU (Pixhawk)
- DVL
- GPS

## 문제

- GPS는 저주기
- Controller는 고주기
- 수중에서는 GPS 사용 불가

## 해결

### 1. EKF 사용

state = [position, velocity, orientation]

### 2. Prediction

센서 공백을 모델로 보완

### 3. Dead Reckoning

DVL + IMU 기반 위치 추정

drift는 필연적으로 발생한다.

## Pixhawk vs ROS EKF

| 항목 | Pixhawk | ROS |
|------|--------|-----|
| 안정성 | 높음 | 중간 |
| 유연성 | 낮음 | 높음 |

## 결론

- 기본은 Pixhawk EKF
- 필요 시 ROS EKF 추가
