import React from "react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#B0D4F1", color: "white", padding: "2rem 1rem", textAlign: "center" }}>
      {/* Navigation Links */}
      <nav style={{ marginBottom: "1rem" }}>
        <a href="/about" style={{ color: "black", margin: "0 1rem", textDecoration: "none" }}>About Us</a>
        <a href="/privacy-policy" style={{ color: "black", margin: "0 1rem", textDecoration: "none" }}>Privacy Policy</a>
        <a href="/terms" style={{ color: "black", margin: "0 1rem", textDecoration: "none" }}>Terms of Service</a>
      </nav>

      {/* Social Media Links */}
      <div style={{ marginBottom: "1rem" }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 0.5rem" }}>
          <img src="/icons/facebook.svg" alt="Facebook" style={{ width: "24px" }} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 0.5rem" }}>
          <img src="/icons/twitter.svg" alt="Twitter" style={{ width: "24px" }} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 0.5rem" }}>
          <img src="/icons/instagram.svg" alt="Instagram" style={{ width: "24px" }} />
        </a>
      </div>

      {/* Newsletter Subscription */}
      {/* <div style={{ color: "black", marginBottom: "1rem" }}>
        <p>Subscribe to our newsletter for updates:</p>
        <form style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
          <input
            type="email"
            placeholder="Your email"
            style={{
              padding: "0.5rem",
              border: "none",
              borderRadius: "4px",
              outline: "none",
              width: "200px",
            }}
          />
          <button type="submit" style={{ padding: "0.5rem 1rem", backgroundColor: "#61dafb", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Subscribe
          </button>
        </form>
      </div> */}

      {/* Address and Copyright */}
      <div style={{ color: "black" }}>
        <p>123 Main Street, Your City, Your Country</p>
        <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}
