const transformHook = (rw) => {
  const {
    globalFilterTagsMode,
    globalFilterQueryMatch,
    tagsAlignment,
    tagsGap,
    placeholder,
    placeholderColor
  } = rw.props;

  const filter = globalFilter(rw);
  const {
    globalBgImageFetchPriorityEnabled,
    globalBgImageFetchPriorityLinkElement,
    globalBgImageFetchPriorityLinkElementEnd,
  } = globalBgImageFetchPriority(rw);

  const classes = {
    wrapper: classnames([
      `flex-wrap`,
      tagsAlignment,
      tagsGap,
      globalLayout(rw, { defaultDisplay: "flex" }),
      advancedClasses(rw),
    ]).toString(),
    tag: classnames([
      "appearance-none focus:outline-none",
      globalSizing(rw),
      globalSpacing(rw),
      globalTransitions(rw),
      globalEffects(rw, { active: true }),
      globalFilters(rw, { active: true }),
      globalTransforms(rw, { active: true }),
      globalBackground(rw, { active: true }),
      globalBorders(rw, { active: true }),
      globalButtonFontAndTextStyles(rw, { active: true }),
      placeholderColor,
    ]).toString(),
  };

  const tagOptions = {
    mode: globalFilterTagsMode,
    ...(globalFilterTagsMode == 'multiple' ? { match: globalFilterQueryMatch } : {}),
  }

  rw.setRootElement({
    as: "div",
    class: classes.wrapper,
    args: {
      "x-data": `filterTags('${filter.filterGroupId}', ${JSON.stringify(tagOptions).replace(/"/g, "'")})`,
      ...filter.args
    },
  });

  rw.setProps({
    classes,
    placeholder,
    globalBgImageFetchPriorityEnabled,
    globalBgImageFetchPriorityLinkElement,
    globalBgImageFetchPriorityLinkElementEnd,
  });
};

exports.transformHook = transformHook;
