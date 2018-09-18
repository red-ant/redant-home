---
layout: post
title: Mobile first - 5 key constraints on mobile devices
permalink: /mobile/mobile-first-5-key-constraints/
type: ideas
categories:
- strategy
- mobile
author: Ben Still
image:
  small: /assets/uploads/2012/10/20121004-IMG_3566-465x310.jpg
  big: /assets/uploads/2012/10/20121004-IMG_3566.jpg
meta:
  description: Instead of designing for a desktop screen and then hacking on the mobile version, mobile first means start with the mobile version and then flesh it out from there.
  dsq_thread_id: '870234496'
  focus_keywords: mobile first
excerpt:
  short: Get ahead by going 'mobile first'. Let's take a look at some of the challenges we face when doing so.
  long: Mobile devices are changing the way we're doing things and there are many challenges along that path to integrate them with the more traditional websites designed for desktop only. One way is to go 'mobile first' and get the simple stuff over and done with ahead of the game. Let's take a look at some of those challenges we face.
---

No, this isn't as simple as adding a responsive layout (simple being
the
operative word there). Responsive is great since it will work across a
number of devices (tip: resize your browser while you're reading this
to
see responsive in action). A separate mobile site is also good way of
delivering mobile views of existing content, plus giving the option of
customising (so taking advantage of better geo-location for example).
Or
you might want to take a mix of the two (use responsive for some, and
a
separate m.site to deliver a super fast version)

There are five key technical constraints:

1. size of screen
————————-

Obviously the screens are different, and smaller screens means less
pixels to work with. A typical desktop is a few thousand pixels wide,
but a typical mobile device is in the hundreds. Desktops tend to be
landscape, while mobile is often portrait.

**this means:** consider whether delivering the same content and
functionality makes sense - perhaps the smaller screen provides other
opportunities

2. slow network
———————-

Compared to typical desktop speeds, mobile networks are relatively
slow.
So the bigger the page and graphics your site sends to a mobile user,
the longer it takes.

**this means:** small payload is really important

3. small cache
———————

Compared to a desktop computer, mobile devices typically have very
small
memory caches - which means they can't remember much. Send it too much
data and this fills up. This in turn slows things down as the
information needs to get reloaded.

**this means:** again, small payload is really important

4. low performance
—————————

The processing power of a mobile device is relatively low - so a page
that might load in 5 sec on a desktop might take 10 sec on mobile.
This
can have an interesting side effect - using tools like [New Relic
(New
Relic)](http://newrelic.com) weve seen page render times mysteriously
keep on climbing even when we've made no changes. The reason turned
out
to be a gradual increase in mobile traffic, which pushes the average up.

**this means:** not to harp on, but a small payload is really important

5. existing code
————————

If you're just starting a site you can probably do anything you want
vs
dealing with existing code, there are probably some things which are
easier than others.

**this means:** it is worth fleshing out a few different approaches to
see
which makes sense

Building things mobile first
——————————————

How we've approached this problem is to focus on trying to build
things
mobile first. Instead of designing for a desktop screen and then
hacking
on the mobile version, start with the mobile version and then flesh it
out from there. But it is much more than just the visual design
process-
mobile first has meant thinking differently about how we re-use code
and
being clever about asset management.

It takes a while to bed this process down, but we're starting to see
more significant changes in how we're approaching projects - from how
things look to how they are architected.
