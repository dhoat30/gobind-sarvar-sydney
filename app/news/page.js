export const revalidate = 2592000;

import Header from "@/Components/UI/Header/Header";
import Footer from "@/Components/UI/Footer/Footer";
import PostArchivePage from "@/Components/UI/Posts/PostArchivePage";
import { getAllPosts, getOptions } from "@/utils/fetchData";

export const metadata = {
  title: "News",
  description: "Latest school news, announcements, and progress updates.",
};

export default async function NewsPage() {
  const [posts, options] = await Promise.all([
    getAllPosts("wp-json/wp/v2/news"),
    getOptions(),
  ]);

  return (
    <>
      <Header />
      <main className="mt-24">
        <PostArchivePage
          title="School News"
          description="Read the latest announcements, milestones, and progress stories from the school community."
          posts={posts || []}
          contentType="news"
        />
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
