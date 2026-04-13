import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import styles from "./CoreValuesPage.module.scss";

export default function CoreValuesPage({ values }) {
  if (!values?.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <Container maxWidth="xl">
   

        <div className={styles.grid}>
          {values.map((value, index) => (
            <Paper key={value.title} elevation={0} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                <Typography component="h3" variant="h5" className={styles.cardTitle}>
                  {value.title}
                </Typography>
              </div>
              <Typography component="p" variant="body1" className={styles.cardText}>
                {value.description}
              </Typography>
            </Paper>
          ))}
        </div>
      </Container>
    </section>
  );
}
