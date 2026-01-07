const globalActAsGridOrFlexItem = (app) => {
  const {
    globalGridOrFlexDisplayAs: displayAs,
    globalGridOrFlexItemSettings: settingsType,

    // Grid Item
    globalGridItemColSpan: colSpan,
    globlaGridItemColStart: colStart,
    globalGridItemColEnd: colEnd,
    globalGridItemRowSpan: rowSpan,
    globalGridItemRowStart: rowStart,
    globalGridItemRowEnd: rowEnd,

    // Flex Item
    globalFlexItemFlex: flex,
    globalFlexItemShrink: shrink,
    globalFlexItemGrow: grow,
    globalFlexItemBasis: basis,
    globalFlexItemBasisCustom: basisCustom,

    // General
    globalGridOrFlexItemAlignSelf: alignSelf,
    globalGridOrFlexItemJustifySelf: justifySelf,
    globalGridOrFlexItemOrder: order,
    globalGridOrFlexItemOrderCustom: orderCustom
  } = app.props;

  if (displayAs == "default") {
    return false;
  }

  const classes = [];

  if (displayAs == "flex") {
    classes.push(
      alignSelf,
      justifySelf,
      ...(settingsType === "advanced" ? [
        flex,
        shrink,
        grow,
        basis == "custom" ? basisCustom : basis,
        order == "custom" ? orderCustom : order
      ] : [])
    );
  }

  if (displayAs == "grid") {
    classes.push(
      colSpan,
      rowSpan,
      ...(settingsType === "advanced" ? [
        colStart !== "col-start-auto" ? colStart : undefined,
        colEnd !== "col-end-auto" ? colEnd : undefined,
        rowStart !== "row-start-auto" ? rowStart : undefined,
        rowEnd !== "row-end-auto" ? rowEnd : undefined,
        alignSelf,
        justifySelf,
        order == "custom" ? orderCustom : order
      ] : [])
    );
  }

  return classnames(classes).toString();
}
