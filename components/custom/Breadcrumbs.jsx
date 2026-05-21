"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname(); // e.g. /blog/technology/post-1
  const paths = pathname.split("/").filter(Boolean);

  return (
    <ul className="breadcrumbs d-flex align-items-center justify-content-center">
      <li>
        <Link href="/">Home</Link>
      </li>

      {paths.map((item, index) => {
        const href = "/" + paths.slice(0, index + 1).join("/");

        return (
          <li key={index} className="d-flex align-items-center">
            <i className="icon-arrRight mx-2" />
            <Link href={href} className="link text-capitalize">
              {item.replace("-", " ")}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}