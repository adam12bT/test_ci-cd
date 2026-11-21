# TestMart - Lab 5 Part 2 (GitHub adaptation)

The original lab uses GitLab. This version uses GitHub Actions for CI and GitHub Pages for deployment. Confirm that your instructor accepts this platform substitution.

## Run on GitHub

1. Put the contents of this folder at the root of your GitHub repository, including `.github`.
2. In Settings > Pages, select **GitHub Actions** as the source.
3. Push to the default branch. Open Actions > Test and deploy TestMart.
4. The `test` job compiles Java and runs seven JUnit/Selenium tests. `deploy` runs only after successful tests on the default branch. Pull requests run tests only.
5. The deployment job exposes the published website URL. Download `test-logs` for evidence.

The supplied `.gitlab-ci.yml` is retained as original lab material; GitHub uses `.github/workflows/test-and-deploy.yml`.

## Final changes

- Headless Chrome options required by the lab; safe teardown if browser creation fails.
- Added `TestingSignUpEmptyPassword`.
- Sign-up success now verifies login using the newly created account.
- Cart test now verifies absence after removal and reopening the cart.
- Account test reopens the account page and verifies both saved name and phone.
- The original correct `shop.js` and home-page title are preserved in this final version.

The unused search/product helper exercises in the starter are from Part 1; the Part 2 PDF does not request them.

## Experiment evidence

See `LAB_REPORT.txt` for answers and the exact mutations to demonstrate. Run each experiment as a separate commit, wait for its workflow, and save its URL before fixing it. Do not present the expected outcomes as observed results.

## Local verification status

Java 17 and Chrome are installed locally. The local network could not reach github.com to download Selenium, so the Java/Selenium suite has not yet run. The workflow installs Java 21 and downloads the dependencies on GitHub. A successful Actions run is still required.

GitHub Pages workflow reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
