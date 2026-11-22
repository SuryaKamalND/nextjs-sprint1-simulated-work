"use server";

// On-demand revalidation: after prices change, throw away the cached /pricing
// page immediately instead of waiting for the 60 s timer.
import { revalidatePath } from "next/cache";
import { bumpPrices } from "@/lib/pricing";

export async function refreshPrices() {
  await bumpPrices(); // the mutation
  revalidatePath("/pricing"); // invalidate ONLY this page
}
