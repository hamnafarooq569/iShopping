"use client";

import { useServiceForm } from "@/app/hooks/useForms";
import { useService } from "@/app/hooks/useService";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ServicePopup({ service }) {
  const { data, isLoading, error } = useService();
  const { mutate, isPending } = useServiceForm();

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    service_id: "",
    message: "",
  });

  // ✅ auto set selected service id
  useEffect(() => {
    if (service?.id) {
      setForm((prev) => ({
        ...prev,
        service_id: service.id,
      }));
    }
  }, [service]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(form, {
      onSuccess: () => {
        toast.success("Service request submitted successfully");

        setForm({
          name: "",
          email: "",
          contact: "",
          service_id: service?.id || "",
          message: "",
        });
      },
      onError: (err) => {
        console.error(err);
        toast.error("Something went wrong");
      },
    });
  };

  return (
    <div className="modal fade" id="serviceModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              Request Service: {service?.title || ""}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="form-control mb-3"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="form-control mb-3"
                value={form.email}
                onChange={handleChange}
                required
              />
              <div className="form-control mb-3">
                {service?.title || ""}
              </div>

              <input
                type="text"
                name="contact"
                placeholder="Phone Number"
                className="form-control mb-3"
                value={form.contact}
                onChange={handleChange}
              />

              {/* ✅ IMPORTANT FIX */}
              <input
                type="hidden"
                name="service_id"
                value={form.service_id}
              />

              <textarea
                name="message"
                placeholder="Your Message"
                className="form-control"
                rows="4"
                value={form.message}
                onChange={handleChange}
              />

            </div>

            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-dark"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}