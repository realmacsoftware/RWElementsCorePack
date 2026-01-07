const globalBgImageFetchPriority = (rw) => {
    const {
        globalBgImageFetchPriority,
        globalBgType,
        globalBgImageResource,
        globalBgImageResourceEnd,
    } = rw.props;

    if (globalBgType != "image") {
        return {
            wantsFetchPriority: false,
            linkElement: "",
            linkElementEnd: "",
        };
    }

    const globalBgImageFetchPriorityEnabled = globalBgImageFetchPriority != "auto";

    let globalBgImageFetchPriorityLinkElement = "";
    if (globalBgImageResource?.image) {
        globalBgImageFetchPriorityLinkElement = `<link rel='preload' href='${globalBgImageResource?.image}' as='image' fetchpriority='${globalBgImageFetchPriority}' />`;
    }

    let globalBgImageFetchPriorityLinkElementEnd = "";
    if (globalBgImageResourceEnd?.image) {
        globalBgImageFetchPriorityLinkElementEnd = `<link rel='preload' href='${globalBgImageResourceEnd?.image}' as='image' fetchpriority='${globalBgImageFetchPriority}' />`;
    }

    return {
        globalBgImageFetchPriorityEnabled,
        globalBgImageFetchPriorityLinkElement,
        globalBgImageFetchPriorityLinkElementEnd,
    };
};
