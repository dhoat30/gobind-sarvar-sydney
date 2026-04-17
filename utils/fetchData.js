const defaultProtocol =
  process.env.NODE_ENV === "production" ? "https" : "http";

const ensureAbsoluteBaseUrl = (value) => {
  if (!value) {
    return "";
  }

  const trimmedValue = value.trim().replace(/\/+$/, "");

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  return `${defaultProtocol}://${trimmedValue}`;
};

const buildUrl = (baseUrl, path) => {
  const normalizedBaseUrl = ensureAbsoluteBaseUrl(baseUrl);
  const normalizedPath = path.replace(/^\/+/, "");

  return new URL(normalizedPath, `${normalizedBaseUrl}/`).toString();
};

const cmsBaseUrl = ensureAbsoluteBaseUrl(process.env.url);
const siteBaseUrl = ensureAbsoluteBaseUrl(process.env.siteUrl);
console.log("CMS Base URL:", cmsBaseUrl);
console.log("Site Base URL:", siteBaseUrl);
//get single post with slug
export const getSinglePostData = async (slug, apiRoute) => {
  console.log("Fetching from API:", slug);

  try {
    const url = `${buildUrl(cmsBaseUrl, apiRoute)}?slug=${slug}&acf_format=standard`;
    console.log("Fetching:", url);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
      next: { revalidate: 2592000 },
    });

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in getSinglePostData:", err);
    return null;
  }
};

// get single post data using post id
export const getSinglePostDataWithID = async (id, apiRoute) => {
  let response = await fetch(
    `${buildUrl(cmsBaseUrl, `${apiRoute}/${id}`)}?acf_format=standard`,
    {
      next: { revalidate: 2592000 },
    },
  );
  let data = await response.json();
  return data;
};

//get all posts
export const getAllPosts = async (apiRoute) => {
  let response = await fetch(
    `${buildUrl(cmsBaseUrl, apiRoute)}?acf_format=standard&per_page=100&_embed=1`,
    {
      next: { revalidate: 2592000 },
    },
  );
  let data = await response.json();
  return data;
};

export const getOptions = async () => {
  let fetchData = await fetch(buildUrl(cmsBaseUrl, "wp-json/options/all"), {
    next: { revalidate: 2592000 },
  });
  let data = await fetchData.json();
  return data;
};

// get reivews
export const getGoogleReviews = async () => {
  const res = await fetch(buildUrl(siteBaseUrl, "api/google-reviews"), {
    next: { revalidate: 2592000 },
  });

  if (!res.ok) {
    console.log("failed to retch");
    return [];
  }
  return res.json();
};

// get pick up addres
export const getHubspotContacts = async () => {
  const res = await fetch(buildUrl(siteBaseUrl, "api/hubspot/contacts?limit=100"), {
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.ok) {
    console.log("HubSpot API error:", { status: res.status, data });
    return [];
  }

  return data.results || [];
};

export const getLongDistanceRoutes = async () => {
  let fetchData = await fetch(
    buildUrl(cmsBaseUrl, "wp-json/smart/v1/long-distance-moves"),
    {
      next: { revalidate: 2592000 },
    },
  );
  let data = await fetchData.json();
  return data;
};
