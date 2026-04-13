const HTML_ENTITY_MAP = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
  "&nbsp;": " ",
};

export const stripHtml = (value = "") =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const decodeHtmlEntities = (value = "") =>
  value.replace(
    /&amp;|&lt;|&gt;|&quot;|&#039;|&nbsp;/g,
    (match) => HTML_ENTITY_MAP[match] || match,
  );

export const truncateText = (value = "", maxLength = 160) => {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
};

export const getPostTitle = (post) =>
  decodeHtmlEntities(stripHtml(post?.title?.rendered || post?.title || ""));

export const getPostExcerpt = (post, maxLength = 150) =>
  truncateText(
    decodeHtmlEntities(
      stripHtml(
        post?.excerpt?.rendered ||
          post?.acf?.excerpt ||
          post?.content?.rendered ||
          "",
      ),
    ),
    maxLength,
  );

export const getPostImage = (post) =>
  post?.acf?.meta_info?.image?.url ||
  "/logo.png";

export const getPostDateValue = (postOrValue) => {
  if (!postOrValue) {
    return "";
  }

  if (typeof postOrValue === "string") {
    return postOrValue;
  }

  return (
    postOrValue?.acf?.meta_info?.news_date ||
    postOrValue?.acf?.meta_info?.event_date ||
    postOrValue?.date ||
    ""
  );
};

const createDate = (postOrValue) => {
  const value = getPostDateValue(postOrValue);

  if (!value) {
    return null;
  }

  const acfDateMatch = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (acfDateMatch) {
    const [, day, month, year] = acfDateMatch;
    const parsedAcfDate = new Date(Number(year), Number(month) - 1, Number(day));

    if (!Number.isNaN(parsedAcfDate.getTime())) {
      return parsedAcfDate;
    }
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
};

export const getPostTimestamp = (postOrValue) => {
  const parsedDate = createDate(postOrValue);

  if (!parsedDate) {
    return null;
  }

  return parsedDate.getTime();
};

export const formatPostDate = (value, options) => {
  const parsedDate = createDate(value);

  if (!parsedDate) {
    return "";
  }

  return new Intl.DateTimeFormat("en-NZ", options).format(parsedDate);
};

export const formatNewsDate = (value) =>
  formatPostDate(value, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const formatEventDateParts = (value) => ({
  day: formatPostDate(value, { day: "2-digit" }),
  month: formatPostDate(value, { month: "short" }),
});

export const sortNewsPosts = (posts = []) =>
  [...posts].sort((leftPost, rightPost) => {
    const leftTimestamp = getPostTimestamp(leftPost) ?? 0;
    const rightTimestamp = getPostTimestamp(rightPost) ?? 0;

    return rightTimestamp - leftTimestamp;
  });

export const sortUpcomingEventPosts = (posts = []) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  return [...posts].sort((leftPost, rightPost) => {
    const leftTimestamp = getPostTimestamp(leftPost);
    const rightTimestamp = getPostTimestamp(rightPost);

    const leftIsFuture = leftTimestamp !== null && leftTimestamp >= today;
    const rightIsFuture = rightTimestamp !== null && rightTimestamp >= today;

    if (leftIsFuture && !rightIsFuture) {
      return -1;
    }

    if (!leftIsFuture && rightIsFuture) {
      return 1;
    }

    if (leftIsFuture && rightIsFuture) {
      return leftTimestamp - rightTimestamp;
    }

    return (rightTimestamp ?? 0) - (leftTimestamp ?? 0);
  });
};

export const getArchivePath = (contentType) =>
  contentType === "news" ? "/news" : "/upcoming-events";

export const getSinglePostPath = (contentType, slug) =>
  `${getArchivePath(contentType)}/${slug}`;
