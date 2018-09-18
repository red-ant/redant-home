---
layout: post
title: Jira priorities- the story of Team Six and The Iceberg
type: ideas
categories:
- agile
author: Ben Still
image:
  small: /assets/uploads/2012/01/jira-screenshot-e1331333673751-350x232.jpg
  big: /assets/uploads/2012/01/jira-screenshot.jpg
meta:
  description: Find out how we use Jira priorities at Red Ant to manage development workflows and make sure nobody gets hurt.
  dsq_thread_id: '591731563'
  focus_keywords: Jira priorities
excerpt:
  short: Seal teams, titanic sinkers and our prioritization ratings.
  long: We use Jira to keep track of all of our tasks - without it we'd be overwhelmed with the sheer volume of "stuff" you need to keep track of on a typical digital project.
---

We use [Jira](https://www.atlassian.com/software/jira) to keep track
of
all of our tasks - without it wed be overwhelmed with the sheer volume
of stuff you need to keep track of on a typical project. For each of
our
projects, the client can email in issues to our team via a project
email
address. These emails don't come directly to us - first they're
processed by Jira, which then transforms them into an issue in Jira.
One
of our Project Managers then picks this up, clarifying the task if
necessary, and then assigns it to the right team or person.

Part of this clarification is **assigning a priority**. Sure - we know
that some people would like everything to be drop everything OMG high
priority (they also enjoy the caps lock key). But it helps to be a bit
objective - so that the super important stuff stands out from the
normal
important stuff.

We've tried a number of different priorities - here's what works for
us
and what they mean:

Low priority
——————

![](/assets/uploads/2012/01/panda.png)

---

Usually assigned to a task where something isn't working or needs to get
updated. There is a workaround but it would make a users day to get this
fixed.
————————

Normal (Default)
————————

![](/assets/uploads/2012/01/panda.png)

---

This is our default priority, and covers most things. Each task also
gets a time estimate, so the developer can gauge relative size between
one task and the next.
—————————————

High priority
——————-

![](/assets/uploads/2012/01/panda.png)

Please look at this issue before any of the other Pandas on your list.
We're not seeing fire, but can smell smoke.

Note that there is a naughty step for any PMs who get caught making
too
many of these.

Rainy day
————-

![](/assets/uploads/2012/01/possum.png)

A relatively minor improvement that can be done when there is time.
Some
of our projects operate on a monthly retainer, so if there is time
remaining this month, the possum gets got.

The Iceberg
—————-

![](/assets/uploads/2012/01/fat-cat.png)

An often misunderstood fellow: The Iceberg. Before we used to spot
these
lurking around, but they'd get a low priority and then slowly slip off
the bottom of our development list. Until that Titanic moment and
everyone suddenly remembers The Iceberg as the ship goes down.An
example
might be a bad server configuration- it works fine now but the next
restart it will fail. So we don't need to do anything right away, but
we'd better do something before that next restart, or it will be a
cold
night in the lifeboat.

Now, we identify these as they come up. They arent urgent right now,
but
neither are they low priority (read: get dropped first). By putting a
name to this kind of issue, everyone on our team has a good
understanding of what these are.

Team Six
————

![](/assets/uploads/2012/01/team6.png)

We used to describe our super duper high priority issues as (wait for
it) very high priority. This didn't seem apt, as it was a bit higher
than high priority - and if you're going to make something high
priority
you may as well make it very high priority…

So we changed over to Team Six. This is what we use we have a critical
problem - like a site completely down and needs immediate response.
Like
someone phones in to say they've just seen Osama in the Mens toilets
again.

Everyone on the team drops what they're on to resolve this. Again, any
PM that makes an unjustified Team Six faces ridicule and humiliation.

Deploy blocker
———————

![](/assets/uploads/2012/01/monkey.png)

This isn't really a priority, but something that can be flipped on for
any issue.

Occasionally we'll have a situation where a feature or a bug issue
needs
to get finished and deployed before anything else. Say two developers
are working on a project, they'll need to co-ordinate so that the
blocker goes up with everything else.

The deploy blocker comes up on our [interactive
wallboard](http://redant.com.au/blog/the-story-behind-our-wallboard-whos-working-on-what-and-can-i-deploy-yet/)
so everyone is aware. Our Capistrano deployment process also won't
allow
anything to be deployed to the Production servers until this issue is
closed.

[Icons from Cuberto](http://cuberto-ru.deviantart.com/d2ux9pv)
