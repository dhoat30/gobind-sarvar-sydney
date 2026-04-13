import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Image from "next/image";
import Link from "next/link";
import styles from "./LatestUpdatesSection.module.scss";
import {
  formatEventDateParts,
  formatNewsDate,
  getArchivePath,
  getPostExcerpt,
  getPostImage,
  getPostTitle,
  getSinglePostPath,
  sortNewsPosts,
  sortUpcomingEventPosts,
} from "@/utils/wpPostHelpers";
import { Button } from "@mui/material";

function NewsCard({ post }) {
  const href = getSinglePostPath("news", post.slug);
  
  return (
    <Link href={href} className={styles.cardLink}>
      <article className={styles.newsCard}>
        <div className={styles.newsImageWrap}>
          <Image
            src={getPostImage(post)}
            alt={getPostTitle(post)}
            fill
            className={styles.newsImage}
            sizes="(max-width: 900px) 100vw, 240px"
          />
        </div>
        <div className={styles.newsContent}>
          <Typography component="p" variant="caption" className={styles.metaText}>
            {formatNewsDate(post)}
          </Typography>
          <Typography component="h3" variant="h5" className={styles.newsTitle}>
            {getPostTitle(post)}
          </Typography>
          <Typography component="p" variant="body2" className={styles.newsExcerpt}>
            {getPostExcerpt(post, 120)}
          </Typography>
        </div>
      </article>
    </Link>
  );
}

function EventCard({ post }) {
  const href = getSinglePostPath("upcoming-event", post.slug);
  const { day, month } = formatEventDateParts(post);
  return (
    <Link href={href} className={styles.cardLink}>
      <article className={styles.eventCard}>
        <div className={styles.eventDate}>
          <Typography component="span" variant="h3" className={styles.eventDay}>
            {day}
          </Typography>
          <Typography component="span" variant="subtitle1" className={styles.eventMonth}>
            {month}
          </Typography>
        </div>
        <div className={styles.eventContent}>
          <Typography component="h3" variant="h6" className={styles.eventTitle}>
            {getPostTitle(post)}
          </Typography>
        </div>
      </article>
    </Link>
  );
}

export default function LatestUpdatesSection({
  newsPosts = [],
  upcomingEvents = [],
}) {
  const featuredNews = sortNewsPosts(newsPosts).slice(0, 3);
  const featuredEvents = sortUpcomingEventPosts(upcomingEvents).slice(0, 5);

  if (featuredNews.length === 0 && featuredEvents.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <Container maxWidth="xl">
        <div className={styles.heading}>
              <Typography variant="h6" component="div" className={`${styles.subtitle} subtitle`} >
             News &amp; Upcoming Events
            </Typography>
      
          <Typography component="h2" variant="h2" className={`${styles.title} mt-8`} style={{ color: "var(--light-primary)" }}> 
            Latest updates
          </Typography>
                              <Typography variant="h5" component="h5" className='mt-16 center-align regular' color={"var(--light-on-surface-variant)"}>            Stay informed with the latest school news, announcements, and
            progress updates.</Typography>


         
        </div>

        <div className={styles.columns}>
          {featuredNews.length > 0 && (
            <div className={styles.column}>
              <div className={styles.columnHeader}>
                <div className={styles.columnLabel}>
                  <ArticleOutlinedIcon fontSize="small" />
                  <Typography component="h3" variant="h6">
                    News
                  </Typography>
                </div>
                <Link href={getArchivePath("news")} className={styles.sectionLink}>
                <Button variant="text" color="primary" sx={{color: "var(--light-primary)"}}>
                  View all updates <ArrowForwardRoundedIcon fontSize="inherit" />
                </Button>
                </Link>
              </div>

              <div className={styles.newsList}>
                {featuredNews.map((post) => (
                  <NewsCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {featuredEvents.length > 0 && (
            <div className={styles.column}>
              <div className={styles.columnHeader}>
                <div className={styles.columnLabel}>
                  <EventNoteOutlinedIcon fontSize="small" />
                  <Typography component="h3" variant="h6">
                    Upcoming Events
                  </Typography>
                </div>
                <Link
                  href={getArchivePath("upcoming-event")}
                  className={styles.sectionLink}
                >
                    <Button variant="text" color="primary" sx={{color: "var(--light-primary)"}}>
                  View all Events <ArrowForwardRoundedIcon fontSize="inherit" />
                </Button>
                </Link>
                
              </div>

              <div className={styles.eventList}>
                {featuredEvents.map((post) => (
                  <EventCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
