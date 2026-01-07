const globalMenuItem = (rw) => {
    const {
        globalMenuItemFontFamily,
        globalMenuItemTextStyles,
        globalMenuItemFontWeight,
        globalMenuItemLetterSpacing,
        globalMenuItemItalic,
        globalMenuItemState,
        globalMenuItemColor,
        globalMenuItemOpacity,
        globalMenuItemTextShadow,
        globalMenuItemUnderline,
        globalMenuItemHoverColor,
        globalMenuItemHoverOpacity,
        globalMenuItemHoverTextShadow,
        globalMenuItemHoverUnderline,
    } = rw.props;

    return classnames([
        globalMenuItemFontFamily,
        globalMenuItemTextStyles,
        globalMenuItemFontWeight,
        globalMenuItemLetterSpacing,
        globalMenuItemItalic,
        globalMenuItemState,
        globalMenuItemColor,
        globalMenuItemOpacity,
        globalMenuItemTextShadow,
        globalMenuItemUnderline,
        globalMenuItemHoverColor,
        globalMenuItemHoverOpacity,
        globalMenuItemHoverTextShadow,
        globalMenuItemHoverUnderline,
    ]).toString();
};
