const transformHook = (rw) => {
  const { id } = rw.node;
  const reveal = globalReveal(rw);

  const classes = classnames([
    `group/${id} group/reveal block`,
    globalActAsGridOrFlexItem(rw),
    globalLayout(rw),
    globalSizingContainer(rw),
    globalSpacing(rw),
    advancedClasses(rw),
  ]).toString();

  rw.setRootElement({
    as: globalHTMLTag(rw, "div"),
    class: classes,
    args: {
      ...reveal,
    }
  });

  rw.setProps({
    isEdit: rw.project.mode == 'edit',
    id,
    componentAssetPath: rw.component.assetPath,
  });
};

exports.transformHook = transformHook;
