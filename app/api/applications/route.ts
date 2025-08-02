import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, where, orderBy, doc, getDoc, updateDoc } from "firebase/firestore";

// GET: /api/applications - Get applications with optional filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const jobId = searchParams.get('jobId');
    const status = searchParams.get('status');

    let applicationsQuery = query(collection(db, "applications"), orderBy("appliedAt", "desc"));

    // Apply filters
    if (userId) {
      applicationsQuery = query(applicationsQuery, where("userId", "==", userId));
    }
    if (jobId) {
      applicationsQuery = query(applicationsQuery, where("jobId", "==", jobId));
    }
    if (status) {
      applicationsQuery = query(applicationsQuery, where("status", "==", status));
    }

    const snapshot = await getDocs(applicationsQuery);
    const applications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST: /api/applications - Submit job application
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      jobId,
      userId,
      coverLetter,
      resume,
      portfolio
    } = body;

    // Validation
    if (!jobId || !userId) {
      return NextResponse.json({ 
        error: "Missing required fields: jobId, userId" 
      }, { status: 400 });
    }

    // Check if user already applied to this job
    const existingApplication = await getDocs(
      query(
        collection(db, "applications"), 
        where("jobId", "==", jobId), 
        where("userId", "==", userId)
      )
    );

    if (!existingApplication.empty) {
      return NextResponse.json({ 
        error: "You have already applied to this job" 
      }, { status: 400 });
    }

    const applicationData = {
      jobId,
      userId,
      status: 'pending',
      appliedAt: new Date(),
      coverLetter: coverLetter || '',
      resume: resume || '',
      portfolio: portfolio || ''
    };

    const docRef = await addDoc(collection(db, "applications"), applicationData);
    
    // Update job applications count
    const jobRef = doc(db, "jobs", jobId);
    const jobDoc = await getDoc(jobRef);
    if (jobDoc.exists()) {
      const jobData = jobDoc.data();
      await updateDoc(jobRef, {
        applications: [...(jobData.applications || []), userId]
      });
    }
    
    return NextResponse.json({ 
      id: docRef.id,
      ...applicationData 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 