import React from "react";
import styles from "./LandingPageHeroSection.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HeroUSP from "@/Components/UI/USP/HeroUSP";
import Image from "next/image";
import Video from "@/Components/UI/Video/Video";
import GoogleReviewSnippet from "@/Components/UI/GoogleReviews/GoogleReviewCard/GoogleReviewSnippet";
import HeroUSPBox from "@/Components/UI/USP/HeroUSPBox";
import MultipartForm from "@/Components/UI/Forms/MultipartForm";

export default function LandingPageHeroSection({
  title,
  subtitle,
  reviewTitle,
  description,
  cta,
  graphicType,
  graphicData,
  uspData,
  reviewerPics,
  aboveTitleUsp,
  trustSnippet
}) {
console.log("graphci data " + graphicData)
  let graphic 
    if (graphicType === "image") {
    graphic = (
      <div
        className={`${styles.graphicWrapper} image-wrapper border-radius-16`}
        style={{ paddingBottom: `${(graphicData.height / graphicData.width) * 100}%` }}
      >
        <Image
          src={graphicData.url}
          alt={graphicData.alt || title}
          fill
          className={`${styles.image}`}
        />
      </div>
    );
  }
  console.log("title" + trustSnippet.title)
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.contentWrapper} `}>
      {subtitle && (
           <div className={`${styles.titleUSP} flex gap-8 mb-16 align-center`}>
          <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7778 2.22222H16.6667V0H14.4444V2.22222H5.55556V0H3.33333V2.22222H2.22222C0.988889 2.22222 0.0111111 3.22222 0.0111111 4.44444L0 20C0 21.2222 0.988889 22.2222 2.22222 22.2222H17.7778C19 22.2222 20 21.2222 20 20V4.44444C20 3.22222 19 2.22222 17.7778 2.22222ZM17.7778 20H2.22222V8.88889H17.7778V20ZM6.66667 13.3333H4.44444V11.1111H6.66667V13.3333ZM11.1111 13.3333H8.88889V11.1111H11.1111V13.3333ZM15.5556 13.3333H13.3333V11.1111H15.5556V13.3333ZM6.66667 17.7778H4.44444V15.5556H6.66667V17.7778ZM11.1111 17.7778H8.88889V15.5556H11.1111V17.7778ZM15.5556 17.7778H13.3333V15.5556H15.5556V17.7778Z" fill="var(--dark-secondary-container)"/>
</svg>

            <Typography variant="subtitle1" component="div" color={`var(--dark-secondary-container)`} >
              {subtitle}
            </Typography>
          </div>
      )}
       
          <div
            dangerouslySetInnerHTML={{ __html: title }}
            className={`heading-1 dark-heading center-align ${styles.title}`}
          />
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={`heading-3 dark-heading center-align mt-16 medium ${styles.description}`}
          />

          <HeroUSPBox data={uspData} className="mt-16" />


        
          {cta && (
            <div className={`${styles.formWrapper} `} variant="outlined">

              <Link href={cta.url} className="mt-16 block">
                <Button
                  className="block"
                  variant="contained"
                  disableElevation
                  size="large"
                >
                  {cta.title}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {graphic} 
    </section>
  );
}
