"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  updateGuest as updateGuestApi,
  deleteBooking as deleteBookingApi,
  getBookings,
} from "./data-service";
import { revalidatePath } from "next/cache";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  // Authorization
  const session = await auth();
  if (!session) throw new Error("You must login to your account!");

  // Guard Clause: National ID should be an alphanumeric string
  const nationalID = formData.get("nationalID");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Invalid National ID!");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const updateData = { nationalID, nationality, countryFlag };
  await updateGuestApi(session.user.guestId, updateData);
  revalidatePath("/account/profile");
}

export async function deleteBooking(bookingId) {
  // Authorization
  const session = await auth();
  if (!session) throw new Error("You must login to your account!");

  // Guard Clause: Each guest is just allowed to delete its own booking
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking!");

  await deleteBookingApi(bookingId);
  revalidatePath("/account/reservations");
}
