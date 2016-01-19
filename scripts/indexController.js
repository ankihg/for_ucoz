(function(module) {
  var indexController = {};



  indexController.index = function() {
    console.log('indexController index')
    Project.fetchAll();
  };

  module.indexController = indexController;
})(window);
