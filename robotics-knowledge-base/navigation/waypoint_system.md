# Waypoint System

## 목적

재사용 가능한 경로 관리 시스템 구축

## 설계 방향

- 기존 코드 리팩토링이 아니라 완전 재설계
- WaypointManager 중심 구조
- 다른 노드에서 쉽게 사용 가능

## 핵심 클래스

```cpp
class WaypointManager {
public:
    int findClosestWaypoint(const Pose&);
    std::vector<Pose> extractLocalPath(int start_index, int size);
    Pose getWaypoint(int index);
};
```

## 주요 기능

1. Closest Waypoint 탐색
현재 위치 기준 가장 가까운 waypoint 반환

2. Local Path 생성
일정 길이의 경로를 잘라서 제공

3. Loop 지원
경로 끝에서 시작으로 자동 연결

## 설계 의도

- Planner와 Controller 분리
- 경로 데이터 접근 단순화
- 실시간 처리 가능 구조

## 핵심 인사이트

경로 자체보다 중요한 것은 경로를 어떻게 사용하는가이다.
