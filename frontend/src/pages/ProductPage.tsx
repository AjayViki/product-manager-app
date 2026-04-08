import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import {
  fetchProducts,
  setPage,
  setCategory,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../features/products/productSlice";
import ProductList from "../components/ProductList";
import CategoryFilter from "../components/CategoryFilter";
import ProductModal from "../components/ProductModal";
import type { Product } from "../features/products/types";

const CATEGORIES = [
  "All",
  "Electronics",
  "Clothing",
  "Food",
  "Books",
  "Furniture",
  "Other",
];

export default function ProductPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { products, total, totalPages, currentPage, category, loading } =
    useSelector((state: RootState) => state.products);

  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  //  Delete confirmation state
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, currentPage, category]);

  // Save (Add / Edit)
  const handleSave = (product: Product) => {
    if (editProduct?._id) {
      dispatch(updateProduct({ id: editProduct._id, product }));
    } else {
      dispatch(createProduct(product));
    }
    setModalOpen(false);
    setEditProduct(null);
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Product Manager</h2>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          + Add Product
        </button>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={CATEGORIES}
        selected={category}
        onChange={(c) => dispatch(setCategory(c))}
      />

      {/* Product List */}
      <ProductList
        products={products}
        loading={loading}
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => dispatch(setPage(p))}
        onEdit={(p) => {
          setEditProduct(p);
          setModalOpen(true);
        }}
        onDelete={(id) => setDeleteId(id)} //  trigger modal
      />

      {/* Add/Edit Modal */}
      {modalOpen && (
        <ProductModal
          product={editProduct}
          categories={CATEGORIES.filter((c) => c !== "All")}
          onSave={handleSave}
          onClose={() => {
            setModalOpen(false);
            setEditProduct(null);
          }}
        />
      )}

      {/*  Delete Confirmation Modal */}
      {deleteId && (
        <div className="modal d-block" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Confirm Delete</h5>
                <button
                  className="btn-close"
                  onClick={() => setDeleteId(null)}
                />
              </div>

              <div className="modal-body">
                <p>Are you sure you want to delete this product?</p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setDeleteId(null)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => {
                    dispatch(deleteProduct(deleteId));
                    setDeleteId(null);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
