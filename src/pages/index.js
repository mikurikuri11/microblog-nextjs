import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import { getPostsData } from "../lib/posts";

import Link from "next/link";

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          私はフルスタックエンジニアです/Udemy講師として活動しています/好きな言語はJavascriptです
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>📝エンジニアのブログ</h2>

        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={thumbnail} className={styles.thumbnailImage} />
              </Link>
              <Link legacyBehavior href={`/posts/${id}`}>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
      </div>
      </section>
    </Layout>
  );
}