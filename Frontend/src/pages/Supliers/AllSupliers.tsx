import { ArrowLeft } from "lucide-react";
import AllHistorySuppliers from "../../components/suppliers/AllHistorySuppliers";
import Button from "../../components/ui/button/Button";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";

const AllSupliers = () => {
  const { isOpen, closeModal } = useModal();
  const handleBackClick = () => {
    window.history.back(); // Go back to the previous page in browser history
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <Button
          onClick={handleBackClick} // Attach handleBackClick to the button's onClick
          className="flex items-center bg-blue-500 text-white h-10 w-24 rounded-md hover:bg-blue-600 mb-2"
        >
          <ArrowLeft width={20} height={20} />
          Back
        </Button>
        <PageBreadcrumb pageTitle="All Supliers" />
      </div>

      <div className="mt-6">
        <AllHistorySuppliers />
      </div>
      <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6 lg:p-10"
        >
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              onClick={closeModal}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AllSupliers;
