---
title: Gene Set Enrichment Analysis
subtitle: Use the results of a differential expression analysis to identify enriched pathways using GSEA
pmid: 16199517
pdf: gsea_subramanian_pnas_v102_43_2005.pdf
cover: cover.jpg
date: 2016-04-20
layout: document
category: Software
draft: false
figures:
  figure_overview: figure_overview.png
  figure_1: figure_overview.png
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Summary & goals](#summaryGoals)
  - {:.list-unstyled} [II. Background](#background)  
  - {:.list-unstyled} [IV. References](#references)

  <hr/>

  <div class="alert alert-warning" role="alert">
    For this section we will require a rank file ('.rnk') which contains a list of genes ranked by p-value from differential expression testing. In the <a href="{{site.baseurl}}/datasets/archive/">Data Sets</a> section, we have provided samples for TCGA <a href="{{site.baseurl}}/datasets/TCGA_Ovarian_Cancer/process_data/#datasets">ovarian</a> and <a href="{{site.baseurl}}/datasets/TCGA_HNSCC/process_data/#datasets"> head and neck</a> cancer.
  </div>

## <a href="#summaryGoals" name="summaryGoals">I. Summary & goals</a>

In this section we will be using [Gene Set Enrichment Analysis (GSEA)](http://software.broadinstitute.org/gsea/index.jsp) to identify functionally related genes - pathways - enriched in our list of genes demonstrating differential expression. We will provide the motivation for this pathway analysis approach and a brief description of the statistical models that  define criteria for pathways that are significantly enriched. By then end of this discussion you should:

1. Be aware of how tools like GSEA map gene expression patterns to pathways
2. Be able to apply GSEA to test our ranked list of DE genes for enriched pathways

<br/>

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_overview }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Summary and Goals.</strong> This section provides background on.
</div>

## <a href="#background" name="background">II. Background</a>

Gene Set Enrichment Analysis is a tool that belongs to a class of second-generation pathway analysis approaches that are referred to by many names including *functional class scoring (FCS)* (Khatri 2012), *significance analysis of function and expression (SAFE)* (Barry 2005) and confusingly *gene set enrichment* (Ackerman 2009). Herein, we will refer to this specific category of tools by FCS.

FCS methods like GSEA share the same basic requirements as most other pathway analysis approaches.

1. Quantitive measurements relevant to a biological phenomena
2. Knowledge base(s) of pathways
3. A methodology for mapping measurements onto pathways

For the purposes of this discussion, our quantitative measurements are represented by a list of genes expressed differently in subtypes. Our section ['Get Data']({{site.baseurl}}/datasets/TCGA_Ovarian_Cancer/get-data/) described in detail how to source and extract the HGS-OvCa RNA sequencing (RNA-seq) data generated by TCGA. A follow-up section titled ['Process Data']({{site.baseurl}}/datasets/TCGA_Ovarian_Cancer/process-data/) details how to derive a list of genes ranked by p-value for differential expression.

Likewise, the methodology used by GSEA to map genes onto pathways is common amongst FCS approaches (Barry 2005).

1. Calculate a local score describing individual gene behaviour (e.g. p-value)
2. Calculate an aggregate score for the enrichment of genes in each pathway
3. Determine the significance of the global score
4. Correct for multiple hypothesis testing

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Overview of GSEA.</strong> This should be generic to FCS.
</div>

Below we describe the knowledge base along with the methodology underlying GSEA in greater detail. To motivate the discussion, conclude with a concrete example: Mapping our list of genes differentially expressed in subtypes of TCGA HGS-OvCa into a corresponding list of candidate pathways.

## <a href="#gsea" name="gsea">III. Gene Set Enrichment Analysis</a>

Gene Set Enrichment Analysis.

## <a href="#references" name="references">III. References</a>
<!-- <div class="panel_group" data-inline="19192285,15647293,26125594,22383865"></div> -->