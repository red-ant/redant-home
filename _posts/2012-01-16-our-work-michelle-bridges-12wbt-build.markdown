---
layout: post
title: Michelle Bridges 12WBT build
type: news
permalink: /our-work/our-work-michelle-bridges-12wbt-build/
categories:
- our-work
- digital-products
author: Ben Still
image:
  small: /img/feature/12wbt.jpg
  big: /assets/uploads/2014/01/12wbt.jpg
meta:
  dsq_thread_id: '608748455'
  keywords: michelle bridges 12wbt
  description: The initial build of the Michelle Bridges 12WBT project
excerpt:
  short: The initial build of the Michelle Bridges 12WBT project
  long: We've been hard at work on the <a href="http://www.12wbt.com">Michelle Bridges 12WBT</a>, a project we started on mid 2011. Undertaking this work has presented us with some unique challenges to overcome. Find out how we did it.
---

The site has a few interesting technical challenges:

- **lots of traffic** needs to handle fairly high surges of traffic,
with a lot of members joining and paying by credit card at the same
time

- **lots of dynamic/interactive content** on pages like member
weights
& fitness results. This can make page caching tricky
- **different content on different days** each day new content or
functionality appears, like a new video, tool or forum area

We used Agile methods such as stories and sprints to help with the
initial build, and then tools like New Relic and Jenkins to deliver a
fast and reliable site.

How we approached this
———————————

This was an unusual project in two ways. First of all, there was
already
an existing site. This meant everyone was on the same page in terms of
how things needed to work, and what wasn't working and needed to be
different.

Second was the time frame- the 12WBT program runs several times each
year, and so by taking this on we needed to commit to delivering a
fully
tested and working site before the next round kicked off. We didn't
really have an opportunity for a soft launch or gradual release-
everything had to work.

We approached this in an Agile fashion and broke the project up into a
series of 1-2 week sprints:

- basic content- exercises & recipes

- forum & membership

- nutrition & exercise plans (grouping of content), charging members

- dynamic shopping lists, user profiles

- event system, private messaging, comments & reviews
- caching, server performance

Each sprint consisted of:

- defining what we needed to do: acceptance criteria and key features

- designing and building these features
- showcasing what wed done to the 12WBT team and incorporating
feedback

