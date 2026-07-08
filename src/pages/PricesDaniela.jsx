import React, { useState, useRef, useEffect } from "react";
import css from "./PricesDaniela.module.css";
import { useTranslation } from "react-i18next";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PricesDaniela() {
  const selectedRef = useRef(null);
  const { t, i18n } = useTranslation();

  const [discountModal, setDiscountModal] = useState({ open: false });
  const [discount, setDiscount] = useState(0);

  const [selected, setSelected] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [modal, setModal] = useState({ open: false, index: null });
  const [isExporting, setIsExporting] = useState(false);

  const services = t("pricesDaniela.services", { returnObjects: true });

  // const flatServices = services.flatMap((group) =>
  //   group.items.map((item) => ({
  //     ...item,
  //     category: group.category,
  //   })),
  // );

  const getCurrentPrice = (index) => {
    return prices[index]?.price || services[index].price;
  };

  const STORAGE_KEY = "servicePrices";

  const [prices, setPrices] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prices));
  }, [prices]);

  const [priceModal, setPriceModal] = useState({
    open: false,
    index: null,
    value: "",
  });

  const pressTimer = useRef(null);

  const handlePricePressStart = (index) => {
    pressTimer.current = setTimeout(() => {
      const numeric = getPriceValue(getCurrentPrice(index));

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

  const handleQtyChange = (index, value) => {
    if (value === "") {
      changeQty(index, "");
      setSelected((prev) => prev.filter((i) => i !== index));
      return;
    }

    const qty = Math.max(1, Number(value));

    changeQty(index, qty);

    setSelected((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  const getPriceValue = (price) => {
    return Number(price.replace(/[^\d]/g, ""));
  };


  const handleToggle = (index) => {
    if (selected.includes(index)) {
      setSelected((prev) => prev.filter((i) => i !== index));

      setQuantities((prev) => {
        const newQty = { ...prev };
        delete newQty[index];
        return newQty;
      });
    } else {
      setSelected((prev) => [...prev, index]);
    }
  };

  const total = selected.reduce((sum, index) => {
    const qty = quantities[index] || 1;

    return sum + getPriceValue(getCurrentPrice(index)) * qty;
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
  const discountedTotal = Math.round(total - (total * discount) / 100);

  const handleDownloadPDF = async () => {
    if (!selectedRef.current) return;

    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = await html2canvas(selectedRef.current, {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      windowWidth: document.documentElement.scrollWidth,
    });

    const imgData = canvas.toDataURL("image/png");

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // create pdf with dynamic height
    const pdf = new jsPDF("p", "mm", [imgWidth, imgHeight]);

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    const pdfBlob = pdf.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, "_blank");

    setIsExporting(false);
  };

  const closeQtyModal = () => {
    const qty = quantities[modal.index];

    if (!qty || qty < 1) {
      setSelected((prev) => prev.filter((i) => i !== modal.index));
    } else {
      setSelected((prev) =>
        prev.includes(modal.index) ? prev : [...prev, modal.index],
      );
    }

    setModal({
      open: false,
      index: null,
    });
  };

  return (
    <main>
      <article className={css.prices}>
        <p className={css.note}>{t("pricesDaniela.note")}</p>
        <p className={css.totalPrice}>{t("pricesDaniela.totalPrice")}</p>
        <table className={css.table}>
          <thead>
            <tr>
              <th>{t("prices.serviceHeader")}</th>
              <th>{t("prices.priceHeader")}</th>
            </tr>
          </thead>

          {/* <tbody>
            {services.map((group, groupIndex) => {
              let offset = services
                .slice(0, groupIndex)
                .reduce((sum, g) => sum + g.items.length, 0);

              return (
                <React.Fragment key={groupIndex}>
                  <tr className={css.categoryRow}>
                    <td colSpan={2}>{group.category}</td>
                  </tr>

                  {group.items.map((item, itemIndex) => {
                    const globalIndex = offset + itemIndex;

                    return (
                      <tr key={globalIndex}>
                        <td>
                          <label className={css.service}>
                            <input
                              className={css.checkbox}
                              type="checkbox"
                              checked={selected.includes(globalIndex)}
                              onChange={() => {
                                const qty = quantities[globalIndex];

                                if (qty && qty >= 1) {
                                  handleToggle(globalIndex);
                                } else {
                                  handleQtyClick(globalIndex);
                                }
                              }}
                            />
                            <span>{item.service}</span>
                          </label>
                        </td>

                        <td>
                          <div className={css.priceCell}>
                            <div
                              onMouseDown={() =>
                                handlePricePressStart(globalIndex)
                              }
                              onMouseUp={handlePricePressEnd}
                              onMouseLeave={handlePricePressEnd}
                              onTouchStart={() =>
                                handlePricePressStart(globalIndex)
                              }
                              onTouchEnd={handlePricePressEnd}
                              className={css.editablePrice}
                            >
                              {getCurrentPrice(globalIndex)}
                            </div>

                            <div className={css.number}>
                              <input
                                type="number"
                                min="1"
                                value={quantities[globalIndex] ?? ""}
                                onChange={(e) =>
                                  handleQtyChange(globalIndex, e.target.value)
                                }
                                className={css.qty}
                              />

                              <p className={css.quantity}>
                                {t("prices.quantity")}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody> */}
          <tbody>
            {services.map((item, index) => (
              <tr key={index}>
                <td>
                  <label className={css.service}>
                    <input
                      className={css.checkbox}
                      type="checkbox"
                      checked={selected.includes(index)}
                      onChange={() => {
                        const qty = quantities[index];

                        if (qty && qty >= 1) {
                          handleToggle(index);
                        } else {
                          handleQtyClick(index);
                        }
                      }}
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
                      {getCurrentPrice(index)}
                    </div>

                    <div className={css.number}>
                      <input
                        type="number"
                        min="1"
                        value={quantities[index] ?? ""}
                        onChange={(e) => handleQtyChange(index, e.target.value)}
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
        <div className={css.selected} ref={selectedRef}>
          <p className={css.selectedServices}>{t("prices.selectedServices")}</p>
          {selected.length > 0 && (
            <ol className={css.selectedList}>
              {selected.map((index) => {
                const qty = Number(quantities[index] || 1);
                const price = getPriceValue(getCurrentPrice(index));
                const serviceTotal = price * qty;

                return (
                  <li key={index} className={css.selectedItem}>
                    <span>
                      {" "}
                      {services[index].service} — {price} грн × {qty} ={" "}
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
            {t("prices.total")}:<strong> {total} грн</strong>
          </p>
          {discount > 0 && (
            <>
              <p className={css.discountInfo}>
                {t("prices.discount")} {discount}%:{" "}
                <strong>{Math.round((total * discount) / 100)} грн</strong>
              </p>

              <p className={css.amountDue}>
                {t("prices.amountDue")}: <strong>{discountedTotal} грн</strong>
              </p>
            </>
          )}
          {total > 0 && !isExporting && (
            <button className={css.downloadButton} onClick={handleDownloadPDF}>
              ⬇ PDF
            </button>
          )}
        </div>

        {/* Modal for mobile quantity input */}

        {modal.open && (
          <div
            className={css.modalBackdrop}
            // onClick={() => setModal({ open: false, index: null })}
            onClick={closeQtyModal}
          >
            <div
              className={css.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{services[modal.index].service}</h3>
              <p className={css.modalPrice}>
                {services[modal.index].price}
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
              <button className={css.closeButton} onClick={closeQtyModal}>
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
                  setPrices((prev) => ({
                    ...prev,
                    [priceModal.index]: {
                      ...services[priceModal.index],
                      price: `${priceModal.value} грн`,
                    },
                  }));

                  setPriceModal({
                    open: false,
                    index: null,
                    value: "",
                  });
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
