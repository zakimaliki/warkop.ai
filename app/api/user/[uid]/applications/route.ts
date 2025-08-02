import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy, getDoc, doc } from "firebase/firestore";

// GET: /api/user/[uid]/applications - Get applications submitted by specific user
export async function GET(req: NextRequest, { params }: { params: { uid: string } }) {
  const { uid } = params;
  if (!uid) return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  
  try {
    const applicationsQuery = query(
      collection(db, "applications"),
      where("userId", "==", uid),
      orderBy("appliedAt", "desc")
    );

    const snapshot = await getDocs(applicationsQuery);
    const applications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];

    // Get job details for each application
    const applicationsWithJobDetails = await Promise.all(
      applications.map(async (application) => {
        try {
          const jobDoc = await getDoc(doc(db, "jobs", application.jobId));
          if (jobDoc.exists()) {
            return {
              ...application,
              job: {
                id: jobDoc.id,
                ...(jobDoc.data() as any)
              }
            };
          }
          return application;
        } catch (error) {
          return application;
        }
      })
    );

    return NextResponse.json(applicationsWithJobDetails);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 