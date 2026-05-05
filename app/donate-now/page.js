export const revalidate = 2592000;

import Container from "@mui/material/Container";
import BreadcrumbHero from "@/Components/UI/Hero/BreadcrumbHero";
import Footer from "@/Components/UI/Footer/Footer";
import Header from "@/Components/UI/Header/Header";
import PayWayDonationForm from "@/Components/Pages/DonationPage/PayWayDonationForm";
import { getOptions } from "@/utils/fetchData";
import styles from "./page.module.scss";
import Button from "@mui/material/Button";
export const metadata = {
  title: "Donate Now",
  description:
    "Support Gobind Sarvar Sydney with a direct bank transfer donation.",
};

const bankDetails = [
  { label: "Bank Name", value: "Westpac" },
  { label: "Account Name", value: "Gobind Marg Charitable Limited" },
  { label: "BSB", value: "032111" },
  { label: "Account Number", value: "459419" },
];

export default async function DonateNowPage() {
  const options = await getOptions();
  const paywayPublishableKey =
    process.env.WESTPAC_PUBLISHABLE_KEY ||
    process.env.WESTPAC_PAYWAY_PUBLISHABLE_KEY ||
    process.env.PAYWAY_PUBLISHABLE_KEY;

  return (
    <>
      <Header />
      <main className={styles.donationPage}>
        <BreadcrumbHero
          title="Donate Now"
          description="Support Gobind Sarvar Sydney through a direct bank transfer."
        />
        <div className="flex justify-center mt-40">
             <Button target="_blank" component="a" variant="contained" color="primary" href="https://www.payway.com.au/SignUp?ClientNumber=Q32081&Frequency=VARIABLE&AddressRequired=false&CustomerNumber=&CustomerName=">
        Recurring Donation
        </Button>
    
        </div>
     
        <section className={styles.section}>
          <Container maxWidth="lg">
            {/* <div className={styles.paymentGrid}>
              <PayWayDonationForm publishableApiKey={paywayPublishableKey} />
            </div> */}

            <div className={styles.content}>
              <div className={styles.intro}>
                <h2>Direct Bank Transfer</h2>
                <p>
                  You can also do a direct transfer to the below bank account
                  details at your own leisure.
                </p>
              </div>

              <div className={styles.bankCard}>
                <div className={styles.bankCardHeader}>
                  <h3>Bank Details</h3>
                </div>
                <dl className={styles.bankDetails}>
                  {bankDetails.map((detail) => (
                    <div className={styles.detailRow} key={detail.label}>
                      <dt>{detail.label}</dt>
                      <dd>{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
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
