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

Project.loadAll = function() {
  rawData.forEach(function(elm) {
    projects.push(new Project(elm));
  });

  projects.forEach(function(p) {
    p.make();
  });
};

Project.fetchAll = function() {
  if (localStorage.rawData) {
    Project.checkUpdate();

    Project.loadAll(JSON.parse(localStorage.rawData)); //DID: What do we pass in here to the .loadAll function?
    projectView.initIndexPage();
  } else {
    Project.update();
    projectView.initIndexPage();
  }
};

Project.update = function() {
  $.getJSON('/data/projectData.json', function(data, message, xhr) {
    Project.loadAll(data);
    localStorage.rawData = JSON.stringify(data);
    localStorage.etag = xhr.getResponseHeader('eTag');
  });
};

Project.checkUpdate = function() {
  $.ajax({
  type: 'HEAD',
  url: "/data/projecdtData.json",
  complete: function(xhr) {
    var etag = xhr.getResponseHeader('eTag');
    if (localStorage.etag !== etag) {
      Project.update();
    }
  }
  });
};
