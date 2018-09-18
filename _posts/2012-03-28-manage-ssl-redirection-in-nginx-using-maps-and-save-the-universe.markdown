---
layout: post
title: Manage SSL redirection in Nginx using maps, and save the universe
type: ideas
categories:
- ruby-on-rails-devops
author: Sam Bauers
image:
  small: /assets/uploads/2013/10/milo-on-floor-465x348.jpg
  big: /assets/uploads/2013/10/milo-on-floor-1024x768.jpg
meta:
  description: A simple tutorial showing how to manage a large list of rewrite rules to enforce SSL/HTTPS or PLAIN/HTTP in Nginx.
  dsq_thread_id: '626766201'
  focus_keywords: nginx ssl redirection
excerpt:
  short: Solutions to simple yet common and frustrating problems. We spill the beans on how we do it.
  long: What if (block) Nginx really can do it all? It's taken a little customisation but we think we've found the solution to a simple yet common and frustrating problem with redirects and HTTPS and HTTP connections. Plus, see a upside down picture of a cute dog!
---

The problem
—————-

We need to be able to enforce SSL connections (HTTPS) on some URLs. We
also need to be able to enforce PLAIN connections (HTTP) on others.
Further, there are some URLs which we want to just stay with whatever
protocol they were requested on so they won't redirect at all.

