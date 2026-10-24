# Vestment Engineering Guidelines

## Project

- Website: https://vestment.in
- Repository: https://github.com/in-vestment/paradise
- Stack: Jekyll, GitHub Pages, HTML, CSS, JavaScript.
- Production is deployed from the `main` branch.
- Preserve existing website functionality and content.

## Architecture

- Prefer existing Jekyll layouts and includes over duplicated markup.
- Maintain consistent navigation and branding across all pages.
- Keep desktop and mobile experiences functional.
- Preserve the homepage branding animation.
- Preserve Learn lessons, navigation, sidebar search, and blog content.
- Avoid introducing new frameworks or dependencies without approval.

## Development Process

1. Understand the requirement and inspect the relevant code.
2. Explain the root cause or current architecture.
3. Propose a minimal implementation plan.
4. Wait for explicit approval before editing files.
5. Implement only the approved scope.
6. Validate the changes and report results.
7. Present the diff for review.

## Change Management

- Keep changes small, focused, and reviewable.
- Do not modify unrelated files.
- Do not rewrite working functionality unnecessarily.
- Do not alter domain, DNS, hosting, or deployment configuration without approval.
- Do not modify `Gemfile.lock` unless explicitly requested.
- Preserve accessibility and responsive behavior.

## Testing

For relevant changes:

- Run `bundle exec jekyll build`.
- Run `git diff --check`.
- Validate internal links and assets.
- Test desktop and mobile layouts.
- Check navigation, scrolling, anchors, and keyboard interactions.
- Test Learn-specific functionality when modifying Learn.
- Check homepage animation when modifying shared styles or scripts.
- Report which tests passed, failed, or were not run.
- Never claim a test passed unless it was executed.

## Git and GitHub Workflow

- Start changes from an up-to-date `main`.
- Use a descriptive feature branch.
- Never commit directly to `main`.
- Do not commit, push, create PRs, merge, delete branches,
  or deploy without explicit user approval.
- Stage only approved files.
- Use descriptive commit messages.
- Create pull requests targeting `main`.
- Prefer squash merges after review.
- Keep the PR history as the record of each change.

## Communication

- Explain proposed changes before implementation.
- State assumptions, risks, and tradeoffs.
- Prefer simple solutions over unnecessary complexity.
- Summarize changed files and validation results.
- Ask for clarification when requirements are ambiguous.
