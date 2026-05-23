import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import PageMeta from "../../components/common/PageMeta";
import { ArrowLeft } from "lucide-react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import AddProduct from "../../components/Inventory/AddProduct";

const AddProducts: React.FC = () => {
  const { isOpen, closeModal } = useModal();


  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <>
      <PageMeta
        title="POS"
        description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="overflow-auto h-full">
        <div className="flex items-center justify-between mb-4 px-4 py-2">
          <Button
            onClick={handleBackClick}
            className="flex items-center bg-blue-500 text-white h-10 w-24 rounded-md hover:bg-blue-600"
          >
            <ArrowLeft width={20} height={20} />
            Back
          </Button>
          <PageBreadcrumb pageTitle="All Products" />
        </div>
        <div className="space-y-6 mt-4 px-4">
          <AddProduct />
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
    </>
  );
};

export default AddProducts;
