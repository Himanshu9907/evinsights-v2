
export default function NavbarMobileButton({ open, onClick }) {
  return (
    <button
      type="button"
      className={`navbar-mobile-button ${
        open ? "is-open" : ""
      }`}
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      <span />
      <span />
      <span />
    </button>
  );
}

