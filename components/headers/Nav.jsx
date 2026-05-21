"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useMenus } from "@/app/hooks/useMenus";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Nav() {
  const { isLoading, data, error } = useMenus();
  const pathname = usePathname();

  const headerMenu = data?.find(
    (menu) => menu.location === "header" && menu.is_active
  );

  const renderMenuItem = (item) => {
    const hasChildren =
      item.children &&
      item.children.filter((child) => child.is_active).length > 0;

    return (
      <li
        key={item.id}
        className={`menu-item d-flex align-items-center gap-1 ${
          pathname === item.url ? "active" : ""
        } ${hasChildren ? "has-dropdown" : ""}`}
      >
        <Link href={item.url} className="item-link">
          {item.title}
        </Link>
        {hasChildren && (
          <i
            className="icon-arrow-down dropdown-arrow"></i>
        )}
        

        {hasChildren && (
          
          <ul className="dropdown-menu">
            {item.children
              .filter((child) => child.is_active)
              .map((child) => (
                <li
                  key={child.id}
                  className={`dropdown-item ${
                    pathname === child.url ? "active" : ""
                  }`}
                >
                  <Link href={child.url} className="item-link">
                    {child.title}
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </li>
    );
  };

  if (isLoading) {
    return (
      <div className="d-flex gap-4">
        <Skeleton width={70} height={30} />
        <Skeleton width={70} height={30} />
        <Skeleton width={70} height={30} />
        <Skeleton width={70} height={30} />
        <Skeleton width={70} height={30} />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {headerMenu?.items
        ?.filter((item) => item.is_active)
        ?.sort((a, b) => a.sort_order - b.sort_order)
        ?.map((item) => renderMenuItem(item))}
    </>
  );
}