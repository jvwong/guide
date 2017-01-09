"use strict";

var cy = require('cytoscape');
var concepts = (function(){

  // ---------- BEGIN MODULE SCOPE VARIABLES -----------------------------------
  var
  configMap = {
    template : String() +
      '<div class="module-name">' +
      '</div>'
  },
  stateMap = {
  },
  jqueryMap = {},
  setJQueryMap,
  insert,
  initModule;
  // ---------- END MODULE SCOPE VARIABLES -------------------------------------


  // ---------- BEGIN DOM METHODS ----------------------------------------------
  // Begin DOM method /setJQueryMap/
  setJQueryMap = function( $container ){
    jqueryMap = {
      $container                : $container
    };
  };

  insert = function(){
    
  };
  // End DOM method /setJQueryMap/
  // ---------- END DOM METHODS ------------------------------------------------

  // ---------- BEGIN EVENT HANDLERS -------------------------------------------
  // ---------- END EVENT HANDLERS ---------------------------------------------

  // ---------- BEGIN PUBLIC METHODS -------------------------------------------
    /* initModule
   * @param ocpu (Object) ocpu singleton
   * @param $container (Object) jQuery parent
   */
  initModule = function( $container ){
    // $container.html( configMap.template );
    setJQueryMap( $container );
    insert();
  };
  // ---------- END PUBLIC METHODS --------------------------------------------

  return {
    initModule      : initModule
  };

}());

module.exports = concepts;