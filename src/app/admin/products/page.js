"use client";

import { useState } from "react";
import { mockProducts } from "@/lib/mockData";
import { getHealthScoreColor } from "@/lib/nutrition";
import Modal from "@/components/Modal";

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      id: editProduct?.id || Date.now(),
      name: fd.get("name"),
      brand: fd.get("brand"),
      barcode: fd.get("barcode"),
      category: fd.get("category"),
      image: fd.get("image") || "📦",
      healthScore: Number(fd.get("healthScore")),
      tags: [],
      nutrition: {
        calories: Number(fd.get("calories")),
        protein: Number(fd.get("protein")),
        carbs: Number(fd.get("carbs")),
        fat: Number(fd.get("fat")),
        fiber: Number(fd.get("fiber")),
        sugar: Number(fd.get("sugar")),
        sodium: Number(fd.get("sodium")),
      },
    };

    if (editProduct) {
      setProducts(products.map((p) => (p.id === editProduct.id ? data : p)));
    } else {
      setProducts([...products, data]);
    }
    setShowModal(false);
    setEditProduct(null);
  };

  const deleteProduct = (id) => {
    if (confirm("Delete this product?")) setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2>📦 Products Management</h2>
        <button className="btn btn-primary" onClick={() => { setEditProduct(null); setShowModal(true); }}>+ Add Product</button>
      </div>

      <input className="input-field" style={{ width: "100%", marginBottom: 24 }}
        placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th><th>Name</th><th>Brand</th><th>Category</th><th>Calories</th><th>Score</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td style={{ fontSize: "1.5rem" }}>{p.image}</td>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td>{p.brand}</td>
                <td><span className="badge badge-info">{p.category}</span></td>
                <td>{p.nutrition.calories} kcal</td>
                <td style={{ fontWeight: 700, color: getHealthScoreColor(p.healthScore) }}>{p.healthScore}</td>
                <td>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => { setEditProduct(p); setShowModal(true); }}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)}>Del</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditProduct(null); }}
        title={editProduct ? "Edit Product" : "Add Product"}>
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="input-group">
            <label>Name</label>
            <input className="input-field" name="name" required defaultValue={editProduct?.name} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="input-group"><label>Brand</label><input className="input-field" name="brand" required defaultValue={editProduct?.brand} /></div>
            <div className="input-group"><label>Barcode</label><input className="input-field" name="barcode" defaultValue={editProduct?.barcode} /></div>
            <div className="input-group"><label>Category</label><input className="input-field" name="category" defaultValue={editProduct?.category} /></div>
            <div className="input-group"><label>Icon (emoji)</label><input className="input-field" name="image" defaultValue={editProduct?.image || "📦"} /></div>
            <div className="input-group"><label>Health Score</label><input className="input-field" name="healthScore" type="number" defaultValue={editProduct?.healthScore || 50} /></div>
          </div>
          <h4 style={{ marginTop: 8 }}>Nutrition (per 100g)</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {["calories", "protein", "carbs", "fat", "fiber", "sugar", "sodium"].map((n) => (
              <div className="input-group" key={n}>
                <label style={{ textTransform: "capitalize" }}>{n}</label>
                <input className="input-field" name={n} type="number" step="0.1" defaultValue={editProduct?.nutrition?.[n] || 0} />
              </div>
            ))}
          </div>
          <button className="btn btn-primary" type="submit" style={{ marginTop: 8 }}>
            {editProduct ? "Update" : "Add"} Product
          </button>
        </form>
      </Modal>
    </div>
  );
}
