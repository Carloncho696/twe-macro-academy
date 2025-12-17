import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type UserProfile = {
  email: string;
  role: "admin" | "student";
  hasBookAccess: boolean;
  hasVideoAccess: boolean;
};

export async function getUserProfile(
  uid: string,
  email?: string | null
): Promise<UserProfile | null> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  // Si no existe, lo creamos con defaults
  if (!snap.exists()) {
    if (!email) return null;

    const newProfile: UserProfile = {
      email,
      role: "student",
      hasBookAccess: false,
      hasVideoAccess: false,
    };

    await setDoc(ref, newProfile);
    return newProfile;
  }

  return snap.data() as UserProfile;
}
