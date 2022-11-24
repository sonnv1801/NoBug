import React, { useContext } from "react";

import Card from "../Card/Card";
import { List } from "../List/List";

import { ProductDetailContext } from "../store/Context";

const Dashboard = () => {
  const { pet, dog, cat, food, DeletePet, message, setMessageDelete } =
    useContext(ProductDetailContext);

  return (
    <div>
      <div className="container" id="card">
        <div className="row">
          <div className="col-xl-3">
            <Card
              icon="ti-shopping-cart"
              title="All Products"
              amount={pet.length}
            />
          </div>
          <div className="col-xl-3">
            <Card icon="fas fa-dog" title="Dogs" amount={dog.length} />
          </div>
          <div className="col-xl-3">
            <Card icon="fas fa-cat" title="Cats" amount={cat.length} />
          </div>
          <div className="col-xl-3">
            <Card
              icon="fas fa-bread-slice"
              title="Foods"
              amount={food.length}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            {message ? (
              <div
                class="alert alert-warning alert-dismissible fade show"
                role="alert"
                style={{
                  textAlign: "center",
                  width: "80%",
                  marginLeft: "146px",
                  fontSize: "15px",
                  marginTop: "20px",
                }}
              >
                <strong>Đã Xóa Thành Công! </strong> Sản Phẩm.
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={setMessageDelete}
                ></button>
              </div>
            ) : (
              <h1 className="all-pet">Tất Cả Các Sản Phẩm</h1>
            )}

            <div className="ex1">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Category</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Type</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pet.map((lists) => (
                    <List
                      key={lists._id}
                      petEdit={lists._id}
                      image={lists.image}
                      category={lists.category}
                      title={lists.title}
                      price={lists.price}
                      type={lists.type}
                      button={(e) => DeletePet(lists._id, e)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
