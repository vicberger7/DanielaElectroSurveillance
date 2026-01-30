// AboutMe.jsx

import css from "./AboutUs.module.css";
import photo from "../assets/images/Daniela.webp";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t } = useTranslation();
  return (
    <>
      <main>
        <article className={css.aboutMe}>
          <img src={photo} alt="Marianna" className={css.aboutImage} />
          <div className={css.text}>
            <p>{t("aboutMe.greeting")}</p>
            <p> {t("aboutMe.intro")} </p>
            <p>{t("aboutMe.experience")}</p>
            <p>{t("aboutMe.passion")}</p>
          </div>
        </article>
      </main>
    </>
  );
}
