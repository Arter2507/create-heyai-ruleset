#!/usr/bin/env node

const { intro, outro, select, text, spinner, cancel, isCancel } = require('@clack/prompts');
const pc = require('picocolors');
const path = require('node:path');
const installer = require('../lib/installer');

async function main() {
  intro(pc.bgMagenta(pc.white(' 🚀 Pilo Masterkit Installer v2.0 ')));

  const targetDir = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : process.cwd();

  const language = await select({
    message: 'Chọn ngôn ngữ / Select language:',
    options: [
      { value: 'vi', label: 'Tiếng Việt', hint: 'Khuyên dùng' },
      { value: 'en', label: 'English' },
    ],
  });
  if (isCancel(language)) { cancel('Đã hủy cài đặt.'); return process.exit(0); }

  const scale = await select({
    message: 'Chọn quy mô dự án:',
    options: [
      { value: 'instant', label: 'Instant', hint: 'MVP nhanh gọn tập trung frontend' },
      { value: 'creative', label: 'Creative', hint: 'Nghiên cứu sandbox full tính năng' },
      { value: 'enterprise', label: 'SME Enterprise', hint: 'Ổn định vận hành clean code' },
    ],
  });
  if (isCancel(scale)) { cancel('Đã hủy cài đặt.'); return process.exit(0); }

  const productType = await select({
    message: 'Chọn loại sản phẩm / Product type:',
    options: [
      { value: 'app_web', label: 'Ứng dụng người dùng (App, Web, Mobile, Desktop)' },
      { value: 'dev_tool', label: 'Dev Tool (CLI, Library, API)' },
      { value: 'ai_agent', label: 'AI Agent (Chatbot, Automation)' },
      { value: 'digital_asset', label: 'Digital Asset (Game, Template, Media...)' },
    ],
  });
  if (isCancel(productType)) { cancel('Đã hủy cài đặt.'); return process.exit(0); }

  const agentName = await text({
    message: 'Đặt tên cho Agent (Tùy chọn, mặc định "Pilo"):',
    placeholder: 'Pilo',
    defaultValue: 'Pilo',
  });
  if (isCancel(agentName)) { cancel('Đã hủy cài đặt.'); return process.exit(0); }

  const s = spinner();
  s.start('Đang chuẩn bị không gian làm việc sạch (Clean State) và cài đặt tài liệu...');

  try {
    const config = {
      targetDir,
      language,
      scale,
      productType,
      agentName: agentName || 'Pilo',
    };
    await installer.install(config);

    s.stop(pc.green('Hoàn tất cấu hình Pilo Masterkit!'));

    outro(pc.cyan(`🎉 Masterkit đã được khởi tạo sạch sẽ tại: ${targetDir}`));
    console.log(pc.white('\n👉 Các bước tiếp theo để bắt đầu:'));
    console.log(`1. Đọc file ${pc.bold(pc.yellow('GEMINI.md'))} đính kèm ở thư mục root.`);
    console.log(`2. Workspace của bạn đã sẵn sàng tại ${pc.bold(pc.green('docs/'))} với 8 thư mục trống sạch sẽ.`);
    console.log(`3. Mọi dữ liệu cũ đã được dẹp bỏ, hãy làm mới trải nghiệm cùng Agent.\n`);

  } catch (err) {
    s.stop('Quá trình thiết lập bị lỗi.');
    console.error(pc.red('\nLỗi:'), err.message);
    process.exit(1);
  }
}

main().catch(console.error);
