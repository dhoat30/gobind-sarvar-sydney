export const revalidate = 2592000;

import { notFound } from "next/navigation";
import Header from "@/Components/UI/Header/Header";
import Footer from "@/Components/UI/Footer/Footer";
import PostDetailPage from "@/Components/UI/Posts/PostDetailPage";
import { getOptions, getSinglePostData } from "@/utils/fetchData";
import { getPostTitle } from "@/utils/wpPostHelpers";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getSinglePostData(slug, "wp-json/wp/v2/upcoming-event");
  const post = data?.[0];

  if (!post) {
    return {};
  }

  const seoData = post?.yoast_head_json;

  return {
    title: seoData?.title || getPostTitle(post),
    description:
      seoData?.description || "Upcoming school events, showcases, and announcements.",
    metadataBase: new URL(process.env.siteUrl),
    openGraph: {
      title: seoData?.title || getPostTitle(post),
      description:
        seoData?.description || "Upcoming school events, showcases, and announcements.",
      url: `${process.env.siteUrl}/upcoming-events/${slug}`,
      siteName: process.env.siteName,
      images: seoData?.og_image?.length
        ? seoData.og_image.map((image) => ({
            url: image.url,
            width: image.width || 1200,
            height: image.height || 630,
          }))
        : [],
      type: "article",
    },
  };
}

export default async function UpcomingEventSinglePage({ params }) {
  const { slug } = await params;
  const [data, options] = await Promise.all([
    getSinglePostData(slug, "wp-json/wp/v2/upcoming-event"),
    getOptions(),
  ]);

  const post = data?.[0];

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="mt-24">
        <PostDetailPage post={post} contentLabel="Upcoming Event" />
      </main>
      <Footer
        showFooterCta={true}
        footerCtaData={options?.footer_cta}
        contactInfo={options?.contact_info}
        socialData={options?.social_links}
      />
    </>
  );
}
