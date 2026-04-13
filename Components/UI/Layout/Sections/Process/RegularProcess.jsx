import styles from "./Process.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
export default function RegularProcess({ title, description, cards, image }) {
  if (!cards) return null;

  const stepCards = cards.map((item, index) => {
    return (
      <div className={`${styles.stepWrapper} grid`} key={index}>
        <div className={`${styles.title}`}>
          <div
            className={`${styles.stepTitleNumberWrapper} flex gap-8 align-bottom`}
          >
            <Typography variant="h4" component="div" className={`${styles.stepNumber}`}>0{index + 1}.</Typography>
          
          </div>
        </div>
        <div className={`${styles.content}`}>
        <Typography variant="h6" component="h3">
              {item.title}
            </Typography>
          <Typography
            variant="body1"
            component="div"
            className="description"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></Typography>
        </div>
      </div>
    );
  });

  return (
    <section className={`${styles.section}`}>
      <Container maxWidth="xl" className={`${styles.container} grid gap-80 align-center`}>
        <div className={`${styles.imageWrapper} image-wrapper border-radius-16`} style={{paddingBottom: `${image.height / image.width * 100}%`}}>
          {/* <div className={`${styles.backgroundGradient} `}></div> */}
          <Image src={image.url} alt={image.alt || title} fill sizes="(max-width: 1100px) 100vw, (max-width: 1200px) 50vw" className="border-radius-16" />
        </div>
        <div className={`${styles.contentWrapper} `}>
          <div className={`${styles.titleWrapper}`}>
            <Typography
              variant="h4"
              component="h2"
              className={`${styles.titleWrapper}`}
            >
              {title}
            </Typography>
            {description && (
              <Typography variant="body1" component="p">
                {description}
              </Typography>
            )}
          </div>

          <div
            className={`${styles.stepsWrapper} grid gap-32 space-between mt-24 `}
          >
            {stepCards}
          </div>
        </div>
        
      </Container>
    </section>
  );
}
