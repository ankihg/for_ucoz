(function(module) {
  var projectController = {};



  projectController.index = function() {
    console.log('projectController index')
    Project.fetchAll();

    $('#contain-education').hide();
    $('#contain-technical-skills').hide();
    $('#about').hide();

    $('.contain-checklist').show();
    $('#projects').show();

  };

  module.projectController = projectController;
})(window);
