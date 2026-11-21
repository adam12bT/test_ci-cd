# TestMart - Lab 5 Part 2 (completed GitHub adaptation)

CS 428 Software Quality & Testing. GitHub username: **adam12bT**.

- [Completed report (PDF)](Lab5-Part2-Completed-Report.pdf)
- [Report text](LAB_REPORT.txt)
- [Printable HTML report](LAB_REPORT.html)
- [Actual experiment results](evidence/results.json)
- [Live TestMart](https://adam12bt.github.io/test_ci-cd/)
- [Actions workflows](https://github.com/adam12bT/test_ci-cd/actions)

All twelve experiment runs were executed as separate commits: headless setup,
login bug/fix, title bug/fix, empty-password bug/missing test/fix, and three
persistence/removal bugs with weak tests, strengthened tests, and fixes.
The report includes commit links, workflow results, the actual failing test
names, runner logs, and independent Selenium checks of the published site.

The final implementation is restored. Seven JUnit tests verify title, valid and
invalid login, persisted signup, refusal of an empty password, actual cart
removal, and persisted account edits. Headless Chrome runs on GitHub's runner.

## CI/CD

`.github/workflows/test-and-deploy.yml` runs tests on pushes and pull requests.
Deployment depends on passing tests and only runs on the default branch.
GitHub Pages is enabled with GitHub Actions as its publishing source.
The starter `.gitlab-ci.yml` is retained for reference; GitHub does not run it.

The original lab requests GitLab. This repository uses GitHub at the student's
request; instructor acceptance of that substitution has not been verified.
Unused search/product helper exercises in the starter belong to Part 1 and
are outside the supplied Part 2 lab requirements.

Published browser checks use the standalone `evidence/PublishedSiteProbe.java`
against the live HTTPS site and disposable browser-local test data.

GitHub workflow reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
