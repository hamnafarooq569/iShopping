import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProductSkeleton() {
  return (
    <div className="card-product style-list">
      <div className="card-product-wrapper">
        <Skeleton height={250} width={100} />
      </div>

      <div className="card-product-info mt-3">
        <Skeleton height={20} width="70%" />
        <Skeleton height={20} width="30%" />

        <div className="mt-2">
          <Skeleton count={2} />
        </div>

        <div className="flex gap-2 mt-3">
          <Skeleton height={40} width={40} />
          <Skeleton height={40} width={40} />
          <Skeleton height={40} width={40} />
        </div>
      </div>
    </div>
  );
}