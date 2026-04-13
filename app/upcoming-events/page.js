export const revalidate = 2592000;

import Header from "@/Components/UI/Header/Header";
import Footer from "@/Components/UI/Footer/Footer";
import PostArchivePage from "@/Components/UI/Posts/PostArchivePage";
import { getAllPosts, getOptions } from "@/utils/fetchData";

export const metadata = {
  title: "Upcoming Events",
  description: "View upcoming school events, showcases, and important dates.",
};

export default async function UpcomingEventsPage() {
  const [posts, options] = await Promise.all([
    getAllPosts("wp-json/wp/v2/upcoming-event"),
    getOptions(),
  ]);

  return (
    <>
      <Header />
      <main className="mt-24">
        <PostArchivePage
          title="Upcoming Events"
          description="Keep track of the next key events, enquiries, and community gatherings."
          posts={posts || []}
          contentType="upcoming-event"
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
