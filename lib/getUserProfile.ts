import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type UserProfile = {
  email: string;
  role: "admin" | "student";
  hasAccess: boolean;
};

export async function getUserProfile(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data() as UserProfile;
}
