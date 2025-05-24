import React from "react";
import Logo from "./Logo";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#3a7bd5"
            fillOpacity="0.8"
            d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,85.3C672,64,768,64,864,85.3C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container footer-container">
        <div className="footer-logo">
          <Logo />
          <p>
            Simplify your expense tracking and take control of your finances.
          </p>

          {/* { <div className="newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for tips and updates.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit" className="btn-subscribe">Subscribe</button>
            </div>
          </div>} */}
        </div>

        <div className="footer-links">
          <div className="links-column product-links">
            <h4>Product</h4>
            <ul>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Download</a>
              </li>
              <li>
                <a href="#">Integrations</a>
              </li>
              <li>
                <a href="#">Roadmap</a>
              </li>
            </ul>
          </div>

          <div className="links-column company-links">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Press Kit</a>
              </li>
            </ul>
          </div>

          <div className="links-column support-links">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Security</a>
              </li>
            </ul>
          </div>

          <div className="links-column connect-links">
            <h4>Connect</h4>
            <div className="social-links-grid">
              <a href="#" className="social-link twitter">
                <span className="social-icon">𝕏</span>
                <span className="social-name">Twitter</span>
              </a>
              <a href="#" className="social-link facebook">
                <span className="social-icon">f</span>
                <span className="social-name">Facebook</span>
              </a>
              <a href="#" className="social-link instagram">
                <span className="social-icon">📷</span>
                <span className="social-name">Instagram</span>
              </a>
              <a href="#" className="social-link linkedin">
                <span className="social-icon">in</span>
                <span className="social-name">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="app-download">
        <div className="container">
          <div className="download-content">
            <h3>Get ExpenseTrack on Mobile</h3>
            <p>Download our app to track expenses on the go</p>
            <div className="download-buttons">
              <a href="#" className="download-btn app-store">
                <span className="btn-icon">🍎</span>
                <div className="btn-text">
                  <span className="small-text">Download on the</span>
                  <span className="big-text">App Store</span>
                </div>
              </a>
              <a href="#" className="download-btn play-store">
                <span className="btn-icon">🤖</span>
                <div className="btn-text">
                  <span className="small-text">GET IT ON</span>
                  <span className="big-text">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; 2025 ExpenseTrack. All rights reserved.</p>
            <div className="language-selector">
              <select>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
