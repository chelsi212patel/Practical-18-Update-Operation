
import { useState } from "react";
import "./index.css";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 45000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Headphones", price: 2500 },
  ]);

  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function editProduct(product) {
    setId(product.id);
    setName(product.name);
    setPrice(String(product.price));
  }

  function updateProduct(event) {
    event.preventDefault();

    if (id === null) return;

    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, name: name.trim(), price: Number(price) }
        : product
    );

    setProducts(updatedProducts);
    setId(null);
    setName("");
    setPrice("");
  }

  function cancelEdit() {
    setId(null);
    setName("");
    setPrice("");
  }

  return (
    <main className="app">
      <header className="hero">
        <span className="eyebrow">REACT PRACTICAL 18</span>
        <h1>Product Management</h1>
        <p>Select a product, edit its details, and update your list.</p>
      </header>

      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>Product List</h2>
            <p>{products.length} products available</p>
          </div>
          <span className="count">{products.length}</span>
        </div>

        <div className="product-list">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-icon">📦</div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>Product ID: #{product.id}</p>
              </div>
              <div className="product-price">
                ₹{product.price.toLocaleString("en-IN")}
              </div>
              <button
                className="edit-button"
                onClick={() => editProduct(product)}
              >
                Edit
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="panel form-panel">
        <div className="section-heading">
          <div>
            <h2>Update Product</h2>
            <p>
              {id === null
                ? "Select a product from the list to edit."
                : `Editing product #${id}`}
            </p>
          </div>
          <span className="edit-icon">✎</span>
        </div>

        <form onSubmit={updateProduct}>
          <label htmlFor="productName">Product Name</label>
          <input
            id="productName"
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            disabled={id === null}
          />

          <label htmlFor="productPrice">Product Price (₹)</label>
          <input
            id="productPrice"
            type="number"
            placeholder="Enter product price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            min="0.01"
            step="0.01"
            required
            disabled={id === null}
          />

          <div className="form-actions">
            <button
              type="submit"
              className="update-button"
              disabled={id === null}
            >
              Update Product
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={cancelEdit}
              disabled={id === null}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>

      <footer>Practical 18 · React Update Operation</footer>
    </main>
  );
}

export default App;
