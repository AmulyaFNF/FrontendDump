import React from "react";

const Mission: React.FC = () => (
<div className="container">
  <section>
    <div className="about-section">
      <h2 className="about-title">Our Mission</h2>
      <h3 style={{ color: "#2151a1", fontSize: "1.2rem", fontWeight: 700, marginBottom: 15 }}>
        To advance, expand, and protect the experience of property ownership.
      </h3>
      <p className="about-description">
        To do this, we will leverage everything at our disposal to bring to market a truly reimagined, trusted, and transparent experience
        for buyers, sellers, and real estate professionals – from start to finish. We will achieve this by making the safety of our customer our primary focus.
      </p>
    </div>
    <div className="about-section" style={{ marginTop: 32 }}>
      <h2 className="about-title">Add Shareholder Value</h2>
      <h3 style={{ color: "#2151a1", fontSize: "1.1rem", fontWeight: 700, marginBottom: 15 }}>
        As the nation’s largest title insurance company with long-time industry-leading margins,
        <span style={{ color: "#2574a9", fontWeight: 800 }}> FNF® </span>
        has a strong track record of creating real value for our shareholders.
      </h3>
      <p className="about-description">
        As the leading provider of title insurance and settlement services to the real estate and mortgage industries,
        we are the most diversified competitor from a geographic, product, and revenue channel perspective.
        Our solid balance sheet has enabled payment of a cash dividend, repurchase of shares, strategic acquisitions, continued investment in core businesses, and future repayment of debt.
        We have #1 market share in the residential purchase, refinance, and commercial markets, as well as the #1 or #2 market position in 39 of the 50 United States.
      </p>
    </div>
  </section>
  </div>
);

export default Mission;

