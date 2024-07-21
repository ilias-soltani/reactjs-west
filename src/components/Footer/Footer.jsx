import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";
import { MdCopyright } from "react-icons/md";
import amazon from "../../assets/svgs/amazon.svg";
import exp from "../../assets/svgs/american-express.svg";
import bitcion from "../../assets/svgs/bitcoin-1.svg";
import cb from "../../assets/svgs/cb.svg";
import disc from "../../assets/svgs/discover.svg";
import kal from "../../assets/svgs/klarna-1.svg";
import mea from "../../assets/svgs/maestro.svg";
import mas from "../../assets/svgs/mastercard.svg";
import pay from "../../assets/svgs/paypal.svg";
import visa from "../../assets/svgs/visa.svg";
import wes from "../../assets/svgs/western-union.svg";

import "./Footer.scss";

const Footer = () => {
  return (
    <div className="app-footer" id="footer">
      <div className="app-container footer-cont">
        <div className="info">
          <div className="sitemap">
            <span className="footer-list-title">Sitemap</span>
            <ul className="footer-list">
              <li>
                <Link to="/new?sort=Date:%20new%20to%20old">New</Link>
              </li>
              {["Collections", "Clothing", "Accessories", "Sale"].map(
                (item, i) => (
                  <li key={i}>
                    <Link to={`${item.toLowerCase()}`}>{item}</Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="support">
            <span className="footer-list-title">Support</span>
            <ul className="footer-list">
              {[
                "Returns",
                "Faqs",
                "About us",
                "Store",
                "Work with us",
                "Report a fake",
                "Contact us",
              ].map((item, i) => (
                <li key={i}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="newsletter">
            <h2 className="footer-newsletter-title">Be the first to know</h2>
            <p className="footer-newsletter-p">
              Sign up to our newsletter for 10% off your next order!
            </p>
            <form className="footer-newsletter-form">
              <input type="email" placeholder="Email" className="sec-input" />
              <input
                type="text"
                placeholder="First name"
                className="sec-input"
              />
              <input
                type="text"
                placeholder="Last name"
                className="sec-input"
              />
              <input type="submit" value={"Subscribe"} />
            </form>
          </div>
        </div>
        <div className="footer-content">
          <div className="social">
            <ul className="media">
              <li>
                <a href="#" target="_blank">
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <FaXTwitter />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <FaYoutube />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <FaTiktok />
                </a>
              </li>
            </ul>
            <div className="rules">
              <a href="#">Terms & Conditions</a>
              <span>|</span>
              <a href="#">Privacy Policy</a>
            </div>
            <div className="copyright">
              <MdCopyright />
              2024, West Clothing.
            </div>
          </div>
          <div className="payments">
            {[
              amazon,
              exp,
              bitcion,
              cb,
              disc,
              kal,
              mea,
              mas,
              pay,
              visa,
              wes,
            ].map((item, i) => (
              <img src={item} alt={i} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
