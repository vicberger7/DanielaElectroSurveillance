// AboutMe.jsx

import css from "./AboutUs.module.css";
import photoDaniela from "../assets/images/Daniela.webp";
import photoMisha from "../assets/images/Misha.webp";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t } = useTranslation();
  return (
    <>
      <main>
        <article className={css.aboutUs}>
          <h1>{t("aboutUs.title")}</h1>
          <p className={css.greeting}>{t("aboutUs.greeting")}</p>

          <div className={css.description}>
            <div className={css.mishaCard}>
              <img src={photoMisha} alt="Misha" className={css.mishaImg} />
              <div className={css.mishaText}>
              <h2 className={css.mishaName}>{t("aboutUs.mishaName")}</h2>
              <p className={css.mishaJob}>{t("aboutUs.mishaJob")}</p>
              </div>
            </div>
            <div className={css.danielaCard}>
              <img
                src={photoDaniela}
                alt="Daniela"
                className={css.danielaImg}
              />
              <div className={css.danielaText}>
              <h2 className={css.danielaName}>{t("aboutUs.danielaName")}</h2>
              <p className={css.danielaJob}>{t("aboutUs.danielaJob")}</p>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