One approach is to use a great big series of rewrite rules, but that
would be pretty unwieldy, would involve a bunch of regular expression
variable capturing, and likely also mean using more than a couple of
if
blocks (which I have been told are [evil (Nginx wiki - if is
evil)](http://wiki.nginx.org/IfIsEvil) and slow, even if few people
have
the sort of traffic where that really matters). We also may have to
maintain them across two virtual hosts, making it hard to check for
conflicts between the two lists. In cases where the virtual host pulls
double duty serving HTTP on port 80 and HTTPS on port 443
simultaneously, we would have to check the protocol first as well,
further confusing the config. There has to be a better way.

We already use [Nginx maps (Nginx
HttpMapModule)](http://wiki.nginx.org/HttpMapModule) to create
standard
redirect lists on some sites, but mostly these are static lists which
are used to redirect old URLs to new ones. We do this so that when we
rebuild sites using Ruby on Rails they don't loose the Google juice
that
is already attached to all those horrible, horrible
\`default.aspx?foo=bar&578432754230\` URLs…

Yes, I'm looking at **you** .NET developers.

<img src="/assets/uploads/2013/10/milo-on-floor-1024x768.jpg" width="100%" />

The wiki page on [Nginx maps (Nginx
HttpMapModule)](http://wiki.nginx.org/HttpMapModule) gives a basic
example of using a map to redirect request URLs to new locations. But
that is no good for us, because we explicitly want to redirect only if
the protocol is not our preferred one. We also only want to redirect
to
the same URL, albeit over a different protocol. A basic map like that
will send our client into a redirect loop. We would need two separate
maps and that kind of takes us back to square one. There is also
potentially a problem with making matches too broad in separate maps
and
causing redirect loops again, whereas a single map will match only one
value. Using one map we can also take advantage of the map default.
It's
complicated, so just trust me **separate maps = do not want!**

The solution
——————

Rather than build a map of request URIs to redirect locations, we are
instead going to build a map of request URIs and their preferred
protocols http, https, or none.

Here's what a really simple example of that might look like:

\`\`\` {.code}
map $uri $example_org_preferred_proto {
default "http";
~^/(images|css|javascript)/ "none";
~^/sign-up/ "https";
~^/account/ "https";
}
\`\`\`

The first line defines the \`map\` block. The first variable \`$uri\`
is
what we are checking against in our case the incoming request URL
without the protocol, host name or query string. The second variable
\`$example_org_preferred_proto\` is what we will map the result of
the
match to.

The second line is a special default case inside the map. Most of our
URLs should always be HTTP, so if none of the patterns in the block
match the requested URL, then the result will default to this value of
http. You may want to default to one of the other values depending on
which will save you more rules and give you the shortest list.

The third line is matching our static assets directories which we need
to be available over both HTTP and HTTPS. So we assign them a value of
none. Since Nginx 0.9.6 you can use regular expressions inside maps.
The
tilde character \\~ at the start of this line indicates that this is a
regular expression. These work like other regular expressions in Nginx
which I **wont** explain here.

The fourth and fifth lines make sure that our sign ups and account
management pages are always HTTPS. This could have been done in one
line
like the previous one, but part of the point of doing this is to
create
logical and readable groupings of URLs to ease ongoing maintenance. In
a
much longer list, this will matter more.

Inside our virtual host configuration we can apply the map like this:

\`\`\` {.code}
map $uri $example_org_preferred_proto {
default "http";
~^/(images|css|javascript)/ "none";
~^/sign-up/ "https";
~^/account/ "https";
}
server {
listen 80;
server_name example.org;
root /var/www/example.org/htdocs;
if ($example_org_preferred_proto = "https") {
return 301 https://example.org$request_uri;
}
}
server {
listen 443 ssl;
server_name example.org;
ssl_certificate /var/ssl/example.org.crt;
ssl_certificate_key /var/ssl/example.org.key;
root /var/www/example.org/htdocs;
if ($example_org_preferred_proto = "http") {
return 301 http://example.org$request_uri;
}
}
\`\`\`

Note that the map is defined outside of the \`server\` blocks. That's
one
of the advantages of this method over a series of rewrites the map is
setup when Nginx starts and is available globally throughout the
configuration. This is supposed to improve performance but I don't
know
why exactly as the mapping itself occurs on demand. I'm happy to
remain
ignorant of the specifics here. It also is a bit easier on the
readability of your logs if you are debugging your Nginx configuration
as it outputs less debug lines.

The real payoff is in those \`if\` blocks, we simply query the
preferred
scheme for this request and if it doesn't match, then we redirect to
it.
Here Ive used permanent redirects by indicating 301, but during
testing
it is wise to use temporary redirects by indicating 302 instead.

But I'm behind a load balancer which handles the SSL, so this won't work
for me!
—————-

True, very true. Some people are behind load balancers which do SSL
termination for the incoming requests. This means that they are
usually
utilising a single \`server\` block for their virtual host
configuration
and that virtual host is set to only listen on port 80, because
everything being passed to it is in PLAIN/HTTP.

For these cases we need to make a couple of adjustments to use the
X-Forwarded-Proto header that is usually sent by the load balancer. By
doing so we can detect the incoming request's original protocol, a
task
which was done automatically in the previous example due to the
separate
server blocks listening on different ports.

\`\`\` {.code}
map $uri $example_org_preferred_proto {
default "http";
~^/(images|css|javascript)/ "none";
~^/sign-up/ "https";
~^/account/ "https";
}
server {
listen 80;
server_name example.org;
root /var/www/example.org/htdocs;
# If there is no preferred protocol, then prefer the current protocol
if ($example_org_preferred_proto = "none") {
set $example_org_preferred_proto $http_x_forwarded_proto;
}
# Redirect if the forwarded protocol doesn't match the preferred
scheme
if ($example_org_preferred_proto != $http_x_forwarded_proto) {
return 301 $example_org_preferred_proto://example.org$request_uri;
}
}
\`\`\`

We have to add an additional \`if\` block here so that our URLs that
prefer none don't go into redirect loops. It simply re-maps the URLs
preferred protocol to whatever the forwarded protocol was. For those
URLs, the next \`if\` block will never be true, so no redirect occurs
for
none. Great!

It might be possible to map the none URLs directly to
\`$http_x_forwarded_proto\` in the map itself, but my guess is that
doing
so would be slower for large lists due to the variable requiring
expansion several times.

In the second \`if\` block we simply redirect to the preferred protocol
if
it doesn't match the forwarded protocol from the load balancer. That
covers both the remaining http and https cases.

If you aren't behind a load balancer, but use a single server block
listening on port 80 and 443 for HTTP and HTTPS traffic, you can
probably use a similar method, substituting
\`$http_x_forwarded_proto\`
with \`$scheme\`.

If you have a big map, then you may hit Nginx's memory limit for map
hashes. This can be increased using the directives
[map_hash_max_size
(Nginx HttpMapModule
map_hash_max_size)](http://wiki.nginx.org/HttpMapModule#map_hash_max_size)
and [map_hash_bucket_size (Nginx HttpMapModule
map_hash_bucket_size)](http://wiki.nginx.org/HttpMapModule#map_hash_bucket_size).
In any case, Nginx will tell you what's up when you try to restart it.

If you have any questions specific to your setup, or any suggestions
for
improving these methods then drop a comment here.
