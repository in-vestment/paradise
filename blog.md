---
layout: page
title: Blog
permalink: /blog/
---
# Blog Posts

<ul>
  {% for post in site.posts %}
  <li>
    <span class="post-meta">{{ post.date | date: "%b %d, %Y" }}</span> -
    <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
  </li>
  {% endfor %}
</ul>
