/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "./axiosConfig";

function Dashboard({ setIsLoggedIn }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  let count = useRef(0);

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  async function fetchAllProducts() {
    try {
      const response = await instance.get("/product");
      setProducts(response.data);
    } catch (err) {
      console.log("Error fetching products: " + err);
    }
  }

  async function isUserLoggedIn() {
    try {
      const response = await instance.get("/user/loggedIn");
      if (response.statusText === "OK") setIsLoggedIn(true);
      else setIsLoggedIn(false);
    } catch (err) {
      console.log("Error checking login status: " + err);
    }
  }

  async function handleLogout() {
    const response = await instance.post("/user/logout", {});
    if (response.data.message === "Logout successfully")
      navigate("/admin/login");
  }

  async function handleProductDelete(idToDelete) {
    try {
      const response = await instance.delete("/product/" + idToDelete, {
        withCredentials: true,
      });
      // console.log(response);
      if (response.data.message === "Product Deleted") fetchAllProducts();
    } catch (err) {
      console.log("Error deleting product: " + err);
    }
  }

  function getSelectedProduct(product) {
    navigate("/admin/product", { state: { singleProduct: product } });
  }

  return (
    <>
      <header>
        <h2>Welcome Admin</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <h2>Manage Products</h2>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{++count.current}</td>
                  <td>
                    <span onClick={() => getSelectedProduct(product)}>
                      {product.name}
                    </span>
                  </td>
                  <td>{product.price}</td>
                  <td>
                    <button onClick={() => handleProductDelete(product._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default Dashboard;
