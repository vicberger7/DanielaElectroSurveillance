import css from "./Home.module.css";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <main>
      <article className={css.home}>
        <p className={css.text}>{t("home.title")}</p>
        <p className={css.textServ}>{t("home.service")}</p>
        <p className={css.compName}>{t("home.company")}</p>
      </article>
    </main>
  );
}
