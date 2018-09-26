<!doctype html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="{{ page.lang | default: site.lang | default: "en" }}"> <![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8" lang="{{ page.lang | default: site.lang | default: "en" }}"> <![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9" lang="{{ page.lang | default: site.lang | default: "en" }}"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="{{ page.lang | default: site.lang | default: 'en' }}">
<!--<![endif]-->
{% include head.html %}
<body class="{{ page.class }}">
  <div class="main-layout">
    {% include nav.html %}

    {{ content }}

    {% include footer.html %}
  </div>
</body>
</html>