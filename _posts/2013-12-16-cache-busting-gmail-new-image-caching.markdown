---
layout: post
title: Cache busting Gmail's new image caching
permalink: /how-we-do/cache-busting-gmail-new-image-caching/
type: ideas
categories:
  - how-we-do
  - tool-reviews
author: Sam Bauers
image:
  small: /assets/uploads/2013/12/somebody-set-us-up-the-bomb-465x232.gif
  big: /assets/uploads/2013/12/somebody-set-us-up-the-bomb.gif
meta:
  description: Google's new image caching mechanism in Gmail is an email marketer's nightmare come true. Here's how to keep tracking your email opens in Gmail.
  focus_keywords: gmail
  keywords: Gmail, Google Mail, image cache, cache busting, email marketing
excerpt:
  short: This week, GMail announced images are on by default. If you're a marketer, you might have seen some posts about how exciting this is that we can now track emails again. #fail
  long: If you're a GMail user, you've probably seen an update explaining that <a href="http://gmailblog.blogspot.com.au/2013/12/images-now-showing.html">images are now on by default</a>. If you're a marketer, you might have seen some posts saying how exciting this is that email companies can now start tracking email opens again. (Un)fortunately this is a bit of wishful thinking or misinformation.
---

The basic story is that Google will now cache all images in HTML email
on their own servers, instead of having your email load the images
from
the original source. This is great for speed and reliability, and also
means as a marketer you can send images as part of your email
communication. But it **breaks** tracking.

A common practice in email marketing is to place "tracking" images
inside html emails in order to measure who opened which email when. A
very important piece of information, which can be used both
legitimately
and nefariously. Google sunk this practice by turning images off by
default. [Ars Technica has a good write up of the implications (Ars
Technica: Gmail blows up e-mail marketing by caching all images on
Google
servers)](http://arstechnica.com/information-technology/2013/12/gmail-blows-up-e-mail-marketing-by-caching-all-images-on-google-servers/)
for email marketers (and illegitimate spammers). But it doesn't try to
answer any questions about how the image caching works, and how to get
around it.

So that's what I'll try to do here.

### How Google email image caching actually works (rather than how
email vendors would prefer to believe it works)

To investigate how it actually works, we created some code to generate
random images and send these in emails. We then measured when and how
the image was retrieved from the host server. In other words, we
didn't
just make stuff up. You can download the source file at the end of
this
post.

To start with we need to build out all the potential ways a tracking
image could be served. This is a matrix of the construction of the URL:

- Filename always the same - e.g. http://example.com/images/same.png

- Filename always the same, querystring unique between emails - e.g.
http://example.com/images/same.png?12345
- Filename unique between emails- e.g.
http://example.com/images/same-12345.png

Also we need to consider the actual content of the image. Usually the
images used for tracking are 1 pixel by 1 pixel transparent GIFs, but
maybe the caching behaves differently depending on the actual content
of
the request, here are our variables:

- File content always the same
- i.e. http://example.com/images/same.png always returns the same
content

<!-- -->
- File content different between emails
- i.e. http://example.com/images/different.png always returns the
same content for that particular email

<!-- -->
- File content always different
- i.e. http://example.com/images/different.png always returns
different content for any email

This gives us a matrix of 9 different scenarios (well 8 actually,
because 2 of them are effectively the same). We can determine our file
naming for the tests from the matrix. It looks like this:

<table class="table table-bordered matrix">
<tbody>
<tr>
<td>
</td>
<td>
File content always the same

</td>
<td>
File content different between emails

</td>
<td>
File content always different

</td>
</tr>
<tr>
<td>
Filename always the same

</td>
<td class="active text-center" colspan="2">
same.png

</td>
<td class="active text-center">
different-always.png

</td>
</tr>
<tr>
<td>
Filename always the same, querystring unique between emails

</td>
<td class="active text-center">
same.png?r=12345

</td>
<td class="active text-center">
different.png?r=12345

</td>
<td class="active text-center">
different.png?r=12345&amp;a=1

</td>
</tr>
<tr>
<td>
Filename always unique between emails

</td>
<td class="active text-center">
same-12345.png

</td>
<td class="active text-center">
different-12345.png

</td>
<td class="active text-center">
different-always-12345.png

</td>
</tr>
</tbody>
</table>
To generate the files which need to be generated is reasonably simple,
I
created a short script which created a 3 by 3 grid of random colour
squares. Depending on the request, the colours would either always be
the same, always be the same based on a token that is unique for each
email, or always be different regardless of the unique token.

The result looks a bit like this:

<table class="table table-bordered matrix">
<tbody>
<tr>
<td>
</td>
<td>
File content always the same

</td>
<td>
File content different between emails

