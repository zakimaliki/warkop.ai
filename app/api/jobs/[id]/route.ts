import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// GET: /api/jobs/[id] - Get specific job by ID
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  if (!id) return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
  
  try {
    const jobDoc = await getDoc(doc(db, "jobs", id));
    if (!jobDoc.exists()) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    
    return NextResponse.json({
      id: jobDoc.id,
      ...jobDoc.data()
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// PATCH: /api/jobs/[id] - Update specific job
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  if (!id) return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
  
  try {
    const body = await req.json();
    const jobRef = doc(db, "jobs", id);
    
    // Check if job exists
    const jobDoc = await getDoc(jobRef);
    if (!jobDoc.exists()) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    
    // Update job
    await updateDoc(jobRef, {
      ...body,
      updatedAt: new Date()
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE: /api/jobs/[id] - Delete specific job
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  if (!id) return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
  
  try {
    const jobRef = doc(db, "jobs", id);
    
    // Check if job exists
    const jobDoc = await getDoc(jobRef);
    if (!jobDoc.exists()) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    
    // Delete job
    await deleteDoc(jobRef);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}