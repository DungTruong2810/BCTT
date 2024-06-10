import banner1 from "../../../assets/img/banner/banner-4.jpg";
import banner2 from "../../../assets/img/banner/banner-2.jpg";
import banner3 from "../../../assets/img/banner/banner-3.jpg";
const Banner2 = () => {
  return (
    <section className="banner spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-4">
            <div className="banner__item">
              <div className="banner__item__pic">
                <img style={{ width: "400px", height: "400px" }} src={banner1} alt />
              </div>
              <div className="banner__item__text">
                <h2>Book Collections 2030</h2>
                <a href="#">Shop now</a>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="banner__item banner__item--middle">
              <div className="banner__item__pic">
                <img style={{ width: "400px", height: "400px" }} src={banner2} alt />
              </div>
              <div className="banner__item__text">
                <h2>Accessories</h2>
                <a href="#">Shop now</a>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="banner__item banner__item--last">
              <div className="banner__item__pic">
                <img style={{ width: "400px", height: "400px" }} src={banner3} alt />
              </div>
              <div className="banner__item__text">
                <h2>Book Spring 2030</h2>
                <a href="#">Shop now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner2;
