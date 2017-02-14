# TocJS

A jQuery plugin that automatically create a table of contents of the article.

## Overview

Based on the headings tag (h1 - 6) of the article, the plugin automatically creates the table of contents.

There are functions such as selection of heading target tag (h1-6), display / non - display of table of contents number, exclusion setting and so on.

## Sample

[View Sample](https://ejointjp@github.io/tocjs/2017/02/14/sample.html);



## Install and Usage

Download the latest release.
Put the script at the bottom of your markup right after jQuery:

```
<script src="path/to/jquery.js"></script>
<script src="path/to/tocjs.js"></script>
```

Create an empty container to output the table of contents.

```
<nav class="toc"></nav>
```

Create a container that contains the target articles of the table of contents.

```
<div class="toc-src">
  <!--

  target article

  -->
</div><!--toc-src-->
```

Run the Plugin.

```
$('.toc-src').tocjs();
```

## Options

```
$('.toc-src').toc({
  excludes: 'toc-exclude',
  headingNumber: true,
  headings: 'h2, h3',
  includes: '',
  min: 4,
  output: '.toc',
  title: 'Contents',
  titleElement: 'h2'
  tocNumber: true,
});
```

|Property|Default|Sample|Description|
|---|---|---|---|
|excludes|toc-exclude (string)||Headings of this class are excluded. If more than one is specified, separate them with blanks or commas .|
|headingNumber|true (bool)||Display number in heading|
|headings|h2, h3 (string)|h2, h3, h4|Specify the heading elements to be included in the table of contents, separated by commas.|
|includes|'' (string)|.toc-include|Of the elements specified by [headings], only the elements of the class specified here are subject to the table of contents.|
|min|4 (int)||Specify the minimum number of headings to display the table of contents.|
|output|.toc (string)||Specify elements to display the table of contents.|
|title|Contents (string)||Title character of table of contents.|
|titleElement|h2 (string)||Tag of table of contents title.|
|tocNumber|true (bool)||Display Number in Table of contents.|
