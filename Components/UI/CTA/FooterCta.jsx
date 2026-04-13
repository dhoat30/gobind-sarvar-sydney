import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";
import styles from "./FooterCTA.module.scss";
import Image from "next/image";
export default function FooterCta({ title, description, ctaArray }) {

  return (
  <section className={`${styles.section}`}>
      <Container maxWidth="lg">
        <div className={ `${styles.wrapper}`}>
          <div className={ `${styles.contentWrapper} grid gap-56`}>
            <div className={"title-description-wrapper"}>

                    <Typography variant='h6' component={"div"} className="subtitle  dark" >
             Enrolment
            </Typography>
                        <Typography
              component="h2"
              variant="h3"
              color="white"
              className="title mt-8"
            >
              {title}
              
            </Typography>
            <Typography
              component="div"
              variant="h5"
              color="white"
              className="description mt-16 regular"
            >
              {description}              
            </Typography>
          </div>

            <div className={`${styles.ctaWrapper} button-wrapper flex flex-wrap gap-16 `}>
              {ctaArray && ctaArray.map((cta, index) => { 
                return       <Link href={cta.link.url} key={index}>
                <Button
                  size="large"
                  variant={index=== 0 ? "contained" : "outlined"}
                  sx={{
                    background: `${index === 0 ? "#ffffff" : "rgba(255, 255, 255, 0.1)"}`,  
                    color: `${index === 0 ? "var(--light-primary)" : "#ffffff"}`,
                    border: `1px solid #ffffff`,
                    width: "200px", 
                   
                  }}
                >
                  {cta.link.title}
                </Button>
              </Link>
              } )  
              }

       
            </div>
          </div>
          <div className={ `${styles.imageWrapper} image-wrapper` }> 
            <Image src="/footer_cta_bg.jpg" alt="Footer CTA Image"  className="footer-cta-image" fill />

          </div>
        </div>
      </Container>
    </section>
  );
}

