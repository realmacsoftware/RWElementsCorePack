const transformHook = (rw) => {
  const {} = rw.props;

  const { sharedAssetPath } = rw.component;

  const classes = classnames([
  ]).toString();

  rw.setRootElement({
    as: "div",
    class: classes,
    args: {},
  });

  rw.setProps({
    classes,
    sharedAssetPath,
  });
};

exports.transformHook = transformHook;
