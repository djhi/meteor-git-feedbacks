Package.describe({
  summary: "Submit issues to git through a form"
});

Package.on_use(function(api, where) {
  var both = ['client', 'server'];

  api.use([
    'standard-app-packages',
    'simple-schema',
    'autoform',
    'meteor-bootstrap-growl',
  ], both);

  api.imply([
    'simple-schema',
    'autoform',
    'meteor-bootstrap-growl',
  ], both);

  api.add_files('schema.js', both);
    // Register our  templates
  api.add_files(['gitFeedbackSubmit.html', 'gitFeedbackSubmit.js', '_afRadio_radioButtons.html', '_afRadio_radioButtons.js', 'client_gitFeedback.js'], 'client');
  api.add_files(['server_gitFeedback.js'], 'server');

  api.export('GitFeedbackSchema');
  api.export('GitFeedback');
});

Package.on_test(function(api) {
  api.use('meteor-git-feedbacks');

  api.add_files('meteor_git_feedbacks_tests.js', ['client', 'server']);
});
