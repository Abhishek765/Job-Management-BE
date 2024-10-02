const Configuration = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ['@commitlint/cli', '@commitlint/config-conventional'],
  /*
   * Any rules defined here will override rules from @commitlint/config-conventional
   */
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert'
      ]
    ]
  }
};

module.exports = Configuration;
