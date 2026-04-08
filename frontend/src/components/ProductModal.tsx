import { useState, useEffect } from "react";
import type { Product } from "../features/products/types";
import { productSchema } from "../features/products/productValidation";

interface Props {
  product: Product | null;
  categories: string[];
  onSave: (p: Product) => void;
  onClose: () => void;
}

export default function ProductModal({
  product,
  categories,
  onSave,
  onClose,
}: Props) {
  const [form, setForm] = useState<Product>({
    name: "",
    category: categories[0],
    price: 0,
    stock: 0,
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill form when editing
  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  // Handle submit with Joi validation
  const handleSubmit = () => {
    const { error } = productSchema.validate(form, { abortEarly: false });

    if (error) {
      const newErrors: Record<string, string> = {};
      error.details.forEach((err) => {
        const key = err.path[0] as string;
        newErrors[key] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSave(form);
  };

  return (
    <div className="modal d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">
              {product ? "Edit Product" : "Add Product"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Name */}
            <div className="mb-3">
              <label className="form-label">
                Product Name <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            {/* Price */}
            <div className="mb-3">
              <label className="form-label">
                Price (₹) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={`form-control ${errors.price ? "is-invalid" : ""}`}
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
              />
              {errors.price && (
                <div className="invalid-feedback">{errors.price}</div>
              )}
            </div>

            {/* Stock */}
            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input
                type="number"
                className={`form-control ${errors.stock ? "is-invalid" : ""}`}
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: Number(e.target.value) })
                }
              />
              {errors.stock && (
                <div className="invalid-feedback">{errors.stock}</div>
              )}
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">
                Category <span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${errors.category ? "is-invalid" : ""}`}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              {errors.category && (
                <div className="invalid-feedback">{errors.category}</div>
              )}
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {product ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
