---
layout: post
title: How a project gets tested and deployed with GitFlow
permalink: /ruby-on-rails-devops/how-a-project-gets-tested-and-deployed-with-gitflow/
type: ideas
categories:
- automated-testing
- ruby-on-rails-devops
author: Ben Still
image:
  small: /assets/uploads/2013/09/github-465x331.jpg
  big: /assets/uploads/2013/09/github.jpg
meta:
  dsq_thread_id: '608783675'
excerpt:
  short: GitFlow is the way of the future. Find out why and how here.
  long: As our projects have grown larger, so has the complexity of testing and deploying work. We've started moving projects over to GitFlow in order to simplify this process, read on to see how we do it.
---

How we manage our test and deploy workflow has changed massively over
the years. Many moons ago we started off with no tests, manual
publishing and not much of a workflow. We've gradually changed this as
weve started making bigger sites with more complex requirements.

We still check things manually in a browser, but most of the heavy
lifting is done via automated tests to check each aspect of the site.
Once weve published a new version, it's hard not to have a poke around
to make sure everything is there- but we're really relying on an
automated deploy process to move that from the developers desktop,
through staging and on to the production server.

It seems that development workflow is something that varies quite a
lot
between different companies or teams. Part of this is the size of
projects they work on, and part of it is cultural.

- **size of project** - for a small static site made by a single
developer, a complex workflow might be overkill. As a project grows
and gets more people, things can start to get overlooked or broken
pretty quickly. People get bogged down in the mundane and detailed
steps of getting code onto a server. Days are lost, mistakes are
made, everyone gets grumpy.

<!-- -->
- **cultural (otherwise known as do you give a f-k?)** - how can I
put
this diplomatically some teams seem to be more focused on getting
things done quickly, or place more emphasis on how something looks
rather than how it behaves. This can be a cultural thing- adjusting
people and workflow that might have worked well in a traditional
advertising agency (for example) can be difficult. Everyone needs to
have a strong desire to make nice things well, and **do it** well.

We've invested quite a bit in improving our workflow, so that we get
very high reliability and confidence. Its meant taking people out of
the
equation and trying to automate each step. It also means that when we
do
hit a problem, we keep on tweaking the process to avoid a repeat.
We're
now able to continually push up new work to the live site as it gets
done.

To help explain where we are at with GitFlow, here is where we've been:

FTP
---

Back in the day a developer or designer would make code, and then
manually copy files up to the server. This has quite a few flaws -
apart
from taking time, it is easy to miss a file or forget to change
something. What happens to users on the site while you're uploading
new
files over the top of what they are using?

Version control
———————-

We started using Version Control tools like Subversion to allow
several
developers to work at once and merge changes. The current version is
then exported on to the server-ensuring the right version. Improved
accuracy, but deployment still takes time and can be prone to errors.

Capistrano
—————

With our move to Rails, our projects were getting a lot bigger.
Publishing was no longer about simply copying up some files- we needed
to do things like running database migrations and dynamically changing
configuration files. We wanted to be able to roll back to an earlier
version if there were any issues.

We started using Capistrano to automate things, including checking out
the right version, creating a completely new version of the site, and
the switching over the web server once the deploy is complete. Over
time
we added more steps and made the process smarter to talk with other
tools like JIRA and our wallboard. We also swapped over to Git for
better control and speed in Version Control.

Jenkins (Continuous Integration)
————————————————

We added Jenkins (or Jerkins as it is unkindly called when tests fail
or
take too long) to continually test projects as we work on them. Each
of
the stages [gets visualised in our Jenkins
Pipeline](/automated-testing/a-look-inside-our-jenkins-pipeline-how-we-make-reliable-stuff/),
which is like daytime TV for developers - you can sit and watch it all
day.

GitFlow
———-

GitFlow helps us manage different releases and versions of a project.
Think of it as a set of shortcuts that help manage Git workflow
better.
Were able to manage the release of different versions of the site, and
all of the different branches of code that each of our developers are
working on. GitFlow has also helped us improve the way we handle
hotfixes, which are those urgent changes that simply must go live. To
get a bit more detail on how GitFlow works, [take a look at this
post](http://nvie.com/posts/a-successful-git-branching-model/)

There are lots of different issues that GitFlow solves for us. One
example is just before releasing a big new feature, wed be unable to
publish small changes as the big feature would block.

To explain: a developer would be working on a new feature, and they
would merge their code and push it to staging for customer review. In
the meantime, someone might pick up a bug that needs to get fixed.
Were
then faced with the dilemma of where to make the change - to the new
release or the master version? That new feature can effectively block
the deployment process until it gets signed off. The customer feels
pressured to review and approve the feature so that the little change
can get fixed. Previously, we would often end up spending time
de-merging changes so that small urgent stuff could go up.

In a typical project, wed have 2-3 of these bigger features in the
works, and then a fairly regular flow of small changes that need to go
live. Using GitFlow, the small urgent changes get done as Hot Fixes.
GitFlow then makes sure that these not only up to the live version,
but
also get integrated back into any separate features (branches) that
other developers are working on.

As features are completed, they are merged back into the Develop
branch,
which [Jenkins then automatically
deploys](/blog/a-look-inside-our-jenkins-pipeline-how-we-make-reliable-stuff/)
to a development server for review. Once these are all approved, we
make
a release and these changes get added to the master version. These
then
get pushed up to the live production site.
