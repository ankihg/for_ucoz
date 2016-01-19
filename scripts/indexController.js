(function(module) {
  var indexController = {};



  indexController.index = function() {
        Project.fetchAll();
        $('#contain-education').show();
        $('#contain-technical-skills').show();

        $('.contain-checklist').show();
        $('#projects').hide();

        $('#about').show();
  };

  module.indexController = indexController;
})(window);
