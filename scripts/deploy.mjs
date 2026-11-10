// Publishes dist/ to the gh-pages branch (served at /live/).
// The legacy portfolio lives in gh-pages/legacy/ (deployed from the
// `legacy-portfolio` branch), so it is excluded from the files removed here.
import ghpages from 'gh-pages';
import { execSync } from 'node:child_process';

const sha = execSync('git rev-parse --short HEAD').toString().trim();

ghpages.publish(
  'dist',
  {
    nojekyll: true,
    remove: ['**/*', '!legacy/**'],
    message: `Deploy ${sha}`,
  },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log('Published');
  },
);
