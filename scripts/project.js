(function(module) {
Project.all = [];

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

 this.hashtags = this.tags.map(function(tag) {
   return ' #'+ tag.replace(/ /g, '_');
 });


  var html = template(this);
  return html;
};

Project.prototype.handleJQuery = function() {
  var $project = $('#'+this.id);
  $project.data('tags', this.tags);
  $project.addClass('populated');
};

Project.loadAll = function(rawData) {
  rawData.forEach(function(elm) {
    Project.all.push(new Project(elm));
  });

  Project.all.forEach(function(p) {
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
  url: "/data/projectData.json",
  complete: function(data) {
    var etag = data.getResponseHeader('eTag');
    if (localStorage.etag !== etag) {
      Project.update();
    }
  }
  });
};


  module.Project = Project;
})(window);
