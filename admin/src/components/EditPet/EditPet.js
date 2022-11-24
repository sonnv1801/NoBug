import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../Form/Form.css";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ window });

const EditPet = () => {
  const [cart, setCats] = useState({
    image: "",
    category: "",
    title: "",
    price: "",
    type: "",
  });

  const [message, setMessage] = useState(false);
  console.log(message);

  const location = useLocation();
  //   console.log(location);
  const path = location.pathname.split("/")[2];
  useEffect(() => {
    axios
      .get(`http://localhost:8800/pet/cart-product/products_by_id?id=${path}`)
      .then((res) => setCats(res.data.productDetail));
  }, [path]);
  console.log(cart);

  const handleChange = (inputchange) => (e) => {
    const value = inputchange === "image" ? e.target.files[0] : e.target.value;
    // console.log(inputchange);
    setCats({ ...cart, [inputchange]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("image", cart.image);
      formData.append("category", cart.category);
      formData.append("title", cart.title);
      formData.append("price", cart.price);
      formData.append("type", cart.type);

      axios({
        method: "put",
        url: `http://localhost:8800/pet/${path}`,
        data: formData,
      })
        .then((response) => {
          console.log(response);
          setMessage(true);
          // window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const setMessageAdd = () => {
    setMessage(false);
    history.replace("/");
    window.location.reload();
  };

  return (
    <div id="Form">
      <div className="container">
        <form className="was-validated">
          {message ? (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
              style={{
                textAlign: "center",
                fontSize: "20px",
                marginTop: "20px",
              }}
            >
              <strong>Đã Sửa Thành Công!</strong> Sản Phẩm{" "}
              <strong>{cart.title}</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={setMessageAdd}
              ></button>
            </div>
          ) : (
            <div
              className="alert alert-info"
              role="alert"
              style={{
                textAlign: "center",
                fontSize: "20px",
                marginTop: "20px",
              }}
            >
              Sửa Sản Phẩm
            </div>
          )}
          <div className="row" style={{ padding: "40px 18px" }}>
            <div className="col-xl-6">
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  aria-label="file example"
                  accept="image/*"
                  name="image"
                  onChange={handleChange("image")}
                  required
                />
                <div className="invalid-feedback">Vui Lòng Thêm Hình Ảnh</div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend3">
                  Category
                </span>
                <input
                  className="form-control is-invalid"
                  placeholder="Enter-category"
                  type="text"
                  name="category"
                  value={cart.category}
                  id="validationServerUsername"
                  onChange={handleChange("category")}
                  aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                  required
                />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend3">
                  Title
                </span>
                <input
                  className="form-control is-invalid"
                  placeholder="Enter-title"
                  type="text"
                  name="title"
                  id="validationServerUsername"
                  value={cart.title}
                  onChange={handleChange("title")}
                  aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                  required
                />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend3">
                  Price
                </span>
                <input
                  className="form-control is-invalid"
                  placeholder="Enter-price"
                  type="number"
                  name="price"
                  id="validationServerUsername"
                  value={cart.price}
                  onChange={handleChange("price")}
                  aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                  required
                />
              </div>
            </div>
            <div className="col-xl-6" style={{ marginTop: "20px" }}>
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend3">
                  Type
                </span>
                <input
                  className="form-control is-invalid"
                  placeholder="Enter-price"
                  type="text"
                  name="type"
                  id="validationServerUsername"
                  value={cart.type}
                  onChange={handleChange("type")}
                  aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                  required
                />
              </div>
            </div>
            <div className="col-xl-6">
              <div class="mb-3">
                <button
                  class="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                  style={{ marginTop: "20px" }}
                >
                  Submit form
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPet;
