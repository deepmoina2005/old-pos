import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";

// Layout
import AppLayout from "./layout/AppLayout";

// Common Components
import { ScrollToTop } from "./components/common/ScrollToTop";

// Auth Pages
import SignIn from "./pages/AuthPages/SignIn";

// Dashboard
import Home from "./pages/Dashboard/Home";

// Pages - User
import UserProfiles from "./pages/UserProfiles";

// Pages - UI Elements
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";

// Pages - Charts
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";

// Pages - Utilities
import Settings from "./pages/Settings";

// Pages - Tables & Forms
import FormElements from "./pages/Forms/FormElements";

// Pages - Inventory
import AddProducts from "./pages/Inventory/AddProduct";
import AllProducts from "./pages/Inventory/AllProducts";

// Pages - Sales
import NewSales from "./pages/Sales/NewSales";
import SalesHistory from "./pages/Sales/SalesHistory";

// Pages - Purchase
import AddPurchase from "./pages/Purchase/AddPurchase";
import PurchaseHistory from "./pages/Purchase/PurchaseHistory";

// Pages - Suppliers
import AllSupliers from "./pages/Supliers/AllSupliers";
import AddSupliers from "./pages/Supliers/AddSupliers";

// Pages - Categories
import AddCategory from "./pages/Categories/AddCategory";
import AllCategories from "./pages/Categories/AllCategories";

// Pages - Units
import AddUnits from "./pages/Units/AddUnits";
import AllUnits from "./pages/Units/AllUnits";

// Pages - Misc
import NotFound from "./pages/OtherPage/NotFound";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster/>
      <Routes>
        {/* App routes with layout */}
        <Route element={<AppLayout />}>
          <Route index path="/dashboard" element={<Home />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/settings" element={<Settings />} />

          {/* UI Elements */}
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />

          {/* Charts */}
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />

          {/* Tables and Forms */}
          <Route path="/form-elements" element={<FormElements />} />

          {/* Inventory */}
          <Route path="/add-product" element={<AddProducts />} />
          <Route path="/all-products" element={<AllProducts />} />

          {/* Sales */}
          <Route path="/new-sales" element={<NewSales />} />
          <Route path="/sales-history" element={<SalesHistory />} />

          {/* Purchase */}
          <Route path="/add-purchase" element={<AddPurchase />} />
          <Route path="/all-purchase" element={<PurchaseHistory />} />

          {/* Suppliers */}
          <Route path="/all-supliers" element={<AllSupliers />} />
          <Route path="/add-supliers" element={<AddSupliers />} />

          {/* Categories */}
          <Route path="/all-categories" element={<AllCategories />} />
          <Route path="/add-category" element={<AddCategory />} />

          {/* Units */}
          <Route path="/add-unit" element={<AddUnits />} />
          <Route path="/all-units" element={<AllUnits />} />
        </Route>

        {/* Auth route */}
        <Route path="/" element={<SignIn />} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}