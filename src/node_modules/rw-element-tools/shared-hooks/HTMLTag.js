const globalHTMLTag = (app, fallback = "div") => {
    const { globalHTMLTag, globalHTMLTagCustom } = app.props;

    if (globalHTMLTag === "custom") {
        return globalHTMLTagCustom
            .replace(/</g, "")
            .replace(/>/g, "")
            .replace(/[^a-zA-Z0-9]/g, "");
    }

    if (globalHTMLTag == "default") {
        return fallback;
    }

    return globalHTMLTag || fallback;
};
