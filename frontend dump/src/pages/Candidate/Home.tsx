import React, { useState, useEffect } from 'react';



const slides = [

  {
    image: "/images/image1.jpg",
    caption: "Empowering secure property ownership through innovative solutions.",
  },

  {
    image: "/images/home.png", 
    caption: "Trusted by leading real estate professionals and buyers.",
  },

  {
    image: "/images/laptop1.png", 
    caption: "Exceptional service, reliability, and commitment.",
  }

];

const Home: React.FC = () => {

  const [slide, setSlide] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {

      setSlide(prev => (prev + 1) % slides.length);

    }, 3500); 

    return () => clearInterval(timer);

  }, []);

  return (

    <div>

      {/* Slideshow */}

      
<div className="hero-slideshow">
  <div className="hero-slideshow-image-wrapper">
    <img
      src={slides[slide].image}
      alt={`Slide ${slide + 1}`}
      className="hero-slideshow-image"
    />
    <div className="hero-slideshow-overlay">
      <div className="hero-slideshow-caption">
        {slides[slide].caption}
      </div>
    </div>
  </div>

  <div className="hero-slideshow-dots">
    {slides.map((_, idx) => (
      <span
        key={idx}
        className={slide === idx ? "dot active" : "dot"}
        onClick={() => setSlide(idx)}
      ></span>
    ))}
  </div>
</div>

      {/* Hero Section */}

      <section className="home-hero-section">

        <div className="home-hero-content">

          <div className="home-hero-image-wrap">

            <img

              className="home-hero-image"

              src="/images/HomepageImage.jpg"

              alt="Business Team Discussion"

            />

          </div>

          <div className="home-hero-info">

            <h1 className="home-hero-title">

              Welcome to Fidelity National Financial India

            </h1>

            <p className="home-hero-sub">

              Empowering secure property ownership through innovative title and settlement solutions.<br />

              Trusted by leading real estate professionals and buyers across India.

            </p>

            <p className="home-hero-promise">

              <strong>Our promise:</strong> Exceptional service, reliability, and a commitment to protecting you.

            </p>

          </div>

        </div>

      </section>

      {/* Info Cards Section */}

      <section className="company-info-section">

        <div className="company-info-row">

          <div className="company-info-card">

            <h2>Title Insurance</h2>

            <p>

              <strong>FNF®</strong> is the leading provider of title insurance and settlement services to the real estate and mortgage industries. We are #1 in market share in the residential purchase, refinance, and commercial markets and currently hold the #1 or #2 market position in 39 states.

            </p>

          </div>

          <div className="company-info-card">

            <h2>Mortgage & Real Estate Services</h2>

            <p>

              <strong>FNF®</strong>’s various mortgage and real estate services companies provide services that complement our title insurance business. From a full-service qualified intermediary, home warranties, UCC insurance, relocation services, and notary services, we provide the essential services to fulfill the needs of a changing real estate industry.

            </p>

          </div>

          <div className="company-info-card">

            <h2>Real Estate Technology</h2>

            <p>

              <strong>FNF®</strong> believes the power of technology can elevate the real estate transaction. From investments in title and escrow software to industry-leading real estate partner solutions, we take our commitment to provide real estate professionals and consumers a truly reimagined, transparent, connected, and trusted real estate experience.

            </p>

          </div>

          <div className="company-info-card">

            <h2>Annuities & Life Insurance</h2>

            <p>

              <strong>F&G®</strong> offers retirement annuities and life insurance products to help you protect and plan for your future. By providing income for life, downside protection from market volatility, or a valuable death benefit, F&G® helps turn aspirations into reality.

            </p>

          </div>

        </div>

      </section>

    </div>

  );

};

export default Home;