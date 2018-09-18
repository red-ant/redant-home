---
layout: post
title: A look inside our Jenkins Pipeline - how we make reliable stuff
type: ideas
categories:
- automated-testing
author: Ben Still
image:
  small: /assets/uploads/2012/02/jenkins-pipeline-start-465x337.png
  big: /assets/uploads/2012/02/jenkins-pipeline-start.png
meta:
  description: A quick outline of how we're using Jenkins and the Pipeline view to visualise where our builds are up to
excerpt:
  short: How we build relational trust; our integrated testing pipeline
  long: A review of how we use the Jenkins Pipeline feature of Jenkins Continuous Integration to visualise our automated tests and builds, and understand how close different tests are to completion.
---

It works like this: all of our team our beavering away making stuff.
As
soon as a developer finishes working on something, they commit their
work to Github (which is where we save our work). The gotcha is that
sometimes that thing they were working on then breaks someone else's
code. Or something which was working is no longer working as planned.
Ideally wed like to find out about this as soon as possible.

Jenkins sees a change has been made, and then grabs that version of
the
project, builds a completely new version of the site and content, and
then starts running some automated tests. These tests make sure that
each of the parts of the project work properly. Once everything
passes,
it gets a green light and Jenkins publishes this version of the code
to
a server (so us humans can take a look).

The big advantage to using a CI server like Jenkins is that any change
gets tested immediately. We don't rely on a human to test these, as
(lets be honest here) they can be a bit unreliable. They get sick,
they
get distracted, they skip steps in testing, and they complain when
asked
to do boring tasks like check the same thing again and again and
again.
Jenkins on the other hand is always there, happily running in the
background.

What can be tricky is understanding exactly where Jenkins is up to.
Has
the build just started, or is the testing almost complete? Is my
change
being tested now or is it sitting in a queue? Often several different
changes are made by several developers at once, so it is useful to
know
which is getting tested and if it broke, where. This is where the
**Pipeline** comes in - particularly when there are 3 or 4 anxious
developers all trying to get their work through to Production.

Jenkins Pipeline
————————

The **Jenkins Pipeline** gives us an overview of where these tests are
up to. We have a development and a master Jenkins Pipeline.
Development
is for releases to the development branch, and these get pushed to a
Dev
server. Master is the master branch, and is for all of our
[hotfixes](/blog/how-project-gets-tested-and-deployed-with-gitflow/)
and
tested releases. This gets pushed to UAT and then finally Production.
All of this might sound like a bit of a cumbersome process with many
steps (you might have worked with developers who say hey- I don't need
to test my stuff. I made it so I know it is Awesome!). But in this
everything is completely automated so it needs very little effort- all
a
developer needs to do is commit a change to kick it all off. The
upside
is that we can have a high degree of confidence that everything works
as
planned.

What the Jenkins Pipeline looks like
——————————————————

This is what the Jenkins Pipeline looks like when there are no tests
running for our [Michelle Bridges 12WBT project](/portfolio/12wbt/).
Each row is a build that relates directly to a commit, and the columns
are steps in the process. Green is good, and it means that test group
has all passed. You can see in this screenshot that there was a build
which failed the Cucumber tests (the big red box) earlier today,
followed by another which then passed.

![Jenkins Pipeline before a build has been kicked
off](/assets/uploads/2012/02/jenkins-pipeline-start.png "Jenkins
Pipeline before a build has been kicked off")

Step 1: rspec
——————-

![Jenkins Pipeline showing RSpec test
running](/assets/uploads/2012/02/jenkins-pipeline-rspec.png "Jenkins
Pipeline showing RSpec test running")

This is what the pipeline looks like when Ive just kicked off a build.
A
new row appears for my test. Everything goes blue and the active step
is
yellow. The Rspec tests are the various code tests which check to see
if
specific functionality is working.

Step 2: cucumber
————————

![Jenkins Pipeline showing Cucumber test
running](/assets/uploads/2012/02/jenkins-pipeline-cucumber.png "Jenkins
Pipeline showing Cucumber test running")

Once the Rspec tests pass, that box turns green, and then the next
step
starts - in this case Cucumber. This is running through all of the
Cucumber stories that we use to describe how different features work.

Step 3: metrics
———————-

![Pipeline showing MetricFu test
running](/assets/uploads/2012/02/jenkins-pipeline-metrics.png "Pipeline
showing MetricFu test running")

The Cucumber tests all get completed, and that box turns green. The
next
box is metrics, which we check with a set of tools called [MetricFu
(MetricFu Ruby Gem)](http://metric-fu.rubyforge.org/). These run
checks
to test quality in the code- looking for telltale signs like two parts
of code that do the exact same thing. While this might not be the
final
word on whether code is in fact good, we can pick up sudden spikes in
complexity or a drop in code test coverage. We've also added in
Breakman
to check for security flaws.

Step 4: deploy & check
———————————

![Jenkins Pipeline showing final post deploy test
running](/assets/uploads/2012/02/jenkins-pipeline-deploy.png "Jenkins
Pipeline showing final post deploy test running")

Finally, the tested code is then deployed to the server using
Capistrano. In this example (development pipeline) the version is
pushed
to our development server. There are a few checks that need to get
done
once everything is in place- for example a credit card payment process
that relies on a 3rd party payment service. These are difficult to do
inside the virtual environment of the CI server, so they get done on
an
actual server.

Step 5: All green - release the Pandas
———————————————————

![Jenkins Pipeline once a build is
complete](/assets/uploads/2012/02/jenkins-pipeline-end.png "Jenkins
Pipeline once a build is complete")

Once all the steps are done, everything goes green. You might notice
that this screenshot of the Jenkins Pipeline has a different release
number- that is because I am slow and Jenkins is fast. It started on
another build before I had a chance to screenshot. I am learning to
live
with my various shortcomings and deficiencies.

Next steps are to keep on [improving our test
times](http://arrrrcamp.be/videos/2011/corey-haines—-fast-rails-tests/),
since the faster these tests can run the sooner we can publish
changes.
When were busy well occasionally get a backlog of changes, Jenkins
becomes Jerkins and it can take a while for all of the builds to push
through.

Overall, using Jenkins and the Pipeline view has been extremely
useful.
We get good visibility over where different builds are at, and what
has
failed where. Jenkins itself has helped us improve our process flow -
particularly when used with
[Gitflow](/blog/how-project-gets-tested-and-deployed-with-gitflow/)
