"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { updateGuest as updateGuestApi } from "./data-service";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must login to your account!");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Invalid National ID!");

  const updateData = { nationalID, nationality, countryFlag };
  await updateGuestApi(session.user.guestId, updateData);
}
