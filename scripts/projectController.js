(function(module) {
  var projectController = {};



  projectController.index = function() {
    console.log('projectController index')
    Project.fetchAll();
  };

  module.projectController = projectController;
})(window);
