# GitHub 배포 가이드

## 1. GitHub 저장소 생성

1. https://github.com/new 접속
2. Repository name: **yakgwa-web**
3. Public 선택
4. **Create repository** 클릭 (README, .gitignore 추가하지 않음)

## 2. 푸시

저장소 생성 후 아래 명령어 실행 (사용자명을 본인 GitHub 아이디로 변경):

```bash
cd "/Users/jisulee/[대상] 약과/yakgwa-web"
git remote add origin https://github.com/사용자명/yakgwa-web.git
git push -u origin main
```

## 3. GitHub Pages 설정

1. 저장소 **Settings** → **Pages**
2. **Source**: GitHub Actions 선택
3. 푸시하면 자동으로 배포 실행

## 4. 배포 완료 후

몇 분 후 접속: `https://사용자명.github.io/yakgwa-web/`
