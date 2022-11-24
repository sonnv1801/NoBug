import { useEffect, useState } from "react";
import { ProductDetailContext } from "../Context";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetailState({ children }) {
  const [pet, setPet] = useState([{}]);

  const [dogs, setDog] = useState([{}]);
  const [cats, setCat] = useState([{}]);
  const [foods, setFood] = useState([{}]);
  // const [users, setUser] = useState([{}]);

  const [message, setMessage] = useState(false);

  const setMessageDelete = () => {
    setMessage(false);
    window.location.reload();
  };

  console.log(message);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8800/pet`)
  //     .then((datas) => setPet(datas.data))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });

  useEffect(() => {
    axios
      .get("http://localhost:8800/pet")
      .then((res) => {
        setPet(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/pet/dogs`)
      .then((datas) => setDog(datas.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/pet/cats`)
      .then((datas) => setCat(datas.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/pet/foods`)
      .then((datas) => setFood(datas.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8800/api/users`)
  //     .then((datas) => setUser(datas.data))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const DeleteOnePet = (id, e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8800/pet/${id}`)
      .then((res) => {
        setMessage(true);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ProductDetailContext.Provider
        value={{
          pet: pet,
          dog: dogs,
          cat: cats,
          food: foods,
          // user: users,
          DeletePet: DeleteOnePet,
          message: message,
          setMessageDelete: setMessageDelete,
        }}
      >
        {children}
      </ProductDetailContext.Provider>
    </>
  );
}
