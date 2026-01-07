const globalFilter = (rw) => {
    const {
        globalFilterEnable: wantsFilter,
        globalFilterGroup: group,
        globalFilterCustomGroupId: groupId,
        globalFilterTransition: transition = null,
    } = rw.props;

    const { parent } = rw.node;

    const filterGroupId = group == "parent" ? parent.id : groupId;

    return {
        wantsFilter,
        filterGroupId,
        transition,
        args: wantsFilter
            ? {
                  "data-filter-group": filterGroupId,
                  "data-filter-transition": transition,
              }
            : {},
    };
};
