
import SignupWrapper from "@/components/custom/SignupWrapper";
import Link from "next/link";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <>
      <div className="page-title">
        <div className="container-full">
          <h3 className="heading text-center">Register</h3>

          <ul className="breadcrumbs d-flex justify-content-center">
            <li><Link href="/">Homepage / </Link></li>
            <li>Register</li>
          </ul>
        </div>
      </div>
<SignupWrapper/>
    </>
  );
}