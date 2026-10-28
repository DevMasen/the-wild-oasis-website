"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  updateGuest as updateGuestApi,
  createBooking as createBookingApi,
  updateBooking as updateBookingApi,
  deleteBooking as deleteBookingApi,
  getBookings,
} from "@/app/_lib/data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//! SignIn and SignOut
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

//! Guest Area
export async function updateGuest(formData) {
  // Authentication
  const session = await auth();
  if (!session) throw new Error("You must login to your account!");

  // Authorization : Only alphanumeric characters is allowed for national ID
  const nationalID = formData.get("nationalID");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Invalid National ID!");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const updateData = { nationalID, nationality, countryFlag };
  await updateGuestApi(session.user.guestId, updateData);
  revalidatePath("/account/profile");
}

//! Bookings Area
export async function createBooking(bookingData, formData) {
  // Authentication
  const session = await auth();
  if (!session) throw new Error("You must login to your account!");

  // Building new Data
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
  };

  // Mutation
  await createBookingApi(newBooking);

  // Revalidation
  revalidatePath(`/cabins/${bookingData.cabinId}`);

  // Redirecting
  redirect("/cabins/thankyou");
}

export async function updateBooking(formData) {
  // 1.Authentication
  const session = await auth();
  if (!session) throw new Error("You must login to your account!");

  const bookingId = Number(formData.get("bookingId"));

  // 2.Authorization: Each guest is just allowed to update its own booking
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking!");

  // 3.Building Update Data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // 4,5.Mutation and Error Handling
  await updateBookingApi(bookingId, updateData);

  // 6. Revalidation
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  // 7. Redirecting
  redirect("/account/reservations");
}

export async function deleteBooking(bookingId) {
  // Authentication
  const session = await auth();
  if (!session) throw new Error("You must login to your account!");

  // Authorization: Each guest is just allowed to delete its own booking
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking!");

  // throw new Error("On Demand Server Error!");

  await deleteBookingApi(bookingId);
  revalidatePath("/account/reservations");
}
