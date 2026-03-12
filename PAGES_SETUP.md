# ⚠️ 404 해결: GitHub Pages 설정 필수

## 오류 원인
```
Failed to create deployment (status: 404)
Ensure GitHub Pages has been enabled
```

**빌드는 성공**했지만, **Pages가 활성화되지 않아** 배포가 실패했습니다.

---

## 해결 방법 (1분)

### 1. Pages 설정 페이지 열기
**https://github.com/js97lee/yakgwa-web/settings/pages** 접속

### 2. Source 설정
- **Build and deployment** 섹션
- **Source** 드롭다운 클릭
- **GitHub Actions** 선택

![Source 선택](이미지 없음 - GitHub Actions 선택)

### 3. 완료
설정 즉시 저장됩니다.  
이후 푸시할 때마다 자동 배포됩니다.

---

## 재배포 트리거 (선택)

설정 후 기존 커밋으로 다시 배포하려면:
- **Actions** 탭 → **Deploy to GitHub Pages** → **Run workflow** 클릭

또는 아무 파일이나 수정해서 푸시해도 됩니다.

---

## 배포 완료 후
**https://js97lee.github.io/yakgwa-web/** 에서 확인

---
*Last deploy trigger: 2026-03-13*
