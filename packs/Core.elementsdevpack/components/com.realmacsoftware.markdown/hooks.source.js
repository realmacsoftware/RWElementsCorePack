const transformHook = (rw) => {
  const {
    globalID,
    tag,
    globalTypography,
  } = rw.props;

  const {
    globalBgImageFetchPriorityEnabled,
    globalBgImageFetchPriorityLinkElement,
    globalBgImageFetchPriorityLinkElementEnd,
  } = globalBgImageFetchPriority(rw);

  const classes = classnames([
    `prose`,
    globalTypography,
    globalSizing(rw),
    globalSpacing(rw),
    globalTransitions(rw),
    globalEffects(rw),
    globalTransforms(rw),
    globalFilters(rw),
    globalBackground(rw),
    globalBorders(rw),
    advancedClasses(rw),
  ]).toString();

  const rootElementTag = typeof tag === 'string' ? tag : "div";

  rw.setRootElement({
    as: rootElementTag,
    class: classes,
    args: {
      id: globalID
    },
  });

  if (globalID.length > 0) {
    rw.addAnchor(globalID);
  }

  rw.setProps({
    globalBgImageFetchPriorityEnabled,
    globalBgImageFetchPriorityLinkElement,
    globalBgImageFetchPriorityLinkElementEnd,
  });
};

exports.transformHook = transformHook;