We needed to hit a specific time for release, so there was constant
negotiation around what would be in the final release vs post launch.
We
used [Jira](http://www.atlassian.com/software/jira/overview) and
[Greenhopper](http://www.atlassian.com/software/greenhopper/overview)
to
prioritise each item and keep track of these as feature stories and
requests.

On a typical project wed start with a series of wireframes, mapping
out
different areas and functionality. Wed then embellish these wireframes
with [Stories](http://dannorth.net/whats-in-a-story/) - so for each
key
area we have a visual diagram plus a set of stories which describe it.
On 12WBT we already had a working site, so we skipped wireframes and
relied only on Stories- not as pretty to look at, but they did the
job.
So the existing site described how a feature should look, and the
Story
described how it should work.

Heres how Stories work:
———————————-

For each feature on the site, we wrote a Story for how it should work.
In Rails, Stories are especially significant - they improve
communication across the team and speed up the development process.

As an example, lets use the invitation to weigh in message. Each of
the
12 weeks in a Round can have things appear on different days - so one
day might be when new recipes appear, and the next day might be when
you
need to weigh in and record your weight.

If today is weigh in day, this is what you should see on your dashboard:

![weigh in day popup
image](/assets/uploads/2012/01/mb-weigh-in-day.png "weigh in day popup
image")

Here is the story:

.bq
As a member who has not weighed in this week
when today is Weigh In Day for week X
then I should see "weigh in day!" form
so I can update my weight

This Story is pretty simple, but it covers a lot. First, it describes
the basic thing this feature needs to do: get people to enter in their
weight on the right day. If you were to write a traditional long form
IT
spec doc, you might struggle to communicate that as clearly. That is
one
of the advantages of Stories- you avoid a situation where your
developer
has made what has been asked for, but **not what you wanted**.

This Story simply describes what the user should see when and why (so
I
can update my weight). It isnt stated, but the Story also infers that
you should only see the form on weigh in day, which is correct - you
shouldn't see the form on other days. A separate step could check that.

This story uses a syntax called [Cucumber](http://cukes.info/), and
the
powerful bit comes when we can take this plain English Story and feed
it
in to our Rails application as a test - one of hundreds we might have.
This is where things get all super awesome- that Story is used to fire
off processes that will automatically check it with that type of
member,
on that day, and test to see if the member can update their weight.

What do Stories have to do with tests?
———————————————————

Back in the stone age of web development, developers would write code,
and then someone would then need to test that it works. Something
might
break, a tester would report it, and the developer would then fix it.
That process kind of works as long as the code remains simple.
Increase
complexity and you'll either need more testers or a longer time
between
releases.

More modern ways of working with code (known as frameworks like [Ruby
on
Rails](/blog/why-we-use-ruby-on-rails/)) use tests as an intrinsic
part
of making stuff. Instead of testing if something works, you create a
process that tests it. How many of the features you test is referred
to
as coverage. If that process fails, then you know the feature isnt
working.

Making something and then writing a test to check that it works is
useful. Even better: we can write the test first (it will fail), and
then make the feature until the test passes. Even betterer: we can
write
the test as an easy to read Story- that way everyone can see and
understand the point of this particular bit of functionality.

Meet Mr Jenkins
———————-

The 12WBT project is quite complex, with a heap of moving parts. A
human
would take ~<sub>days</sub>~ weeks to test each of the different aspects
of the
site (can I still log in?, will it accept my credit card? can I make
start a new topic in the forum?, etc). Since were often deploying a
new
version to the live site several times a day, this approach wouldn't
really cut it.

Because this is a paid site, members would be understandably upset if
we
did push up a change which meant they couldn't sign in or do stuff.
Yes,
we could roll back to an earlier version, but we might not pick it up
in
time.

Remember all those hundreds of Cucumber tests? Well, each and every
time
a developer adds new code, our Jenkins CI server fires up, checks out
a
version of the code and creates a fake 12WBT site. This then gets
filled
with content, and all of the tests get run. If a test fails, the
developer gets a nasty email and all the team knows. At that point
that
developer goes very quiet and scrambles to fix the build.

Some features can get described in a story, while other things wed
like
to test require someone to click around with a browser (eg: when I
click
on that does that open and do I see X? When I put a pay by credit card
do I get an email a few minutes later?). To test this we use Selenium,
which runs a browser session over the site to check that everything is
where it should be.

Since he is quite particular, Jenkins also runs a quality check on our
code using a tool called
[MetricFu](http://metric-fu.rubyforge.org/).
This looks for smelly code (a.k.a. shitty code) - repetitious or
unnecessarily complex bits that indicate poor quality. Again, this is
automated so is running continually in the background - no humans
required.

update: here is a more detailed look at how we use the [Jenkins
Pipeline
(A look inside our Jenkins Pipeline - how we make reliable
stuff)](/blog/a-look-inside-our-jenkins-pipeline-how-we-make-reliable-stuff/)

Using a CMS vs a Framework
—————————————

One of the unusual things about this project was that a separate team
had already built the site. This had used a PHP based CMS to manage
all
of the content as pages, while we took a different approach and relied
completely on the Ruby on Rails framework.

To explain why, here is how the business process for the 12WBT site
works:

- There are a series of rounds eg: Spring 2012, which start and end
on
particular days.

- Within each round there are 16 weeks. On each day within each week,
different content and tools become available- so a video might
appear on one day, new recipes on another.

- A user signs up and pays for Spring 2012, and then gets access to
Spring 2012 content & tools
- The content in the site is broken into video, information pages,
interactive tools (eg: graphs of my weight), lists (eg: recipes),
events (user generated) and forum (user generated)

Taking a CMS approach has some definite advantages - for example
you've
already got a way of authors to edit content, and you can schedule
pages
for when they should appear - you don't need to develop anything. We
often take a CMS approach for sites that have a lot of static pages or
a
mix of CMS and framework.

However a CMS also introduces limitations. For example everything
becomes quite page centric - all the data is tied to which page it is
on. Which is fine if your site is a blog or a series of content pages.
But lets say in your site you have a bunch of recipes. Each recipe has
pictures, some instructions, ingredients and how long it will take to
cook, and each recipe lives on its own page. You might want to show
your
recipes in a list, but then you might also show them in ways that make
things easier for your user - like:

- show me only those recipes that Ben likes

- I have some chick peas - what can I cook?

- I like this recipe, but flip to the vegetarian version (and from
now
only show me vegetarian recipes)
- or show me a shopping list of what I need to make this weeks recipes

…then having recipes as pages in a CMS becomes hard. Since all the
information for each recipe is inside a CMS page in a particular
section, the code has to hunt around and do quite a bit of work to
grab
that list of chick pea recipes or generate a dynamic shopping list.
The
code has to deal with all the artefacts or "code dags" that need to be
there for the CMS, rather than grabbing the information directly from
the database.

Things get interesting when you have several 12WBT rounds running at
the
same time. Some content is common and shared between all rounds, while
other content is unique. Members leave comments and reviews, and these
are only seen by other members in that round. Different parts of the
forum need to unlock on different days.

By using a framework approach, we were able to create tools to easily
load content like recipes, and then do interesting things with them -
like show vegetarian users only the vegetarian recipes, or dynamically
generate a shopping list of ingredients for a particular week.

Awesome member service
———————————

One of the things that we identified as a priority was to look after
members- to make sure they had an awesome experience and to respond
quickly if something did go wrong. Once a member is paying for an
online
service their expectations of service increases and we need to meet
their expectations.

Online companies like Zappos have grown massively not because they
sell
cheap shoes, but because they [excel at customer
service](http://www.deliveringhappiness.com/). To try to deliver
awesome
member service we used:

- **Assistly** - all questions and emails come through to a member
service queue that uses [Assistly](http://www.assistly.com/). Common
questions get pushed to an FAQ answers page. The end users never
actually see Assistly - it just hums away in the background. The
12WBT team log in and answer the questions inside Assistly, and this
content then gets pushed out to the front end of the site.

- **New Relic** tracks the [performance of the
site](http://newrelic.com/), from the amount of requests that the
main application is handling through to browser load times. Anything
unusual and we get an alert in Campfire and via Jira email - so we
often know about issues before they get reported. We can spot trends
with slow code or database queries and pick up recurring errors.
This has meant site performance has been quite smooth.
- **Jira** - any payment or technical issue that does come through
goes straight into
[Jira](http://www.atlassian.com/software/jira/overview) via email.
Having Jira doesnt mean we solve it faster, but it does make our
process more transparent and reliable. Issues get picked up quickly,
and once resolved the member service team can respond immediately.

Server performance & testing
——————————————

Another area that we thought was important to address was speed. This
site gets quite busy, so keeping page load times as quick as possible
was critical. First of all we needed to do extensive load testing to
simulate high load scenarios- and there were two we were worried about:

- what would happen when a gazillion people tried to sign up and pay
at once? Would our background_jobs be able to process them fast
enough?

<!-- -->
- how would the forums feel when that horde then jumped into the
forum
or started a live chat?

There are lots of load testing sites and software out there, but some
can give misleading results. We needed to find a load testing solution
that could

- **generate lots of traffic** that could go through the site and
follow a path through the site. Many load tools will send traffic
which is all hitting the same version of the page (which is then
cached), so reporting good results. Meanwhile real users with real
cookies & browsers might be getting unique pages, which generates a
lot more load- so the load testing is pointless. We needed something
which was as close as possible to real users using real browsers.

<!-- -->
- **network bottlenecks** - load tests might be restrained by
connection speed - particularly if sending the load test off a
single computer. Your connection might only allow 100 users through-
which means that will be all that get tested (even though you might
think youve sent 10k users)

<!-- -->
- **transactions** - we needed a tool that would allow us to have
virtual users that would sign up and pay with a credit card, and
then wait around to get the confirmation email. Ideally these
transactions could be via Selenium scripts, as wed already created
these.

<!-- -->
- **dynamic attributes** - we wanted our virtual users to log in with
their own email & password, update avatars, and write unique posts
on the forum, comments and reviews. In other words behave like real
people would.

We used [Browsermob](https://browsermob.com/performance-testing) to
simulate this load, using dynamic Selenium scripts to describe
different
paths through the site. Thousands of users created accounts, paid with
test credit cards, logged in and used the site - just like normal
users
do.

Performance
—————-

Part of our redesign involved carefully looking at how to best cache
each page, to ensure great performance. Some pages can be completely
page cached, which means the page you're seeing has been
pre-generated.
Other pages contain dynamic elements which are regularly being
updated-
say a forum page. For these we used fragment caching, which is part of
Rails.

We also moved the hosting from a US cloud service to a local AU
physical
machine. The config changed from Apache to use the mighty Nginx web
server, with Thins for the application. Although cloud seems to be the
rage at the moment, people often overlook the limitations of a virtual
environment. A cloud seems to be great if you have a small site that
youd like the ability to shut down if required, or if you need
thousands
of servers to distribute tasks to. If you're in the middle, then I'm
not
sure if cloud is always a good approach.

Using a bare metal server that is physically close to most of your
audience makes sense if you need speed- it certainly means a far
snappier response rate. This [James Gollick
presentation](http://vimeo.com/12814529) has some interesting bits on
this (he calculated the impact of server speed to his site revenue).
Here is our Google speed report on average server response comparing
the
old site to the new one (hosting was US Cloud now AU bare metal
running
Ruby on Rails).

[![google report showing average speed change old vs new
server](/assets/uploads/2012/01/mb-google.png "google report showing
average speed change old vs new
server")](/assets/uploads/2012/01/mb-google.png)

What we used:

- Ruby on Rails 3

<!-- -->
- Beast (heavily modified) - Forum

<!-- -->
- Devise - user authentication

<!-- -->
- Cucumber - stories

<!-- -->
- Jira & Greenhopper - issue tracking

<!-- -->
- Jenkins - Continuous Integration server

<!-- -->
- Capistrano - automated deployment

3rd party services:

- [Chargify](http://chargify.com/) - recurring billing management

<!-- -->
- [Chatroll](http://chatroll.com/) - live chat

<!-- -->
- [Assistly](http://assistly.com/) - customer service

<!-- -->
- [Campaign Monitor](http://campaignmonitor.com/) - emails

<!-- -->
- [New Relic](http://newrelic.com/) - application monitoring

<!-- -->
- [Browsermob](http://www.browsermob.com) - load testing and
browser
simulation

<!-- -->
- [Brightcove](http://www.brightcove.com/) - video CDN

<!-- -->
- [Cachefly](http://cachefly.com/) - Content cache and delivery
network (CDN)
