// app/(auth)/register/page.tsx  ->  /register
import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Create your account</h1>
      <RegisterForm />
      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </>
  );
}
