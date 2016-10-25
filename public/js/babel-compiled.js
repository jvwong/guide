!function e(t,a,n){function i(s,l){if(!a[s]){if(!t[s]){var o="function"==typeof require&&require;if(!l&&o)return o(s,!0);if(r)return r(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var d=a[s]={exports:{}};t[s][0].call(d.exports,function(e){var a=t[s][1][e];return i(a?a:e)},d,d.exports,e,t,a,n)}return a[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)i(n[s]);return i}({"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/boot.js":[function(e,t,a){"use strict";!function(e){$(e).ajaxStart(function(){$("#ajax-spinner").show()}).ajaxStop(function(){$("#ajax-spinner").hide()})}(document)},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/efetch_panel.js":[function(e,t,a){"use strict";!function(){var e=React.createClass({displayName:"PanelGroup",loadArticleSets:function(){function e(){var a=n.shift();a&&a.deferred.done(function(n,r,s){i.push({xml:n,category:a.category,index:a.index}),t.setState({data:i}),e()})}var t=this,a="https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=",n=[],i=[];$.each(this.props.input,function(e,t){var i=t.uids||[],r=t.category||"";n.push({deferred:$.ajax({type:"GET",url:a+i.join(","),cache:!1,dataType:"xml"}),index:e,category:r})}),e()},getInitialState:function(){return{data:[]}},componentDidMount:function(){this.loadArticleSets()},render:function(){var t={category:{marginTop:"3em"}},a=this.state.data.map(function(a,n){var i=$(a.xml).find("PubmedArticle").map(function(t,a){var i=Date.now();return React.createElement(e.Panel,{data:a,id:["identifier",n,t,i].join("-"),key:t})});return React.createElement("div",{className:"subpanel",key:n},function(){if(a.category){var e=String(a.category).replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g,"").replace(/\s/g,"");return React.createElement("a",{href:["#",e].join(""),name:e},React.createElement("h3",{style:t.category,className:"category"},a.category))}}(),i)});return React.createElement("div",{className:"panel-group",id:"accordion",role:"tablist"},a)}});e.Panel=React.createClass({displayName:"Panel",rawMarkup:function(e){return{__html:e}},render:function(){var e,t,a,n,i,r,s,l,o,c,d,p,u,f,m,g,h;e=$(this.props.data),a=e.find("MedlineCitation"),n=a.children("PMID"),t=e.find('PubmedData ArticleIdList ArticleId[IdType="pmc"]'),i=a.find("Article"),r=i.find("ArticleTitle"),s=i.find("Abstract AbstractText"),l=e.find("AuthorList Author").first(),o=l.find("ForeName"),c=l.find("LastName"),d=l.find("CollectiveName"),p=c.text()?[c.text(),o.text()[0]].join(" "):d.text(),u=a.find("MeshHeadingList MeshHeading DescriptorName"),f=i.find("Journal"),m=f.find("JournalIssue Volume"),g=f.find("JournalIssue PubDate Year"),g.text()||(g=f.find("JournalIssue PubDate MedlineDate")),h=f.find("ISOAbbreviation");var y=[h.text(),"vol. "+m.text(),"("+g.text()+")"].join(" "),v=s.map(function(){return[$(this).attr("Label"),$(this).text(),"<br/>"].join("<br/>")}).get().join(""),j=u.slice(0,5).map(function(){return['<span class="badge">',$(this).text(),"</span>"].join("")}).get().join(""),b={panel:{a:{textDecoration:"none"},panelHeading:{div:{padding:"0.8em",background:"#34495e",color:"#ecf0f1"},panelTitle:{fontSize:"1.2rem"},panelMeta:{color:"#95a5a6"},badge:{fontWeight:"200"}}}};return React.createElement("div",{className:"panel"},React.createElement("a",{style:b.panel.a,className:"panel-toggle",href:["#",this.props.id].join(""),role:"button","data-toggle":"collapse","data-parent":"#accordion"},React.createElement("div",{style:b.panel.panelHeading.div,className:"reading-list panel-heading",role:"tab",id:"headingOne"},React.createElement("h2",{style:b.panel.panelHeading.panelTitle,className:"panel-title"},r.text()),React.createElement("span",{style:b.panel.panelHeading.panelMeta,className:"panel-meta author"},p),React.createElement("br",null),React.createElement("span",{style:b.panel.panelHeading.panelMeta,className:"panel-meta journal"},y),React.createElement("div",{style:b.panel.panelHeading.badge,className:"panel-meta reading-list badge-list",dangerouslySetInnerHTML:this.rawMarkup(j)}))),React.createElement("div",{id:this.props.id,className:"panel-collapse collapse",role:"tabpanel"},React.createElement("div",{className:"panel-body"},React.createElement("p",{className:"abstract-text",dangerouslySetInnerHTML:this.rawMarkup(v)}),function(){var e;return e=t.text()?React.createElement("a",{style:b.panel.a,className:"article-link",target:"_blank",href:["http://www.ncbi.nlm.nih.gov/pmc/",t.text()].join("")},React.createElement("i",{className:"fa fa-link fa-lg"}),[" PubMed Central: ",t.text()].join("")):React.createElement("a",{style:b.panel.a,className:"article-link",target:"_blank",href:["http://www.ncbi.nlm.nih.gov/pubmed/",n.text()].join("")},React.createElement("i",{className:"fa fa-link fa-lg"}),[" PubMed: ",n.text()].join(""))}())))}}),$(".panel_group").each(function(t,a){var n=$(this),i=n.data("page"),r=n.data("inline"),s=[];i?s=i:r&&(s=[{category:"",uids:[r]}]),ReactDOM.render(React.createElement(e,{input:s}),n[0])})}()},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/progress_tracker.js":[function(e,t,a){"use strict";!function(e){e(".progress-tracker-wrapper li").click(function(t){var a,n,i,r='<div class="panel panel-primary"><div class="panel-body"></div><a href="#top"><div class="panel-footer">Top</div></a></div>';t.preventDefault(),e(this).addClass("is-complete"),a=e(this).find(".progress-tracker-link").attr("href"),n=e("#embed-target"),i=e(e.parseHTML(r)),e.get(a).done(function(t){var a=e("<div></div>").append(e.parseHTML(t)).find(".embedded");i.find(".panel-body").html(a.html()),n.html(i.html())}).fail(function(){e(this).removeClass("is-complete"),console.log("error")}).always(function(){})})}(jQuery)},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/vendor/gist-embed.min.js":[function(e,t,a){"use strict";!function(e){function t(e){var t,a,n=[];if("number"==typeof e)n.push(e);else{a=e.split(",");for(var i=0;i<a.length;i++)if(t=a[i].split("-"),2===t.length)for(var r=parseInt(t[0],10);r<=t[1];r++)n.push(r);else 1===t.length&&n.push(parseInt(t[0],10))}return n}e.fn.gist=function(a){return this.each(function(){var n,i,r,s,l,o,c,d,p,u,f=e(this),m={};return f.css("display","block"),n=f.data("gist-id")||"",r=f.data("gist-file"),c=f.data("gist-hide-footer")===!0,d=f.data("gist-hide-line-numbers")===!0,s=f.data("gist-line"),o=f.data("gist-highlight-line"),u=f.data("gist-show-spinner")===!0,p=!u&&(void 0===f.data("gist-show-loading")||f.data("gist-show-loading")),r&&(m.file=r),!!n&&(i="https://gist.github.com/"+n+".json",l="Loading gist "+i+(m.file?", file: "+m.file:"")+"...",p&&f.html(l),u&&f.html('<img style="display:block;margin-left:auto;margin-right:auto"  alt="'+l+'" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif">'),void e.ajax({url:i,data:m,dataType:"jsonp",timeout:2e4,success:function(a){var n,r,l,p,u;a&&a.div?(a.stylesheet&&(0===a.stylesheet.indexOf("<link")?a.stylesheet=a.stylesheet.replace(/\\/g,"").match(/href=\"([^\s]*)\"/)[1]:0!==a.stylesheet.indexOf("http")&&(0!==a.stylesheet.indexOf("/")&&(a.stylesheet="/"+a.stylesheet),a.stylesheet="https://gist.github.com"+a.stylesheet)),a.stylesheet&&0===e('link[href="'+a.stylesheet+'"]').length&&(n=document.createElement("link"),r=document.getElementsByTagName("head")[0],n.type="text/css",n.rel="stylesheet",n.href=a.stylesheet,r.insertBefore(n,r.firstChild)),u=e(a.div),u.removeAttr("id"),f.html("").append(u),o&&(p=t(o),u.find("td.line-data").css({width:"100%"}),u.find(".js-file-line").each(function(t){-1!==e.inArray(t+1,p)&&e(this).css({"background-color":"rgb(255, 255, 204)"})})),s&&(l=t(s),u.find(".js-file-line").each(function(t){-1===e.inArray(t+1,l)&&e(this).parent().remove()})),c&&(u.find(".gist-meta").remove(),u.find(".gist-data").css("border-bottom","0px"),u.find(".gist-file").css("border-bottom","1px solid #ddd")),d&&u.find(".js-line-number").remove()):f.html("Failed loading gist "+i)},error:function(e,t){f.html("Failed loading gist "+i+": "+t)},complete:function(){"function"==typeof a&&a()}}))})},e(function(){e("[data-gist-id]").gist()})}(jQuery)},{}]},{},["/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/boot.js","/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/efetch_panel.js","/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/progress_tracker.js","/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/vendor/gist-embed.min.js"]);