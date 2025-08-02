import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy, limit, getDoc, doc } from "firebase/firestore";

// GET: /api/jobs/match - Get AI recommended jobs for user
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const limitCount = parseInt(searchParams.get('limit') || '5');

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // For now, just return recent jobs as recommendations
    // TODO: Implement proper AI matching when user profiles are available
    const jobsQuery = query(
      collection(db, "jobs"),
      orderBy("postedAt", "desc"),
      limit(limitCount)
    );

    const snapshot = await getDocs(jobsQuery);
    const jobs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      matchScore: Math.floor(Math.random() * 10) + 1 // Random score for now
    })) as any[];

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Match API Error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 