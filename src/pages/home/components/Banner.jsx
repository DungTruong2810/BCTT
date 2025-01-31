import banner1 from "../../../assets/img/hero/hero.jpg";
// import Banner2 from "../../../assets/img/hero/hero-2.jpg";

const Banner = () => {
  return (
    <div>
      <section className="hero">
        <div className="hero__slider owl-carousel">
          <div
            className="hero__items set-bg"
            style={{
              backgroundImage: `url(${banner1})`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-5 col-lg-7 col-md-8">
                  <div className="hero__text">
                    <h6>Summer Collection</h6>
                    <h2>Fall - Winter Collections 2030</h2>
                    <p>
                      A specialist label creating luxury essentials. Ethically
                      crafted with an unwavering commitment to exceptional
                      quality.
                    </p>
                    <a href="#" className="primary-btn">
                      Shop now <span className="arrow_right" />
                    </a>
                    <div className="hero__social">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest" />
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div
            className="hero__items set-bg"
            style={{
              backgroundImage: `url(${Banner2})`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-5 col-lg-7 col-md-8">
                  <div className="hero__text">
                    <h6>Summer Collection</h6>
                    <h2>Fall - Winter Collections 2030</h2>
                    <p>
                      A specialist label creating luxury essentials. Ethically
                      crafted with an unwavering commitment to exceptional
                      quality.
                    </p>
                    <a href="#" className="primary-btn">
                      Shop now <span className="arrow_right" />
                    </a>
                    <div className="hero__social">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest" />
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Banner;
