---
title: Process Data
subtitle: Derive a list of differentially expressed genes from TCGA-OV RNA sequencing data
cover: cover2.png
date: 2014-02-27
layout: embedded
category: pathway_enrichment
badge: RNA-seq
order: 2
gist: 32c23ac64138c59b1a150987b023d57d
data:
  rank_list: MesenchymalvsImmunoreactive_edger_ranks.rnk.zip  
figures:
  figure_1: figure_processdata_overview.jpg
  figure_2: ranks_layout.png  
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Practical](#practical)
  - {:.list-unstyled} [IV. Data](#data)
  - {:.list-unstyled} [V. References](#references)

<hr/>

<div class="alert alert-warning text-justify" role="alert">
  To get the list of differentially expressed genes in TCGA-OV for 'immunoreactive' vs 'mesenchymal' subtypes ranked by p-value see <a href="#data">IV. Data</a>.
</div>

## <a href="#goals" name="goals">I. Goals</a>
This section is a follow-up to the section describing how to get [The Cancer Genome Atlas](http://cancergenome.nih.gov/abouttcga/overview) (TCGA) RNA sequencing (RNA-seq) data from high-grade serous ovarian cancer (HGS-OvCa) (Cancer Genome Atlas Research Network 2011).

In this section we will assess differential expression of RNA species between subtypes. Our over-overarching goal is to generate a list of those expressed genes ranked according to a probability value (p-value) suitable for downstream analysis (Figure 1).

By then end of this discussion you should:

1. Be able to use the [R](https://www.r-project.org/) package [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html) to test for differential expression
2. Obtain a list of genes for TCGA HGS-OvCa ranked by a function of the p-value for differential expression

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Goals.</strong> Steps required to process TCGA-OV RNA-seq data for differential expression between 'immunoreactive' and 'mesenchymal' subtypes. Text to the right of arrows are functions provided as part of the R/Bioconductor packages. In step 1, the data is filtered for genes with a minimum number of counts. The filtered data is then normalized and fit to a statistical model in steps 2-3.  In step 4, p-values for differential expression between subtypes is assessed and adjusted for multiple testing in step 5. Finally, the genes are ordered based upon a function of the p-values.
</div>

## <a href="#background" name="background">II. Background</a>

We refer the reader to our primer on [RNA sequencing analysis]({{ site.baseurl }}/primers/functional_analysis/rna_sequencing_analysis/) for a detailed description of the theory underlying the processing steps described here.

## <a href="#practical" name="practical">III. Practical</a>

### Software requirements

To transform the TCGA HGS-OvCa RNA-seq count data retrieved previously into a list of genes differentially expressed between 'mesenchymal' and 'immunoreactive' subtypes we will need the following materials.

- RNA-seq assay and category information
  - [TCGAOV_data.rda]({{ site.baseurl }}/workflows/pathway_enrichment/get_data/#data)  
- [R](https://www.r-project.org/) version 3.3.1
  - [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html) version 3.16.0   

We will assume files are located in a local directory `/Documents/data/TCGA/`.

```shell
Documents
|
|--- data
    |
    |--- TCGA
        |
        |--- TCGAOV_data.rda            
        |
        |--- Verhaak_JCI_2013_tableS1.txt            
        |
        |--- TCGA-OV
            |--- ...        
...
```

### Data processing



**Step 0: Installation**

Install and load the required packages from R/Bioconductor. Load the TCGA HGS-OvCa RNA-seq data and subtype assignments in the DGEList variable `TCGAOV_data` from the previous section.

<code data-gist-id="{{ page.gist }}" data-gist-hide-footer="true" data-gist-line="3-14"></code>

The DGEList contains an attribute `counts` which is a table identical to our input. The attribute `samples` is a table created with a column `lib.size` that states the total counts for the case.

||group |lib.size |norm.factors|
|----------|-------------|------|------|
|TCGA-24-2024-01A-02R-1568-13| Differentiated| 86537532| 1|
|TCGA-23-1026-01B-01R-1569-13| Differentiated| 47372890| 1|
|TCGA-04-1357-01A-01R-1565-13| Immunoreactive| 38040210| 1|
|TCGA-61-2000-01A-01R-1568-13| Immunoreactive| 57508980| 1|

**Step 1: Filter**

<code data-gist-id="{{ page.gist }}" data-gist-hide-footer="true" data-gist-line="16-21"></code>

The variable `row_with_mincount` stores genes with more than a minimum number of counts (10) per million mapped reads in n cases, where n is the smallest of the two subtypes. This step is intended to remove noisy genes with low expression.

**Step 2: Normalize**

<code data-gist-id="{{ page.gist }}" data-gist-hide-footer="true" data-gist-line="23-24"></code>

The function `calcNormFactors` is a [normalization procedure]({{ site.baseurl }}/primers/functional_analysis/rna_sequencing_analysis/#normalization) using the trimmed mean of M-values (TMM) approach. The reference sample can be specified as the parameter `refColumn` otherwise the library whose upper quartile is closest to the mean upper quartile is used.

||group |lib.size |norm.factors|
|----------|-------------|------|------|
|TCGA-24-2024-01A-02R-1568-13| Differentiated| 86537532| 1.0786188|
|TCGA-23-1026-01B-01R-1569-13| Differentiated| 47372890| 0.8619143|
|TCGA-04-1357-01A-01R-1565-13| Immunoreactive| 38040210| 0.9734212|
|TCGA-61-2000-01A-01R-1568-13| Immunoreactive| 57508980| 0.9503564|

The column `norm.factors` is simply our global correction factor for each library $$k$$ relative to the reference $$r$$.

$$
\begin{equation}
  \begin{split}
    f_k^r &= \frac{S_k}{S_{r}}    
  \end{split}
\end{equation}
$$

Recall from our discussion on normalization that $$S_k$$ represents our total RNA output whose increase will lead to under-sampling genes via RNA-seq and *vice versa*. The 'effective library size' replaces `lib.size` for each case and is computed by simply multiplying by `norm.factors`. This normalized result is used in downstream, differential expression testing and is a 'model-based' normalization in contrast to those that directly transform the raw data.

**Step 3: Fit**

<code data-gist-id="{{ page.gist }}" data-gist-hide-footer="true" data-gist-line="27-28"></code>

Here we're attempting to derive a squared biological coefficient of variation ($$\phi$$) from the data in order to parametrize our negative binomial model which we'll use in DE testing. The function `estimateCommonDisp` estimates the dispersion across all genes and adds the value as `common.dispersion` in DGEList.

```r
#[1] "counts"            "samples"    "common.dispersion"   "pseudo.counts"    
#[5] "pseudo.lib.size"   "AveLogCPM"
```

`estimateTagwiseDisp` estimates the dispersion for each gene and adds the list `tagwise.dispersion` to DGEList.

```r
names(TCGAOV_data)
#[1] "counts"            "samples"     "common.dispersion"  "pseudo.counts"     
#[5] "pseudo.lib.size"   "AveLogCPM"   "prior.n"            "tagwise.dispersion"
```

Let us take a look at the data we've generated. Below we plot the common dispersion (red) and per-gene dispersions estimates. Next up are the variances compared to those expected with a Poisson model (line) demonstrating the inflation due to biological sources.

<img src="/guide/media/workflows/pathway_enrichment/process_data/unnamed-chunk-2-1.png" title="plot of chunk unnamed-chunk-2" alt="plot of chunk unnamed-chunk-2" width="500" style="display: block; margin: auto;" /><img src="/guide/media/workflows/pathway_enrichment/process_data/unnamed-chunk-2-2.png" title="plot of chunk unnamed-chunk-2" alt="plot of chunk unnamed-chunk-2" width="500" style="display: block; margin: auto;" />

A negative binomial model can be fit from our data and dispersion estimated. From this, we calculate p-values $$P$$ for each gene. As described in our discussion of [differential expression testing]({{site.baseurl}}/primers/functional_analysis/rna_sequencing_analysis/#differentialExpression), $$P$$ represents the sum of all probabilities less than or equal to the probability under the null hypothesis for the observed count.

**Step 4: Test**

<code data-gist-id="{{ page.gist }}" data-gist-hide-footer="true" data-gist-line="31"></code>

The result of the function `exactTest` is a data structure with a `table` attribute that stores the p-values for each gene.

||logFC |logCPM |PValue|
|----------|-------------|------|------|
|ENSG00000000003| 0.01016134| 6.316852| 0.9154125718|
|ENSG00000000419| 0.07286626| 5.742385| 0.3871193323|
|ENSG00000000457| 0.06727284| 3.814321| 0.3411576097|
|ENSG00000000460| 0.24572199| 3.301272| 0.0095910907|

**Step 5: Adjust**

<code data-gist-id="{{ page.gist }}" data-gist-hide-footer="true" data-gist-line="33-37"></code>

The function `topTags` takes the output from `exactTest` and uses the [Bejamini-Hochberg (BH) procedure]({{ site.baseurl }}/primers/functional_analysis/multiple_testing/#controllingFDR) to adjust the p-values yielding the a 'BH-adjusted p-value' also known as 'q-value' (Yekutieli and Benjamini, J. Stat. Plan. Inf. v82, pp.171-196, 1999). In terms of the BH procedure, the BH-adjusted p-value is the smallest value of $$q^∗$$ for which the hypothesis corresponding to the p-value is still rejected. In practical terms, it means that values smaller than or equal to the given p-value have a false discovery rate equal to the BH-adjusted p-value. `topTags` returns the top differentially expressed genes. The output is similar to that of `exactTest` but with a column of adjusted p-values and sorted by increasing p-value.

||logFC |logCPM |PValue|FDR|
|----------|-------------|------|------|------|
|ENSG00000106624| -2.157814|  8.409861| 7.261311e-36 |6.595628e-32|
|ENSG00000113140 |-1.761172 |10.327175 |1.123712e-35 |6.595628e-32|
|ENSG00000166147| -2.134744|  5.739566 |3.422990e-35| 1.339416e-31|
|ENSG00000182492| -1.876400 | 8.821797| 1.503263e-34 |4.411702e-31|

We can now plot our differentially expressed genes (red) over our full data.


{% highlight r %}
### ============ Plotting ===============
rn = rownames(TCGAOV_TT$table)
deg =rn[TCGAOV_TT$table$FDR<0.05]
plotSmear(TCGAOV_filtered, pair=comparisons, de.tags=deg)
{% endhighlight %}

<img src="/guide/media/workflows/pathway_enrichment/process_data/unnamed-chunk-3-1.png" title="plot of chunk unnamed-chunk-3" alt="plot of chunk unnamed-chunk-3" width="500" style="display: block; margin: auto;" />

**Step 6: Rank**

<code data-gist-id="{{ page.gist }}" data-gist-hide-footer="true" data-gist-line="39-43"></code>

The rank of each gene is inversely proportional to the log of the $$P$$ as smaller values are less likely under the null hypothesis.
Set the gene name from the Ensembl gene ID to the `external_gene_name` which is compatible with the HGNC namespace.

The resulting data frame is saved as a tab-delimited file `MesenchymalvsImmunoreactive_edger_ranks.rnk` for use in downstream differential expression analysis.

<code data-gist-id="{{ page.gist }}" data-gist-hide-footer="true" data-gist-line="45-51"></code>

<hr/>

We present the preceding code in its entirety.

<code data-gist-id="{{ page.gist }}"></code>

## <a href="#data" name="data">IV. Data</a>

- {:.list-unstyled} Differential gene expression ranks
  - <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.data.rank_list }}" download>`MesenchymalvsImmunoreactive_edger_ranks.rnk.zip`</a>(293 KB)
  - Comparisons
    - 'Mesenchymal' vs 'Immunoreactive' TCGA HGS-OvCa subtypes
  - Format: tab-delimited  

  |   gene     |    rank    |
  |:----------:|:----------:|
  | TAP1 | 18.7588753128853 |
  | ETV7 | 15.9269868091652 |
  | CXCL10 |15.1998229003649 |
  | ... | ... |
  | AEBP1 | -35.2205529437008 |
  | SPARC | -35.2916247244998 |

<hr/>

## <a href="#references" name="references">V. References</a>

<div class="panel_group" data-inline="23975260,21720365,23359318"></div>

<!--
- Anders S et al. Count-based differential expression analysis of RNA sequencing data using R and Bioconductor. Nat Protoc vol. 8 (2013)
- Cancer Genome Atlas Research Network. Integrated genomic analyses of ovarian carcinoma. Nature vol. 474 (2011)
- Hout M et al. Multidimensional scaling. Wiley Interdiscip Rev Cogn Sci vol. 4 (2013) -->