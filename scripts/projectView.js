(function(module) {
var projectView = {};

projectView.populateChecklist = function() {
  $('.populated').each(function() {
     var val = $(this).data('tags');
     val.forEach(function(tag) {
       optionTag = '<div class="col-sm-4"><li><label for="chk1"><input type="checkbox" name="chk1" value="'+tag+'" id="'+tag.split(' ')[0]+'"><img src="media/mtn.png"> '+tag+ ' <small>('+ Project.countProjPerTag(tag) +')</small> <img src="media/tree3_c.png"></label></li></div>';
       if ($('#tag-checklist input[value="' + tag + '"]').length === 0) {
         $('#tag-checklist').append(optionTag);
       }
     });
  });
};

projectView.handleChecklist = function() {
  $('#tag-checklist').on('change', function() {
    projectView.clearItems();

    var $checkedTags = $(this).find(':checked');

    if ($checkedTags.length < 1) {
      projectView.displayAll();
    } else {
      $checkedTags.each(function(t) {
          projectView.displayTag($checkedTags.eq(t).val());
      });
      // projectView.displayTag($(this).val());
    }
  });
};

projectView.populateFilter = function() {
  $('.populated').each(function() {
     var val = $(this).data('tags');
     val.forEach(function(tag) {
       optionTag = '<option value="' + tag + '">' + tag + '</option>';
       if ($('#tag-filter option[value="' + tag + '"]').length === 0) {
         $('#tag-filter').append(optionTag);
       }
     });
  });
};

projectView.handleFilter = function() {
  $('#tag-filter').on('change', function() {
    projectView.clearItems();
    if ($(this).val()=='') {
      projectView.displayAll();
    } else {
      projectView.displayTag($(this).val());
    }
  });
};

projectView.clearItems = function() {
  $('.populated').remove();
};

projectView.displayTag = function(tag) {
  Project.all.forEach(function(i){
    if ($('#projects .row[id="' + i.id + '"]').length === 0) {
     if (i.tags.indexOf(tag) >= 0) {
       i.make();
    }
  }
 });
};

projectView.displayAll = function() {
  Project.all.forEach(function(i){
      i.make();
 });
};

projectView.initIndexPage = function() {
  projectView.populateChecklist();
  projectView.handleChecklist();
};

/*$(document).ready(function() {
  projectView.populateChecklist();
  projectView.handleChecklist();
  // projectView.populateFilter();
  // projectView.handleFilter();
});*/

module.projectView = projectView;
})(window);
