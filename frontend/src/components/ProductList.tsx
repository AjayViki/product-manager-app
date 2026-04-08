import type { Product } from "../features/products/types";

interface Props {
  products: Product[];
  loading: boolean;
  total: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductList({
  products,
  loading,
  total,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}: Props) {
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <p className="text-muted">{total} products</p>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                No products found
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>
                  <span className="badge bg-success">{p.category}</span>
                </td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(p._id!)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center gap-2">
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
