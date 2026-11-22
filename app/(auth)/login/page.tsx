// app/(auth)/login/page.tsx  ->  /login
import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Sign in</h1>
      {/* LoginForm reads search params, so it needs a Suspense boundary */}
      <Suspense>
        <LoginForm />
      </Suspense>
      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        New here? <Link href="/register">Create an account</Link>
      </p>
    </>
  );
}
