const sortFeedContent = (feedContent) =>
  feedContent.sort(
    (item1, item2) =>
      new Date(item2.isoDate).getTime() - new Date(item1.isoDate).getTime()
  );

export default sortFeedContent;
