# Jinsung Kim — 김진성 포트폴리오

제공된 포트폴리오 PDF의 관련 사실만 선택해 담은 정적 사이트입니다. 본문은 사진 없이 제목·짧은 키워드 중심으로 구성하고, 공통 로고에는 사용자가 지정한 원형 사진을 표시합니다. 본문은 최대 760px의 가운데 열에 배치하고 상단 메뉴는 화면 양옆까지 넓힙니다. 넓은 화면에서도 콘텐츠가 가로로 늘어나지 않습니다.

## 실행

Node.js 20 이상이 필요합니다. 외부 패키지 설치 없이 실행합니다.

```bash
npm run dev      # 개발 서버
npm run build    # dist/ 생성
npm run preview  # 빌드 후 정적 서버
npm run check    # 빌드 및 구조·링크·콘텐츠 테스트
```

`index.html`은 공통 템플릿입니다. 개발 서버나 빌드된 `dist/`를 정적 서버로 실행하세요. 클라우드의 localhost 대신 아래 배포 주소에서 확인할 수 있습니다.

## 페이지

| 탭           | 주소                                    | 내용                                                   |
| ------------ | --------------------------------------- | ------------------------------------------------------ |
| Home         | `/index.html`                           | 이름·직무·핵심 분야, 짧은 영문 소개                    |
| Project      | `/projects.html`                        | 프로젝트 4개의 최신순 카드 그리드, 분야 필터           |
| Project 상세 | `/project-01.html` ~ `/project-04.html` | 기간·담당·플랫폼, 핵심 작업 제목, 수상 이력            |
| Publication  | `/publication.html`                     | DBpia로 연결되는 논문 제목·저자 역할, 정식 제목 펼치기 |
| About        | `/about.html`                           | 이름·직무·학력 기간, 최신순 팀 활동, Skills·Sensors    |
| Contact      | `/contact.html`                         | 아이콘이 있는 이메일·GitHub 카드, 이메일 복사          |

추가로 `404.html`을 생성하며 이전 URL 리다이렉트는 유지합니다.

## 파일과 콘텐츠

- `src/content.js`: 사이트·프로젝트·논문·활동·기술 데이터
- `src/components.js`: 내비게이션, 텍스트 프로젝트 목록, 논문 등 공통 컴포넌트
- `src/pages.js`: 페이지 구성과 프로젝트 상세 템플릿
- `styles.css`: 가운데 열과 다크·라이트 테마, 반응형 스타일
- `theme.js`: CSS 이전에 저장된 테마 적용
- `app.js`: 테마, 필터, 모바일 메뉴, 이메일 복사
- `scripts/build.mjs`: 정적 페이지 생성. 공개 자산은 폰트·favicon·원형 로고만 복사
- `tests/site.test.mjs`: 구조·링크·확장·브랜드·논문·사진 제외 검증
- `docs/content-sources.md`: 원문 페이지와 반영 기준

프로젝트는 `projects` 배열에서 관리합니다. `id`는 고유한 영문 소문자·숫자·하이픈으로 지정합니다. `highlights`에는 핵심 작업 제목만 기록합니다. Home에는 짧은 영문 소개를 표시하며 다른 탭의 목록이나 링크를 반복하지 않습니다. 프로젝트 목록과 상세 페이지의 이전·다음 링크는 같은 최신순을 사용합니다. 첫 항목에는 이전 링크, 마지막 항목에는 다음 링크를 표시하지 않으며 순환하지 않습니다. 팀 활동도 최근 시작한 순서로 표시합니다. 목록·상세·다음 프로젝트 링크는 함께 생성됩니다.

이전의 사진 데이터와 `assets/projects/`는 출처 기록으로 소스에만 남깁니다. 본문과 배포 파일에는 포함하지 않습니다. 별도로 지정한 `assets/avatar.png`만 공통 원형 로고로 사용합니다. `sections`를 추가할 경우 텍스트만 표시하며, 미디어 블록은 출력하지 않습니다.

논문의 정식 제목은 `title`, 화면용 표제는 `displayTitle`, 저자 역할은 `authorRole`, 외부 원문 링크는 `url`입니다. 확인되지 않은 연도·발행처·초록·링크는 `null`로 두어 표시하지 않습니다.

## 테마와 접근성

Contact 오른쪽의 해·달 버튼으로 테마를 전환합니다. 모바일에서는 메뉴 버튼 옆에 표시합니다. 저장된 선택이 없으면 운영체제의 다크·라이트 설정을 따르며, 사이트를 열어 둔 상태의 시스템 변경도 반영합니다. 버튼으로 직접 고른 테마는 저장하고 시스템 설정보다 우선합니다. 저장된 선택을 삭제하면 다시 시스템 설정을 따릅니다. 저장소가 차단되어도 시스템 설정과 현재 페이지의 직접 전환은 동작합니다.

하단 영역은 화면 아래에 고정하고 실제 높이만큼 본문 여백을 확보합니다. 화면 크기나 글꼴로 하단 높이가 바뀌면 여백도 갱신하며, 복사 알림은 그 위에 표시합니다. 키보드 포커스, 모바일 메뉴의 포커스 순환과 Escape 닫기, reduced motion을 지원합니다. 논문 정식 제목은 JavaScript 없이도 펼쳐 볼 수 있습니다. 폰트는 로컬 자산입니다.

## 배포

https://form-engineering-p7m4v2.fairyhinny33.chatgpt.site

Sites 연결은 `.openai/hosting.json`에 보관합니다. 정적 디렉터리는 `dist`입니다. 소스·문서·원본 PDF·보관된 사진·기존 `robotics-knowledge-base/`는 배포하지 않습니다. 기존 비공개 접근 범위를 유지합니다.


## GitHub · Cloudflare 운영 배포

운영 주소는 https://dmdnot.com 입니다. GitHub 저장소는 `ranbier/my_website`이며, 운영 브랜치는 `main`입니다. 기존 Cloudflare Workers Git 연동의 서비스 이름 `dmdnot-website`를 유지합니다.

`wrangler.jsonc`의 `build.command`가 `npm run build`를 실행한 뒤 `dist/`만 정적 자산으로 배포합니다. 저장소의 `index.html`은 템플릿이므로 빌드 없이 루트를 직접 배포하지 않습니다. `dist/`는 Git에서 제외하며 Cloudflare 빌드 환경에서 생성합니다.

기존 Cloudflare 서비스에 연결된 도메인과 DNS 설정은 그대로 사용합니다. GitHub의 `Workers Builds: dmdnot-website` 체크에서 해당 커밋의 배포 결과를 확인할 수 있습니다.
