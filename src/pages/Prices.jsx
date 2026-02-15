import { useState } from "react";
import css from "./Prices.module.css";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  const services = t("prices.services", { returnObjects: true });

  const [selected, setSelected] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [modal, setModal] = useState({ open: false, index: null });

  const changeQty = (index, value) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max(1, value), 
    }));
  };

  const getPriceValue = (price) => {
    return Number(price.replace(/[^\d]/g, ""));
  };

  const handleToggle = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const total = selected.reduce((sum, index) => {
    const qty = quantities[index] || 1;
    return sum + getPriceValue(services[index].price) * qty;
  }, 0);

  const handleQtyClick = (index) => {
    if (window.innerWidth >= 350 && window.innerWidth <= 430) {
      setModal({ open: true, index });
    }
  };


  return (
    <main>
      <article className={css.prices}>
        <p className={css.note}>{t("prices.note")}</p>
        <p className={css.hint}>{t("prices.hint")}</p>

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
                <td>
                  <label className={css.service}>
                    <input
                      className={css.checkbox}
                      type="checkbox"
                      checked={selected.includes(index)}
                      onChange={() => handleToggle(index)}
                    />
                    <span>{item.service}</span>
                  </label>
                </td>
                <td>
                  <div className={css.priceCell}>
                    <div>{item.price}</div>
                    <div
                      className={css.number}
                      onClick={() => handleQtyClick(index)}
                    >
                      <input
                        type="number"
                        min="1"
                        value={quantities[index] || 1}
                        onChange={(e) =>
                          changeQty(index, Number(e.target.value))
                        }
                        className={css.qty}
                      />
                      <p className={css.quantity}>{t("prices.quantity")}</p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={css.total}>
          <strong>{t("prices.total")}:</strong> {total} грн
        </p>
        {modal.open && (
          <div
            className={css.modalBackdrop}
            onClick={() => setModal({ open: false, index: null })}
          >
            <div
              className={css.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{services[modal.index].service}</h3>

              <div className={css.qtySpinner}>
                <button
                  className={css.qtyButton}
                  onClick={() =>
                    changeQty(modal.index, (quantities[modal.index] || 1) - 1)
                  }
                >
                  -
                </button>
                <span>{quantities[modal.index] || 1}</span>
                <button
                  className={css.qtyButton}
                  onClick={() =>
                    changeQty(modal.index, (quantities[modal.index] || 1) + 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                className={css.closeButton}
                onClick={() => setModal({ open: false, index: null })}
              >
                {t("prices.closeButton")}
              </button>
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
