// App.jsx
import { useState, useRef, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import OurServices from "./pages/OurServices";
// import Booking from "./pages/Booking";
import ContactUs from "./pages/ContactUs";
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";
import css from "./App.module.css";
import logo from "./assets/images/LogoDM.png";
import { useTranslation } from "react-i18next";

// function ProtectedRoute({ user, children }) {
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// }

export default function App() {
  const { t, i18n } = useTranslation();
 

  const toggleLang = () => {
    const newLang = i18n.language === "ua" ? "en" : "ua";
    i18n.changeLanguage(newLang);
  };

  // const user = JSON.parse(localStorage.getItem("user"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sideMenuRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setIsAboutOpen(false);
      }
    }

    if (isAboutOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isAboutOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target) &&
        !event.target.closest(`.${css.menuToggle}`)
      ) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="App">
        <header>
          <div
            className={css.logo}
            style={{
              cursor: "pointer",
            }}
          >
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <button onClick={toggleLang} className={css.langToggle}>
            {i18n.language === "ua" ? "EN" : "UA"}
          </button>
          <nav className={css.nav}>
            <ul className={css.navLinks}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? css.activeLink : "")}
                >
                  {/* Головна */}
                  {t("nav.home")}
                </NavLink>
              </li>

              <li ref={aboutRef} className={css.aboutWrapper}>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/about");
                    setIsAboutOpen((prev) => !prev);
                  }}
                  className={
                    location.pathname === "/about" ? css.activeLink : ""
                  }
                >
                  {/* Про себе */}
                  {t("nav.about")}
                </a>

                {/* <div
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/my-gallery");
                  }}
                  className={`${css.dropdown} ${isAboutOpen ? css.open : ""}`}
                >
                  {/* Моя галерея */}
                  {/* {t("nav.gallery")}
                </div> */} 
              </li>

              <li>
                <NavLink
                  to="/services"
                  className={({ isActive }) => (isActive ? css.activeLink : "")}
                >
                  {/* Наші послуги */}
                  {t("nav.services")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? css.activeLink : "")}
                >
                  {/* Зв'язатися */}
                  {t("nav.contact")}
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? css.activeLink : "")}
                >
                  {/* Адмін */}
                  {/* {t("nav.admin")}
                </NavLink>
              </li> */} 
            </ul>
            <button className={css.menuToggle} onClick={toggleMenu}>
              &#9776;
            </button>
          </nav>
        </header>

        <div
          ref={sideMenuRef}
          className={`${css.sideMenu} ${isMenuOpen ? css.active : ""}`}
        >
          <ul>
            <li>
              <NavLink
                to="/"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? css.activeLink : "")}
              >
                {/* Головна */}
                {t("nav.home")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? css.activeLink : "")}
              >
                {/* Про себе */}
                {t("nav.about")}
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/my-gallery"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? css.activeLink : "")}
              >
                {/* Моя галерея */}
                {/* {t("nav.gallery")}
              </NavLink>
            </li> */} 

            <li>
              <NavLink
                to="/services"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? css.activeLink : "")}
              >
                {/* Записатися */}
                {t("nav.services")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? css.activeLink : "")}
              >
                {/* Зв'язатися */}
                {t("nav.contact")}
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/login"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? css.activeLink : "")}
              >
                {/* Адмін */}
                {/* {t("nav.admin")}
              </NavLink>
            </li> */} 
          </ul>
        </div>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
             {/* <Route path="/my-gallery" element={<MyGallery />} /> */}
            <Route path="/services" element={<OurServices />} /> 
            <Route path="/contact" element={<ContactUs />} />
            {/* <Route path="/login" element={<Login />} /> 
            {/* <Route
              path="/admin"
              element={
                <ProtectedRoute user={user}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </main>
      </div>
    </>
  );
}
