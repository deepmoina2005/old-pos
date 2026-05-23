import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta title="POS" description="This is POS"/>
      <div className="grid grid-cols-12 gap-4 md:gap-6 max-h-[200px]">
        <div className="col-span-12 space-y-6">
          <EcommerceMetrics />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}