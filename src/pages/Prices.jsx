import { useState, useRef, useEffect } from "react";
import css from "./Prices.module.css";
import { useTranslation } from "react-i18next";

export default function Prices() {
  const { t, i18n } = useTranslation();

const [discountModal, setDiscountModal] = useState({ open: false });
const [discount, setDiscount] = useState(0);

  const [selected, setSelected] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [modal, setModal] = useState({ open: false, index: null });
  // const [servicesState, setServicesState] = useState(() =>
  //   t("prices.services", { returnObjects: true }),
  // );

  const [servicesState, setServicesState] = useState(() => {
    const saved = localStorage.getItem("servicesPrices");
    return saved
      ? JSON.parse(saved)
      : t("prices.services", { returnObjects: true });
  });

  useEffect(() => {
    localStorage.setItem("servicesPrices", JSON.stringify(servicesState));
  }, [servicesState]);

  // useEffect(() => {
  //   setServicesState(t("prices.services", { returnObjects: true }));
  // }, [i18n.language]);

  useEffect(() => {
    const saved = localStorage.getItem("servicesPrices");
    if (!saved) {
      setServicesState(t("prices.services", { returnObjects: true }));
    }
  }, [i18n.language]);

  const [priceModal, setPriceModal] = useState({
    open: false,
    index: null,
    value: "",
  });

  const pressTimer = useRef(null);

  const handlePricePressStart = (index) => {
    pressTimer.current = setTimeout(() => {
      const numeric = getPriceValue(servicesState[index].price);
      setPriceModal({
        open: true,
        index,
        value: numeric,
      });
    }, 600);
  };

  const handlePricePressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };

  const changeQty = (index, value) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: value,
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
    return sum + getPriceValue(servicesState[index].price) * qty;
  }, 0);

  const handleQtyClick = (index) => {
    if (window.innerWidth >= 350 && window.innerWidth <= 430) {
      setModal({ open: true, index });
    }
  };


const handleTotalPressStart = () => {
  pressTimer.current = setTimeout(() => {
    setDiscountModal({ open: true });
  }, 600); // long press for 600ms
};

const handleTotalPressEnd = () => {
  if (pressTimer.current) {
    clearTimeout(pressTimer.current);
  }
};

const applyDiscount = (percent) => {
  setDiscount(percent);
  setDiscountModal({ open: false });
};

// Update total calculation to apply discount
const discountedTotal = total - (total * discount) / 100;



  return (
    <main>
      <article className={css.prices}>
        <p className={css.note}>{t("prices.note")}</p>
        <p className={css.totalPrice}>{t("prices.totalPrice")}</p>
        <table className={css.table}>
          <thead>
            <tr>
              <th>{t("prices.serviceHeader")}</th>
              <th>{t("prices.priceHeader")}</th>
            </tr>
          </thead>

          <tbody>
            {servicesState.map((item, index) => (
              <tr key={index}>
                <td>
                  <label className={css.service}>
                    <input
                      className={css.checkbox}
                      type="checkbox"
                      checked={selected.includes(index)}
                      onChange={() => handleToggle(index)}
                      onClick={() => handleQtyClick(index)}
                    />
                    <span>{item.service}</span>
                  </label>
                </td>
                <td>
                  <div className={css.priceCell}>
                    <div
                      onMouseDown={() => handlePricePressStart(index)}
                      onMouseUp={handlePricePressEnd}
                      onMouseLeave={handlePricePressEnd}
                      onTouchStart={() => handlePricePressStart(index)}
                      onTouchEnd={handlePricePressEnd}
                      className={css.editablePrice}
                    >
                      {item.price}
                    </div>
                    <div className={css.number}>
                      <input
                        type="number"
                        min="1"
                        value={quantities[index] ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          changeQty(index, val === "" ? "" : Number(val));
                        }}
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
        <div className={css.selected}>
          <p className={css.selectedServices}>{t("prices.selectedServices")}</p>
          {selected.length > 0 && (
            <ol className={css.selectedList}>
              {selected.map((index) => {
                const qty = Number(quantities[index] || 1);
                const price = getPriceValue(servicesState[index].price);
                const serviceTotal = price * qty;

                return (
                  <li key={index} className={css.selectedItem}>
                    <span>
                      {" "}
                      {servicesState[index].service} — {price} грн × {qty}{" "}
                      ={" "}
                    </span>
                    <strong>{serviceTotal} грн</strong>
                  </li>
                );
              })}
            </ol>
          )}
          <p
            className={css.total}
            onMouseDown={handleTotalPressStart}
            onMouseUp={handleTotalPressEnd}
            onMouseLeave={handleTotalPressEnd}
            onTouchStart={handleTotalPressStart}
            onTouchEnd={handleTotalPressEnd}
          >
            {t("prices.total")}:<strong> {discountedTotal} грн</strong>
          </p>
        </div>

        {/* Modal for mobile quantity input */}

        {modal.open && (
          <div
            className={css.modalBackdrop}
            onClick={() => setModal({ open: false, index: null })}
          >
            <div
              className={css.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{servicesState[modal.index].service}</h3>
              <p className={css.modalPrice}>
                {servicesState[modal.index].price}
              </p>
              <input
                type="number"
                min="1"
                value={quantities[modal.index] ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  changeQty(modal.index, val === "" ? "" : Number(val));
                }}
                className={css.qtyModal}
              />
              <p className={css.insertQuantity}>{t("prices.insertQuantity")}</p>
              <button
                className={css.closeButton}
                onClick={() => setModal({ open: false, index: null })}
              >
                {t("prices.closeButton")}
              </button>
            </div>
          </div>
        )}

        {priceModal.open && (
          <div
            className={css.modalBackdrop}
            onClick={() =>
              setPriceModal({ open: false, index: null, value: "" })
            }
          >
            <div
              className={css.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{t("prices.editPrice")}</h3>

              <input
                type="number"
                min="0"
                value={priceModal.value}
                onChange={(e) =>
                  setPriceModal((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                className={css.qtyModal}
              />

              <button
                className={css.closeButton}
                onClick={() => {
                  setServicesState((prev) => {
                    const updated = [...prev];
                    updated[priceModal.index] = {
                      ...updated[priceModal.index],
                      price: priceModal.value + " грн",
                    };
                    return updated;
                  });

                  setPriceModal({ open: false, index: null, value: "" });
                }}
              >
                {t("prices.saveButton")}
              </button>
            </div>
          </div>
        )}

        {/* Discount Modal */}
        {discountModal.open && (
          <div
            className={css.modalBackdrop}
            onClick={() => setDiscountModal({ open: false })}
          >
            <div
              className={css.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{t("prices.makeDiscount")}</h3>
              <div className={css.discountOptions}>
                {[5, 10, 15].map((percent) => (
                  <button
                    key={percent}
                    className={css.discountButton}
                    onClick={() => applyDiscount(percent)}
                  >
                    {percent}%
                  </button>
                ))}
              </div>
              <button
                className={css.closeButton}
                onClick={() => setDiscountModal({ open: false })}
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
