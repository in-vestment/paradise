# Vestment homepage update

Prepared for `in-vestment/paradise`, branch `main`, starting at commit
`1dc4955e4bd8c355530e9abf289fca22aec8390b`.

## Apply the update

1. Download and unzip `vestment-homepage-update.zip`.
2. Copy **the files and folders inside it** into the root of your existing
   `paradise` repository, preserving their paths. Replace `index.md` when asked.
   Merge folders rather than deleting existing folders.
3. Commit the changes to the branch used by GitHub Pages. Keep your existing
   GitHub Pages source settings and custom domain.
4. Open `https://vestment.in/` after the GitHub Pages build finishes. Reload once
   with your browser cache disabled if you still see the old homepage.

The ZIP is an update overlay, not a replacement repository. Keep your existing
`_posts/`, `blog.md`, `about.md`, `_config.yml`, `CNAME`, and any other files.
Those original files are deliberately not included, so this update cannot
replace them. No repository changes have been pushed or deployed for you.

## What is included

- `index.md`: switches the homepage to the new landing layout.
- `_layouts/landing.html`: responsive homepage and actual latest-post listings.
- `_layouts/default.html`: shared shell used by the new homepage and Minima's
  existing page/post layouts; SEO and feed tags are retained.
- `_includes/vestment-header.html`: Home, Start here, Explore, **Blogs**, and About
  navigation, including an accessible mobile menu.
- `_includes/vestment-footer.html`: actual site contact email, Blog, About, RSS.
- `assets/css/vestment.css`: desktop, mobile, article, and reduced-motion styles.
- `assets/js/vestment.js`: mobile navigation and one-pass mobile animation.
- `assets/images/`: the approved Full HD GIF, static poster, and optimized mobile
  image crops. All assets are local; no CDN or account connection is required.
- `start-here.md`: a new short introductory page, separate from existing posts.
- `Gemfile`: optional local development using the GitHub Pages dependency set.
- `.gitignore`: excludes local build output and caches.

## Animation and responsive behavior

At **760px and wider**, the page displays the approved 1920 × 1080 animated GIF.
It plays once and settles on the larger, lighter final brand with no tagline.

Below **760px**, the banner is rearranged into readable HTML: animated branding,
a four-stage pipeline, and a two-by-two grid of goals. The wordmark runs once,
returns to `vestment.in`, removes the taglines, and holds. The mobile timing is
implemented in CSS rather than squeezing the desktop GIF onto a narrow screen.
The menu opens with a button, closes after navigation, and supports Escape.

Visitors requesting reduced motion receive the static final desktop poster or
static final mobile wordmark. Without JavaScript, content, links, the mobile
navigation, and the final mobile brand remain available. The animation is the
only optional enhancement.

No autoplay audio, tracking scripts, web fonts, or external JavaScript libraries
are included. Desktop animation is selected through `<picture>` so phones do
not download the large GIF. Image width/height attributes reserve layout space.

## Blogs and future posts

The existing `/blog/` page, About page, post Markdown, and post URLs remain
unchanged. Minima continues to provide the `page` and `post` layouts. The shared
shell applies the new navigation and typography without rewriting post content.

The homepage lists up to three actual posts from `site.posts`. Adding another
Markdown file to `_posts/` automatically updates both the homepage and Blog.
No fictional articles, subscriber forms, placeholder privacy page, or sample
reading-time counts have been added. The four topic cards expand to brief
introductions and link to real pages.

## Local preview

With Ruby and Bundler installed:

```sh
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000/`.

For a build check:

```sh
bundle exec jekyll build
```

Relative URL filters are used for internal links and local assets, so Jekyll's
`baseurl` is respected if you later use a project URL instead of the custom
root domain. Keep your existing `_config.yml` for vestment.in.

## Verification

See `VALIDATION.md` for the checks run on this package and the build limitation.
