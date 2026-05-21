"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMenus } from "@/app/hooks/useMenus";
import Skeleton from "react-loading-skeleton";
import { useSiteSettings } from "@/app/hooks/useSiteSettings";
export default function MobileMenu() {
  const pathname = usePathname();
  const {isLoading,data,error} = useMenus();
  const {data:setting,isLoading:settingLoading} = useSiteSettings();
  const [openMenu,setOpenMenu] = useState(null);



  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span
        className="icon-close icon-close-popup"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
      <div className="mb-canvas-content">
        <div className="mb-body">
          <div className="mb-content-top">
            <form className="form-search" onSubmit={(e) => e.preventDefault()}>
            </form>
          <ul className="nav-ul-mb" id="wrapper-menu-navigation">
  {isLoading ? (
    <div>
      <Skeleton width={100} height={50} />
      <Skeleton width={100} height={50} />
      <Skeleton width={100} height={50} />
      <Skeleton width={100} height={50} />
    </div>
  ) : (
    (() => {
      const headerMenu = data?.find(
        (menu) => menu.location === "header" && menu.is_active
      );

    const renderMenuItem = (item) => {
  const hasChildren =
    Array.isArray(item.children) && item.children.length > 0;

  const isOpen = openMenu === item.id;

  return (
    <li className="nav-mb-item" key={item.id}>
      <div className="d-flex align-items-center justify-content-between">
        <Link
          href={item.url}
          className={`collapsed mb-menu-link ${
            pathname === item.url ? "active" : ""
          }`}
          onClick={() => setOpenMenu(null)} // close menu on navigation
        >
          <span>{item.title}</span>
        </Link>

        {hasChildren && (
          <i
            className="icon-arrow-down dropdown-arrow"
            onClick={() =>
              setOpenMenu(isOpen ? null : item.id)
            }
            style={{
              cursor: "pointer",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          />
        )}
      </div>

      {hasChildren && isOpen && (
        <ul className="sub-nav-menu">
          {item.children.map((child) => (
            <li key={child.id}>
              <Link
                href={child.url}
                className={`sub-nav-link ${
                  pathname === child.url ? "active" : ""
                }`}
                onClick={() => setOpenMenu(null)} // close after click
              >
                {child.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

      return headerMenu?.items
        ?.filter((item) => item.is_active)
        ?.sort((a, b) => a.sort_order - b.sort_order)
        ?.map((item) => renderMenuItem(item));
    })()
  )}
</ul>
          </div>
          <div className="mb-other-content">
            <div className="group-icon">
              <Link href={`/wish-list`} className="site-nav-icon">
                <svg
                  className="icon"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z"
                    stroke="#181818"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Wishlist
              </Link>
              <Link href={`/login`} className="site-nav-icon">
                <svg
                  className="icon"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                    stroke="#181818"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                    stroke="#181818"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Login
              </Link>
            </div>
            <div className="mb-notice">
              <Link href={`/contact`} className="text-need">
                Need Help?
              </Link>
            </div>
            {settingLoading ? (
              <p>loading...</p>
            ): setting ? (
              <>
              <div className="mb-contact">
              <p className="text-caption-1">
                {setting.address}
              </p>
              <Link
                href={`/contact`}
                className="tf-btn-default text-btn-uppercase"
              >
                GET DIRECTION
                <i className="icon-arrowUpRight" />
              </Link>
            </div>
            <ul className="mb-info">
              <li>
                <i className="icon icon-mail" />
                <p>{setting.email}</p>
              </li>
              <li>
                <i className="icon icon-phone" />
                <p>{setting.phone}</p>
              </li>
            </ul>
              </>
            ):"no data found"}
          </div>
        </div>
        <div className="mb-bottom">
          </div>
      </div>
    </div>
  );
}
