import AccountForm from "./account-form";
import { createClient } from "@/lib/supabase/server";
import type { ComponentType } from "react";

export default async function Account() {
  const supabase = await createClient();

  const { data: claimsData } = await supabase.auth.getClaims();

  const Form = AccountForm as unknown as ComponentType<{
    claims: NonNullable<typeof claimsData>["claims"] | null;
  }>;

  return <Form claims={claimsData?.claims ?? null} />;
}
