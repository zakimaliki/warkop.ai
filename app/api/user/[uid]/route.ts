import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// GET: /api/user/[uid]
export async function GET(req: NextRequest, { params }: { params: { uid: string } }) {
  const { uid } = params;
  if (!uid) return NextResponse.json({ error: "UID is required" }, { status: 400 });
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(userDoc.data());
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// PATCH: /api/user/[uid]
export async function PATCH(req: NextRequest, { params }: { params: { uid: string } }) {
  const { uid } = params;
  if (!uid) return NextResponse.json({ error: "UID is required" }, { status: 400 });
  const body = await req.json();
  if (!body.role) return NextResponse.json({ error: "Role is required" }, { status: 400 });
  try {
    await updateDoc(doc(db, "users", uid), { role: body.role });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 