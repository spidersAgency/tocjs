---
layout: post
title: Install and Usage
feature-img: "img/sample_feature_img.png"
---
Download the latest release on Github. And put the script at the bottom of your markup right after jQuery.

<a href="https://github.com/ejointjp/tocjs" class="button">Download on Github</a>

```js
<script src="path/to/jquery.js"></script>
<script src="path/to/tocjs.js"></script>
```
Create an empty container to output the Table of Contents.

```html
<nav class="toc"></nav>
```

Create a container that contains the target articles of the table of contents.

```html
<div class="toc-src">
  <!--

  target article

  -->
</div><!--toc-src-->
```

Run the Plugin.

```js
$('.toc-src').tocjs();
```
