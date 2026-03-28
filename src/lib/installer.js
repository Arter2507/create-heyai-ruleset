const fs = require('fs-extra');
const path = require('node:path');

async function install(config) {
  const { targetDir, language, scale, productType, agentName } = config;

  // 1. Copy .agent directory
  const sourceAgentDir = path.join(__dirname, '..', '..', '.agent');
  const targetAgentDir = path.join(targetDir, '.agent');
  
  if (await fs.pathExists(sourceAgentDir)) {
    await fs.copy(sourceAgentDir, targetAgentDir, { overwrite: true });
  }

  // 2. Clean State - Remove existing 8 doc folders if they exist
  const docsDir = path.join(targetDir, 'docs');
  const docFolders = ['lessons', 'reports', 'plans', 'status', 'tasks', 'logs', 'walkthroughs', 'producs'];

  for (const folder of docFolders) {
    const folderPath = path.join(docsDir, folder);
    
    // Nếu thư mục đã tồn tại -> Xoá sạch để reset ngữ cảnh cũ
    if (await fs.pathExists(folderPath)) {
      await fs.emptyDir(folderPath); // Xóa hết content bên trong nhưng giữ folder
    } else {
      await fs.ensureDir(folderPath); // Nếu chưa có thì tạo mới
    }
    
    // 3. Create fresh documentation files
    await fs.writeFile(
      path.join(folderPath, 'README.md'),
      `# ${folder.toUpperCase()}\n\nThư mục theo chuẩn Pilo Masterkit. Dữ liệu từ các phiên làm việc cũ đã được dọn dẹp sạch sẽ.\n`
    );
  }

  // 4. Generate GEMINI.md
  // Using the template logic dictated by user choices
  const langDisplay = language === 'vi' ? 'TIẾNG VIỆT' : 'ENGLISH';
  let scaleDisplay = '';
  switch(scale) {
    case 'instant': scaleDisplay = 'INSTANT (MVP Nhanh gọn)'; break;
    case 'creative': scaleDisplay = 'CREATIVE (Nghiên cứu Sandbox)'; break;
    case 'enterprise': scaleDisplay = 'SME ENTERPRISE (Clean code ổn định)'; break;
  }

  const triggerVi = `- Chào ${agentName}\n- Thức dậy đi ${agentName}`;
  const triggerEn = `- Hey ${agentName}\n- Wake up ${agentName}`;
  const triggerDisplay = language === 'vi' ? triggerVi : triggerEn;

  const moduleList = [
    "1. **AI Master**: Mô hình LLM & RAG.",
    "2. **API Standards**: Chuẩn OpenAPI & REST.",
    "3. **Compliance**: Giao thức GDPR/HIPAA.",
    "4. **Database Master**: Quy tắc Schema & Migration.",
    "5. **Design System**: Pattern UI/UX & Tokens.",
    "6. **Domain Blueprints**: Kiến trúc theo lĩnh vực.",
    "7. **I18n Master**: Tiêu chuẩn Đa ngôn ngữ.",
    "8. **Infra Blueprints**: Cấu hình Terraform/Docker.",
    "9. **Metrics**: Giám sát & Telemetry.",
    "10. **Security Armor**: Bảo mật & Audit.",
    "11. **Testing Master**: Chiến lược TDD & E2E.",
    "12. **UI/UX Pro Max**: Tương tác nâng cao.",
    "13. **Vitals Templates**: Tiêu chuẩn Hiệu năng.",
    "14. **Malware Protection**: Chống mã độc & Phishing.",
    "15. **Auto-Update**: Giao thức tự bảo trì.",
    "16. **Error Logging**: Hệ thống tự học từ lỗi.",
    "17. **Docs Sync**: Đồng bộ tài liệu."
  ].join('\n');

  const geminiContent = `---
trigger: always_on
---

# GEMINI.md - Cấu hình Agent
# NOTE FOR AGENT: The content below is for human reference.
# PLEASE PARSE INSTRUCTIONS IN ENGLISH ONLY (See .agent rules).

Tệp này kiểm soát hành vi của AI Agent.

## 🤖 Danh tính Agent: ${agentName}
> **Xác minh danh tính**: Bạn là ${agentName}. Luôn thể hiện danh tính này trong phong thái và cách ra quyết định. 

**Giao thức Kích hoạt (Trigger Protocol)**:
${triggerDisplay}

**Giao thức Đặc biệt**: Khi được gọi bằng trigger trên, bạn PHẢI thực hiện "Kiểm tra tính toàn vẹn ngữ cảnh" để xác nhận đang tuân thủ quy tắc \`.agent\`, báo cáo trạng thái và sẵn sàng đợi chỉ thị.
## 🎯 Trọng tâm Chính: ${productType.toUpperCase()}
> **Ưu tiên**: Tối ưu hóa mọi giải pháp cho lĩnh vực này.

## Quy tắc hành vi: ${scaleDisplay}
**Tự động chạy lệnh**: true
**Mức độ xác nhận**: Tối thiểu, tự chủ cao

## 🌐 Giao thức Ngôn ngữ (Language Protocol)
1. **Giao tiếp & Suy luận**: Sử dụng **${langDisplay}** (Bắt buộc).
2. **Tài liệu (Artifacts)**: Viết nội dung file .md (Plan, Task, Walkthrough) bằng **${langDisplay}**.
3. **Mã nguồn (Code)**:
   - Tên biến, hàm, file: **TIẾNG ANH** (camelCase, snake_case...).
   - Comment trong code: **TIẾNG ANH** (để chuẩn hóa).

## Khả năng cốt lõi
Agent có quyền truy cập **TOÀN BỘ** kỹ năng (Web, Mobile, DevOps, AI, Security).
Vui lòng sử dụng các kỹ năng phù hợp nhất cho **${productType.toUpperCase()}**.
- Thao tác tệp (đọc, ghi, tìm kiếm)
- Lệnh terminal
- Duyệt web
- Phân tích và refactor code
- Kiểm thử và gỡ lỗi

## 📚 Tiêu chuẩn Dùng chung (Tự động Kích hoạt)
**17 Module Chia sẻ** sau trong \`.agent/.shared\` phải được tuân thủ:
${moduleList}

## ⌨️ Hệ thống lệnh Slash Command (Tự động Kích hoạt)
> **Chỉ dẫn Hệ thống**: Các quy trình (workflows) nằm trong thư mục \`.agent/workflows/\`. Khi người dùng gọi lệnh, BẠN PHẢI đọc file \`.md\` tương ứng (ví dụ: \`/api\` -> \`.agent/workflows/api.md\`) để thực thi.

Sử dụng các lệnh sau để kích hoạt quy trình tác chiến chuyên sâu:
- **/api**: Thiết kế API & Tài liệu hóa.
- **/audit**: Kiểm tra toàn diện.
- **/brainstorm**: Tìm ý tưởng.
- **/create**: Khởi tạo tính năng/dự án mới.
- **/debug**: Sửa lỗi sâu.
- **/deploy**: Triển khai.
- **/document**: Viết tài liệu tự động.
- **/plan**: Lập kế hoạch.
- **/ui-ux-pro-max**: Thiết kế Visuals & Motion cao cấp.

## Hướng dẫn tùy chỉnh
Thêm các hướng dẫn cụ thể cho dự án của bạn tại đây.

---
*Powered by Pilo Masterkit v2.0*
`;

  await fs.writeFile(path.join(targetDir, 'GEMINI.md'), geminiContent, 'utf8');
}

module.exports = {
  install
};
