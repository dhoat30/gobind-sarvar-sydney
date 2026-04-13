import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "next/link";
import styles from "./AboutUsPage.module.scss";

export default function AboutUsPage({
  hero,
  educationalApproaches,
  programStreams,
  globalStats,
  sydneyLocations,
  organisationMeta,
}) {
  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <Container maxWidth="xl">
          <div className={styles.heroPanel}>
            <Typography component="p" variant="overline" className={styles.eyebrow}>
              {hero.tagline}
            </Typography>
            <Typography component="h2" variant="h2" className={styles.heroTitle}>
              Who we are
            </Typography>
            <Typography component="p" variant="h6" className={`${styles.heroDescription} mt-8 mb-16`}>
              {hero.description}
            </Typography>
            <Typography component="p" variant="body1" className={styles.heroBody}>
              {hero.intro}
            </Typography>
          </div>
        </Container>
      </section>

      <section className={styles.section}>
        <Container maxWidth="xl">
          <div className={styles.sectionHeading}>
            <Typography component="p" variant="overline" className={styles.sectionEyebrow}>
              Educational Approaches
            </Typography>
            <Typography component="h2" variant="h3" className={styles.sectionTitle}>
              Our Approach to Education
            </Typography>
            <Typography component="p" variant="body1" className={styles.sectionText}>
              At Gobind Sarvar, education goes beyond textbooks.
            </Typography>
          </div>

          <div className={styles.approachGrid}>
            {educationalApproaches.map((approach) => {
              const Icon = approach.icon;

              return (
                <Paper key={approach.title} elevation={0} className={styles.approachCard}>
                  <div className={styles.iconWrap}>
                    <Icon fontSize="small" />
                  </div>
                  <Typography component="h3" variant="h5" className={styles.cardTitle}>
                    {approach.title}
                  </Typography>
                  <Typography component="p" variant="body1" className={styles.cardText}>
                    {approach.description}
                  </Typography>
                </Paper>
              );
            })}
          </div>
        </Container>
      </section>

      <section className={styles.section}>
        <Container maxWidth="xl">
          <div className={styles.streamGrid}>
            {programStreams.map((stream) => (
              <Paper key={stream.title} elevation={0} className={styles.streamCard}>
                <Typography component="p" variant="overline" className={styles.streamEyebrow}>
                  {stream.subtitle}
                </Typography>
                <Typography component="h3" variant="h4" className={styles.streamTitle}>
                  {stream.title}
                </Typography>
                <Typography component="p" variant="body1" className={styles.streamText}>
                  {stream.description}
                </Typography>
                <ul className={styles.pointList}>
                  {stream.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Paper>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.section}>
        <Container maxWidth="xl">
          <div className={styles.globalPanel}>
            <div className={styles.sectionHeadingLeft}>
              <Typography component="p" variant="overline" className={styles.sectionEyebrow}>
                A Global Family
              </Typography>
              <Typography component="h2" variant="h3" className={styles.sectionTitle}>
                A united vision of education rooted in identity, values, and excellence
              </Typography>
              <Typography component="p" variant="body1" className={styles.sectionText}>
                From North America to Europe, Asia, and Australia, Gobind Sarvar
                schools and Gurmat programs are creating connected communities of
                learners and guides.
              </Typography>
            </div>

            <div className={styles.statsGrid}>
              {globalStats.map((stat) => (
                <Paper key={stat.label} elevation={0} className={styles.statCard}>
                  <Typography
                    component="div"
                    variant="h4"
                    className={`${styles.statValue} ${
                      stat.value.length > 4 ? styles.statValueCompact : ""
                    }`}
                  >
                    {stat.value}
                  </Typography>
                  <Typography component="div" variant="subtitle1" className={styles.statLabel}>
                    {stat.label}
                  </Typography>
                </Paper>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section}>
        <Container maxWidth="xl">
          <div className={styles.sectionHeading}>
            <Typography component="p" variant="overline" className={styles.sectionEyebrow}>
              Gobind Sarvar Sydney
            </Typography>
            <Typography component="h2" variant="h3" className={styles.sectionTitle}>
              Today's Learner...Tomorrow's Guide
            </Typography>
          </div>

          <div className={styles.locationsGrid}>
            {sydneyLocations.map((location) => (
              <Paper key={`${location.organisation}-${location.site}`} elevation={0} className={styles.locationCard}>
                <Typography component="p" variant="overline" className={styles.locationOrg}>
                  {location.organisation}
                </Typography>
                <Typography component="h3" variant="h5" className={styles.locationTitle}>
                  {location.site}
                </Typography>
                <Typography component="p" variant="body1" className={styles.locationAddress}>
                  {location.address}
                </Typography>
              </Paper>
            ))}
          </div>

        </Container>
      </section>
    </div>
  );
}
