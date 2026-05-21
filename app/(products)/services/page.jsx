"use client";

import { useService } from "@/app/hooks/useService";
import Breadcrumbs from "@/components/custom/Breadcrumbs";
import ServiceCard from "@/components/custom/ServiceCard";
import ServicePopup from "@/components/custom/ServicePopup";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";




const ServicePage = () => {
  const { data, isLoading, error } = useService();

  const [selectedService, setSelectedService] = useState(null);

  return (
    <>
      <div className="page-title">
        <div className="container-full">
          <h3 className="heading text-center">Our Services</h3>
          <Breadcrumbs />
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {isLoading ? (
            <Skeleton width={300} height={300} />
          ) : error ? (
            <p>Error loading services</p>
          ) : (
            data?.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                setSelectedService={setSelectedService}
              />
            ))
          )}
        </div>
      </div>

      <ServicePopup service={selectedService} />
    </>
  );
};

export default ServicePage;