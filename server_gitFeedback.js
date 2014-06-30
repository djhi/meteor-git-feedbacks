var _options = {};

GitFeedback = {
  configure: function(options) {
    _options = _.extend({
      errorText: "Erreur lors de la soumission de votre message."
    }, options);

    if (typeof _options.defaultUser !== 'string' && typeof Meteor.settings.github_user !== 'string') {
      throw new Meteor.Error("Invalid defaultUser option: should be a string indicating the git username");
    }

    if (typeof _options.defaultPwd !== 'string' && typeof Meteor.settings.github_pwd !== 'string') {
      throw new Meteor.Error("Invalid defaultPwd option: should be a string indicating the git password");
    }

    if (typeof _options.repository !== 'string') {
      throw new Meteor.Error("Invalid repository option: should be a string indicating the name of the repository on which to post issues");
    }

    if (typeof _options.repositoryOwner !== 'string') {
      throw new Meteor.Error("Invalid repositoryUser option: should be a string indicating the username of the repository owner");
    }
  }
};

Meteor.methods({
  submitGitFeedback: function(feedback) {

    if(typeof _options !== 'object' || typeof _options.repository !== 'string' || _options.repository.length <= 0 || typeof _options.repositoryOwner !== 'string' || _options.repositoryOwner.length <= 0){
      throw new Meteor.Error("GitFeedback must be configured through GitFeedback.configure to specify repository and repositoryOwner");
    }

    // Important server-side check for security and data integrity
    check(feedback, GitFeedbackSchema);
    GitFeedbackSchema.clean(feedback);

    var github = new GitHub({
      version: '3.0.0',
      protocol: "https",
      debug: true
    });

    github.authenticate({
      type: 'basic',
      username: _options.defaultUser || Meteor.settings.github_user,
      password: _options.defaultPwd || Meteor.settings.github_pwd
    });

    var title;
    var labels = [feedback.type];

    switch (feedback.type) {
      case 'bug':
        title = '[BUG] ' + feedback.subject;
        break;

      case 'contact':
        title = '[CONTACT] ' + feedback.subject;
        labels.push('question');
        break;

      case 'thanks':
        title = '[REMERCIEMENT] ' + feedback.subject;
        labels.push('question');
        break;
    }

    var body = feedback.message;
    var user = Meteor.user();

    if (user.profile && user.profile.username) {
      body = "From: **" + user.profile.username + "**\r\n\r\n" + body;
    } else if (user.emails && user.emails.length > 0) {
      body = "From: **" + user.emails[0].address + "**\r\n\r\n" + body;
    }

    var data = {
      user: _options.repositoryOwner,
      repo: _options.repository,
      title: title,
      body: body,
      labels: labels
    };

    github.issues.create(data, function(error, result) {
      if (error) {
        throw new Meteor.Error(503, _options.errorText);
      }
    });

    // Unblock the response
    this.unblock();
  }
});
