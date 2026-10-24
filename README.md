# vestment.in — paradise

[vestment.in](https://vestment.in/) is a financial education website about investing in support of everyday needs, long-term goals, and life beyond our earning years. Its source lives in [in-vestment/paradise](https://github.com/in-vestment/paradise).

The site uses **Jekyll, Liquid, Markdown, HTML, CSS, and JavaScript**, with the Minima theme and the `github-pages` dependency set. GitHub Pages publishes production from `main`, as documented in [AGENTS.md](AGENTS.md).

Read [AGENTS.md](AGENTS.md) before contributing. It defines project safeguards, approval requirements, and the Git workflow. This guide explains how to carry out that workflow.

## 1. Prerequisites

You need:

- Git and a GitHub account.
- VS Code or another editor.
- Ruby and Bundler, with a toolchain for compiling native gems.
- A browser with developer tools for responsive and keyboard testing.

Optional tools include the GitHub CLI (`gh`) and an AI coding assistant. Neither is required; the workflow below uses Git and the GitHub website.

The repository does not pin a Ruby version in a `.ruby-version` file or the `Gemfile`. Use a Ruby/Bundler combination compatible with the resolved `github-pages` dependencies. Do not assume the newest standalone Jekyll release matches GitHub Pages.

### Ubuntu setup

If Ruby is not already managed through a version manager, the Ubuntu packages provide a starting point:

```bash
sudo apt-get update
sudo apt-get install git ruby-full ruby-dev build-essential zlib1g-dev
```

Install Bundler in your user account rather than installing gems with `sudo`:

```bash
gem install --user-install bundler
export PATH="$(ruby -r rubygems -e 'puts Gem.user_dir')/bin:$PATH"
```

Add that `export PATH` line to your shell configuration if needed for future terminals. If you already use a Ruby version manager, follow its gem installation instructions instead. See the official [Jekyll Ubuntu installation guide](https://jekyllrb.com/docs/installation/ubuntu/) for platform prerequisites.

Check your tools:

```bash
git --version
ruby --version
bundle --version
```

On macOS or Windows, follow the corresponding [Jekyll installation instructions](https://jekyllrb.com/docs/installation/). Windows contributors can use Ubuntu through WSL and run these commands there.

## 2. Local development setup

### Clone and install dependencies

With repository access:

```bash
git clone https://github.com/in-vestment/paradise.git
cd paradise
bundle config set --local path vendor/bundle
bundle install
```

The local Bundler configuration goes into `.bundle/`; dependencies go into `vendor/`. Both are ignored by Git. Always use `bundle exec` to run the project's Jekyll version.

`bundle install` can create or update `Gemfile.lock`. That file is not currently tracked or ignored. Leave local lockfile changes unstaged unless dependency work has been explicitly approved. Do not change `Gemfile` to work around an unrelated UI issue.

If you do not have push access, fork the repository on GitHub, clone your fork instead, and configure the original repository as `upstream`:

```bash
git remote add upstream https://github.com/in-vestment/paradise.git
```

For a fork, use `upstream` when fetching production `main` and `origin` when pushing your feature branch. PRs still target `in-vestment/paradise:main`.

### Start the development server

From the repository root:

```bash
bundle exec jekyll serve
```

Open [http://localhost:4000/](http://localhost:4000/). Jekyll rebuilds when source files change; refresh the browser to see the result. Stop the server with `Ctrl+C`. Restart it after changing `_config.yml`.

### Build the site

```bash
bundle exec jekyll build
```

Generated output goes into `_site/`, which is ignored. Edit source files, not generated HTML. A successful build checks rendering; it does not prove that interactions or responsive layouts work.

### Common setup issues

| Symptom | What to check |
| --- | --- |
| `bundle: command not found` | Confirm Bundler is installed and the user gem binary directory is on `PATH`. |
| Permission errors installing gems | Use a user-owned gem directory or Ruby version manager; avoid `sudo bundle install`. |
| Native gem compilation fails | Check Ruby development headers, `build-essential`, `zlib1g-dev`, and the first relevant error in Bundler's output. |
| Ruby or Bundler version conflict | Check dependency error messages and use a compatible Ruby/Bundler environment. Do not upgrade project dependencies without approval. |
| Missing gems | Run `bundle install` from the directory containing `Gemfile`. |
| Port 4000 is occupied | Stop the other server, or run `bundle exec jekyll serve --port 4001` and open `http://localhost:4001/`. |
| No rebuilds in WSL or a mounted directory | Try `bundle exec jekyll serve --force_polling`. |
| Old configuration or styles appear | Restart Jekyll, reload with the browser cache disabled, and check the console and network panel. |
| Metadata or dependency downloads fail | Check network access and the actual error. GitHub metadata may require network access during a build. |
| A new post does not appear | Check its filename/date and front matter. Use `bundle exec jekyll serve --future` only when deliberately previewing future-dated posts. |

## 3. Repository map

| Path | Purpose |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Engineering guidelines and approval boundaries. |
| [Gemfile](Gemfile) | Declares the `github-pages` dependency set. |
| [_config.yml](_config.yml) | Site identity, Minima theme, feed/SEO plugins, and `header_pages`. |
| [index.md](index.md) | Homepage front matter selecting the landing layout. |
| [_layouts/landing.html](_layouts/landing.html) | Homepage content and branding image selection. |
| [_layouts/default.html](_layouts/default.html) | Shared document shell, header/footer includes, stylesheet, and script. |
| [_includes/vestment-header.html](_includes/vestment-header.html) | Preferred shared header and site navigation. |
| [_includes/vestment-footer.html](_includes/vestment-footer.html) | Shared footer. |
| [assets/css/vestment.css](assets/css/vestment.css) | Shared presentation and responsive styles. |
| [assets/js/vestment.js](assets/js/vestment.js) | Shared mobile navigation, header-height tracking, and mobile motion enhancement. |
| [assets/images/](assets/images/) | Local branding animations, posters, and other images. |
| [learn.md](learn.md) | Standalone Learn document with inline lesson styles and JavaScript; includes the shared header and loads shared assets. |
| [blog.md](blog.md), [about.md](about.md), [start-here.md](start-here.md) | Blog listing, About, and introductory content. |
| [_posts/](_posts/) | Blog posts named `YYYY-MM-DD-title.md`. |
| [CNAME](CNAME) | Custom-domain file; leave unchanged outside approved domain work. |

Home follows `index.md` → `landing` → `default`. Blog, About, and posts use Minima's `page`/`post` layouts, which inherit the repository's `default` layout. Learn uses `layout: null`; it does not inherit `default`.

The shared header hardcodes its navigation links. Updating `header_pages` alone does not update that include. For Learn-specific UI bugs, inspect its inline CSS and script before changing shared assets.

[UPDATE_GUIDE.md](UPDATE_GUIDE.md) and [VALIDATION.md](VALIDATION.md) retain historical homepage-update context. Their recorded checks and limitations describe that update, not the current status of your branch.

## 4. Complete software development lifecycle

### Define the change

1. Describe the user-visible problem or desired behavior, scope, and acceptance criteria.
2. Record affected pages, screen sizes, accessibility needs, and behavior that must remain intact.
3. Create a GitHub issue when useful for discussion, a reproducible bug report, or tracking a larger change. Include reproduction steps and screenshots where relevant; link it from the PR.

### Synchronize and create a branch

Check for uncommitted work before switching branches. Preserve existing work rather than discarding it to make a command succeed.

```bash
git status --short
git switch main
git fetch origin
git pull --ff-only origin main
git switch -c fix/short-description
```

If the fast-forward pull fails, investigate the local divergence before proceeding. Do not reset or force-push `main`. For a fork, replace `origin` with `upstream` in the fetch and pull commands.

### Investigate, propose, and implement

Read the relevant layouts, includes, styles, scripts, and content. Identify the root cause before editing. Propose the smallest maintainable change, affected files, regression risks, and validation plan. Obtain the explicit approval required by [AGENTS.md](AGENTS.md), then implement only that scope.

Preserve the shared header, homepage animation, Learn content/search/navigation, Blogs, About, responsive behavior, and accessibility. Avoid unrelated refactoring or dependency changes.

### Test and review locally

Run the checks in [Testing and acceptance criteria](#6-testing-and-acceptance-criteria). Review the entire diff and stage only intended files:

```bash
git status --short
git diff --check
git diff
# Example for a Learn-only change:
git add -- learn.md
git diff --cached --check
git diff --cached
```

Remove accidentally staged files from the index without deleting their local contents:

```bash
git restore --staged -- path/to/file
```

### Commit, push, and open a PR

After explicit approval for these actions, commit reviewed changes and push the feature branch:

```bash
git commit -m "Fix Learn sidebar close button visibility"
git push -u origin fix/short-description
```

On GitHub, open a pull request with base `main` in `in-vestment/paradise` and your feature branch as the source. Use the [PR template below](#7-pull-request-guidelines). For fork contributions, select your fork as the head repository. Do not push directly to production `main`.

### Review and address feedback

Reviewers assess scope, behavior, maintainability, accessibility, validation, and deployment impact. Address feedback on the same feature branch, rerun affected checks, and update the PR description to describe the final implementation. Obtain approval before additional commits and pushes when an assistant performs them.

If `main` changes and the PR needs updating, fetch it and resolve conflicts on the feature branch. Rerun affected validation before requesting review again. Avoid rewriting shared branch history without agreement.

### Squash, merge, and clean up

After review, required checks, and explicit merge approval, use **Squash and merge** in GitHub. Confirm that the PR targets `main` and inspect the resulting commit message. Merging may trigger a production deployment.

After the merge is confirmed, delete the remote feature branch using GitHub's **Delete branch** button, with approval. Do not delete an unmerged branch.

Then synchronize local `main` and remove the local feature branch:

```bash
git switch main
git fetch --prune origin
git pull --ff-only origin main
git branch -d fix/short-description
```

For a fork, fetch/prune your fork's `origin`, and pull production `main` from `upstream`. Keep your fork's default branch synchronized as needed through GitHub's fork controls.

After a squash merge, `git branch -d` may refuse deletion because the original branch commits are not ancestors of the new squash commit. Only after verifying that the intended changes are in `main`, the PR is merged, and no unmerged work remains, use:

```bash
git branch -D fix/short-description
```

Finally verify production as described in [Deployment](#8-deployment). Local cleanup is not evidence of a successful deployment.

## 5. Git workflow conventions

Use descriptive branch names:

| Prefix | Example | Use |
| --- | --- | --- |
| `feat/` | `feat/learn-lesson` | New functionality. |
| `fix/` | `fix/learn-sidebar-close-button` | Bug fixes. |
| `docs/` | `docs/contributor-sdlc-readme` | Documentation. |
| `chore/` | `chore/asset-maintenance` | Approved maintenance. |

Use descriptive commit messages such as `Hide Learn close button outside mobile drawer`. Keep PRs small and focused, never commit directly to `main`, and avoid broad staging commands when unrelated or generated files are present.

A squash merge places a single commit containing the PR's combined changes on `main`; it does not preserve the feature branch's individual commits as separate commits on `main`. This keeps production history easy to scan. Keep the rationale, screenshots, and test evidence in the PR.

Deleting the feature branch does **not** delete the merged PR. Its discussion, reviews, and change history remain on GitHub, and the squash commit remains on `main`. Use the PR as the review record rather than relying on the branch name or expecting each original commit in production history.

## 6. Testing and acceptance criteria

There is no checked-in automated browser test suite or package-based test runner. Use the project build and manual browser checks; if you use extra local tooling, report exactly what ran and do not present it as a repository-provided test suite.

Start with:

```bash
bundle exec jekyll build
git diff --check
```

Acceptance criteria should cover the affected behavior and relevant regressions:

- **Rendering and assets:** build succeeds; local links, images, stylesheets, and scripts resolve; browser console has no new errors.
- **Desktop/mobile:** check 320, 390, 760, 1024, and 1440px as appropriate, plus nearby breakpoints. No unexpected horizontal overflow or inaccessible controls.
- **Navigation/accessibility:** test links, active states, Tab/Shift+Tab, visible focus, Enter/Space activation, Escape, skip links, anchor clearance, and readable labels. Mouse-only testing is insufficient.
- **Shared header changes:** test Home, Learn, Blogs, About, Start here, and a post; scroll each page, open/close the mobile menu, and resize across 759/760px.
- **Learn changes:** test sidebar search, lesson selection, tabs, previous/next controls, lesson fragment URLs, sidebar scrolling, drawer close button, scrim, Escape, and 850/851px transitions.
- **Branding changes or shared assets:** verify homepage animation sources, final appearance, reduced-motion behavior, and navigation without JavaScript.
- **Content changes:** check spelling, formatting, links, titles, dates, and any changed URLs.

Record browser names, viewport widths, commands, expected/actual outcomes, and screenshots when useful. Separate **passed**, **failed**, and **not run** checks. Explain limitations honestly; do not claim physical-device or screen-reader coverage from desktop viewport emulation.

Review acceptance criteria again after deployment. A local build does not validate production routing, deployment status, or browser caching.

## 7. Pull request guidelines

Choose a title that names the concrete change, for example **Hide Learn sidebar close button on desktop**. Explain the problem, resulting behavior, affected files, and why the solution is appropriately scoped. Include validation evidence and screenshots for UI changes, ideally showing desktop and mobile behavior.

Link the issue when one exists. Use `Closes #123` only if merging should close that issue. Document tests that were not run and any remaining risks. Reviewers should be able to assess the change without reading an assistant conversation.

Copy this description and replace every placeholder:

```markdown
## Summary

- Problem and reproduction steps:
- Root cause:
- Resulting behavior and reason for this approach:
- Issue: (link, or none)

## Changed files

- `path/to/file`: purpose of the change.

## Validation

- [ ] `bundle exec jekyll build`
- [ ] `git diff --check`
- [ ] Internal links and assets checked
- [ ] Desktop/mobile and relevant breakpoint checks
- [ ] Keyboard/accessibility checks
- [ ] Relevant regression checks

Browsers and viewport sizes:
Passed:
Failed:
Not run, with reasons:

## Screenshots

Desktop/mobile before and after, or explain why not applicable.

## Risks and deployment

Known limitations, production verification steps, and recovery considerations.
```

Check boxes only for checks actually completed. Submit for human review; resolve feedback and required checks before a maintainer approves and performs the squash merge. Repository-specific branch protections and reviewer requirements should be checked in GitHub rather than assumed.

## 8. Deployment

Project policy identifies `main` as the GitHub Pages production source. A merge updates `main` and can trigger production deployment; merge approval must account for that effect. There is no custom `.github/workflows/` configuration checked into this repository. The live Pages source/folder and deployment state are repository settings, not fully verifiable from these files.

Maintainers can inspect **Settings → Pages** without changing it and inspect the relevant Pages deployment in **Actions** or the repository's deployment view. See GitHub's [publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Do not change Pages settings, `CNAME`, DNS, or hosting as part of an unrelated change.

After merging:

1. Confirm the PR is merged and identify the resulting commit on `main`.
2. Confirm the Pages build/deployment completed successfully for that commit. A merge alone is not a successful deployment.
3. Open [vestment.in](https://vestment.in/) and the affected URL directly. Reload with cache disabled if necessary and compare against the acceptance criteria.
4. Smoke-test Home, Learn, Blogs, About, navigation, and relevant desktop/mobile interactions. Check links, assets, scrolling, and console errors.
5. Record production validation in the PR, including any checks not performed.

If production validation fails, first establish whether the problem is in deployment, cached assets, or the change itself. Record the failure and notify the maintainer through the agreed project channel. For a small correction, create a new `fix/` branch from current `main`, validate it, and submit a follow-up PR. For a regression requiring rollback, propose a revert PR for the squash commit using GitHub's Revert flow when available, or a reviewed `git revert` on a new branch. Obtain approval before committing, pushing, opening the PR, merging, or deploying. Do not reset or force-push production history. Verify the recovery deployment afterward.

## 9. Using AI coding assistants

Codex is the project's current development assistant. Contributors may also use Claude Code, Copilot, another assistant, or manual development; no assistant subscription is required to contribute.

Give assistants [AGENTS.md](AGENTS.md), the requirement, scope, acceptance criteria, and explicit boundaries. Ask them to investigate and propose a plan before implementation, then approve the scope before edits. Request an exact diff and evidence of executed validation.

Commits, pushes, PR creation, merges, branch deletion, and deployment require explicit human approval under the project guidelines. Permission to edit or test does not imply permission to publish. Humans remain responsible for understanding and reviewing generated code, testing behavior, and deciding whether a change is ready to ship. Do not accept invented test results or tool claims.

## 10. Example: fix the Learn sidebar close button

**Problem:** the × close button appears in the normal desktop sidebar. It should appear only in the open mobile drawer.

**Investigation:** in `learn.md`, the default `.learn-page .sidebar .close` hide rule was inside `@media(max-width:850px)`, so it did not apply above 850px. The smallest approved fix moves that default rule outside the media query and preserves `.learn-page .sidebar.open .close` inside it. No HTML, JavaScript, or shared-header change is needed.

### Before the GitHub UI merge

This is a reusable example. If the branch already exists, choose a new descriptive branch name rather than overwriting it. For a fork, adapt remotes as described above.

```bash
# Start with a clean working tree and current production source.
git status --short
git switch main
git fetch origin
git pull --ff-only origin main
git switch -c fix/learn-sidebar-close-button

# Read AGENTS.md, investigate learn.md, propose the CSS move, and obtain approval.
# Edit learn.md only, then validate the approved change.
bundle exec jekyll build
bundle exec jekyll serve
# Open http://localhost:4000/learn/ and perform the checks below.
# Stop the server with Ctrl+C before continuing in this terminal.
git diff --check
git diff -- learn.md
git status --short

# After explicit approval to stage, commit, and push:
git add -- learn.md
git diff --cached --check
git diff --cached
git commit -m "Hide Learn sidebar close button outside mobile drawer"
git push -u origin fix/learn-sidebar-close-button
```

Before committing, verify desktop at 1024/1440px; drawer behavior at 320/390/760/850px; and the transition at 851px. Test opening, ×, Escape, scrim clicks, keyboard access, search, lesson navigation, and scrolling. Include results in the PR.

**On GitHub:** after approval, open the PR targeting `main`, address review feedback, obtain merge approval, and choose **Squash and merge**. Confirm it merged. With approval, delete the remote feature branch using **Delete branch**. Do not run the cleanup commands below while the PR is still open.

### After the GitHub UI merge

```bash
git switch main
git fetch --prune origin
git pull --ff-only origin main
git log -5 --oneline
git branch -d fix/learn-sidebar-close-button
```

If the final command refuses deletion after a squash merge, inspect the merged PR and the file on `main`. Only after confirming that all intended work is present and no unmerged work remains, run this alternative:

```bash
git branch -D fix/learn-sidebar-close-button
```

Verify the Pages deployment and [the production Learn page](https://vestment.in/learn/) using the same desktop/mobile acceptance criteria. Record the outcome in the PR.
