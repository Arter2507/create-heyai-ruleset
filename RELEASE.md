# 🚀 Pilo Masterkit - Version Controlled by Semantic Release

## 💎 Highlights
Phiên bản 2.1.0 (hoặc cao hơn) là một bước tiến lớn trong trải nghiệm người dùng, mang lại sự linh hoạt tối đa cho các dự án đa ngôn ngữ và AI Host đa dạng.

### 🍱 CLI UI/UX 2.0 (Pro Edition)
... (GIỮ PHẦN HIGHLIGHTS CŨ) ...

---

## 🛠️ Quy trình Phát hành (Automated Release)

Dự án này sử dụng **`semantic-release`** để tự động hóa hoàn toàn việc đánh số phiên bản và phát hành lên NPM/GitHub.

### 1. Commit đúng quy chuẩn (Conventional Commits)
Sử dụng các tiền tố sau trong lời nhắn commit (Commit Message):
- `feat:` -> Tự động tăng phiên bản **Minor** (Ví dụ: 2.0.0 -> 2.1.0).
- `fix:` -> Tự động tăng phiên bản **Patch** (Ví dụ: 2.1.0 -> 2.1.1).
- `feat!:` hoặc có đoạn `BREAKING CHANGE:` ở footer -> Tự động tăng phiên bản **Major** (Ví dụ: 1.2.2 -> 2.0.0).

### 2. Push lên nhánh `main`
Khi bạn `git push origin main`, GitHub Actions sẽ tự động:
- Kiểm tra mã nguồn.
- Chạy `semantic-release`.
- Tự động tạo Tag `vX.Y.Z`.
- Tự động cập nhật `CHANGELOG.md`.
- Tự động phát hành lên **NPM** và **GitHub Release**.

> **Lưu ý**: Tuyệt đối không tự sửa `version` trong `package.json` hoặc tự đánh `git tag` thủ công để tránh xung đột hệ thống.

---
© 2026 Pilo Masterkit - Orchestrating the future with discipline and soul.
