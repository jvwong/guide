---
title: Fisher's Exact Test
author: Jeffrey V Wong
date: June 29, 2016
output: html_document
category: statistics
layout: markdown
---

> The content of this document was adapted from the tutorial by Freeman JV and Campbell MJ, "The Analysis of Categorical Data: Fisher's Exact Test", Scope 2007; 16(1).

## Introduction
Obtaining a gene list from a large-scale expression analysis is typically just the first step in an analysis pipeline. A set of approaches collectively known as 'enrichment' or 'over-representation' analysis have been developed over the past decade to aid in the interpretation. In simple terms, these methods seek to identify subsets of genes within a list that share a common theme,  for example, genes which are components of the protein translation machinery. Such themes are defined *a priori* in the form of 'gene sets' drawn from curated databases such as the Gene Ontology (The Gene Ontology Consortium 2000).   

As might be expected, the size of gene sets vary widely. Moreover, a given gene set can have few or many representitives within an experimentally-derived list.    

## Conditions
Fisher's exact test is useful when collected data is classified two different ways; One wonders if the proportions within one category are associated with the proportions of the other. Typically, this data can be displayed in the form of a contingency table.

> Aside: A **contingency table** shows the distribution of one variable in rows and another in columns, used to  study the association between the two variables.

Concretely, suppose we have performed an mRNA expression analysis of tumour and matched normal cells.

|                      | **Differentially Expressed** | **NOT Differentially Expressed**   | *Totals*       |
|----------------------|------------------------------|------------------------------------|----------------|
| **In Gene Set**      | $$x$$                        | $$b$$                              | $$r$$          |
| **NOT In Gene Set**  | $$n$$                        | $$d$$                              | $$N - r$$      |
| *Totals*             | $$n$$                        | $$N-n$$                            | $$N$$          |



## Hypergeometric
This is the code for the Fisher's Exact example:

{% highlight r %}
## A hypergeometric distribution example
## author: jvwong
## date: 06/24/2016
## updated: 06/24/2016

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

![plot of chunk unnamed-chunk-1](/guide/media/primers/statistics/fishers_exact_test/unnamed-chunk-1-1.png)

Note that the `echo = FALSE` parameter was added to the code chunk to prevent printing of the R code that generated the plot.