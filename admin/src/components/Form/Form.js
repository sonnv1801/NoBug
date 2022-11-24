import axios from "axios";
import React, { useState } from "react";
import "./Form.css";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ window });

const Form = () => {
  const [data, setData] = useState({
    image: "",
    category: "",
    title: "",
    price: "",
    type: "",
  });

  const [message, setMessage] = useState(false);

  console.log(message);

  const handleChange = (inputchange) => (e) => {
    const value = inputchange === "image" ? e.target.files[0] : e.target.value;
    console.log(inputchange);
    setData({ ...data, [inputchange]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("image", data.image);
      formData.append("category", data.category);
      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("type", data.type);

      axios({
        method: "post",
        url: "http://localhost:8800/pet",
        data: formData,
      })
        .then(function (response) {
          console.log(response);
          setData({ image: "", category: "", title: "", price: "", type: "" });
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
    <form className="was-validated">
      <div className="alert-message">
        {message ? (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
            style={{ textAlign: "center", fontSize: "20px" }}
          >
            <strong>Đã Thêm Thành Công!</strong> Một Sản Phẩm.
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
            style={{ textAlign: "center", fontSize: "20px" }}
          >
            Thêm Sản Phẩm
          </div>
        )}
      </div>
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
              id="validationServerUsername"
              aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
              onChange={handleChange("category")}
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
              aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
              onChange={handleChange("title")}
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
              aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
              onChange={handleChange("price")}
              required
            />
          </div>
        </div>
        <div className="col-xl-6" style={{ marginTop: "20px" }}>
          <select
            className="form-select"
            required
            aria-label="select example"
            onChange={handleChange("type")}
          >
            <option value="">Select Pet</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="food">Food</option>
          </select>
          <div className="invalid-feedback">Vui Lòng Lựa Chọn</div>
        </div>
        <div className="col-xl-6">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            style={{ marginTop: "20px" }}
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
