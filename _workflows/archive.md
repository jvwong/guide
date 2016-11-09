---
title: Workflows
subtitle: Learn how to perform end-to-end data analyses
layout: panelista
categories:
  - Enrichment Analysis
---

{% for category in page.categories %}
  {% assign docs = (site.workflows | where: 'category' , category ) %}
  <h2 class="page-category">{{ category | replace: '_', ' ' }}</h2>
  <hr/>
  <div class="workflows">
    {% include archive_list.html %}
  </div>
{% endfor %}