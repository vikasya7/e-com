import { useEffect, useState } from "react";
import axios from "axios";


export default function Admin(){
    const [products,setProducts]=useState([])
    const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    stock: ""
    });
    const API = axios.create({
        baseURL: "/api/v1",
        withCredentials: true
    });

    // fetch products

    const fetchProducts =async ()=>{
        const res=await API.get("/products")
        setProducts(res.data)
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    // add products

    const addProduct=async ()=>{
        await API.post("/products",form)
        setForm({ title: "", price: "", image: "", stock: "" })
        fetchProducts()
    }

    // delete products
    const deleteProduct = async (id) => {
       await API.delete(`/products/${id}`);
        fetchProducts();
     };

     return (
    <div className="p-8 space-y-8">

      {/* ---------- ADD FORM ---------- */}
      <div className="bg-white shadow p-6 rounded-lg max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <div className="space-y-3">
          <input name="title" placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 w-full rounded" />

          <input name="price" placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 w-full rounded" />

          <input name="image" placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="border p-2 w-full rounded" />

          <input name="stock" placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="border p-2 w-full rounded" />

          <button
            onClick={addProduct}
            className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800"
          >
            Add Product
          </button>
        </div>
      </div>


      {/* ---------- PRODUCT TABLE ---------- */}
      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Products</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left">Title</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-b">
                <td>{p.title}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>

                <td>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}