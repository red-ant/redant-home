---
layout: post
title: Have you noticed how fast some sites are these days?
permalink: /pjax/asynchronous-javascript-frameworks-like-angular-js/
type: ideas
categories:
- pjax
author: Ben Still
image:
  small: /assets/uploads/2012/12/google-angular-465x131.png
  big: /assets/uploads/2012/12/angularjs.png
meta:
  description: Have you noticed that some sites are insanely fast these days? The new generation of Javascript Frameworks are powering a new change in the way pages work.
  focus_keywords: fast asynchronous javascript frameworks
excerpt:
  short: Have you noticed that some of the sites you use have been getting super fast lately?
  long: Have you noticed that some of the sites you use have been getting super fast lately? Web pages seem to respond almost too quickly. Try typing a search term into Google and see how quickly the suggested results come back.
---

The technology behind all this are the new Javascript frameworks, with
names like Angular, Ember, Spine, Knockout, Derby and Meteor. We've
decided to go with [AngularJS (AngularJS)](http://angularjs.org/),
which
is a Google project.

A quick summary of what makes these pages so damn fast
———————————————————————————

When a user clicks on a normal web page, it works something like this:

[![](/assets/uploads/2012/12/non-angularjs-rails-asynchrous-diagram1.png)](/assets/uploads/2012/12/non-angularjs-rails-asynchrous-diagram1.png)

Each time a user goes from page to page, pretty much the entire page
gets sent back with new content. Some of this is remembered by the
browser and doesn't need to come back, but a significant part needs to
come back down from the server each time.

When a user hits an Angular page, the process is a bit different:

[![](/assets/uploads/2012/12/angularjs-rails-asynchrous-diagram1.png)](/assets/uploads/2012/12/angularjs-rails-asynchrous-diagram1.png)

The result? Instead of getting a new page every time, only the bits
that
change need to come from the web site. So the header, footer and
navigation is loaded the first time. After that, the new content is
squirted in as you move from page to page. Even this can get done in
the
background- so the page appears in the browser and then the content
appears. What this means is that page loads are in milliseconds rather
than seconds.

Still not convinced? Check these numbers out: I benchmarked an
uncached
page on a project were working on - the current version uses JQuery
Mobile, the new is Angular with a Rails API providing content.

Jquery Mobile: **4 s**

Angular: **450 ms**

\*[]{.driving .when .brake .to .needs .driver .a .time .reaction
.the
.about .- .seconds .0.45 .is .450ms .this, .reading .you're .if .Mum:}\*

Why bother with all of this?
——————————————

Well, for starters, fast pages = happier users. Various [case studies
(speed matters case
study)](http://www.slideshare.net/markstanton/speed-matters) have put
a
dollar figure on this - for Amazon, each 100ms lost to a slow page
[represents a 1% loss in revenue (designing fast websites
presentation)](http://www.slideshare.net/stubbornella/designing-fast-websites-presentation).

Don't forget about the changing demographics of your audience. If your
audience is anything like ours, more and more people are using mobile
devices instead of desktop. And this number is probably going to keep
on
going up. The rise of mobile means that fast pages are even more
important, since mobile devices typically have a slower network
connection, smaller cache and lower processing power than desktop PCs.
A
page that might take 5 sec on desktop might take up to 10 sec on
mobile
- so quick pages matter. Not only does a slow page frustrate your
mobile
users, it will pull down your average page load speed, which one of
the
factors used to rank Google search results.

Fitting this in with an existing application framework like Ruby on
Rails
——

Embracing these new technologies isn't particularly straightforward
(it
isn't something you set up in a few hours). It has taken us a few
weeks
to get things right. Each of our teams (Design, Rails and Front End)
have had to learn and tweak how they do things, to take advantage of
how
Angular works. don't fall into the trap of thinking this is the next
level of Javascript Libraries like JQuery or Prototype - it is a lot
more than that, and impacts everything from visual layout to how you
might cache a page.

On one project, we've changed the way the Rails application works,
from
being a regular Rails web application that controls everything that
the
user sees and does, to being a big API. This means that the main web
app
controls logic (what each user should see and when), and exposes this
as
a feed of data. The Angular front end uses this to show different
pages
and content to the user. Since we can compress the bejesus out the
data
feed, the actual data coming off the server is tiny - so super fast.

Are you a Javascript fanatic or know someone that is?
——————————————————————————-

We're looking for some more front end developers - if you've got
skills
in any of the Javascript frameworks or have existing JS skills and
would
like to develop them more, [please drop us a line (work with
us)](http://redant.com.au/jobs/).
