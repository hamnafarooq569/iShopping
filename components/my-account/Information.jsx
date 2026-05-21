"use client";

import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

import {
  useUser,
  useChangePassword,
} from "@/app/hooks/useAuth";

import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

export default function Information() {
  const { data: user, isLoading: userLoading } =
    useUser();

  const {
    mutate: updatePassword,
    isPending,
  } = useChangePassword();

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  const resetForm = () => {
    setFormData({
      old_password: "",
      password: "",
      password_confirmation: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.password_confirmation
    ) {
      toast.error("Passwords do not match");
      return;
    }

    updatePassword(formData, {
      onSuccess: () => {
        resetForm();
        toast.success("Password updated successfully!")
      },
      onError:()=>{
        toast.error("Passwords doesnt match")
      }
    });
  };

  return (
    <div className="my-account-content">
      <div className="account-details">
        <form
          onSubmit={handleSubmit}
          className="form-account-details form-has-password"
        >
          {userLoading ? (
            <Skeleton height={400} />
          ) : (
            <div className="account-info">
              <h5 className="title">Information</h5>

              <div className="cols mb_20">
                <fieldset>
                  <input
                    type="text"
                    value={user?.profile?.name || ""}
                    readOnly
                    placeholder="Name"
                  />
                </fieldset>
              </div>

              <div className="cols mb_20">
                <fieldset>
                  <input
                    type="email"
                    value={user?.profile?.email || ""}
                    readOnly
                    placeholder="Email"
                  />
                </fieldset>
              </div>
            </div>
          )}

          <div className="account-password">
            <h5 className="title">Change Password</h5>

            {/* OLD PASSWORD */}
            <fieldset className="position-relative password-item mb_20">
              <input
                className="input-password"
                type={
                  showCurrentPassword
                    ? "text"
                    : "password"
                }
                placeholder="Current Password*"
                name="old_password"
                value={formData.old_password || ""}
                onChange={handleChange}
                required
              />

              <span
                className={`toggle-password ${
                  !showCurrentPassword
                    ? "unshow"
                    : ""
                }`}
                onClick={() =>
                  setShowCurrentPassword((prev) => !prev)
                }
              >
                <i
                  className={`icon-eye-${
                    !showCurrentPassword
                      ? "hide"
                      : "show"
                  }-line`}
                />
              </span>
            </fieldset>

            {/* NEW PASSWORD */}
            <fieldset className="position-relative password-item mb_20">
              <input
                className="input-password"
                type={
                  showNewPassword ? "text" : "password"
                }
                placeholder="New Password*"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                required
              />

              <span
                className={`toggle-password ${
                  !showNewPassword ? "unshow" : ""
                }`}
                onClick={() =>
                  setShowNewPassword((prev) => !prev)
                }
              >
                <i
                  className={`icon-eye-${
                    !showNewPassword
                      ? "hide"
                      : "show"
                  }-line`}
                />
              </span>
            </fieldset>

            {/* CONFIRM PASSWORD */}
            <fieldset className="position-relative password-item mb_20">
              <input
                className="input-password"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password*"
                name="password_confirmation"
                value={
                  formData.password_confirmation || ""
                }
                onChange={handleChange}
                required
              />

              <span
                className={`toggle-password ${
                  !showConfirmPassword
                    ? "unshow"
                    : ""
                }`}
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
              >
                <i
                  className={`icon-eye-${
                    !showConfirmPassword
                      ? "hide"
                      : "show"
                  }-line`}
                />
              </span>
            </fieldset>
          </div>

          <div className="button-submit">
            <button
              className="tf-btn btn-fill"
              type="submit"
              disabled={isPending}
            >
              <span className="text text-button">
                {isPending
                  ? "Updating..."
                  : "Update Password"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}