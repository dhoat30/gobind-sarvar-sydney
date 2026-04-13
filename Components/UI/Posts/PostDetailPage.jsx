import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./PostDetailPage.module.scss";
import { formatNewsDate, getPostImage, getPostTitle } from "@/utils/wpPostHelpers";

export default function PostDetailPage({ post, contentLabel }) {
  return (
    <article className={styles.article}>
      <Container maxWidth="lg">
        <div className={styles.hero}>
          <Typography component="p" variant="overline" className={styles.label}>
            {contentLabel}
          </Typography>
          <Typography component="h1" variant="h2" className={styles.title}>
            {getPostTitle(post)}
          </Typography>
          <Typography component="p" variant="subtitle1" className={styles.date}>
            {formatNewsDate(post)}
          </Typography>
        </div>

        <div className={styles.imageWrap}>
          <Image
            src={getPostImage(post)}
            alt={getPostTitle(post)}
            fill
            className={styles.image}
            sizes="(max-width: 1200px) 100vw, 1100px"
          />
        </div>

        <Container maxWidth="md" className={styles.contentWrap}>
          <Typography
            component="div"
            variant="body1"
            className={`policy-html ${styles.content}`}
            dangerouslySetInnerHTML={{ __html: post?.content?.rendered || "" }}
          />
        </Container>
      </Container>
    </article>
  );
}
