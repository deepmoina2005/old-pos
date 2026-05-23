import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Eye, Trash2, PlusCircle } from "lucide-react";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";

interface Purchase {
  id: number;
  productId: string;
  supplier: string;
  purchaseDate: string;
  quantity: number;
  pricePerUnit: number;
  totalAmount: number;
  status: string;
}

const sampleData: Purchase[] = [
  { id: 1, productId: "P001", supplier: "Supplier A", purchaseDate: "2025-04-01", quantity: 10, pricePerUnit: 15, totalAmount: 150, status: "Completed" },
  { id: 2, productId: "P002", supplier: "Supplier B", purchaseDate: "2025-04-03", quantity: 5, pricePerUnit: 20, totalAmount: 100, status: "Pending" },
  { id: 3, productId: "P003", supplier: "Supplier C", purchaseDate: "2025-04-05", quantity: 8, pricePerUnit: 25, totalAmount: 200, status: "Cancelled" },
  { id: 4, productId: "P004", supplier: "Supplier D", purchaseDate: "2025-04-06", quantity: 12, pricePerUnit: 10, totalAmount: 120, status: "Completed" },
  { id: 5, productId: "P005", supplier: "Supplier E", purchaseDate: "2025-04-07", quantity: 7, pricePerUnit: 18, totalAmount: 126, status: "Pending" },
  { id: 6, productId: "P006", supplier: "Supplier F", purchaseDate: "2025-04-08", quantity: 9, pricePerUnit: 22, totalAmount: 198, status: "Completed" },
  { id: 7, productId: "P007", supplier: "Supplier G", purchaseDate: "2025-04-09", quantity: 4, pricePerUnit: 30, totalAmount: 120, status: "Cancelled" },
  { id: 8, productId: "P008", supplier: "Supplier H", purchaseDate: "2025-04-10", quantity: 6, pricePerUnit: 19, totalAmount: 114, status: "Pending" },
  { id: 9, productId: "P009", supplier: "Supplier I", purchaseDate: "2025-04-11", quantity: 11, pricePerUnit: 13, totalAmount: 143, status: "Completed" },
  { id: 10, productId: "P010", supplier: "Supplier J", purchaseDate: "2025-04-12", quantity: 14, pricePerUnit: 17, totalAmount: 238, status: "Completed" },
  { id: 11, productId: "P011", supplier: "Supplier K", purchaseDate: "2025-04-13", quantity: 3, pricePerUnit: 50, totalAmount: 150, status: "Pending" },
  { id: 12, productId: "P012", supplier: "Supplier L", purchaseDate: "2025-04-14", quantity: 16, pricePerUnit: 9, totalAmount: 144, status: "Completed" },
  { id: 13, productId: "P013", supplier: "Supplier M", purchaseDate: "2025-04-15", quantity: 6, pricePerUnit: 23, totalAmount: 138, status: "Cancelled" },
  { id: 14, productId: "P014", supplier: "Supplier N", purchaseDate: "2025-04-16", quantity: 20, pricePerUnit: 8, totalAmount: 160, status: "Completed" },
  { id: 15, productId: "P015", supplier: "Supplier O", purchaseDate: "2025-04-17", quantity: 5, pricePerUnit: 33, totalAmount: 165, status: "Pending" },
  { id: 16, productId: "P016", supplier: "Supplier P", purchaseDate: "2025-04-18", quantity: 9, pricePerUnit: 27, totalAmount: 243, status: "Completed" },
  { id: 17, productId: "P017", supplier: "Supplier Q", purchaseDate: "2025-04-19", quantity: 13, pricePerUnit: 12, totalAmount: 156, status: "Pending" },
  { id: 18, productId: "P018", supplier: "Supplier R", purchaseDate: "2025-04-20", quantity: 2, pricePerUnit: 100, totalAmount: 200, status: "Cancelled" },
  { id: 19, productId: "P019", supplier: "Supplier S", purchaseDate: "2025-04-21", quantity: 8, pricePerUnit: 15, totalAmount: 120, status: "Completed" },
  { id: 20, productId: "P020", supplier: "Supplier T", purchaseDate: "2025-04-22", quantity: 7, pricePerUnit: 16, totalAmount: 112, status: "Pending" },
];

const itemsPerPage = 10;

const PurchaseHistoryTable = () => {
  const [purchases, setPurchases] = useState<Purchase[]>(sampleData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  const filteredPurchases = purchases.filter((purchase) =>
    purchase.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    purchase.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);

  const paginatedPurchases = filteredPurchases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleView = (id: number) => {
    console.log(`Viewing purchase with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    setPurchases((prev) => prev.filter((purchase) => purchase.id !== id));
  };

  const handleAddPurchase = () => {
    navigate("/add-purchase");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        {/* Search and Add Purchase Section */}
        <div className="flex justify-between items-center p-4 flex-wrap gap-3">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="fill-gray-500 dark:fill-gray-400"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search purchases..."
              className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={handleAddPurchase}
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            <PlusCircle className="mr-2" />
            New Purchase
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {[
                "Product ID",
                "Supplier",
                "Purchase Date",
                "Quantity",
                "Price Per Unit",
                "Total Amount",
                "Status",
                "Actions",
              ].map((heading) => (
                <TableCell
                  key={heading}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-xs uppercase dark:text-gray-400"
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {paginatedPurchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell className="px-5 py-4 text-start">{purchase.productId}</TableCell>
                <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                  {purchase.supplier}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                  {purchase.purchaseDate}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                  {purchase.quantity}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                  ${purchase.pricePerUnit.toFixed(2)}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                  ${purchase.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell className="px-5 py-4 text-start">
                  <Badge
                    size="sm"
                    color={
                      purchase.status === "Completed"
                        ? "success"
                        : purchase.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {purchase.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-4 text-start">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleView(purchase.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(purchase.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="text-sm text-gray-600 dark:text-gray-400 disabled:opacity-50"
        >
          ← Previous
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-md text-sm ${
                currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="text-sm text-gray-600 dark:text-gray-400 disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PurchaseHistoryTable;
