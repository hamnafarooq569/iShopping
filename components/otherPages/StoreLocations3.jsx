"use client"

import { useSiteSettings } from "@/app/hooks/useSiteSettings";
import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function StoreLocations3() {

  const {isLoading,data,error} = useSiteSettings();

  if (error) return <p className="text-danger">failed to load site settings</p>

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="contact-us-map">
              <div className="wrap-map">
                <div
                  id="map-contact"
                  className="map-contact"
                  data-map-zoom={16}
                  data-map-scroll="true"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463538.0907339718!2d66.43304358906248!3d24.8162874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33d8051134a7d%3A0x85c98eaac28d9481!2siShop%20Repair%20and%20services!5e0!3m2!1sen!2sus!4v1777991695115!5m2!1sen!2sus"
                    width={600}
                    height={450}
                    style={{ border: 0, width: "100%", height: "100%" }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="right">
                <h4>Information</h4>
                {isLoading ? ( 
                  <div><Skeleton width={500} height={500}/>
                  </div>
                ): data ? (
                   <>
                  <div className="mb_20">
                  <div className="text-title mb_8">Phone:</div>
                  <p className="text-secondary">{data.phone}</p>
                </div>
                <div className="mb_20">
                  <div className="text-title mb_8">Email:</div>
                  <p className="text-secondary">{data.email}</p>
                </div>
                <div className="mb_20">
                  <div className="text-title mb_8">Address:</div>
                  <p className="text-secondary">
                    {data.address}
                  </p>
                </div>
                  </>
                ):(error)}
                <div>
                  <div className="text-title mb_8">Open Time:</div>
                  <p className="mb_4 open-time">
                    <span className="text-secondary">Mon - Sat:</span> 7:30am -
                    8:00pm PST
                  </p>
                  <p className="open-time">
                    <span className="text-secondary">Sunday:</span> 9:00am -
                    5:00pm PST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
