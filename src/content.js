// Selected facts from the user-provided portfolio PDF.
// Image metadata is archived for provenance; images are neither rendered nor deployed.
// Unknown dates, authors, abstracts, and publication links stay empty.
// Source mapping: docs/content-sources.md.

export const site = {
  name: "Jinsung Kim",
  person: "김진성",
  avatar: "assets/avatar.png",
  role: "Autonomous S/W Engineer",
  description:
    "김진성의 자율주행·수중로봇 소프트웨어 포트폴리오. Localization, Sensor Fusion, 경로 추종 제어.",
  email: "kimss6240@gmail.com",
  emailIsPlaceholder: false,
  introduction: "김진성",
  biography: "Localization · Sensor Fusion · Control",
  url: "https://dmdnot.com",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/ranbier",
    },
  ],
  resume: null,
  education: {
    institution: "국민대학교",
    department: "자동차IT융합학과",
    period: "2021.03 ~ 2027.02(졸업예정)",
  },
};

export const homeContent = {
  title: ["Autonomous", "S/W Engineer"],
  description: ["김진성", "Localization · Sensor Fusion · Control"],
  bio: "I develop software for autonomous vehicles and underwater robots, focusing on localization, sensor fusion, and motion control. My work spans ROS-based system integration and real-world testing.",
  image: {
    image: "assets/projects/erp42.png",
    alt: "ERP-42 자율주행 레이싱 프로젝트 차량",
    imageWidth: 637,
    imageHeight: 387,
    cutout: true,
  },
};

export const projects = [
  {
    id: "project-01",
    number: "01",
    title: "ERP-42 자율주행 레이싱",
    subtitle: "Localization · Path Tracking",
    category: "자율주행",
    discipline: "자율주행",
    year: "2025",
    duration: "2025.01 — 2025.07",
    role: "Localization · 경로 추종 제어",
    platform: "ERP-42",
    tags: ["ROS", "C++", "RTK-GNSS", "IMU", "Pure Pursuit", "MPC"],
    featured: true,
    image: "assets/projects/erp42.png",
    alt: "ERP-42 자율주행 레이싱 프로젝트 차량",
    imageWidth: 637,
    imageHeight: 387,
    cutout: true,
    highlights: [
      "RTK-GNSS 위치 추정",
      "Dual GNSS Heading",
      "Pure Pursuit · MPC 경로 추종",
    ],
    award: "2025 자율주행 로봇레이스 1차 대회 · 최우수상",
    media: [
      {
        image: "assets/projects/erp42-tracking.png",
        alt: "ERP-42 경로 추종 결과를 표시한 RViz 화면",
        imageWidth: 373,
        imageHeight: 386,
        cutout: false,
        title: "경로 추종 기록",
        wide: false,
      },
    ],
    sourcePages: [6, 7, 8],
  },
  {
    id: "project-02",
    number: "02",
    title: "실내 1/10 스케일 경로 추종",
    subtitle: "Dead Reckoning · EKF",
    category: "자율주행",
    discipline: "자율주행",
    year: "2024",
    duration: "2024.08 — 2024.10",
    role: "Localization · 경로 추종 제어",
    platform: "1/10 Car",
    tags: ["ROS", "C++", "EKF", "IMU", "Wheel Encoder", "Pure Pursuit"],
    featured: false,
    image: "assets/projects/indoor-car.png",
    alt: "실내 1/10 스케일 자율주행 차량",
    imageWidth: 284,
    imageHeight: 280,
    cutout: true,
    highlights: [
      "IMU · Wheel Odometry 융합",
      "EKF 기반 Dead Reckoning",
      "Pure Pursuit 경로 추종",
    ],
    award: null,
    media: [
      {
        image: "assets/projects/indoor-ekf-path.jpeg",
        alt: "EKF 튜닝으로 획득한 실내 차량 주행 경로",
        imageWidth: 395,
        imageHeight: 348,
        cutout: false,
        title: "EKF 기반 주행 궤적",
        wide: false,
      },
      {
        image: "assets/projects/indoor-pure-pursuit.jpeg",
        alt: "Pure Pursuit를 적용한 실내 차량 경로 추종 결과",
        imageWidth: 556,
        imageHeight: 417,
        cutout: false,
        title: "Pure Pursuit 경로 추종",
        wide: false,
      },
    ],
    sourcePages: [9, 10],
  },
  {
    id: "project-03",
    number: "03",
    title: "MPC5604P DC 모터 제어",
    subtitle: "Speed–Current Cascade PI",
    category: "임베디드",
    discipline: "임베디드",
    year: "2025",
    duration: "2025.09 — 2025.12",
    role: "MCU Peripheral · PI Controller 구현",
    platform: "MPC5604P",
    tags: ["C", "MPC5604P", "PWM", "ADC", "Encoder", "PI Control"],
    featured: false,
    image: "assets/projects/motor-bench.png",
    alt: "MPC5604P 보드와 DC 모터를 연결한 실험 장치",
    imageWidth: 523,
    imageHeight: 376,
    cutout: false,
    highlights: [
      "Speed–Current Cascade PI",
      "PWM · ADC · Encoder",
      "Timer Interrupt 제어 루프",
    ],
    award: null,
    media: [
      {
        image: "assets/projects/motor-response.jpeg",
        alt: "DC 모터 제어 실험의 오실로스코프 측정 화면",
        imageWidth: 483,
        imageHeight: 362,
        cutout: false,
        title: "제어 신호 측정",
        wide: false,
      },
    ],
    sourcePages: [11, 12],
  },
  {
    id: "project-04",
    number: "04",
    title: "Iwakuni Ocean Tech Days 2026",
    subtitle: "Underwater Localization · System Integration",
    category: "수중로봇",
    discipline: "수중로봇",
    year: "2026",
    duration: "2026.01 — 2026.08",
    role: "ROS2 시스템 통합 · DVL Localization",
    platform: "Jetson · Pixhawk",
    tags: ["ROS2", "C++", "MAVROS", "Pixhawk", "DVL", "EKF"],
    featured: true,
    image: "assets/projects/underwater-robot.png",
    alt: "Iwakuni Ocean Tech Days 2026 수중 로봇",
    imageWidth: 501,
    imageHeight: 501,
    cutout: true,
    highlights: [
      "DVL · IMU · Depth Sensor Fusion",
      "ROS2–MAVROS–Pixhawk 통합",
      "수영장 환경 시스템 검증",
    ],
    award: "Iwakuni Ocean Tech Days 2026 · Senior Division 3위",
    media: [
      {
        image: "assets/projects/underwater-localization.jpeg",
        alt: "DVL과 EKF 기반 수중 위치 추정 궤적 비교",
        imageWidth: 405,
        imageHeight: 352,
        cutout: false,
        title: "수중 Localization 추정 궤적",
        wide: false,
      },
      {
        image: "assets/projects/underwater-rviz.jpeg",
        alt: "RViz에 표시된 수중 로봇 위치 추정 궤적",
        imageWidth: 403,
        imageHeight: 459,
        cutout: false,
        title: "RViz 위치 추정 화면",
        wide: false,
      },
      {
        image: "assets/projects/pool-test.jpeg",
        alt: "실제 수영장에서 운용 중인 수중 로봇",
        imageWidth: 584,
        imageHeight: 325,
        cutout: false,
        title: "수영장 통합 테스트",
        wide: true,
      },
    ],
    sourcePages: [13, 14],
  },
];