</td>
<td>
File content always different

</td>
</tr>
<tr>
<td>
Filename always the same

</td>
<td class="active text-center" colspan="2">
<img class="alignnone size-full wp-image-743" alt="same.png" src="/assets/uploads/2013/12/same.png" width="30" height="30">

</td>
<td class="active text-center">
<img class="alignnone size-full wp-image-739" alt="different-always.png" src="/assets/uploads/2013/12/different-always-1.png" width="30" height="30">

</td>
</tr>
<tr>
<td>
Filename always the same, querystring unique between emails

</td>
<td class="active text-center">
<img class="alignnone size-full wp-image-743" alt="same.png?12345" src="/assets/uploads/2013/12/same.png" width="30" height="30">

</td>
<td class="active text-center">
<img class="alignnone size-full wp-image-742" alt="different.png?r=12345" src="/assets/uploads/2013/12/different.png" width="30" height="30">

</td>
<td class="active text-center">
<img class="alignnone size-full wp-image-742" alt="different.png?r=12345&amp;a=1" src="/assets/uploads/2013/12/different-always-2.png" width="30" height="30">

</td>
</tr>
<tr>
<td>
Filename always unique between emails

</td>
<td class="active text-center">
<img class="alignnone size-full wp-image-743" alt="same-12345.png" src="/assets/uploads/2013/12/same.png" width="30" height="30">

</td>
<td class="active text-center">
<img class="alignnone size-full wp-image-742" alt="different-12345.png" src="/assets/uploads/2013/12/different.png" width="30" height="30">

</td>
<td class="active text-center">
<img class="alignnone size-full wp-image-742" alt="different-always-12345.png" src="/assets/uploads/2013/12/different-always-3.png" width="30" height="30">

</td>
</tr>
</tbody>
</table>
The left-hand column never changes its content between unique emails,
the middle column should always be different for different emails, and
without caching the column on the right should change on every
"refresh"
or open of the same email.

The test emails contained this matrix of images with the same random
token for that email inserted for each image in the table. The emails
were then sent to an existing email account hosted on Gmail. Server
logs
were watched for the image requests.

It was immediately apparent that the images were not cached on email
receipt, that is Google does not fetch the images at the time it
receives the email. Which makes sense emails opened would be less than
emails received, and even Google would want to take steps to reduce
the
burden on their cache.

This was observed from 5 minutes up to 48 hours between send and open.

So the images load on open, that's a huge relief for a start, but what
images will be fetched uniquely for each recipient?

We tested separate and unique sends, with combinations of page reload
with and without browser cache clearing. The result was that the most
reliably re-fetched file versions were ones which included a
querystring, regardless of their content.

Those were the files of the form:

* same.png?r=12345
* different.png?r=12345
* different.png?r=12345&a=1

Results in a nutshell
——————————-

#### 1. Images are retrieved for first user and then cached

When you send the email, nothing happens (which is unlike other
systems
like Facebook, where their bots behave proactively to retrieve
images).
When your email is opened the first time, the image is retrieved and
then shown. From that point, every other request for the image is
served
off the Google image cache. Which is a good thing unless you're a
spammer or an email tracking company. Or unless you make the image
unique (see #2)

#### 2. Use a querystring

It seems that at this time simply including a querystring on the image
request is enough to force the file to be refetched. Browser cache
does
get in the way of this though, so these images were re-fetched only if
they were not in the browser cache.

#### 3. The fetching IP will be Google rather than your user

So the first two points are not really much different from before as
most tracking tags work this way. But all is not rosy. Because of
Gmail's caching, certain information we used to get for free from
un-cached image tag requests will be lost. The IP address of the
request
will now always be one of Google's caching servers, and the user agent
will always be whatever Google decide they want it to be. Currently
the
user agent string for Gmail's caching servers is:

Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.0.7)
Gecko/2009021910 Firefox/3.0.7 (via ggpht.com)

Losing the IP address means losing the closest thing we have to
geographic data on email opens. There is no solution that I can think
of
which will allow you to obtain this information by other means
directly.
Javascript injection into the querystring certainly won't work in
Gmail,
as their security process justifiably strips out Javascript. It may be
possible to marry geographic data from clicks on the email to the open
retrospectively if both the open and the click carry a common unique
identifier.

#### Try it yourself

The log entries generated from the testing we did and the code used to
generate our random images are available [here (Gmail caching test -
code and results)](/assets/uploads/2013/12/gmail-caching-test.zip)
(MIT
License). If you're miffed and puzzled by the image at the top of this
post, we're just trying to get all that [long tail gmail using AYB
fan](http://en.wikipedia.org/wiki/All_your_base_are_belong_to_us)
traffic. Don't tell me image SEO doesn't work.
