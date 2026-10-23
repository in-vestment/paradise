# Validation

Checked on 23 October 2026 against repository commit
`1dc4955e4bd8c355530e9abf289fca22aec8390b`.

Passed:

- Original `_posts/2026-10-22-hello-world.md`, `blog.md`, `about.md`,
  `_config.yml`, and `CNAME` match the repository byte for byte.
- Liquid layouts rendered with strict filter checking, Jekyll-compatible
  includes, and the current post data. Root-domain and `/paradise` base URLs
  were checked.
- JavaScript syntax and `git diff --check` passed.
- All local links and image/script/stylesheet references in the rendered
  homepage, Blog, About, introduction, and existing post resolve.
- Chromium browser checks at widths 320, 390, 759, 760, and 1440 pixels:
  no horizontal overflow, no broken visible images, no JavaScript errors.
- Mobile menu opens, closes with Escape, navigates to Blogs, and opens
  The White Rabbit with its original text.
- At each mobile width, the animation ends with visible `.in`, hidden `in`
  prefix, no visible tagline, and no running wordmark animation.
- Reduced-motion mode and navigation without JavaScript checked.
- Desktop and mobile full-page screenshots inspected for spacing and layout.
- The included desktop GIF is 1920 × 1080 and plays once. All WebP assets decode.

Limitation:

A full Ruby/Jekyll build could not be run in this environment because Ruby and
Bundler are not installed, and package installation was unavailable. Liquid
rendering and real-browser checks are not a substitute for the final Jekyll
build. Run `bundle install && bundle exec jekyll build` locally, or inspect the
GitHub Pages build after uploading. No deploy or repository push was performed.
