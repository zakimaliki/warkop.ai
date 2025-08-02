import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// GET: /api/applications/[id] - Get specific application by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
  
  try {
    const applicationDoc = await getDoc(doc(db, "applications", id));
    if (!applicationDoc.exists()) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }
    
    return NextResponse.json({
      id: applicationDoc.id,
      ...applicationDoc.data()
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// PATCH: /api/applications/[id] - Update application status
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
  
  try {
    const body = await req.json();
    const { status, coverLetter, resume, portfolio } = body;
    
    const applicationRef = doc(db, "applications", id);
    
    // Check if application exists
    const applicationDoc = await getDoc(applicationRef);
    if (!applicationDoc.exists()) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }
    
    // Update application
    const updateData: any = {
      updatedAt: new Date()
    };
    
    if (status) updateData.status = status;
    if (coverLetter !== undefined) updateData.coverLetter = coverLetter;
    if (resume !== undefined) updateData.resume = resume;
    if (portfolio !== undefined) updateData.portfolio = portfolio;
    
    await updateDoc(applicationRef, updateData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE: /api/applications/[id] - Withdraw application
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
  
  try {
    const applicationRef = doc(db, "applications", id);
    
    // Check if application exists
    const applicationDoc = await getDoc(applicationRef);
    if (!applicationDoc.exists()) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }
    
    const applicationData = applicationDoc.data();
    
    // Remove user from job applications array
    if (applicationData.jobId) {
      const jobRef = doc(db, "jobs", applicationData.jobId);
      const jobDoc = await getDoc(jobRef);
      if (jobDoc.exists()) {
        const jobData = jobDoc.data();
        const updatedApplications = (jobData.applications || []).filter(
          (userId: string) => userId !== applicationData.userId
        );
        await updateDoc(jobRef, { applications: updatedApplications });
      }
    }
    
    // Delete application
    await deleteDoc(applicationRef);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 