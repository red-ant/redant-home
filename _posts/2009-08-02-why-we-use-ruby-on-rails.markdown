---
layout: post
title: Why we use Ruby on Rails
permalink: /ruby-on-rails/why-we-use-ruby-on-rails/
type: ideas
categories:
- how-we-do
- ruby-on-rails
- ruby-on-rails-devops
author: Ben Still
image:
  small: /assets/uploads/2013/10/ruby-on-rails.png
  big: /assets/uploads/2013/10/ruby-on-rails.png
meta:
  dsq_thread_id: '479978209'
  keywords: ruby on rails
  description: Why we use Ruby on Rails
excerpt:
  short: We do a lot of work with a programming language called Ruby on Rails. This is why.
  long: "We do a lot of work with a programming language called Ruby on Rails. When I explain this, some people look at me blankly (disclosure: I get that a lot anyway...). Techie people usually start gushing about how great it is, or want a fight about how X is better. Many people have heard of it somewhere, but are unsure what it is all about."
---

Heres my summary of what Rails is and why we use it.

The Ruby bit is a programming language called Ruby that was developed
in
the early 1990's, while Rails is the framework bit. It can run on all
different types of servers, and has been used to build a few high
profile sites such as Twitter.

The framework is a term to describe a way of working. It's a set of
tools and methods that speed up the routine stuff and increase
productivity. They allow developers to spend more time on the problem
at
hand. To use a cheesey metaphor- say you need to drive from Sydney to
Melbourne.

A framework means you can start your trip straight away without
needing
to build the car and find some wheels. You still have to drive the
car,
but you don't need to do all the painful stuff around making the car.
Someone before you has already made a perfectly good car as part of
the
framework - in fact they've probably made a few. You can get straight
into the driving. If for some reason you need a different car, you can
always get under the hood and bling that car, or you might want to
make
a new one.

Frameworks are relatively new on the scene. Rails is one that gets
lots
of buzz (but it isnt the only one). it's been used to build lots of
different things, including very popular, high traffic sites. what's
attractive (for us) about Rails is that some pretty clever people have
spent time working out the best way to make things for the web.

Why Rails and not something else? There are thousands of different
languages and ways you could build a web site. Some are more popular
than others, and some require specific tools or technologies. Some
cost
a lot to license, while others are free. While I can't say we've tried
them all, over the past 12 years we've been in business we've
certainly
tested and kicked the tyres on a few.

What I've learnt is that it is quite difficult to manage a team that
covers several languages. Each language and tool has some unique way
of
doing things. So running different projects made in different ways can
be (was) a bit of a handful. Supporting and maintaining them is even
harder. Maybe my mind doesn't work that way (another disclaimer: I
can't
juggle balls or spin plates either). Some development teams go with
three or four, while we've found it better to focus on one.

We've specialised in Rails as we've found it makes us more efficient.
It
helps us develop things faster, and our team collaborates more. it's
also introduced a bundle of ideas and ways of working - from how we
make
things to testing and publishing.

### 1. Rails **really** suits making websites

It's popularity has a lot to do with Rails being particularly well
suited to building web sites. You can make a working prototype of an
idea pretty quickly, and then build out from that. It has addressed a
lot of the problems you can run into on a large web project. Sudden
changes in scope, new/better ideas, changes to functionality and
design.
It comes with lots of goodies that help you make interfaces that are
pleasant to use. there's a lot of satisfaction with making something
that is, well, nice.

### 2. Rails is a bit of a gateway drug

Think of Rails as a gateway drug - you play around, build a few
things,
and get into Ruby- which is a very that makes sense language. Suddenly
you're onto the hard stuff and you realise that it's going to be
tricky
to go back to the old way you were doing things.

It encourages you to make stuff in an Agile way, which is a Good Thing.

### 3. Stop developers peeing on trees

