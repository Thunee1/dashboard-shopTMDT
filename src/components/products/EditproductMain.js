import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Product Updated", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setImage(product.image);
        setPrice(product.price);
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        description,
        image,
        countInStock,
      })
    );
  };
  let clickColor = (e) => {
    var color = document.getElementsByName('color');
              var result = "";
                 
//Lặp qua từng checkbox để lấy giá trị
             for (var i = 0; i < color.length; i++){
                 if (color[i].checked === true){
                   result += ' [' + color[i].value + ']';
                 }
               }
              
  //               // In ra kết quả
             alert("Color: " + result);
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
             Quay lại sản phẩm
            </Link>
            <h2 className="content-title">Chỉnh sửa sản phẩm</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Tiêu đề
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Giá
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Số lượng trong kho
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Loại Cây
                    </label>
                    <div className="form-check">
                      <input
                        className=" form-check-input"
                        type="checkbox"
                        value="Yellow"
                        id="product-cat"
                        name="color"
                      />
                      <label className="form-check-label" htmlFor="product-cat">
                        Bonsai
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Green"
                        id="product-cat-1"
                        name="color"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="product-cat-1"
                      >
                        Thủy Sinh
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Blue"
                        id="product-cat-2"
                        name="color" 
                      />
                      <label
                        className="form-check-label"
                        htmlFor="product-cat-2"
                      >
                        Trong Nhà
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Black"
                        id="product-cat-3"
                        name="color"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="product-cat-2"
                      >
                        Phong Thủy
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="White"
                        id="product-cat-4"
                        name="color"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="product-cat-2"
                      >
                        Cây cảnh
                      </label>
                    </div>
                    <button onClick={clickColor} id="btn-color" value="Xác nhận "/>
                    <div className="mb-4">
                      <h5 className="mb-3 mt-4">Size</h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="S"
                          id="product-cat-5"
                          name="size"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="product-cat"
                        >
                          Dưới 15cm
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="M"
                          id="product-cat-6"
                          name="size"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="product-cat-1"
                        >
                         25cm - 45cm
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="XL"
                          id="product-cat-7"
                          name="size"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="product-cat-2"
                        >
                          50cm - 1m
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="XLL"
                          id="product-cat-8"
                          name="size"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="product-cat-2"
                        >
                          1m - 1m5
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Freestyle"
                          id="product-cat-9"
                          name="size"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="product-cat-2"
                        >
                          Trên 2m
                        </label>
                      </div>
                    </div>
                  </div>
                      <div className="mb-4">
                        <label className="form-label">Mô tả</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Hình ảnh</label>
                        <input
                          className="form-control"
                          type="text"
                          value={image}
                          required
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