export const categories = ["All work", "자율주행", "임베디드", "수중로봇"];

export const experience = [
  {
    period: "2024.08 — 2025.12",
    title: "KUUVe",
    organization: "자율주행 동아리 · 주행 팀장",
  },
  {
    period: "2026.01 — 현재",
    title: "KMU-HIT26",
    organization: "수중로봇팀 · 팀장",
  },
];

export const skills = [
  {
    name: "Software",
    items: ["ROS / ROS2", "C / C++", "Python"],
  },
  {
    name: "Localization & Control",
    items: ["EKF · Sensor Fusion", "MPC · Pure Pursuit"],
  },
  {
    name: "Systems",
    items: ["Jetson · Pixhawk"],
  },
  {
    name: "Sensors",
    items: ["DVL", "IMU", "Depth Sensor", "GNSS", "Wheel Encoder"],
  },
];

export const navigation = [
  {
    href: "index.html",
    label: "Home",
    id: "home",
  },
  {
    href: "projects.html",
    label: "Project",
    id: "projects",
  },
  {
    href: "publication.html",
    label: "Publication",
    id: "publication",
  },
  {
    href: "about.html",
    label: "About",
    id: "about",
  },
  {
    href: "contact.html",
    label: "Contact",
    id: "contact",
  },
];

export const publications = [
  {
    id: "publication-01",
    title: "MPC 기반 자율주행 차량의 실시간 최적 회피 경로 생성 방법론",
    displayTitle: "MPC 기반 실시간 최적 회피 경로 생성",
    year: "2025",
    authorRole: "제1저자",
    venue: "한국자동차공학회 춘계학술대회",
    authors: null,
    abstract: null,
    pdf: null,
    doi: null,
    url: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12278744",
    sourcePages: [15],
  },
  {
    id: "publication-02",
    title:
      "Arctangent 함수를 활용한 가변 조향각 변화량 가중치 기반 비선형 모델 예측 제어의 경로 추종 성능 및 주행 안정성 향상 연구",
    displayTitle: "조향각 변화량 가중치 기반 비선형 MPC",
    year: null,
    authorRole: "제2저자",
    venue: null,
    authors: null,
    abstract: null,
    pdf: null,
    doi: null,
    url: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12278312",
    sourcePages: [15],
  },
];
