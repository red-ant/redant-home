---
layout: post
title: Clicktale Review - how the technology really works and why it didn't for us
type: news
categories:
- tool-reviews
author: Ben Still
image:
  small: /assets/uploads/2012/01/clicktale-350x261.png
  big: /assets/uploads/2012/01/clicktale.png
meta:
  description: Clicktale review which looks at how the technology works and some real world issues that you might face when implementing Clicktale
  dsq_thread_id: '591731408'
  focus_keywords: Clicktale review
excerpt:
  short: It could be so good, but sadly Clicktale doesn't do everything it says on the box.
  long: Clicktale is a software tool which allows you to track what users are doing on your website. It is used to analyse how people behave and what they do on particular pages. we've used it on several projects to try to gain a better understanding of how users were travelling through the site. More specifically, we were trying to get a better understanding of how they were using particular pages & forms, and what steps we could take to improve our conversion rate.
---

This Clicktale review is completely independent. We've used it on
several projects where we wanted to better understand user
interactions.
In doing this we had a chance to look at both the way it collects data
and how it reports this information. We've also had the opportunity to
compare the results against other other software tracking tools, as
well
as other approaches to the same task such as physical eye tracking. We
started using Clicktale based on many of the positive reviews we'd
read,
but on further investigation many of these were paid reviews (via
affiliate commission).

