module.exports = function(composer, options, compose) {
  composer.addPartials({
    "custom-style": {
      config: require('./partial/custom-extract-style')()
    }
  });
  const base = composer.profiles._base;
  const style = base.partials["_extract-style"];
  style.enable = false;
  base.partials["custom-style"] = { order: style.order };
  return compose();
};
