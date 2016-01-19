(function(module) {
  var aboutController = {};

  // DID: Define a function that hides all main section elements, and then reveals just the #about section:
  aboutController.index = function() {
    $('.contain-checklist').hide();
    $('#articles').hide();

    $('#contain-education').show();
    $('#contain-technical-skills').show();
    $('#about').show();
  };

  module.aboutController = aboutController;
})(window);
