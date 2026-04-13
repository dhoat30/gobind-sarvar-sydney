export const revalidate = 2592000;

import Header from "@/Components/UI/Header/Header";
import Footer from "@/Components/UI/Footer/Footer";
import BreadcrumbHero from "@/Components/UI/Hero/BreadcrumbHero";
import CoreValuesPage from "@/Components/Pages/CoreValuesPage/CoreValuesPage";
import { getOptions } from "@/utils/fetchData";
import { coreValues } from "@/utils/staticData/coreValuesData";

export const metadata = {
  title: "Our Core Values",
  description:
    "Discover the core values that guide learning, character, and community at Gobind Sarvar.",
};

export default async function CoreValues() {
  const options = await getOptions();

  return (
    <>
      <Header />
      <main>
        <BreadcrumbHero
          title="Our Core Values"
          description="The principles that shape how we learn, serve, and support one another as a school community."
        />
        <CoreValuesPage values={coreValues} />
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
