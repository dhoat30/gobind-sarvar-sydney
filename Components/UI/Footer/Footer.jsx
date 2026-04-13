import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import { services, commercialLinks, informationLinks } from "./FooterLinks";
import Copyright from "./Copyright";
import ContactInfo from "./ContactInfo";
import FooterCta from "../CTA/FooterCta";
import styles from "./Footer.module.scss";
import SocialWrapper from "./SocialWrapper";
export default function Footer({
  footerCtaData,
  showFooterCta = true,
  certifications,
  contactInfo,
  socialData,
}) {
  const shouldRenderFooterCta =
    showFooterCta &&
    footerCtaData &&
    (footerCtaData.title ||
      footerCtaData.description ||
      (Array.isArray(footerCtaData.cta) && footerCtaData.cta.length > 0));

  return (
    <>
      {shouldRenderFooterCta && (
        <FooterCta
          title={footerCtaData.title}
          description={footerCtaData.description}
          ctaArray={footerCtaData.cta}
        />
      )}

      <div className={`${styles.footerSection}`}>
        <Container maxWidth="xl" className="row">
          {/* logo wrapper */}
          <div className={`${styles.footerWrapper}`}>
            <div className={`${styles.logoWrapper}`}>
              {/* <Link href="/" className="mb-16 block mt-8">
                <Image
                          src="/logo.png"
                          width={256/1.5 }
                          height={84/1.5  }
                  alt="Logo"
                  style={{ cursor: "pointer" }}
                />
              </Link> */}
              <Typography variant="h5" component="h2" className="title medium" color={"var(--dark-on-surface)"} >
                Gobind Sarvar Sydney
              </Typography>
              <Typography variant="subtitle2" component="div" className="mt-4" color={"var(--dark-on-surface)"} >
                K–2 School Opening 2027
              </Typography>

                  <Typography variant="body1" component="div" className="mt-32" color={"var(--dark-on-surface)"} >
A nurturing early learning environment where children grow through academic excellence, Sikh values, and a strong sense of belonging.              </Typography>

                <Typography variant="h6" component="div" className={`${styles.chipText} medium mt-24`} color={"var(--dark-on-surface)"} >
                  Sydney’s First Sikh Primary School
                </Typography>  
              {socialData && socialData.length > 0 &&
                <SocialWrapper socialData={socialData} />
              }
              {certifications && Array.isArray(certifications.cards) && (
                <div className="certification-wrapper">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginBottom: "8px" }}
                  >
                    Certifications
                  </Typography>
                  <div className="certification-logos flex flex-wrap gap-8 align-center">
                    {certifications.cards.map((item, index) => {
                      return (
                        <Image
                          key={index}
                          src={item.certification_image.url}
                          alt={item.alt ? item.alt : "certification"}
                          width={item.certification_image.width}
                          height={item.certification_image.height}
                        />
                      );
                    })}
                  </div>

                </div>
              )}
            </div>

           
            {(commercialLinks && commercialLinks.length > 0) &&

              <div className={`${styles.linksContainer}`}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ marginBottom: "8px" }}
                  color={"var(--dark-on-surface)"}
                >
                  Commercial
                </Typography>
                <ul
                  className={`${styles.menuList}`}
                  sx={{ margin: 0, padding: 0 }}
                >
                  {commercialLinks.map((link, index) => {
                    return (
                      <li key={index}>
                        <Link href={link.url} className={`${styles.link} body2`}>
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            }


            <div className={`${styles.linksContainer}`}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ marginBottom: "8px" }}
                color={"var(--dark-on-surface)"}
              >
                USEFUL LINKS
              </Typography>
              <ul
                className={`${styles.menuList}`}
                sx={{ margin: 0, padding: 0 }}
              >
                {informationLinks.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link href={link.url} className={`${styles.link} body2`}>
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={`${styles.contactWrapper}`}>
              {contactInfo && contactInfo.info && (
                <div className="contact-section">
                  <ContactInfo contactInfo={contactInfo} />
                </div>
              )}

            </div>
          </div>
        </Container>
      </div>
      {/* copyright container */}
      <Copyright />
    </>
  );
}
