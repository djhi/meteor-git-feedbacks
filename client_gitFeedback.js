_GitFeedbackDialog;

GitFeedback = {
  show: function(options) {
    var defaultOptions = {
      template: Template.gitFeedbackSubmit,
      modalFooterClass: 'hidden',
      title: "Soumettre un bug ou une demande"
    };

    var config = _.extend(defaultOptions, options);
    
    _GitFeedbackDialog = ReactiveModal.initDialog(config)

    _GitFeedbackDialog.show();
  }
}
