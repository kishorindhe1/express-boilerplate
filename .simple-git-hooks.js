/** @type {import('simple-git-hooks').GitHooks} */
const hooks = {
  'pre-commit': 'npm run lint-staged',
  'commit-msg': 'npx commitlint --edit $1',
  'pre-push': 'npm run type-check && npm test', // adjust if you don’t have tests yet
};

export default hooks;
