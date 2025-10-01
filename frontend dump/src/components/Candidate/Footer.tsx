import React from 'react';
import '../../css/global.css';

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className="footer-main-content">
      {/* FNF Products/Services */}
      <div className="footer-section">
        <strong>Products & Services</strong>
        <div><a href="#" className="footer-link">Title Insurance</a></div>
        <div><a href="#" className="footer-link">Mortgage & Real Estate Services</a></div>
        <div><a href="#" className="footer-link">Real Estate Technology</a></div>
        <div><a href="#" className="footer-link">Annuities & Life Insurance</a></div>
      </div>
      {/* Social */}
      <div className="footer-section">
        <strong>Follow Us</strong>
        <div>
          <a href="#" className="footer-link">LinkedIn</a> |{' '}
          <a href="#" className="footer-link">Twitter</a>
        </div>
        <br />
        <strong>Quick Links</strong>
        <div>
          <a href="/about" className="footer-link">About Us</a> |{' '}
          <a href="/contact" className="footer-link">Contact</a>
        </div>
      </div>
      {/* Legal & Contact */}
      <div className="footer-section">
        <strong>Legal</strong>
        <div>
          <a href="/privacy" className="footer-link">Privacy Policy</a> |{' '}
          <a href="/terms" className="footer-link">Terms of Service</a>
        </div>
        <br />
        <strong>Contact</strong>
        <div style={{ color: "#fff" }}>Email: info@fidelity.com</div>
        <div style={{ color: "#fff" }}>Tel: +1-800-555-1234</div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>&copy; {currentYear} Fidelity National Financial. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;