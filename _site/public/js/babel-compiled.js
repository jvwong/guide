!function e(t,n,a){function r(o,s){if(!n[o]){if(!t[o]){var c="function"==typeof require&&require;if(!s&&c)return c(o,!0);if(i)return i(o,!0);var d=new Error("Cannot find module '"+o+"'");throw d.code="MODULE_NOT_FOUND",d}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return r(n?n:e)},l,l.exports,e,t,n,a)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<a.length;o++)r(a[o]);return r}({"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.boot.js":[function(e,t,n){"use strict";t.exports=function(){var e;return e=function(){$(document).ajaxStart(function(){$("#ajax-spinner").show()}).ajaxStop(function(){$("#ajax-spinner").hide()})},{initModule:e}}()},{}],"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.efetch_panel.jsx":[function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=e("react-dom"),c=e("react"),d=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={data:[]},n}return i(t,e),o(t,[{key:"loadArticleSets",value:function(){function e(){var n=a.shift();n&&(n.deferred.fail(function(t,n){e()}),n.deferred.done(function(a,i){r.push({xml:a,category:n.category,index:n.index}),t.setState({data:r}),e()}))}var t=this,n="https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=",a=[],r=[];$.each(this.props.input,function(e,t){var r=t.uids||[],i=t.category||"";a.push({deferred:$.ajax({type:"GET",url:n+r.join(","),cache:!1,dataType:"xml"}),index:e,category:i})}),e()}},{key:"componentDidMount",value:function(){this.loadArticleSets()}},{key:"render",value:function(){var e={category:{marginTop:"3em"}},t=this.state.data.map(function(t,n){var a=$(t.xml).find("PubmedArticle").map(function(e,t){var a=Date.now();return c.createElement(l,{data:t,id:["identifier",n,e,a].join("-"),key:e})});return c.createElement("div",{className:"subpanel",key:n},function(){if(t.category){var n=String(t.category).replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g,"").replace(/\s/g,"");return c.createElement("a",{href:["#",n].join(""),name:n},c.createElement("h3",{style:e.category,className:"category"},t.category))}}(),a)});return c.createElement("div",{className:"panel-group",id:"accordion",role:"tablist"},t)}}]),t}(c.Component),l=function(e){function t(){return a(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),o(t,[{key:"rawMarkup",value:function(e){return{__html:e}}},{key:"render",value:function(){var e,t,n,a,r,i,o,s,d,l,u,p,g,f,m,h,y;e=$(this.props.data),n=e.find("MedlineCitation"),a=n.children("PMID"),t=e.find('PubmedData ArticleIdList ArticleId[IdType="pmc"]'),r=n.find("Article"),i=r.find("ArticleTitle"),o=r.find("Abstract AbstractText"),s=e.find("AuthorList Author").first(),d=s.find("ForeName"),l=s.find("LastName"),u=s.find("CollectiveName"),p=l.text()?[l.text(),d.text()[0]].join(" "):u.text(),g=n.find("MeshHeadingList MeshHeading DescriptorName"),f=r.find("Journal"),m=f.find("JournalIssue Volume"),h=f.find("JournalIssue PubDate Year"),h.text()||(h=f.find("JournalIssue PubDate MedlineDate")),y=f.find("ISOAbbreviation");var b=[y.text(),"vol. "+m.text(),"("+h.text()+")"].join(" "),j=o.map(function(){return[$(this).attr("Label"),$(this).text(),"<br/>"].join("<br/>")}).get().join(""),w=g.slice(0,5).map(function(){return['<span class="badge">',$(this).text(),"</span>"].join("")}).get().join(""),v={panel:{a:{textDecoration:"none"},panelHeading:{div:{padding:"0.8em",background:"#34495e",color:"#ecf0f1"},panelTitle:{fontSize:"1.2rem"},panelMeta:{color:"#95a5a6"},badge:{fontWeight:"200"}}}};return c.createElement("div",{className:"panel"},c.createElement("a",{style:v.panel.a,className:"panel-toggle",href:["#",this.props.id].join(""),role:"button","data-toggle":"collapse","data-parent":"#accordion"},c.createElement("div",{style:v.panel.panelHeading.div,className:"reading-list panel-heading",role:"tab",id:"headingOne"},c.createElement("h2",{style:v.panel.panelHeading.panelTitle,className:"panel-title"},i.text()),c.createElement("span",{style:v.panel.panelHeading.panelMeta,className:"panel-meta author"},p),c.createElement("br",null),c.createElement("span",{style:v.panel.panelHeading.panelMeta,className:"panel-meta journal"},b),c.createElement("div",{style:v.panel.panelHeading.badge,className:"panel-meta reading-list badge-list",dangerouslySetInnerHTML:this.rawMarkup(w)}))),c.createElement("div",{id:this.props.id,className:"panel-collapse collapse",role:"tabpanel"},c.createElement("div",{className:"panel-body"},c.createElement("p",{className:"abstract-text",dangerouslySetInnerHTML:this.rawMarkup(j)}),function(){var e;return e=t.text()?c.createElement("a",{style:v.panel.a,className:"article-link",target:"_blank",href:["http://www.ncbi.nlm.nih.gov/pmc/",t.text()].join("")},c.createElement("i",{className:"fa fa-link fa-lg"}),[" PubMed Central: ",t.text()].join("")):c.createElement("a",{style:v.panel.a,className:"article-link",target:"_blank",href:["http://www.ncbi.nlm.nih.gov/pubmed/",a.text()].join("")},c.createElement("i",{className:"fa fa-link fa-lg"}),[" PubMed: ",a.text()].join(""))}())))}}]),t}(c.Component),u=function(e){e.each(function(e,t){var n=$(this),a=n.data("reflist"),r=[];return!!a&&(r=[{category:"",uids:[a]}],void s.render(c.createElement(d,{input:r}),n[0]))})};t.exports={initModule:u}},{react:"react","react-dom":"react-dom"}],"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.index.js":[function(e,t,n){"use strict";var a=e("cytoscape");t.exports=function(){var e,t,n,r={baseurl:void 0},i={$container:void 0};return t=function(e){a({container:e,userZoomingEnabled:!1,userPanningEnabled:!1,boxSelectionEnabled:!1,autounselectify:!0,style:[{selector:"node",css:{width:"label",shape:"rectangle",content:"data(name)","text-valign":"center","text-halign":"center","text-wrap":"wrap","padding-left":"5px","padding-right":"5px","padding-top":"10px","padding-bottom":"10px","background-color":"#7f8c8d",color:"#ecf0f1","font-size":"0.9em"}},{selector:".hub",css:{shape:"ellipse","padding-left":"10px","padding-right":"10px","background-color":"#7f8c8d",color:"#ecf0f1"}},{selector:"$node > node",css:{"padding-top":"10px","padding-left":"10px","padding-bottom":"10px","padding-right":"10px","text-valign":"top","text-halign":"right","background-color":"#ecf0f1",color:"#2c3e50","font-size":"0.9em"}},{selector:".linkout",css:{"background-color":"#2980B9","padding-top":"10px","padding-bottom":"10px"}},{selector:"edge",css:{"target-arrow-shape":"triangle","curve-style":"bezier"}},{selector:":selected",css:{"background-color":"black","line-color":"black","target-arrow-color":"black","source-arrow-color":"black"}}],elements:{nodes:[{data:{id:"rna-seq-to-enrichment-map",name:"Workflow: RNA-Seq to Enrichment Map",parent:"level_group"},classes:"linkout",position:{x:125,y:0}},{data:{id:"processing_group",name:"Gene Level"}},{data:{id:"rnaseq_data",name:"Get gene expression (RNA-Seq)",parent:"processing_group"},position:{x:125,y:125}},{data:{id:"assess_de",name:"Get differential expression",parent:"processing_group"},position:{x:125,y:225}},{data:{id:"interpret_gene_list",name:"Interpret gene list"},classes:"hub",position:{x:125,y:350}},{data:{id:"pathway_id_group",name:"Pathway Level"}},{data:{id:"pathways_enrichment",name:"Enrich for pathways",parent:"pathway_id_group"},position:{x:125,y:450}},{data:{id:"pathways_visualize",name:"Visualize pathways",parent:"pathway_id_group"},position:{x:125,y:550}}],edges:[{data:{id:"rna-seq-to-enrichment-map-start",source:"rna-seq-to-enrichment-map",target:"rnaseq_data"}},{data:{id:"rnaseq-de",source:"rnaseq_data",target:"assess_de"}},{data:{id:"de-interpret",source:"assess_de",target:"interpret_gene_list"}},{data:{id:"interpret-enrich",source:"interpret_gene_list",target:"pathways_enrichment"}},{data:{id:"enrich_viz",source:"pathways_enrichment",target:"pathways_visualize"}}]},layout:{name:"preset",padding:5}})},n=function(e){i.$container=e},e=function(e){return!!e.length&&(r.baseurl=e.data("baseurl"),n(e),t(i.$container),void $(document).ready(function(){var e=$(window).width();$(".sidebar-toggle").tooltip("show"),e>=768&&$("#sidebar-checkbox").prop("checked",!0)}))},{initModule:e}}()},{cytoscape:"cytoscape"}],"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.js":[function(e,t,n){"use strict";var a=e("./guide.boot.js"),r=e("./guide.efetch_panel.jsx"),i=e("./guide.index.js");t.exports=function(){var e;return e=function(){a.initModule(),r.initModule($(".reference_group")),i.initModule($("#index-concepts-chart-emseq"))},{initModule:e}}()},{"./guide.boot.js":"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.boot.js","./guide.efetch_panel.jsx":"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.efetch_panel.jsx","./guide.index.js":"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.index.js"}],"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/main.js":[function(e,t,n){"use strict";var a=e("./guide/guide.js"),r=e("./vendor/ga.js");$(document).ready(function(){r.initModule(),a.initModule()})},{"./guide/guide.js":"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.js","./vendor/ga.js":"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/vendor/ga.js"}],"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/vendor/ga.js":[function(e,t,n){"use strict";t.exports=function(){var e;return e=function(){!function(e,t,n,a,r,i,o){e.GoogleAnalyticsObject=r,e[r]=e[r]||function(){(e[r].q=e[r].q||[]).push(arguments)},e[r].l=1*new Date,i=t.createElement(n),o=t.getElementsByTagName(n)[0],i.async=1,i.src=a,o.parentNode.insertBefore(i,o)}(window,document,"script","https://www.google-analytics.com/analytics.js","ga"),ga("create","UA-43341809-8","auto"),ga("send","pageview"),$("a").click(function(){var e=$(this).attr("href"),t="link",n=e;ga("send","event",t,n)})},{initModule:e}}()},{}]},{},["/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/main.js"]);