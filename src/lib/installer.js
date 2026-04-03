const fs = require('fs-extra');
const path = require('node:path');
const { CORE_FILES, STACKS } = require('./manifests/stacks');

/**
 * Filter files based on manifest
 */
async function copyFilteredAgent(sourceDir, targetDir, stackPaths) {
  const allPatterns = [...CORE_FILES, ...stackPaths];
  await fs.ensureDir(targetDir);
  
  const filterFunc = (src, dest) => {
    const relPath = path.relative(sourceDir, src).replace(/\\/g, '/');
    if (relPath === '') return true; // root
    
    return allPatterns.some(pattern => {
      if (pattern.endsWith('/**')) {
        const base = pattern.replace('/**', '');
        return relPath === base || relPath.startsWith(base + '/');
      }
      return relPath === pattern || relPath.startsWith(pattern + '/');
    });
  };

  await fs.copy(sourceDir, targetDir, { filter: filterFunc, overwrite: true });
}

/**
 * Common doc folder setup
 */
async function setupDocs(targetDir) {
  const docsDir = path.join(targetDir, 'docs');
  const docFolders = ['lessons', 'reports', 'plans', 'status', 'tasks', 'logs', 'walkthroughs', 'products'];

  for (const folder of docFolders) {
    const folderPath = path.join(docsDir, folder);
    if (await fs.pathExists(folderPath)) {
      await fs.emptyDir(folderPath);
    } else {
      await fs.ensureDir(folderPath);
    }
    
    await fs.writeFile(
      path.join(folderPath, 'README.md'),
      `# ${folder.toUpperCase()}\n\nThư mục theo chuẩn Pilo Masterkit.\n`
    );
  }
}

/**
 * Inject AI Host templates with interpolation & localization
 */
async function injectAIHost(targetDir, aiHost, config = {}) {
  const templatesRoot = path.join(__dirname, '..', 'templates');
  
  const hostMap = {
    claude: { src: 'claude', files: ['CLAUDE.md'] },
    gemini: { src: 'gemini', files: ['GEMINI.md'] },
    cursor: { src: 'cursor', files: ['pilo-masterkit.mdc'], targetSubDir: '.cursor/rules' },
    github: { src: 'github', files: ['copilot-instructions.md'], targetSubDir: '.github' },
    codex: { src: 'codex', files: ['AGENTS.md'] }
  };

  const hostConfig = hostMap[aiHost];
  if (!hostConfig) return;

  // Prepare variables
  const name = config.agentName || "Pilo";
  const locale = config.locale || 'vi'; // Default to vi
  const isVi = locale === 'vi';
  
  let trigger;
  if (isVi) {
    trigger = `Chào ${name}/Chào AI, Thức dậy đi ${name}/Thức dậy đi AI, Trỗi dậy đi ${name}/AI, Summon ${name}/AI`;
  } else {
    trigger = `Hey ${name}/Hey AI, Wakeup ${name}/Wakeup AI, Trỗi dậy đi ${name}/AI, Summon ${name}/AI`;
  }

  const vars = {
    agentName: name,
    productType: config.type || (isVi ? "Dự án chung" : "General Project"),
    scaleDisplay: config.scope || (isVi ? "Cá nhân" : "Personal Edition"),
    langDisplay: isVi ? 'TIẾNG VIỆT' : 'ENGLISH',
    triggerDisplay: trigger,
    moduleList: [
      "- rules/CORE_RULES.md",
      "- rules/SECURITY_ARMOR.md",
      "- rules/QUALITY_ASSURANCE.md",
      "- rules/COMMUNICATION.md"
    ].join('\n')
  };

  const sourceDir = path.join(templatesRoot, hostConfig.src);
  for (const destFileName of hostConfig.files) {
    // Priority: Localized version (e.g. GEMINI.en.md), then exact match (GEMINI.md)
    let sourceFileName = destFileName;
    if (destFileName.endsWith('.md')) {
        const localizedSource = destFileName.replace('.md', '.' + locale + '.md');
        if (await fs.pathExists(path.join(sourceDir, localizedSource))) {
            sourceFileName = localizedSource;
        }
    }
    
    const srcFile = path.join(sourceDir, sourceFileName);
    const destDir = hostConfig.targetSubDir ? path.join(targetDir, hostConfig.targetSubDir) : targetDir;
    const destFile = path.join(destDir, destFileName);
    
    await fs.ensureDir(destDir);
    if (await fs.pathExists(srcFile)) {
      let content = await fs.readFile(srcFile, 'utf8');
      
      // Perform interpolation
      for (const [key, value] of Object.entries(vars)) {
        const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
        content = content.replace(regex, value);
      }
      
      await fs.writeFile(destFile, content);
    }
  }
}

/**
 * Full install (Profile All)
 */
async function installProfileAll(targetDir) {
  const sourceAgentDir = path.join(__dirname, '..', '..', '.agent');
  const targetAgentDir = path.join(targetDir, '.agent');
  
  if (await fs.pathExists(sourceAgentDir)) {
    await fs.copy(sourceAgentDir, targetAgentDir, { overwrite: true });
  }

  await setupDocs(targetDir);

  const hosts = ['claude', 'gemini', 'cursor', 'github', 'codex'];
  for (const host of hosts) {
    await injectAIHost(targetDir, host, { 
      locale: 'vi', 
      scope: 'Enterprise', 
      type: 'Full-Stack Agentic System', 
      agentName: 'Pilo' 
    });
  }
}

/**
 * Selective install
 */
async function installSelective(config) {
  const { targetDir, stack, aiHost } = config;
  const sourceAgentDir = path.join(__dirname, '..', '..', '.agent');
  const targetAgentDir = path.join(targetDir, '.agent');

  const stacks = Array.isArray(stack) ? stack : [stack];
  const combinedStackPaths = new Set();
  
  for (const s of stacks) {
    const paths = STACKS[s] || [];
    paths.forEach(p => combinedStackPaths.add(p));
  }
  
  await copyFilteredAgent(sourceAgentDir, targetAgentDir, Array.from(combinedStackPaths));
  await setupDocs(targetDir);

  if (aiHost && aiHost !== 'none') {
    await injectAIHost(targetDir, aiHost, config);
  }
}

module.exports = {
  installProfileAll,
  installSelective
};
