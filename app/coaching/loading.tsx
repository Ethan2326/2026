import { Nav } from "../components/Nav";
import { PageSkeleton } from "../components/Skeleton";

export default function CoachingLoading() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Nav />
      <PageSkeleton />
    </div>
  );
}
