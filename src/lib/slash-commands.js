const fs = require('fs-extra');
const path = require('node:path');

/**
 * Scan .agent/workflows for .md files
 */
async function getAvailableWorkflows() {
  const workflowsDir = path.join(__dirname, '..', '..', '.agent', 'workflows');
  if (!(await fs.pathExists(workflowsDir))) return [];
  
  const files = await fs.readdir(workflowsDir);
  return files
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
}

const CATEGORIZED_SLASH = {
  core: ['plan', 'status', 'debug', 'test', 'brainstorm', 'aside'],
  development: ['create', 'enhance', 'build-fix', 'code-review', 'tdd', 'e2e', 'ui-ux-pro-max'],
  knowledge: ['docs', 'init-docs', 'clean-memory', 'learn', 'learn-eval', 'rules-distill'],
  automation: ['orchestrate', 'deploy', 'preview', 'sessions', 'save-session', 'resume-session'],
  advanced: ['prp-plan', 'prp-implement', 'santa-loop', 'skill-create', 'agent-eval']
};

module.exports = {
  getAvailableWorkflows,
  CATEGORIZED_SLASH
};
