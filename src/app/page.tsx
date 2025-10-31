"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace("/manager");
    }
  }, [router]);

  return null;
}
