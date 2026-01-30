import css from "./OurServices.module.css";
import { useTranslation } from "react-i18next";

export default function OurServices() {
    const { t } = useTranslation();
    return (
        <main>
            <article className={css.ourServices}>
                <h2>{t("ourServices.title")}</h2>
                <p>{t("ourServices.description")}</p>
            </article>
        </main>
    );
}