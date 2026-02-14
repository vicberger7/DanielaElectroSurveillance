import css from "./Prices.module.css";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  const services = t("prices.services", { returnObjects: true });

  return (
    <main>
      <article className={css.prices}>
      
        <table className={css.table}>
          <thead>
            <tr>
              <th>{t("prices.serviceHeader")}</th>
              <th>{t("prices.priceHeader")}</th>
            </tr>
          </thead>

          <tbody>
            {services.map((item, index) => (
              <tr key={index}>
                <td>{item.service}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </article>
    </main>
  );
}