One of the little problems that we run into is getting another
developer
to take over a project already started by someone else. Invariably,
they
seem to spend their first hours/days/weeks adjusting things so that
they
make sense to them. Much like a cat or dog in new surrounds, a bit of
pee on a few trees says you mean business.

This is usually petty stuff, like using underscores rather than dashes
or renaming a few database tables. Sounds small, but this can then
snowball when it then needs to be applied everywhere else. Frustrating
when it wasnt really required, but the developer felt compelled to pee.

Rails has this thing called convention over configuration, which
avoids
all the peeing. Rather than starting from scratch, there are all these
conventions that make a lot of sense. Say I was making a list of these
blog posts that you're reading now. The list would be called posts.
Each
item on my list would be a post.

Make sense? Not BlogPost, blog_item or myblog89-entry. This saves
time
in simple ways- like once you see post, you can assume it belongs to
posts.

### 4. Model View Controller

The Model View Controller (MVC) principle is a big part of Rails. In a
nutshell it means that you break up your data and logic (the Model),
what it looks like (the View), and how it interacts with the user (the
Controller) into separate areas.

If you're familiar with HTML, it's kind of like using CSS to separate
your layout and your content. At first, it might not have seemed that
useful to separate layout and content, but it gives the developer an
extraordinary amount of flexibility. Everything is in nice neat
compartments, so you can fiddle around with your layout (the View)
without breaking other stuff. Same language across all of them.

### 5. Active Record- database Esperanto

One of the pains with web development is Choosing Your Database. You
might start off development with a simple database system. Later on
you
might want to upgrade for whatever reason (say more data, higher
traffic). Who knew that changing between two flavours would mean
subtle
but critical changes to most of your code?

Active Record is like database Esperanto. You can write everything in
Active Record, and it no longer matters what database you use. As
always, if you want to get under the hood and write specific code for
your database, you're free to do so.

### 6. Ruby Gems

What you get as part of the Rails is pretty good, but it also has this
tool called Ruby Gems. This allows you to download things that add to
what Rails can do. You can grab a database, a tool for testing your
code, or something that will add cool little graphs to your page.

### 7. Capistrano

Capistrano is a tool that helps you publish sites. For a simple site
with just a few pages, this isnt much of an issue- just copy the files
onto the server. But as soon as your site becomes a bit more advanced,
you'll need to update several things at once. When you update, you
might
have changed how a few things work- which might mean an extra column
to
your database, deleting some images, and replacing some files. This
can
be a real pain to do by hand. Prone to error in fact.

Capistrano automates this process- we tell it wed like a current
version
of projectX on our testing server, and it works out the rest for us.
When this has tested OK, Capistrano then plonks the tested version
onto
the live server. It can even do stuff like roll the current live site
back to yesterdays version.

### But hang on - Twitter is always crashing. Does that mean Ruby
doesn't scale?

Twitter have had some well publicised scaling issues, and this has
been
taken as evidence of scaling problems with Ruby. Which is why they've
changed to other languages. This isn't as straight forward as it might
sound - here's why.

First off, Twitter deals with a fairly unusual traffic profile. Their
scaling issues are sudden, massive surges in messages that need to get
queued and delivered. The engineering issues they face are relatively
unusual- where they've faced scaling problems with pretty
standard/mature technologies such as MySQL and Memcache. So they've
discovered they need to solve these issues in quite specific ways.

Second, these specific scaling issues are to do with parts of their
system, such as the messaging service. There is a [good discussion
and
great comments from the Twitter team
here](http://unlimitednovelty.com/2009/04/twitter-blaming-ruby-for-their-mistakes.html)

My example of Twitter might not be the best - as far as I understand
they use Rails on the front, and they've recently switched to Scala
for
their back end. Perhaps better examples of popular sites using Rails
are
[Hulu.com](hulu.com) (a video portal by Fox & NBC Universal) and
[NYTimes.com](nytimes.com). Any others you think are good examples
please drop me a line :)
