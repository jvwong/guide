---
title: "Fisher's Exact Test"
author: jvwong
date: June 24, 2016
output: html_document
layout: markdown
---

This summation expression $$\sum_{i=1}^n X_i$$ appears inline as well.

## Hypergeometric
This is the code for the Fisher's Exact example:

{% highlight r %}
## A hypergeometric distribution example

## Required libraries
library(ggplot2)

## Consider a hypergeometric ~ N = 32, S = 15, x = 12

nSuccess <- 15 # total successes available
nFailure <- 17 # total failures available
draws  <- 15 # number actually drawn

# Create the domain of nomimal success values
x0 <- 0:15

# Create the vector of probabilities
probs <- dhyper(x0, nSuccess, nFailure, draws, log = FALSE)
dat0 <- data.frame( x = x0, y = probs )

# bar plot
# Convert the x variable to a factor, so that it is treated as discrete
ggplot(dat0, aes(x=factor(x), y=y)) +
  geom_bar(stat="identity", fill= "#2c3e50", colour="black")
{% endhighlight %}

![plot of chunk unnamed-chunk-1](/guide/media/primers/statistics/unnamed-chunk-1-1.png)