---
layout: post
title: Getting more efficient with our Ruby on Rails projects
permalink: /lean-development/ruby-on-rails-efficiency-convention-over-configuration/
type: ideas
categories:
- lean-development
- ruby-on-rails
author: Ben Still
image:
  small: /assets/uploads/2013/10/ruby-on-rails.png
  big: /assets/uploads/2013/10/ruby-on-rails.png
meta:
  description: How we used Ruby on Rails convention over configuration to make our developers more efficient and improve quality
  focus_keywords: ruby on rails efficient
excerpt:
  short: '"convention over configuration". How to improve team effectiveness and quality.'
  long: Before we switched to Ruby on Rails, we had a small team working in Microsoft ASP and .Net. They'd butt heads all the time over seemingly trivial stuff, which had the impact of slowing us down. Once using Ruby on Rails, we started approaching these issues from a "convention over configuration" perspective, which helped us improve efficiency and quality. Here's a small example to illustrate how.
---

The problem
—————-

One developer would work on a project, and establish a way of doing
something - for example he might make all the database table names
formatted first letter caps (CamelCase). Another developer might have
a
burning desire for all lowercase. Pretty soon there would be a heated
and totally inane argument about which saved more bytes of data. The
second developer would complain about the first one wanting to boss
him
around, and so on.

The real clangers were always when we had different developers working
on different parts of a big project. We'd discover that while some
parts
of the code worked fine, other parts used technology that was case
sensitive. Remember how one guy was using **TableName** and the other
was
using **tablename**? Once some part of the project becomes case
sensitive,
everything comes to a screeching halt.

As a solution, we decided to document **The Right Way**. This was
before
we [discovered Agile (Red Ant discovers
agile)](http://redant.com.au/about-red-ant/), and I spent many many
hours writing this very comprehensive, massive weighty tome. Which no
one ended up reading. The developers just cherry picked what suited.

So our next attempt at solving this was to create a library of code
that
contained all **The Right Ways** to do stuff. This took ages to build,
and it was great for a while, until we worked out that how big and
inefficient the damn thing had got. It was classic [not made here
(not
invented here)](http://en.wikipedia.org/wiki/Not_invented_here)
behaviour. Rather than using existing open source libraries, we were
rolling our own, and often there were 2 or 3 very similar parts. See-
the CamelCase guy might want one flavour, and lowercase guy might
prefer
another, so we'd better have both. I think someone had a crack at
rewriting SQL in there somewhere too.

![surfing](/assets/uploads/2013/04/surfing.gif "surfing")

The bloat was a problem, because this was being included on each and
every request. Microsoft ASP isn't particularly fast to begin with,
but
we did our best to slow it to a crawl.

How Ruby on Rails solved this for us
——————————————————

One of the advantages of using a modern web development framework like
Ruby on Rails is the idea of [Convention over Configuration
(Convention
over
Configuration)](http://en.wikipedia.org/wiki/Convention_over_configuration).
Rather than creating a massive set of instructions that no one reads
or
a library that somehow enforces how things should work, we'll all
behave
like consenting adults and follow some Conventions. Conventions about
how things should be named, where they live, how they behave and
connect.

So it doesn't matter if you think lowercase looks pretty. Or you want
to
use emoticons in your table names - there is a Rails Way to do things.
Follow that and everything will flow pretty smoothly.

Rails has taken this a step further, and rather just than simple
conventions it curates some decisions that developers need to make in
the process of building (aka [curation over configuration (The lie of
convention over
configuration)](http://gilesbowkett.blogspot.com.au/2013/02/the-lie-of-convention-over-configuration.html)).
You can use any flavour of technology XX youd like, but there is a
curated choice which the Rails team have felt works well - and they're
pretty clever cookies.

Looking back now it seems like such a simple thing, but it is amazing
what a difference it has made.
