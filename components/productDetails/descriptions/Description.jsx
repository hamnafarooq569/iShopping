import React from "react";
import Image from "next/image";
export default function Description({product}) {
  return (
    <>
      {" "}
      <div className="right">
        <div className="letter-1 text-btn-uppercase mb_12">
          {product?.name}
        </div>
        <p className="mb_12 text-secondary">
          {product?.description}</p>
       
      </div>
      
    </>
  );
}