To summarise our experience, we were quite disappointed with the
results. The [Clicktale](http://www.clicktale.com) reports seem to
illustrate certain behaviours and user problems, but after some
investigation we realised these weren't problems.

Users were in fact behaving very differently to what this tool was
telling us.

We wasted a lot of time investigating issues that we couldn't
reproduce,
and worrying about defects which weren't there.

&gt; Our problem was that we realised that some of the Clicktale data
was
&gt; wrong but the trouble was we didn't know which bit.

Clicktale seems good for creating impressive looking but superficial
"feel good" reports (look - users are using our web site!). The
visitor
recordings and heatmaps make for great eye candy to flash in front of
a
bewildered client or manager. Clicktale really blow away their
competition both in terms of generating pretty results, and also
explaining this well on their website. The site also explains how
cheaper it is to use Clicktale vs Eye Tracking and actual user
testing,
and also state that the results will be close enough to be the same .

Where things fell apart for us was when we tried to use Clicktale to
dig
deeper. We wanted to analyse how people went through a series of
forms,
what they were interested in, and gain better insight into where
people
were getting confused or dropping off.

Clicktales main premise is that it will record what someone has done
on
your site and then show you a video style playback of what occurred.
You
can watch what they do and understand how real users behave. This
information can also be summarised in a heatmap, which shows where
users
have clicked and pointed.

The problem is that there are a few technical issues with accurately
recording users behaviour, which Clicktale hasn't really solved.

Here's a simple example, using the [Twitter join
form](https://twitter.com/signup) as an example. The first screencast
is
what a user actually sees:

<iframe width="560" height="315" src="//www.youtube.com/embed/TxLYUw2PVWI?rel=0" frameborder="0" allowfullscreen>
</iframe>
This is (in my humble opinion) a pretty nice join form. It gives lots
of
clear feedback and helpful suggestions. The form uses Ajax to check if
that username is available or in the right format, plus comes up with
some helpful suggestions. In this example user tries a few and then
chooses one of the suggested names.

This is how the same user behaviour on this form would look like via
Clicktale. Note the absence of any kind of prompts or help text, and
the
pauses while the user reads the validation message (which isn't
visible).

<iframe width="560" height="315" src="//www.youtube.com/embed/PocHJYNAR7s?rel=0" frameborder="0" allowfullscreen>
</iframe>
If you were viewing this playback to get a sense of how the form was
being used, you might conclude that the user is having real trouble
with
filling it in. Not only that, but none of the prompts are appearing
and
the form looks totally broken. Have we tested in all browsers? Is this
a
problem that occurs under load? What is this user doing differently to
all our test results?

The reason for this discrepancy is that Clicktale isn't actually
taking
a screencast of what the user is doing. Although you could be forgiven
for thinking this - it is how it is [explained quite clearly on their
site](http://www.clicktale.com/product/visitor_recordings).

&gt; See absolutely everything visitors do on your webpage. Watch
&gt; recordings of your visitors full browsing sessions to discover
exactly
&gt; how they use your site. Its as if you're looking over their
shoulder!

Using Clicktale is **not** like looking over their shoulder. Clicktale
records mouse position every second or so and keyboard strokes. Then,
in
a separate process, a [Clicktale
bot](http://en.wikipedia.org/wiki/Web_crawler) visits your site and
takes a screenshot of that page. The actual playback is an animation
of
this screenshot and an image of a mouse cursor moving over the top of
it. Similarly the heatmap uses this screenshot.

There are a few problems with this approach, but the primary one is
that
\*\*the screen that you're seeing in the playback can be quite
different
to the one that your user just saw. For a site like this one (simple
blog style site with static pages that are identical for every user)
this approach works. If the site you're testing has any features that
change depending on what a user has done, it won't.

A few of the ways it can be different:

- **Prompts or hints:** if your site has forms with validation or
prompts using javascript, these won't appear (so like we did, you'll
think something has broken for that user when you see the replay)

<!-- -->
- **Conditional fields:** (eg: if I have children, ask how many) if
the form shows or hides questions based on what you've filled in
this will seem like the logic doesn't work

<!-- -->
- **Menus:** your site might use menus that expand out from the top
of
the page. These won't appear since they use javascript, and your
user will look like they are clicking on whatever is directly below
the top of the page- which can be misleading.

<!-- -->
- **AJAX:** if the form uses Ajax to check something (eg: test if
that
username already exists), this won't appear. So the user might be
seeing a message, but when you're looking over their shoulder with
Clicktale, all you'll see is a mysterious blank space and a pause.
Or possibly a completely different screen.

<!-- -->
- **Prefilling some fields:** if your form is prefilled based on
information from a previous screen, this just won't appear. In the
[Twitter example](http://twitter.com) , the user fills out name and
email on the first page, and then goes to a signup page. Via
Clicktale youll get the impression that somehow a user is able to
submit the signup page without adding name and email

<!-- -->
- **POST forms:** a form can use either POST or GET. POST is
generally
used for sensitive information like name, email etc, but Clicktale
can only use GET. Clicktales (very lean) help document most
helpfully suggests as a way of resolving this to simply convert your
forms to GET (at which point I was thinking of a word beginning with
F that I could tell them to put after get).

<!-- -->
- **Multiple step forms:** you might have your form split over
several
pages, and POST information from one page to the next. This is
pretty common, but it seems to completely confuse Clicktale and
mouse tracking data from one page will appear on another

<!-- -->
- **Cookies:** if your process uses cookies or session information,
this won't come through. Clicktale will show you a cookie-less
version, which might be radically different to what your user was
served.

None of these are particularly obscure or unusual elements for a web
site to have- in fact I'd be surprised if most sites other than a
basic
static brochureware site wouldn't use at least a few of these.

If it's still unclear as to why this would be a problem, here is what
I'd see if I used Clicktale to analyse how people are using the
[Bookdepository checkout
process](http://www.bookdepository.com/basket).
As you can see the two screens are quite different. The Clicktale
playback will still merrily animate a mouse cursor moving around, but
as
you can see the image would be completely wrong and misleading.
Likewise
for the various heatmaps and reports.

What a real user sees:
![](/assets/uploads/2012/01/clicktale-basket.png)

and what you'll see in the Clicktale report:
![](/assets/uploads/2012/01/clicktale-basket-none.png)

Which is puzzling, because on the Clicktale site there are a lot of
testimonials gushing about this amazing insight into behaviour which
improves shopping and conversions. I'm not really sure how many of
these
sites don't use some sort of cookie or session information to
facilitate
a checkout process.

OK, maybe Clicktale can provide insight in other ways like using the
heatmaps to see what people are interested in. Again, we've been down
the rabbit hole on this one, trying to solve problems that it turns
out
never actually existed.

Heatmaps run into the same problem as the playback issue above - the
screenshot in the background might not be what the user was looking
at.
You might notice a lot of heatmap activity around the top of your
page.
That might be people clicking around the header, or if you have a
dropdown menu they might be clicking on the menu items. Or they might
have been clicking on a message area or banner ad that isn't in the
screenshot.

Now, I've always had a soft spot for a nice heatmap, but Clicktale
ones
have another problem - they're not heatmaps of what people are looking
at, they track where their mouses are pointing.

The Clicktale blog assures us that this isn't anything to worry about,
since there is a very strong correlation between where a user looks
and
where they point their mouse (84-88). My bullshit detectors went off
when I read that. Google pointed me to a few other posts that pointed
out that the 88 is based on a misreading of the research, and the
figure
is more like 30. I'd be surprised if it was even as high as 30, and if
you believe the 88% please contact me as I have a very interesting
investment scheme in Nigeria that will make you very rich. I promise.

Here's a simple test: as you read this line of text, where is your
mouse
right now? Is it hovering over each word? I'm guessing not.

Say we take the 30% number as a broad average, what these heatmaps are
actually telling us is where people are **not** looking, most of the
time. Try explaining that to your client or manager.

&gt; I've raised this discrepancy with Clicktale between the report
they
&gt; cite and what they write, asking for more clarification about
exactly
&gt; where the information comes from. The response was the data was
from
&gt; Google

Ironically an instance where a user would look at where their mouse is
would be as they are filling in a field or clicking a button.
Typically
things youd do when filling out a form (see issue above)

Other issues we hit:

- **privacy:** this is essentially a [key stroke
logger](http://en.wikipedia.org/wiki/Keystroke_logging). Yes, the
same thing that evil hackers use to discover peoples passwords.
Every key stroke is captured and stored in Clicktale. There is an
option to hide data like credit cards, but from what we've been able
to gather this doesn't mean it isn't collected, only that it can be
hidden during playback. The data is still sent and stored. If people
can buy things or submit sensitive information on your site, then it
is worth understanding the implications of tracking and storing this
kind of information (more [information on PCI
here](http://chargify.com/blog/what-you-need-to-know-about-pci/) ).
At the very least you should adjust your site privacy policy and
make sure you are covered- your lawyer may well have a hissy fit
when you explain that all customer data is being copied to some 3rd
party server.

<!-- -->
- **speed:** remember that every additional tag you add slows your
site down. Some tags are faster (eg: Google Analytics) than others.
If you think asynch solves this you're not getting the problem. Not
only does it fire off some javascript each time, Clicktale has the
added bonus of then triggering a bot visit. If speed is important,
avoid sticking these tags everywhere.

<!-- -->
- **averages which aren't:** depending on the budget you've
allocated,
Clicktale will only record a certain number of visits a day. Once
this runs out, the results won't appear in your report. So if you're
trying to look at average behaviour, time of day may influence your
findings.

<!-- -->
- **tracking where people click:** there are lots of tools out there
that do this pretty well. Google Analytics anyone?

At the end of the day, Clicktale wasn't really a great fit. Were
trying
a more pragmatic approach - solve real problems rather than using a
tool
to find problems. Some examples:

- using **Event tracking** in Google Analytics to track behaviour in
the areas that were interested in (a much lighter approach, tracking
what we're specifically interested in rather than the shotgun
approach of recording everything)

<!-- -->
- develop scenarios or hypotheses for what a problem might be, and
then ways we could work out if it actually is occurring (looking at
logs and New Relic)

<!-- -->
- if we see some people are having trouble with a particular the
password reset, use events in GAnalytics to track frequency and
evaluate that.

<!-- -->
- **Is there a pattern** that a user in trouble might follow, eg:
I've
tried to buy the same item 5 times. When this happens maybe we could
be more helpful and trigger a can we help? message or email to get
more information? Or at least help the user feel that someone is
there to help them.

<!-- -->
- use physical user testing and eye tracking to understand what
people
are doing and where they are looking

Update
———

We've had several discussions with the guys at Clicktale, they've
provided some more information, and we've done some analysis of their
recent updates. And they'd really like us to change this post.

We didn't discover anything that changed our opinion of this software.
In fact some of their new innovations are pretty scary. For example
there is a cookie sniffer. But to make this work you need to turn of
SSL. Which is a Very Bad Idea. The whole point of encrypting cookies
and
sessions is to stop other people intercepting that. It is almost that
Clicktale comes from an alternate reality where the normal rules of
web
security and development practices don't apply.

And to be fair it seems this criticism can be applied to many of the
"alternatives to ClickTale" - we know a bit because they keep on
contacting us to tell us how awesomely different they are to ClickTale.

Here's the core problem:

- products like Clicktale are sold by very effective and pushy sales
people. They'll tell you anything. Many blogs you'll read with so
called reviews are getting affiliate payments. So you're hardly
getting an independent review.

- products like Clicktale are bought by marketers and web site owners
desperate for a product like this to improve performance.

- the Clicktale implementation then gets passed on to a developer,
who
is then stuck trying to explain what these reports actually mean. If
you're reading this far chances are you're that guy/girl.
- The Clicktale documentation often makes their many product faults
the developers problem. They should have a plain english explanation
of the implications of sending sensitive information to their
service. Be up front about the risks of disabling security to allow
snooping. Explain what PCI compliance is and the responsibilities.

Here's what you can do:

- share this review - I hope it makes at least some sense

- give Clicktale feedback about your concerns or questions

- see if you can do real user testing instead. The Tobii eye tracker
system is very nice. Or just sit and watch some users

- there are lots of other systems like Snowplow or Kissmetrics that
might better suit requirements
- write your own review!
