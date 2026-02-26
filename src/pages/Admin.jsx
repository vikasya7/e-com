import { useEffect, useState, useRef } from "react";
import api from "../utils/api";



export default function Admin() {
  const fileRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    images: [],
    variants: [{ weight: "", price: "", stock: "" }],
  });

  // ---------------- FETCH PRODUCTS ----------------
  const fetchProducts = async () => {
    const res = await api.get("/api/v1/products");
    setProducts(res.data.data); // ✅ ApiResponse fix
  };

  // ---------------- FETCH CATEGORIES ----------------
  const fetchCategories = async () => {
    const res = await api.get("/api/v1/categories");
    setCategories(res.data.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
    fetchCategories();
  }, []);

  // ---------------- HANDLE BASIC INPUT ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------- HANDLE VARIANT CHANGE ----------------
  const handleVariantChange = (index, field, value) => {
    const updated = [...form.variants];
    updated[index][field] = value;
    setForm({ ...form, variants: updated });
  };

  // ---------------- ADD VARIANT ----------------
  const addVariant = () => {
    setForm({
      ...form,
      variants: [...form.variants, { weight: "", price: "", stock: "" }],
    });
  };

  // ---------------- REMOVE VARIANT ----------------
  const removeVariant = (index) => {
    const updated = form.variants.filter((_, i) => i !== index);
    setForm({ ...form, variants: updated });
  };

  // ---------------- ADD CATEGORY ----------------
  const addCategory = async () => {
    if (!newCategory) return;

    await api.post("/api/v1/categories", { name: newCategory });
    setNewCategory("");
    fetchCategories();
  };

  // ---------------- ADD PRODUCT ----------------
  const addProduct = async () => {
    const data = new FormData();

    data.append("name", form.name);
    data.append("description", form.description);
    data.append("category", form.category);

    data.append("variants", JSON.stringify(form.variants));

    form.images.forEach((img) => {
      data.append("images", img);
    });

    await api.post("/api/v1/products", data);

    setForm({
      name: "",
      description: "",
      category: "",
      images: [],
      variants: [{ weight: "", price: "", stock: "" }],
    });

    if (fileRef.current) fileRef.current.value = "";

    fetchProducts();
  };

  // ---------------- DELETE PRODUCT ----------------
  const deleteProduct = async (id) => {
    await api.delete(`/api/v1/products/${id}`);
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
            className="bg-black text-white px-4 rounded"
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

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* ---------------- VARIANTS ---------------- */}
          <h3 className="font-semibold mt-4">Variants</h3>

          {form.variants.map((variant, index) => (
            <div key={index} className="flex gap-2 items-center">

              <input
                placeholder="Weight (150g)"
                value={variant.weight}
                onChange={(e) =>
                  handleVariantChange(index, "weight", e.target.value)
                }
                className="border p-2 rounded w-full"
              />

              <input
                type="number"
                placeholder="Price"
                value={variant.price}
                onChange={(e) =>
                  handleVariantChange(index, "price", e.target.value)
                }
                className="border p-2 rounded w-full"
              />

              <input
                type="number"
                placeholder="Stock"
                value={variant.stock}
                onChange={(e) =>
                  handleVariantChange(index, "stock", e.target.value)
                }
                className="border p-2 rounded w-full"
              />

              {form.variants.length > 1 && (
                <button
                  onClick={() => removeVariant(index)}
                  className="text-red-500 text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="text-sm text-black mt-2"
          >
            + Add Variant
          </button>

          {/* ---------------- IMAGES ---------------- */}
          <input
  ref={fileRef}
  type="file"
  multiple
  onChange={(e) =>
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...Array.from(e.target.files)]
    }))
  }
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
            <tr className="border-b text-left">
              <th>Name</th>
              <th>Category</th>
              <th>Variants</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b">
                <td>{p.name}</td>
                <td>{p.category?.name}</td>
                <td>
                  {p.variants?.map((v) => (
                    <div key={v.weight}>
                      {v.weight} — ₹{v.price} ({v.stock})
                    </div>
                  ))}
                </td>
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

