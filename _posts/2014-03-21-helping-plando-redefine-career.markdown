---
layout: post
title: What we've been working on- Helping PlanDo redefine career
permalink: /digital-products/redefining-digital-hr-with-plan-do/
type: news
categories:
- digital-products
- lean-development
- our-work
author: Sam Bauers
image:
  small: /assets/uploads/2014/01/plando-small.png
  big: /assets/uploads/2014/03/plando-wide.png
excerpt:
  short: The world of employment and careers is due for a shakeup. We've been helping Plando build a career management platform that we think will fundamentally change the careers landscape.
  long: We've been helping Plando build a career management platform that will shakeup the world of employment and careers by giving individuals the tools to manage their own careers. Traditionally employees have been reliant on their employer's HR practices and tools to successfully map their career path. Plando changes all this. The project has been chock full of innovative ideas and code, with the whole project being built on the Grape API micro-framework
---

PlanDo are accommodating for and promoting the shift in the
professional
workplace towards career mobility by building a platform which will
allow for individuals to manage their own careers. That means that
instead of an employee being reliant on their employer's HR practices
and tools, they will be able to take control of their performance
review
cycles and independently map out their career path both within an
organisation and beyond.

You can [join the waiting list for an account on the PlanDo
website](http://plando.com)

At the same time PlanDo is aiming to provide tools for organisations
to
use their platform to better interact with their employees, adding
valuable feedback systems to existing HR management processes.

PlanDo has provided some serious challenges for Red Ant. The PlanDo
team
know the human resources domain well and have applied themselves to
thorough analysis of the state of existing offerings. That means we
ended up with lots and lots and LOTS of information, processes and
tools
to interpret and deliver within our domain (roughly defined as "making
stuff on the internet"). It's a rare web project where the business
analysis is the most difficult part. It is a sign of how ahead of the
curve this product is.

The "easy" part of building the site is full of innovations for us as
well. Without the constraints of a legacy system to maintain, for the
first time we have been able to exclusively use the [Grape API
micro-framework](https://github.com/intridea/grape) for the backend
API.
This has made for super-lean maintainable code.

When a user logs in to PlanDo they will be loading up an
[AngularJS](http://angularjs.org/) application on their browser. You
can
[read a bit more about what AngularJS does here (Have you noticed how
fast some sites are these
days?)](/pjax/asynchronous-javascript-frameworks-like-angular-js/).
Again we are pushing into some new territory by relying exclusively on
[GruntJS](http://gruntjs.com/) instead of Ruby on Rails and
Capistrano
to handle application builds. The process is quite **magical**- with
the
developer only needing to commit their changes with a special tag to
trigger a build on our [Travis](https://travis-ci.com/) continuous
integration servers (that's pretty new to us too - [we used to use
Jenkins (A look inside our Jenkins Pipeline C how we make reliable
stuff)](/automated-testing/a-look-inside-our-jenkins-pipeline-how-we-make-reliable-stuff/)).
If the GruntJS build succeeds, the static code is pushed back to the
repository to a "release" branch. The release manager can then simply
deploy the static HTML, Javascript and images from this branch, with
no
need for additional software on the server. At the moment this final
deploy step is still a Capistrano task, but it could easily be done
using GruntJS as well or some other tool. To top it all off, we run
both
the API and the front-end application through
[CodeClimate](https://codeclimate.com/) to check for any bad smells
in
the code.

A small up-front investment in these new methods and technologies has
shown dividends over time for the project. The team at PlanDo has
prioritised quality and innovation from the start and we can't wait to
release it to the world. If you are interested in getting an account
as
soon as they are available, then [add yourself to the waiting list at
the PlanDo website](http://plando.com)
