import AllSalesProduct from "../../components/Sales/AllSalesProduct";
import NewSalescustomer from "../../components/Sales/NewSalescustomer";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";

const NewSales = () => {
  const { isOpen, closeModal } = useModal();
  return (
    <div className="flex w-full h-full gap-8">
      <div className="flex-[3]">
        <AllSalesProduct />
      </div>
      <div className="flex-[1]">
        <NewSalescustomer />
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

export default NewSales;
