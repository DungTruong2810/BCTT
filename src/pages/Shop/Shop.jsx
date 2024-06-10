/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  getAllBook,
  getAllGenre,
  getGEnre,
  getGenreBooks,
  getSearch,
} from "../../services/productService";
import Product from "../../components/common/Product";
import { useParams } from "react-router";
import { size } from "lodash";

const Shop = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const [genre, setGenre] = useState([]);
  const [genrebook, setGenreBooks] = useState([]);
  const { id } = useParams();
  const [genre1, setGenre1] = useState();
  const [search, setSearch] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await getSearch(search);
    setData(data);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await getGenreBooks(id);
      setData(res);
    };
    const fetchData2 = async () => {
      const res = await getAllBook();
      setData(res);
    };
    if (id != "all") {
      fetchData();
    } else {
      fetchData2();
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllGenre();
      setGenre(res);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchCategoryid = async () => {
      const res = await getGEnre(id);
      console.log(res);
      setGenre1(res);
    };
    fetchCategoryid();
  }, [id]);
  return (
    <>
      <div>
        <section className="breadcrumb-option">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb__text">
                  <h4>Shop</h4>
                  <div className="breadcrumb__links">
                    <a href="/">Home</a>
                    <span>Shop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Breadcrumb Section End */}
        {/* Shop Section Begin */}
        <section className="shop spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="shop__sidebar">
                  <div className="shop__sidebar__search">
                    <form onSubmit={handleSubmit} action="#">
                      <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                      />
                      <button type="submit">
                        <span className="icon_search" />
                      </button>
                    </form>
                  </div>
                  <div className="shop__sidebar__accordion">
                    <div className="accordion" id="accordionExample">
                      <div className="card">
                        <div className="card-heading">
                          {genre?.map((genre) => (
                            <div key={genre.id}>
                              <a href={`/shop/${genre.idGenre}`}>
                                <p> {genre.nameGenre}</p>
                              </a>
                            </div>
                          ))}
                        </div>
                        <div
                          id="collapseOne"
                          className="collapse show"
                          data-parent="#accordionExample"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="shop__product__option">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="shop__product__option__left">
                        <p> {genre1?.nameGenre}</p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="shop__product__option__right">
                        <p>Sort by Price:</p>
                        <select>
                          <option value>Low To High</option>
                          <option value>$0 - $55</option>
                          <option value>$55 - $100</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {data.map((item) => {
                    return (
                      <Product item={item} img={image} key={item.id}></Product>
                    );
                  })}
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="product__pagination">
                      <a className="active" href="#">
                        1
                      </a>
                      <a href="#">2</a>
                      <a href="#">3</a>
                      <span>...</span>
                      <a href="#">21</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Shop Section End */}
      </div>
    </>
  );
};

export default Shop;
