import { Nav } from "../components/Nav";
import { DashboardSkeleton } from "../components/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Nav />
      <DashboardSkeleton />
    </div>
  );
}
