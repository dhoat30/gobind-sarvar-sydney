import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import Image from "next/image";
import Link from "next/link";
import styles from "./PostArchivePage.module.scss";
import {
  formatEventDateParts,
  formatNewsDate,
  getPostExcerpt,
  getPostImage,
  getPostTitle,
  getSinglePostPath,
  sortNewsPosts,
  sortUpcomingEventPosts,
} from "@/utils/wpPostHelpers";

function NewsArchiveCard({ post }) {
  return (
    <Link href={getSinglePostPath("news", post.slug)} className={styles.cardLink}>
      <article className={styles.newsCard}>
        <div className={styles.newsImageWrap}>
          <Image
            src={getPostImage(post)}
            alt={getPostTitle(post)}
            fill
            className={styles.newsImage}
            sizes="(max-width: 900px) 100vw, 33vw"
          />
        </div>
        <div className={styles.newsBody}>
          <Typography component="p" variant="caption" className={styles.metaText}>
            {formatNewsDate(post)}
          </Typography>
          <Typography component="h2" variant="h5" className={styles.newsTitle}>
            {getPostTitle(post)}
          </Typography>
          <Typography component="p" variant="body2" className={styles.newsExcerpt}>
            {getPostExcerpt(post, 170)}
          </Typography>
        </div>
      </article>
    </Link>
  );
}

function EventArchiveCard({ post }) {
  const { day, month } = formatEventDateParts(post);

  return (
    <Link
      href={getSinglePostPath("upcoming-event", post.slug)}
      className={styles.cardLink}
    >
      <article className={styles.eventCard}>
        <div className={styles.eventDate}>
          <Typography component="span" variant="h3" className={styles.eventDay}>
            {day}
          </Typography>
          <Typography component="span" variant="subtitle1" className={styles.eventMonth}>
            {month}
          </Typography>
        </div>
        <div className={styles.eventBody}>
          <Typography component="h2" variant="h5" className={styles.eventTitle}>
            {getPostTitle(post)}
          </Typography>
          <Typography component="p" variant="body2" className={styles.eventExcerpt}>
            {getPostExcerpt(post, 170)}
          </Typography>
        </div>
      </article>
    </Link>
  );
}

export default function PostArchivePage({
  title,
  description,
  posts = [],
  contentType,
}) {
  const isNews = contentType === "news";
  const Icon = isNews ? ArticleOutlinedIcon : EventNoteOutlinedIcon;
  const sortedPosts = isNews
    ? sortNewsPosts(posts)
    : sortUpcomingEventPosts(posts);

  return (
    <section className={styles.section}>
      <Container maxWidth="xl">
        <div className={styles.hero}>
          <div className={styles.heroTag}>
            <Icon fontSize="small" />
            <Typography component="span" variant="subtitle1">
              {isNews ? "News" : "Upcoming Events"}
            </Typography>
          </div>
          <Typography component="h1" variant="h2" className={styles.title}>
            {title}
          </Typography>
          <Typography component="p" variant="h6" className={styles.description}>
            {description}
          </Typography>
        </div>

        <div className={isNews ? styles.newsGrid : styles.eventGrid}>
          {sortedPosts.map((post) =>
            isNews ? (
              <NewsArchiveCard key={post.id} post={post} />
            ) : (
              <EventArchiveCard key={post.id} post={post} />
            ),
          )}
        </div>
      </Container>
    </section>
  );
}
