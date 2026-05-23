import { ArrowLeft } from "lucide-react";
import AllProductsCategory from "../../components/categories/AllProductsCategory";
import Button from "../../components/ui/button/Button";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const AllCategories = () => {
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
        <PageBreadcrumb pageTitle="Purchase History" />
      </div>
      <div className="mt-6">
        <AllProductsCategory />
      </div>
    </div>
  );
};

export default AllCategories;
