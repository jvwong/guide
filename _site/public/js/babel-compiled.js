!function e(t,a,n){function r(s,o){if(!a[s]){if(!t[s]){var l="function"==typeof require&&require;if(!o&&l)return l(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var d=a[s]={exports:{}};t[s][0].call(d.exports,function(e){var a=t[s][1][e];return r(a?a:e)},d,d.exports,e,t,a,n)}return a[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)r(n[s]);return r}({"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.boot.js":[function(e,t,a){"use strict";t.exports=function(){var e;return e=function(){$(document).ajaxStart(function(){$("#ajax-spinner").show()}).ajaxStop(function(){$("#ajax-spinner").hide()})},{initModule:e}}()},{}],"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.efetch_panel.jsx":[function(e,t,a){"use strict";var n=e("react-dom"),r=e("react");t.exports=function(){var e=r.createClass({displayName:"PanelGroup",loadArticleSets:function(){function e(){var a=n.shift();a&&a.deferred.done(function(n,i,s){r.push({xml:n,category:a.category,index:a.index}),t.setState({data:r}),e()})}var t=this,a="https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=",n=[],r=[];$.each(this.props.input,function(e,t){var r=t.uids||[],i=t.category||"";n.push({deferred:$.ajax({type:"GET",url:a+r.join(","),cache:!1,dataType:"xml"}),index:e,category:i})}),e()},getInitialState:function(){return{data:[]}},componentDidMount:function(){this.loadArticleSets()},render:function(){var t={category:{marginTop:"3em"}},a=this.state.data.map(function(a,n){var i=$(a.xml).find("PubmedArticle").map(function(t,a){var i=Date.now();return r.createElement(e.Panel,{data:a,id:["identifier",n,t,i].join("-"),key:t})});return r.createElement("div",{className:"subpanel",key:n},function(){if(a.category){var e=String(a.category).replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g,"").replace(/\s/g,"");return r.createElement("a",{href:["#",e].join(""),name:e},r.createElement("h3",{style:t.category,className:"category"},a.category))}}(),i)});return r.createElement("div",{className:"panel-group",id:"accordion",role:"tablist"},a)}});e.Panel=r.createClass({displayName:"Panel",rawMarkup:function(e){return{__html:e}},render:function(){var e,t,a,n,i,s,o,l,c,d,p,u,g,f,m,h,j;e=$(this.props.data),a=e.find("MedlineCitation"),n=a.children("PMID"),t=e.find('PubmedData ArticleIdList ArticleId[IdType="pmc"]'),i=a.find("Article"),s=i.find("ArticleTitle"),o=i.find("Abstract AbstractText"),l=e.find("AuthorList Author").first(),c=l.find("ForeName"),d=l.find("LastName"),p=l.find("CollectiveName"),u=d.text()?[d.text(),c.text()[0]].join(" "):p.text(),g=a.find("MeshHeadingList MeshHeading DescriptorName"),f=i.find("Journal"),m=f.find("JournalIssue Volume"),h=f.find("JournalIssue PubDate Year"),h.text()||(h=f.find("JournalIssue PubDate MedlineDate")),j=f.find("ISOAbbreviation");var v=[j.text(),"vol. "+m.text(),"("+h.text()+")"].join(" "),y=o.map(function(){return[$(this).attr("Label"),$(this).text(),"<br/>"].join("<br/>")}).get().join(""),_=g.slice(0,5).map(function(){return['<span class="badge">',$(this).text(),"</span>"].join("")}).get().join(""),b={panel:{a:{textDecoration:"none"},panelHeading:{div:{padding:"0.8em",background:"#34495e",color:"#ecf0f1"},panelTitle:{fontSize:"1.2rem"},panelMeta:{color:"#95a5a6"},badge:{fontWeight:"200"}}}};return r.createElement("div",{className:"panel"},r.createElement("a",{style:b.panel.a,className:"panel-toggle",href:["#",this.props.id].join(""),role:"button","data-toggle":"collapse","data-parent":"#accordion"},r.createElement("div",{style:b.panel.panelHeading.div,className:"reading-list panel-heading",role:"tab",id:"headingOne"},r.createElement("h2",{style:b.panel.panelHeading.panelTitle,className:"panel-title"},s.text()),r.createElement("span",{style:b.panel.panelHeading.panelMeta,className:"panel-meta author"},u),r.createElement("br",null),r.createElement("span",{style:b.panel.panelHeading.panelMeta,className:"panel-meta journal"},v),r.createElement("div",{style:b.panel.panelHeading.badge,className:"panel-meta reading-list badge-list",dangerouslySetInnerHTML:this.rawMarkup(_)}))),r.createElement("div",{id:this.props.id,className:"panel-collapse collapse",role:"tabpanel"},r.createElement("div",{className:"panel-body"},r.createElement("p",{className:"abstract-text",dangerouslySetInnerHTML:this.rawMarkup(y)}),function(){var e;return e=t.text()?r.createElement("a",{style:b.panel.a,className:"article-link",target:"_blank",href:["http://www.ncbi.nlm.nih.gov/pmc/",t.text()].join("")},r.createElement("i",{className:"fa fa-link fa-lg"}),[" PubMed Central: ",t.text()].join("")):r.createElement("a",{style:b.panel.a,className:"article-link",target:"_blank",href:["http://www.ncbi.nlm.nih.gov/pubmed/",n.text()].join("")},r.createElement("i",{className:"fa fa-link fa-lg"}),[" PubMed: ",n.text()].join(""))}())))}});var t=function(t){t.each(function(t,a){var i=$(this),s=i.data("reflist"),o=[];return!!s&&(o=[{category:"",uids:[s]}],void n.render(r.createElement(e,{input:o}),i[0]))})};return{initModule:t}}()},{react:"react","react-dom":"react-dom"}],"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.js":[function(e,t,a){"use strict";var n=e("./guide.boot.js"),r=e("./guide.efetch_panel.jsx"),i=e("./guide.progress_tracker.js");t.exports=function(){var e;return e=function(){n.initModule(),r.initModule($(".reference_group")),i.initModule($(".progress-tracker-wrapper"))},{initModule:e}}()},{"./guide.boot.js":"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.boot.js","./guide.efetch_panel.jsx":"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.efetch_panel.jsx","./guide.progress_tracker.js":"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.progress_tracker.js"}],"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.progress_tracker.js":[function(e,t,a){"use strict";e("iframe-resizer"),t.exports=function(){var e,t,a={panel_html_template:'<div class="panel panel-primary"><div class="panel-heading"><a style="display: none;" id="panel-heading-link" href="#" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Open in separate window</a></div><div class="panel-body"><iframe id="panel-frame" src="" width="100%" frameBorder="0" scrolling="no" ></iframe></div><a style="display: none;" id="panel-footer" type="button" class="btn btn-default" role="button" href="#top">Top</a></div>',highlight_class:".progress-target",link_class:".progress-tracker-link"},n={$container:void 0,$progress_tracker_steps:void 0,$progress_tracker_content:void 0,$panel:void 0,$panel_heading_link:void 0,$panel_footer:void 0};return t=function(){n.$progress_tracker_steps.click(function(e){var t=$(this);e.preventDefault(),t.addClass("is-complete"),n.$container.find(a.highlight_class).removeClass("active"),t.find(a.highlight_class).toggleClass("active");var r=t.find(a.link_class).attr("href");n.$panel_heading_link.attr("href",r).css("display","block"),n.$panel_footer.css("display","block"),n.$panel_frame.attr("src",r),n.$panel_frame.iFrameResize(),window.scrollTo(0,0)})},e=function(e){return n.$container=e,n.$progress_tracker_steps=n.$container.find(".progress-step"),n.$progress_tracker_content=n.$container.find("#progress-tracker-content"),n.$panel=$($.parseHTML(a.panel_html_template)),n.$progress_tracker_content.html(n.$panel.html()),n.$panel_heading_link=n.$progress_tracker_content.find("#panel-heading-link"),n.$panel_frame=n.$progress_tracker_content.find("#panel-frame"),n.$panel_footer=n.$progress_tracker_content.find("#panel-footer"),t(),!0},{initModule:e}}()},{"iframe-resizer":"iframe-resizer"}],"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/main.js":[function(e,t,a){"use strict";var n=e("./guide/guide.js");jQuery(document).ready(function(){n.initModule()})},{"./guide/guide.js":"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.js"}]},{},["/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/main.js"]);