import css from "./ContactUs.module.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const { t } = useTranslation();
  return (
    <>
      <main>
        <article className={css.contactMe}>
          <div className={css.text}>
            <p className={css.mailLine}>
              {t("contactMe.emailLine")}{" "}
              <a
                data-tooltip-id="emailTip"
                data-tooltip-content={t("contactMe.emailTooltip")}
                href="mailto:atsbergerdiana@gmail.com"
                className={css.mail}
              >
                atsbergerdiana@gmail.com
              </a>
              <Tooltip id="emailTip" />
            </p>

            <p className={css.phoneLine}>
              {t("contactMe.phoneLine")}
              <a href="tel:+35679904537" className={css.number}>
                +35679904537
              </a>
              <button
                onClick={() => (window.location.href = "tel:+35679904537")}
                className={css.callButton}
              >
                {t("contactMe.callButton")}
              </button>
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
