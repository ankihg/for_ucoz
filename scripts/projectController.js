(function(module) {
  var projectController = {};



  projectController.index = function(ctx, next) {
    console.log('projectController index')
    Project.fetchAll(projectView.initIndexPage);

    $('#contain-education').hide();
    $('#contain-technical-skills').hide();
    // $('#about').hide();

    $('.contain-checklist').show();
    $('#projects').show();

  };

  module.projectController = projectController;
})(window);
