export const revalidate = 2592000;

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Header from "@/Components/UI/Header/Header";
import Footer from "@/Components/UI/Footer/Footer";
import BreadcrumbHero from "@/Components/UI/Hero/BreadcrumbHero";
import { getOptions } from "@/utils/fetchData";
import styles from "./page.module.scss";

export const metadata = {
  title: "High School",
  description:
    "Learn about the planned future opening of Gobind Sarvar High School, tentatively targeted for 2030.",
};

export default async function HighSchoolPage() {
  const options = await getOptions();

  return (
    <>
      <Header />
      <main>
        <BreadcrumbHero
          title="High School"
          description="A future-focused next step in the Gobind Sarvar Sydney learning journey."
        />
        <section className={styles.section}>
          <Container maxWidth="xl">
            <div className={styles.contentCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/high-school.webp"
                  alt="Gobind Sarvar High School"
                  width={1080}
                  height={283}
                  className={styles.image}
                  priority
                />
              </div>
              <span className={styles.eyebrow}>Tentative 2030</span>
              <Typography variant="h3" component="h2" className={styles.title}>
                Gobind Sarvar High School
              </Typography>
              <Typography variant="body1" component="p" className={styles.body}>
                Once Gobind Sarvar primary school has been established, the
                preparation will start for the opening of Gobind Sarvar High
                School to cater for children progressing through primary school
                and those wishing to join from Years 7 to 12.
              </Typography>
            </div>
          </Container>
        </section>
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
