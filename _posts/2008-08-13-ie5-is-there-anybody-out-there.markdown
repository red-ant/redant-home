---
layout: post
title: ie5 - is there anybody out there?
permalink: /our-work/ie5-is-there-anybody-out-there/
type: ideas
categories:
- ruby-on-rails
author: Ben Still
image:
  small: /assets/uploads/2008/08/space-small.png
  big: /assets/uploads/2008/08/space-large.jpg
meta:
  dsq_thread_id: '621262000'
excerpt:
  short: Are any humans still actually using IE5? Or is it just bots
  long: Are any humans still actually using IE5? Or is it just bots
---

As part of our development process, we test our work on a set of
different web browsers. The browser list varies on different projects
depending on client requirements - current versions only for
technology
sites because their visitors tend to have up-to-date systems, some
older
versions too for sites targeting a more mainstream audience.

The standard list of our testing browsers (as it was):

- Internet Explorer 6.X PC **- current version**

<!-- -->
- Firefox 1.5 PC**- current version**

<!-- -->
- Firefox 1.5 Mac**- current version**

<!-- -->
- Safari Mac

<!-- -->
- Internet Explorer 5.5 PC

<!-- -->
- Internet Explorer 5.01 PC

### Why bother with these older browser versions?

There are small but significant differences in the way that different
browsers handle layout instructions- particularly so between IE5 and
current browsers. What might look great in the current version of
Firefox may well be a strange mess of overlapping blobs in IE5. If
you're really styling, you can even cause the browser to crash and quit.

Part of the web standard movements original aim was to get developers
to
write HTML markup that adheres to specific web standards, rather than
cater to the idiosyncrasies of various browsers. However, like it or
not, there are lots of people that use Internet Explorer, and the
thinking is that since not everyone is on the latest version of
browser,
it's a good idea to test on older browsers. Our aim hasn't been pixel
perfection, but more to just check that the site is at least usable
and
**degrades gracefully**.

### The rub

Now here's the rub- it turns out that it is quite hard to install an
old
version of IE. You can't just whack in an install CD and hit the
button,
or download a version from Microsoft, like you can do with most
software
(and many other browsers). As far as I know, the only way to
_really
_do this is to reinstall Windows from scratch, using an old
installation CD that has IE as part of the install.

Some smart cookies (Internet Explorer v5): worked out how to create
standalone versions of various browsers, which can be run on a machine
that has a current version also installed. By using these for testing,
we're able to check what the page looks like in the current version of
IE, as well as earlier versions - typically 5.01 and 5.5, which were
popular releases.

I'd always assumed that there were folks out there that haven't
upgraded, so it was worth testing and tweaking for the IE5 crowd.
There
are also stories of IT departments that alternate versions of all
software- so they'll install v3, skip v4, install v5, skip v6, and so
on. Following this line of logic, it makes sense that maybe there were
a
few large corporate networks that were skipping IE 6 and hanging out
for
IE7.

### Is there anybody out there?

We were having a look at our testing process, and the discussion
turned
to IE5 and if it was still significant. At the end, we all agreed that
it was probably no longer worth testing for.

Here's why I think there's no one out there:

#### 1. It must be pretty hard to connect to the internet.

In this age of a paranoid Microsoft asking you to autoupdate every
week,
surely it must be pretty difficult to avoid all those update requests.
As soon as you visit anything Microsoft related, you get pinged as a
recalcitrant and sent down the upgrade path.
I'm sure that it is possible to connect and surf, but how realistic is
it that there are a significant number of alert ignorers out there.

##### 2. The corporations don't skip

In my very quick survey of big corporate IT people, auto updates are
seen as a better way of keeping users up to the Microsoft recommended
level - rather than rely on periodic updates peculiar to that
organisation. As [Mr T](http://www.imdb.com/name/nm0001558/) would
say,
pity the fool in IT that didn't install the update MS told them to
install.
So much for the skip version myth.

### 3. It must be pretty hard to get through the install of anything

We tried installing an old windows on a rebuilt machine, and suddenly
the install process is grabbing updated files from the internet-
including IE6. Perhaps there was a button that I missed that gave me
the
choice, but you have to be quick. I'm betting that installing another
MS
application such as Outlook or Office also does a similar check and
upgrade.

##### 4. Web logs

We had a close check through some web logs of various sites, to try to
establish the incidence of below 6 Internet Explorer users. There were
a
few in the period that we checked, which was weird - until we realised
that these were Mac users (IE5 was the last version of Internet
Explorer
that was released for the Mac). It has [been subsequently
abandoned](http://www.microsoft.com/Mac/ie/), and even Microsoft
suggests that IE5 mac users try Safari.
Further to this, the incidence of these browser versions was around
0.5%
- so not really significant in the scheme of things. Certainly not
worth
compromising elements of a page layout so that it will work in IE5.

### Our new browser list

The spanky new list is

- Internet Explorer 6.X PC

<!-- -->
- Firefox 1.5 PC

<!-- -->
- Firefox 1.5 Mac

<!-- -->
- Safari Mac **- on request**

We decided not to include IE7, as this seems to be in eternal beta.

So now, when we test our work, the set of browsers that we test with
is
shorter, more realistic, and actually reflects who's really out there.

### Browser update for both IE and FFox

The real IE7 has finally been released (October '06), so we've added
that in. To further spice up our browser testing, Firefox 2 is also
out.
It will be interesting to see the changeover patterns for each of
these
- historically Firefox people seem to be faster off the mark, but MS
seems to be positioning IE 7 as an important technology update that
will
improve security, so it may well be relatively fast. Keeping in mind
though that IE has a much larger and less tech savvy user base to
change
over, so they will inevitably take longer to convert.

So our spankier, shinier new testing list is now

- Internet Explorer 6.X PC

<!-- -->
- Internet Explorer 7 PC

<!-- -->
- Firefox 1.5 PC

<!-- -->
- Firefox 1.5 Mac

<!-- -->
- Firefox 2.0 PC

<!-- -->
- Safari Mac **- on request**

Some links that might be useful for your own testing:

- [Evolt](http://browsers.evolt.org/?ie/32bit/standalone) - old
browsers that can be run as standalone

<!-- -->
- [IE Tab](https://addons.mozilla.org/firefox/1419/) - plugin for
Firefox that allows you to switch between IE and FFox in the blink
of an eye

<!-- -->
- [Passler web stress tool](http://www.paessler.com/webstress) -
allows you to choose a browser profile, and then record and run
automated tests on a site

<!-- -->
- [Install
IE7](http://googlesystem.blogspot.com/2006/04/test-internet-explorer-7-without.html)
-
an install process for IE7 without actually installing

<!-- -->
- [Explorer
exposed](http://www.positioniseverything.net/explorer.html) - a
handy list of explorer bugs worth checking if you're stumped at
getting something to work in IE

_image credit:
[Sweetie187](https://www.flickr.com/photos/58782395@N03/_)
