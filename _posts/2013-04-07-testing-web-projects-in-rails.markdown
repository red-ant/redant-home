---
layout: post
title: Testing web projects
permalink: /automated-testing/testing-web-projects-in-rails/
type: ideas
categories:
- automated-testing
- ruby-on-rails-devops
author: Ben Still
image:
  small: /assets/uploads/2013/10/milo-closeup-465x348.jpg
  big: /assets/uploads/2013/10/milo-closeup-465x348.jpg
meta:
  description: As web projects grow in complexity, the testing process gets more and more difficult. Introducing, Automated Testing and Test Driven Development (TDD).
  focus_keywords: automated testing web projects
excerpt:
  short: One of the things we've started doing quite differently over the last few years is how we test our web projects
  long: One of the things we've started doing quite differently over the last few years is how we test our web projects. Now, most people would (rightly) assume we actually check or test our work before sending it live. But **how** we do this testing has changed drastically.
---

For testing a web project, there are four key things:
——————————————————————————-

1. does it work OK?
2. does it look OK?
3. is everything else still working?
4. are there any security holes?

Back in the day - small scale testing
——————————————————-

When we started out, we would make something and then someone would
test
that it actually works. So a Designer would create a layout of say a
Contact Us form, and then a Developer would write the code, push this
to
a server and then a Project Manager would test that it works and looks
OK. Theyd try to break things by putting letters where numbers were
meant to go, and check which fields could be left blank. They'd check
that an email gets sent and the data is recorded OK.

This approach works well in a few conditions:

- **Limited features** - there aren't that many of these "features"
to
test. The variations can be feasibly tested by someone within say an
hour or so

- **Single developer** - only one person has been working on this, so
no chance that another developer will unknowingly add something
which will break something else

- **Waterfall** - the project is following a "waterfall" release
process. The way that the feature should work has been extensively
documented, and any changes will be in a completely separate future
release
- **Infrequent deploys** - this gets deployed to the live site once,
and then won't need to get updated for a while (so we can
comfortably assume nothing will change)

As web projects grow in complexity, the testing process gets more and
more difficult. Imagine the frog in the hot water - at a certain point
he has a desire to jump out.

An increase in project size and complexity means the testing process
gets more onerous. More parts means more things to test. Dependencies
between moving parts means that if one part breaks, you'll also need
to
retest the other parts. Complexity means it becomes difficult for
someone to know how everything is meant to work - with the result that
they only pick up the really broken bits.

Imagine a scale, with a really simple project on one end, and a really
hairy complex one on the other. As you move the dial along that scale,
there are a few options

1. get a lot more people to do all these tests
2. and then find more people after all those people quit
3. take much longer
4. don't do as many tests

…none of which are particularly appealing.

Meet my little friend, Automated Testing
————————————————————

![my little friend](/assets/uploads/2013/04/my-little-friend.jpg "my
little friend")

As you can imagine, lots of people have had this problem, and they've
come solved it in various imaginative ways to avoid being that boiled
frog.

In a nutshell, modern web development like Ruby on Rails uses
automated
software to do the tests. In fact, the usefulness of doing this has
changed the actual process of building web sites and apps. Rather than
building something and then testing it, Test Driven Development (or
"TDD" if you're in the Kool Klub) means starting with the Test first.

**Waterfall:**

Think of the feature \\&gt; extensively document \\&gt; build \\&gt;
test by
checking the doc

**TDD:**

Think of the feature \\&gt; write the test(s) \\&gt; test fails \\&gt;
build \\&gt; test
passes

The basic idea is this:

First up: testing things is really important. If things don't get
tested, quality will suffer and everyone gets grumpy.

Second: instead of a human checking everything, lets do it with code
more comprehensively. And let's do it ALL THE TIME.

Automated testing has two main flavours:

- **unit tests** - check very specific things within the code. So
taking our Contact Us example, it could check that fields are
validating correctly and that the email address is set up OK
- **end to end tests** - using a "headless" browser, this mimics the
way a real user goes through the site - filling out fields and
clicking on buttons, and then checking that the right layout and
text is appearing on the thank you page.

We can use a combination of these to test a project. End to end is
useful as they test what a real user sees, but they tend to take a
relatively long time to run. As a project grows, they have a tendency
to
overlap (so you can be testing a log in step in several different
tests).

Ideally the test suite runs as quickly as possible. This means that
the
Developer gets immediate feedback, so they can work faster. If they
need
to wait an hour for the tests to run, they are often off onto
something
else. Getting feedback quickly means they know that what they've just
done has broken something else.

Apart from testing to see if something is looking and working OK, we
can
also test for vulnerabilities. Has this new field on the Contact Us
form
introduced a loophole that can be exploited? As part of our tests, we
use Brakeman to [test for Rails security vulnerabilities
(Vulnerability
scanning - checking code every time before it gets
deployed)](http://redant.com.au/blog/vulnerability-scanning-ruby-on-rails/).
