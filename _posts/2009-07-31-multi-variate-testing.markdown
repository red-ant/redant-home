---
layout: post
title: Multi-variate testing
permalink: /how-we-do/multi-variate-AB-testing/
type: ideas
categories:
- automated-testing
- how-we-do
- ruby-on-rails
author: Ben Still
image:
  small: /assets/uploads/2013/10/peter-465x309.jpg
  big: /assets/uploads/2013/10/peter-1024x682.jpg
meta:
  dsq_thread_id: '504960434'
  focus_keywords: multi variate testing
excerpt:
  short: Lately, we've been doing quite a bit of work on sites which involve multi-variate (MV) testing
  long: Lately, we've been doing quite a bit of work on sites which involve multi-variate (MV) testing. Its quite interesting, but hard to explain. In a nutshell, MV testing means testing lots of little changes or variations to a web site to see what works. Does bold orange type work better than small grey type? Should we show the price on this page or not at all?
---

Traditionally, to find out how you should best design and structure
your
site you might do some testing on a sample of users. There's lots of
ways of doing this, from giving them a set of thing to find on your
site
and timing this through to tracking users eye movements as they look
at
different pages. If you feel a strong, overwhelming desire to
irritate,
you could always set up an entry and exit survey on your site.

The weird thing about humans is that \`<shock horror>\` what they
**say**
they would do and what they **actually** think and do might be quite
different. Coca Cola [found this out with New
Coke](http://en.wikipedia.org/wiki/New_Coke).

In his book [Blink](http://en.wikipedia.org/wiki/Blink_(book)),
Malcolm
Gladwell writes about the mistake that Coca Cola made of basing
decisions on sip tests, where a drinker is given only a small sample.

&gt; although many consumers react positively to the sweeter taste of
Pepsi
&gt; when drinking it in small volumes, it may become unattractively
sickly
&gt; when drunk in quantity. Coke, on the other hand, may be more
&gt; attractive for drinking in volume, precisely because it is less
sweet.

So, while focus groups and testing are certainly useful and valid
approaches, there are a number of reasons why something might test one
way but return a very different result in real, day to day existence.
In
the case of a web site, you might have a myriad ideas on how to
improve
something. Different ideas might apply to different pages.
Unfortunately
there is a practical limit to the number of different experiences you
might be able to ask your test subject about. Oh- unless you are
Google
and you have [lots of
pigeons](http://www.google.com/technology/pigeonrank.html).

MV testing involves running a live test on your web site. Each time a
new user comes on to the site, they get assigned a set of variations.
We
can then measure how well a particular element or group of elements
perform. This might be on one page, or it might be across every page
in
the site.

We might change visual things such as the colour or size of
images/text.
We could change the way things are described or titled. We might
change
navigation or page layout. Each user visiting the site gets assigned a
particular set of variations, and these can get tracked against a
control to see how well that performs.

The first step is to work out what we're trying to get your user to
do.
For the kind of work Red Ant does, this usually involves completing a
signup form or buying something. So getting users through to that is
the
goal.

Next is to come up with some ideas around how we might convince them
to
get to the goal.

Say your site sells vegetables. One way to sell your vegetables might
be
to list all of them on the home page. Or we might want only the best
sellers. Or maybe only the cheapest. Or the ones that get most organic
search traffic.

The vegetables might be listed alphabetically, or organised into
groups
like root vegetables. By colour might look nice. I like using lots of
garlic when I cook spinach, so perhaps some kind of grouping by recipe
might work well.

Depending on the number of things we're trying to test and volume of
traffic through the site, we can start to see what is working and what
isnt. we've been working with Accenture and their tool
[xOs](http://www.accenture.com/Global/Consulting/Marketing_and_Sales_Effectiveness/memetrics),
and that does some cool things like start to tune the site over time.
So
as some variations start to out perform others, more traffic starts
getting directed to these variations. This usually means an even
bigger
lift in performance against the control site.

The MV approach isn't suitable for all sites. It can be complicated
and
takes a while to set up. Tests take a while to run, and you might not
get a clear winner. Its easy to get wowed with the technology, but not
actually achieve anything. Garbage in usually means garbage out.

But when everything does click into place, we've seen some terrific
improvements in site performance. And it is certainly very interesting
work to do- in terms of both design and the actual build.

Some links you might find useful:

- [Wikipedia](http://en.wikipedia.org/wiki/Multivariate_testing) -
oh
font of all knowledge

<!-- -->
- [Marketing
Experiments](http://www.marketingexperiments.com/improving-website-conversion/multivariable-testing.html)
-
a really interesting site to sign up to if you're into this kind of
thing

<!-- -->
- [Avinash Kaushiks
blog](http://www.kaushik.net/avinash/2006/05/experimentation-and-testing-a-primer.html)
-
great discussions on experimentation, online marketing and such

<!-- -->
- [Split tester calculator](http://www.splittester.com/) online
calculator for working out test results for simple a/b

<!-- -->
- [The Squirrel
guys](http://www.conversion-rate-experts.com/articles/101-google-website-optimizer-tips/)
-
points for personality and pushiness!
