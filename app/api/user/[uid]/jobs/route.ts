import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

// GET: /api/user/[uid]/jobs - Get jobs posted by specific user
export async function GET(req: NextRequest, { params }: { params: { uid: string } }) {
  const { uid } = params;
  if (!uid) return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  
  try {
    const jobsQuery = query(
      collection(db, "jobs"),
      where("postedBy", "==", uid),
      orderBy("postedAt", "desc")
    );

    const snapshot = await getDocs(jobsQuery);
    const jobs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 