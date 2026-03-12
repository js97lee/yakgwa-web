# GitHub Pages 배포 가이드

## 1단계: GitHub Pages 설정

1. https://github.com/js97lee/yakgwa-web 접속
2. **Settings** → **Pages** (왼쪽 메뉴)
3. **Source**에서 **GitHub Actions** 선택

## 2단계: 푸시

터미널에서:

```bash
cd "/Users/jisulee/[대상] 약과/yakgwa-web"
git push origin main
```

- Username: `js97lee`
- Password: GitHub **새 토큰** (토큰 발급 시 **workflow** 체크 필수)

## 3단계: 배포 확인

1. https://github.com/js97lee/yakgwa-web/actions 에서 워크플로우 실행 확인
2. 1~2분 후 https://js97lee.github.io/yakgwa-web/ 접속

---

### 문제 발생 시

| 증상 | 해결 |
|------|------|
| 404 | Settings → Pages → Source가 **GitHub Actions**인지 확인 |
| push 실패 | 토큰에 **workflow** 권한 있는지 확인 |
| Actions 빨간 X | Actions 탭에서 에러 로그 확인 |
