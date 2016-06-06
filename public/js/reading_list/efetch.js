---
---
(function(){

  {% for entry in site.data.reading_list.standards %}

    var url = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=" +
     "{{ entry.uids | join: ',' }}";

    $.ajax({
        type: "GET",
        url: url,
        cache: false,
        dataType: "xml"
    })
    .done(function( xml ) {
      var $panel_group = $('.reading-list.panel-group');
      $panel_group.append('<h3 class="reading-list category">{{ entry.category}}</h3>');

      $( xml )
        .find( "PubmedArticle" )
        .each(function(index, element){
          var panel =
            '<div class="reading-list panel">' +
              '<a class="panel-toggle" role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="true" aria-controls="collapseOne">' +
                '<div class="reading-list panel-heading" role="tab" id="headingOne">' +
                  '<h2 class="panel-title">some title</h2>' +
                  '<span class="panel-meta author">some author</span><br/>' +
                  '<span class="panel-meta journal">some meta data</span>' +
                '</div>' +
              '</a>' +
              '<div class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">' +
                '<div class="panel-body">' +
                  '<p class="abstract-text"></p>' +
                  '<a class="article-link" target="_blank"><i class="fa fa-link fa-lg" aria-hidden="true"></i></a>' +
                '</div>' +
              '</div>' +
            '</div>',
          html = $($.parseHTML(panel));

          //Set the panel-id
          html.find('.panel-toggle').attr("href", "#panel_id{{ forloop.index }}" + index);
          html.find('.panel-collapse.collapse').attr("id", "panel_id{{ forloop.index }}" + index);

          //Set the link
          $medlineCitation = $( this ).find('MedlineCitation');
          $pmid = $medlineCitation.children('PMID');

          html.find('.panel-collapse.collapse .panel-body .article-link')
              .attr("href", "http://www.ncbi.nlm.nih.gov/pubmed/" + $pmid.text());

          //Article
          $article = $medlineCitation.find('Article');
          $articleTitle = $article.find('ArticleTitle');
          $abstractText = $article.find('Abstract AbstractText');

          //AuthorList
          $author = $( this ).find('AuthorList Author').first();
          $afirst = $author.find('ForeName');
          $alast = $author.find('LastName');

          //JournalIssue
          $journal = $article.find('Journal');
          $jvolume = $journal.find('JournalIssue Volume');
          $jyear = $journal.find('JournalIssue PubDate Year');
          $jISOAbbreviation = $journal.find('ISOAbbreviation');

          html.find('.panel-heading .panel-title').html( $articleTitle.text() );
          html.find('.panel-heading .panel-meta.author').html(
            [ $afirst.text(), $alast.text() ].join(' ')
          );
          html.find('.panel-heading .panel-meta.journal').html(
            [ $jISOAbbreviation.text(), "v" + $jvolume.text(), $jyear.text() ].join(' ')
          );
          html.find('.panel-body .abstract-text').html( $abstractText.text() );
          $panel_group.append( html );
        });
    });
  {% endfor %}
}());
