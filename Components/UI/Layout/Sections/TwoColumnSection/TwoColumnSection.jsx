import Container from '@mui/material/Container';
import React from 'react'
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import styles from './TwoColumnSection.module.scss';
import Link from 'next/link';
function TwoColumnSection(
    {
        title,
        description,
        subtitle,
        posters
    }
) {
    return (
        <section className={`${styles.section}`} >
            <Container maxWidth="xl">
                <Container maxWidth="md" className={`${styles.titleWrapper}`} >
                    <Typography variant='h6' component={"div"} className="subtitle center-align dark" >{subtitle} </Typography >
                    <Typography variant="h2" component="h2" className="mt-8 center-align" color={"var(--dark-on-surface)    "}>{title}</Typography>
                    <Typography variant="h5" component="h5" className='mt-16 center-align regular' color={"var(--dark-on-surface-variant)"}>{description}</Typography>
                </Container>

                <div className={`${styles.postersWrapper} grid align-center gap-24`}>
                    {posters && posters.length > 0 && posters.map((poster, index) => {
                        if(poster.link && poster.link.url) {
                            return (
                                <Link key={index} href={poster.link.url} target={poster.link.target ? poster.link.target : ""} className={`${styles.poster} image-wrapper border-radius-16`} style={{paddingBottom: "93%"}} >
                                    <Image
                                        src={poster.image.url}
                                        alt={poster.image.alt || `Poster ${index + 1}`}
                                      
                                        fill
                                    />
                                </Link>
                            )
                        }
                        return (
                            <div key={index} className={`${styles.poster} image-wrapper border-radius-16`} style={{paddingBottom: "93%"}} >
                                <Image
                                    src={poster.image.url}
                                    alt={poster.image.alt || `Poster ${index + 1}`}
                                  
                                    fill
                                />
                            </div>
                        )
                    })}
                </div>
            </Container>
        </section>
    )

}

export default TwoColumnSection