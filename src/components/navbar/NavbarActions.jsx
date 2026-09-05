
import NavbarSearch from "./NavbarSearch";
// import NavbarLanguage from "./NavbarLanguage";
import NavbarCurrency from "./NavbarCurrency";
import NavbarTheme from "./NavbarTheme";

export default function NavbarActions() {
  return (
    <div className="navbar__actions">
      <NavbarSearch />
      {/* <NavbarLanguage /> */}
      <NavbarCurrency />
      <NavbarTheme />
    </div>
  );
}

