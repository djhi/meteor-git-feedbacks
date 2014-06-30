Template.gitFeedbackSubmit.events({
  'click button[value=cancel]': function() {
    _GitFeedbackDialog.hide();
  }
});

AutoForm.hooks({
  gitFeedbackForm: {
    onError: function(operation, error, template) {
      NotificationsHelper.error(error);
    },
    onSuccess: function(operation, result, template) {
      NotificationsHelper.success("Merci pour vos retours ! Nous vous répondrons dans les plus brefs délais.");
    }
  }
});