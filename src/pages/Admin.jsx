import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "/api/v1",
  withCredentials: true
});

export default function Admin() {
  const fileRef=useRef(null)
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category: ""
  });

  // ---------------- HANDLE FORM ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------- FETCH PRODUCTS ----------------
  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  // ---------------- FETCH CATEGORIES ----------------
  const fetchCategories = async () => {
    const res = await API.get("/categories");
    setCategories(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ---------------- ADD CATEGORY ----------------
  const addCategory = async () => {
    if (!newCategory) return;

    await API.post("/categories", { name: newCategory });
    setNewCategory("");
    fetchCategories();
  };

  // ---------------- ADD PRODUCT ----------------
  const addProduct = async () => {
    const data = new FormData();

    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("stock", form.stock);
    data.append("image", form.image);
    data.append("category", form.category); // ⭐ ObjectId

    await API.post("/products", data);

    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
      category: ""
    });

     fileRef.current.value = "";

    fetchProducts();
  };

  // ---------------- DELETE PRODUCT ----------------
  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-8 space-y-10">

      {/* ================= CATEGORY SECTION ================= */}
      <div className="bg-white shadow p-6 rounded-lg max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Category</h2>

        <div className="flex gap-2">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category name"
            className="border p-2 rounded w-full"
          />

          <button
            onClick={addCategory}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>


      {/* ================= PRODUCT FORM ================= */}
      <div className="bg-white shadow p-6 rounded-lg max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <div className="space-y-3">

          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          {/* CATEGORY DROPDOWN ⭐ */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <input
            ref={fileRef}
            type="file"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files[0] })
            }
            className="border p-2 w-full rounded"
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <button
            onClick={addProduct}
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            Add Product
          </button>
        </div>
      </div>


      {/* ================= PRODUCT TABLE ================= */}
      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Products</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-b">
                <td>{p.name}</td>
                <td>{p.category?.name}</td>
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

