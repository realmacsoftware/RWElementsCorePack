const galleryHelpers = {};

galleryHelpers.thumbnails = (app) => {
  const { resources: images } = app.props;
  const { columns: cols } = app.responsiveProps;
  const { screens, names } = app.theme.breakpoints;

  return images?.resources?.map((resource) => {
    const srcset = Object.entries(cols)
      .map(([device, colNumber]) => {
        let deviceWidth = screens[device];

        if (device === "base") {
          const firstKey = names[0];
          deviceWidth = screens[firstKey] / colNumber;
        }

        const resizedImage = app.resizeResource(
          resource,
          (deviceWidth / colNumber) * 3
        );

        return `${resizedImage} ${deviceWidth}w`;
      })
      .join(", ");

    const sizes =
      Object.entries(cols)
        .map(([device, colNumber]) => {
          const deviceWidth = screens[device];

          if (device === "base") {
            return `(max-width: ${screens[names[0]]}px) 100vw`; // Full width for base
          }

          const sizePercent = Math.floor((1 / colNumber) * 100);
          return `(min-width: ${deviceWidth}px) ${sizePercent}vw`;
        })
        .join(", ") + `, 100vw`; // Fallback for in-between breakpoints

    const fallback = app.resizeResource(resource, 800);
    const alt = resource.caption || resource.author || "";

    return {
      ...resource,
      srcset,
      sizes, // Updated sizes attribute with fallback
      fallback,
      alt,
    };
  });
};
