GitFeedbackSchema = new SimpleSchema({
  // The subject of the feedback
  subject: {
    label: "Objet",
    type: String, 
    min: 3, 
    max: 50
  },

  // The type of the feedback
  type: {
    label: "Type",
    type: String, 
    autoform: {
      options: [
        {label: "Bug", value: "bug"},
        {label: "Contact", value: "contact"},
        {label: "Remerciements", value: "thanks"}
      ],
      label: false,
      noselect: true,
      template: "gitfeedback"
    },
    defaultValue: 'bug',
    allowedValues: ['bug', 'contact', 'thanks']
  },

  // The message of the feedback
  message: {
    label: "Message",
    type: String, 
    min: 3, 
    max: 500
  }
});