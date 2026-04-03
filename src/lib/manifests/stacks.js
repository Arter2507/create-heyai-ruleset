/**
 * Project Stack Manifest for Pilo Masterkit
 * Defines which .agent files to include based on user's project stack.
 */

const CORE_FILES = [
  'rules/CORE_RULES.md',
  'rules/SECURITY_ARMOR.md',
  'rules/QUALITY_ASSURANCE.md',
  'rules/CLEAN_CODE.md',
  'skills/clean-code/**',
  'skills/ck/**',
  'skills/plan-writing/**',
  'skills/brainstorming/**',
  'skills/context-budget/**',
  'skills/verification-loop/**',
  'skills/systematic-debugging/**',
  'workflows/plan.md',
  'workflows/debug.md',
  'workflows/test.md',
  'workflows/status.md',
  'workflows/brainstorm.md',
  'contexts/**', // Core contexts like identity, soul, etc.
  'agents/personas/**', // All personas are core in .agent
];

const STACKS = {
  typescript: [
    'skills/frontend-patterns/**',
    'skills/nextjs-react-expert/**',
    'skills/tailwind-patterns/**',
    'skills/testing-patterns/**',
    'skills/e2e-testing/**',
    'skills/coding-standards/**',
    'skills/nestjs-patterns/**',
    'skills/bun-runtime/**',
  ],
  python: [
    'skills/python-patterns/**',
    'skills/python-testing/**',
    'skills/django-patterns/**',
    'skills/django-security/**',
    'skills/django-tdd/**',
    'skills/django-verification/**',
    'skills/pytorch-patterns/**',
  ],
  cpp: [
    'skills/cpp-coding-standards/**',
    'skills/cpp-testing/**',
  ],
  java: [
    'skills/java-coding-standards/**',
    'skills/springboot-patterns/**',
    'skills/springboot-security/**',
    'skills/springboot-tdd/**',
    'skills/springboot-verification/**',
    'skills/jpa-patterns/**',
  ],
  kotlin: [
    'skills/kotlin-patterns/**',
    'skills/kotlin-testing/**',
    'skills/kotlin-coroutines-flows/**',
    'skills/kotlin-exposed-patterns/**',
    'skills/kotlin-ktor-patterns/**',
    'skills/android-clean-architecture/**',
    'skills/compose-multiplatform-patterns/**',
  ],
  go: [
    'skills/golang-patterns/**',
    'skills/golang-testing/**',
  ],
  rust: [
    'skills/rust-patterns/**',
    'skills/rust-pro/**',
    'skills/rust-testing/**',
  ],
  laravel: [
    'skills/laravel-patterns/**',
    'skills/laravel-security/**',
    'skills/laravel-tdd/**',
    'skills/laravel-verification/**',
    'skills/laravel-plugin-discovery/**',
  ],
  mobile: [
    'skills/dart-flutter-patterns/**',
    'skills/flutter-dart-code-review/**',
    'skills/swiftui-patterns/**',
    'skills/swift-actor-persistence/**',
    'skills/swift-concurrency-6-2/**',
    'skills/swift-protocol-di-testing/**',
    'skills/mobile-design/**',
  ],
  ai_agentic: [
    'skills/claude-api/**',
    'skills/claude-devfleet/**',
    'skills/agent-harness-construction/**',
    'skills/autonomous-agent-harness/**',
    'skills/autonomous-loops/**',
    'skills/continuous-agent-loop/**',
    'skills/agentic-engineering/**',
    'skills/gan-style-harness/**',
    'skills/mcp-builder/**',
    'skills/mcp-server-patterns/**',
  ],
  marketing_research: [
    'skills/market-research/**',
    'skills/deep-research/**',
    'skills/exa-search/**',
    'skills/brand-voice/**',
    'skills/content-engine/**',
    'skills/crosspost/**',
    'skills/lead-intelligence/**',
    'skills/social-graph-ranker/**',
    'skills/investor-materials/**',
    'skills/investor-outreach/**',
  ]
};

module.exports = {
  CORE_FILES,
  STACKS
};
