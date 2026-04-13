export const revalidate = 2592000;

import Header from "@/Components/UI/Header/Header";
import Footer from "@/Components/UI/Footer/Footer";
import BreadcrumbHero from "@/Components/UI/Hero/BreadcrumbHero";
import AboutUsPage from "@/Components/Pages/AboutUsPage/AboutUsPage";
import { getOptions } from "@/utils/fetchData";
import {
  aboutUsHero,
  educationalApproaches,
  globalStats,
  organisationMeta,
  programStreams,
  sydneyLocations,
} from "@/utils/staticData/aboutUsData";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Gobind Sarvar Sydney, our educational approach, global community, and values-based vision for students.",
};

export default async function AboutUs() {
  const options = await getOptions();

  return (
    <>
      <Header />
      <main>
        <BreadcrumbHero
          title={aboutUsHero.title}
          description={aboutUsHero.description}
        />
        <AboutUsPage
          hero={aboutUsHero}
          educationalApproaches={educationalApproaches}
          programStreams={programStreams}
          globalStats={globalStats}
          sydneyLocations={sydneyLocations}
          organisationMeta={organisationMeta}
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
