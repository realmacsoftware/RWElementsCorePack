const transformHook = (rw) => {
  const { id } = rw.node;
  const link = globalLink(rw);

  const classes = classnames([
    `group/${id} group/box`,
    globalActAsGridOrFlexItem(rw),
    globalLayout(rw),
    globalSizingContainer(rw),
    globalSpacing(rw),
    globalBackground(rw),
    globalBorders(rw),
    globalTransitions(rw),
    globalEffects(rw),
    globalTransforms(rw),
    globalFilters(rw),
    advancedClasses(rw),
  ]).toString();

  const rootElementTag = link.hasLink ? "a" : globalHTMLTag(rw, "div");

  rw.setRootElement({
    as: rootElementTag,
    class: classes,
    args: {
      ...link.args,
    }
  });

  rw.setProps({
  });
};

exports.transformHook = transformHook;
