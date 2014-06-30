Template["_afRadio_gitfeedback"].atts = function () {
  var atts = _.clone(this.atts);
  if (this.selected) {
    atts.checked = "";
  }
  return atts;
};
