var projects = [];

function Project(tmp) {
  this.name = tmp.name;
  this.imgSrc = tmp.imgSrc;
  this.date = tmp.date;
  this.about = tmp.about;
  this.url = tmp.url;
  this.tags = tmp.tags;
};

Project.prototype.make = function() {
  $('#projects').append(this.toHTML());
  this.handleJQuery();
}

Project.prototype.toHTML = function() {
  var template = Handlebars.compile($('#project-template').text());

 this.id = this.name.split(' ')[0];

  var html = template(this);
  return html;
};

Project.prototype.handleJQuery = function() {
  var $project = $('#'+this.id);
  $project.data('tags', this.tags);
  $project.addClass('populated');
};

rawData.forEach(function(elm) {
  projects.push(new Project(elm));
});

projects.forEach(function(p) {
  p.make();
});
