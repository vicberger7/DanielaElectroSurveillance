import css from "./ContactUs.module.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaClock, FaPhone } from "react-icons/fa";

export default function ContactUs() {
  const { t } = useTranslation();
  return (
    <>
      <main>
        <article className={css.contactUs}>
          <div className={css.contactUsData}>
            <div className={css.mailCard}>
              <div className={css.mailText}>
                <div className={css.mailIcon}>
                  <FaEnvelope size={24} color="blue" />
                  <p className={css.mailLine}>{t("contactUs.emailLine")}</p>
                </div>
                <a
                  data-tooltip-id="emailTip"
                  data-tooltip-content={t("contactUs.emailTooltip")}
                  href="mailto:danielaguzhvaj@gmail.com"
                  className={css.mail}
                >
                  danielaguzhvaj@gmail.com
                </a>

                <Tooltip id="emailTip" />
              </div>
            </div>

            <div className={css.workHoursCard}>
              <div className={css.workHoursIcon}>
                <FaClock size={20} color="gray" />
                <h3 className={css.workHoursTitle}>
                  {t("contactUs.workHoursTitle")}
                </h3>
              </div>
              <p className={css.workHoursLine}>
                {t("contactUs.workHoursLine1")}
              </p>
              <p className={css.workHoursLine}>
                {t("contactUs.workHoursLine2")}
              </p>
            </div>
            <div className={css.phoneCard}>
              <div className={css.phoneSection}>
                <div className={css.phoneIcon1}>
                  <FaPhone size={22} color="green" />
                  <p className={css.phoneLine}>
                    {t("contactUs.phoneMisha")} +380509361768
                  </p>
                </div>
                <button
                  onClick={() => (window.location.href = "tel:+380509361768")}
                  className={css.callButton}
                >
                  {t("contactUs.callButton")}
                </button>
              </div>

              <div className={css.phoneSection}>
                <div className={css.phoneIcon2}>
                  <FaPhone size={22} color="green" />
                  <p className={css.phoneLine}>
                    {t("contactUs.phoneDaniela")} +380664863274
                  </p>
                </div>
                <button
                  onClick={() => (window.location.href = "tel:+380664863274")}
                  className={css.callButton}
                >
                  {t("contactUs.callButton")}
                </button>
              </div>
            </div>
          </div>

          <div className={css.addressCard}>
            <h3 className={css.addressTitle}>{t("contactUs.addressTitle")}</h3>
            <p className={css.getDirections}>{t("contactUs.getDirections")}</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3139.2831303819107!2d22.703442776737333!3d48.44676802958505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4739ab9b0c88ab45%3A0x66f3c53585f06af4!2sUzhhorods&#39;ka%20St%2C%2084%2C%20Mukacheve%2C%20Zakarpats&#39;ka%20oblast%2C%20Ukraine%2C%2089611!5e1!3m2!1sen!2smt!4v1769962783418!5m2!1sen!2smt"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </article>
      </main>
    </>
  );
}
