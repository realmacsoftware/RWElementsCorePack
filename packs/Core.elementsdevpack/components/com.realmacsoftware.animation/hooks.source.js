const transformHook = (rw) => {
  const { id } = rw.node;
  const { mode } = rw.project;

  const animations = globalAnimations(rw);

  const classes = classnames([
    `group/${id} group/animation min-w-content max-w-content`,
    globalActAsGridOrFlexItem(rw),
    globalLayout(rw),
    advancedClasses(rw),
  ]).toString();

  rw.setRootElement({
    as: globalHTMLTag(rw, "div"),
    class: classes,
    args: {
      ...animations.data,
    }
  });

  rw.setProps({
    wantsEnterAnimation: animations.enter !== "null",
    wantsVisibilityHidden: mode != "edit" && animations.isEnabled,
    animations
  });
};

exports.transformHook = transformHook;
