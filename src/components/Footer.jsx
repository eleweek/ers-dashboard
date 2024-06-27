export default function Footer() {
  return (
    <>
      <div className="divider"></div>
      <div className="container-fluid non-constituency-page">
        <div className="row">
          <div className="col-md-6">
            <h2>About us</h2>
            <p>
              The Electoral Reform Society is an independent campaigning
              organisation working to champion the rights of voters and build a
              better democracy in Great Britain and Northern Ireland.
              <a
                href="https://www.electoral-reform.org.uk/who-we-are"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "10px" }}
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <footer
              id="colophon"
              className="ers-site-footer"
              role="contentinfo"
            >
              <section className="ers-site-footer__site-info">
                <ul
                  id="menu-footer-bottom"
                  className="link-list link-list--dark link-list--horizontal link-list--underline"
                >
                  <li className="menu-item menu-item-type-post_type menu-item-object-page">
                    <a href="https://www.electoral-reform.org.uk/accessibility/">
                      Accessibility
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page">
                    <a href="https://www.electoral-reform.org.uk/privacy-and-cookies/">
                      Privacy & Cookies
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page">
                    <a href="https://www.electoral-reform.org.uk/who-we-are/contact-us/">
                      Contact us
                    </a>
                  </li>
                </ul>
                <div className="ers-site-footer__satellite">
                  <p>
                    A company limited by guarantee. registered in London, no.
                    958404. All content © 2024 Electoral Reform Society
                  </p>
                </div>
              </section>
            </footer>
          </div>
        </div>
      </div>
      <div className="gap-40 hidden-xs-down"></div>
    </>
  );
}
