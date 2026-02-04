import { useState } from "react";
import css from "./OurServices.module.css";
import { useTranslation } from "react-i18next";

export default function OurServices() {
  const { t } = useTranslation();
  const [modalContent, setModalContent] = useState(null);

  const openModal = (title, description) => {
    setModalContent({ title, description });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const formatText = (text) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };


  return (
    <main>
      <article className={css.ourServices}>
        <h1>{t("ourServices.title")}</h1>
        <p className={css.hint}>{t("ourServices.hint")}</p>

        <div className={css.servicesContainer}>
          <div className={css.electricityContainerWrap}>
            <div className={css.electricityTitle}>
              {t("ourServices.electricJobs")}
            </div>

            <div className={css.electricityContainer}>
              <div
                className={css.electricityCard}
                onClick={() =>
                  openModal(
                    t("ourServices.mountUnmount"),
                    t("description.mountUnmount"),
                  )
                }
              >
                <h2>{t("ourServices.mountUnmount")}</h2>
              </div>

              <div
                className={css.electricityCard}
                onClick={() =>
                  openModal(t("ourServices.elBoxes"), t("description.elBoxes"))
                }
              >
                <h2>{t("ourServices.elBoxes")}</h2>
              </div>

              <div
                className={css.electricityCard}
                onClick={() =>
                  openModal(
                    t("ourServices.lightning"),
                    t("description.lightning"),
                  )
                }
              >
                <h2>{t("ourServices.lightning")}</h2>
              </div>

              <div
                className={css.electricityCard}
                onClick={() =>
                  openModal(t("ourServices.lowVolt"), t("description.lowVolt"))
                }
              >
                <h2>{t("ourServices.lowVolt")}</h2>
              </div>

              <div
                className={css.electricityCard}
                onClick={() =>
                  openModal(t("ourServices.repJobs"), t("description.repJobs"))
                }
              >
                <h2>{t("ourServices.repJobs")}</h2>
              </div>

              <div
                className={css.electricityCard}
                onClick={() =>
                  openModal(t("ourServices.consult"), t("description.consult"))
                }
              >
                <h2>{t("ourServices.consult")}</h2>
              </div>
            </div>
          </div>

          {/* SURVEILLANCE SECTION (NOW OPENS MODAL TOO) */}
          <div className={css.surveillanceContainerWrap}>
            <div className={css.surveillanceTitle}>
              {t("ourServices.smartHomeandSurveillanceJobs")}
            </div>

            <div className={css.surveillanceContainer}>
              <div
                className={css.surveillanceCard}
                onClick={() =>
                  openModal(t("ourServices.smart"), t("description.smart"))
                }
              >
                <h2>{t("ourServices.smart")}</h2>
              </div>

              <div
                className={css.surveillanceCard}
                onClick={() =>
                  openModal(t("ourServices.support"), t("description.support"))
                }
              >
                <h2>{t("ourServices.support")}</h2>
              </div>

              <div
                className={css.surveillanceCard}
                onClick={() =>
                  openModal(
                    t("ourServices.surveillance"),
                    t("description.surveillance"),
                  )
                }
              >
                <h2>{t("ourServices.surveillance")}</h2>
              </div>

              <div
                className={css.surveillanceCard}
                onClick={() =>
                  openModal(t("ourServices.safety"), t("description.safety"))
                }
              >
                <h2>{t("ourServices.safety")}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL WINDOW */}
        {modalContent && (
          <div className={css.modalOverlay} onClick={closeModal}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
              <button className={css.closeBtn} onClick={closeModal}>
                ✖
              </button>
              <h2>{modalContent.title}</h2>
              <p>{formatText(modalContent.description)}</p>
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
