import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, where, orderBy, limit } from "firebase/firestore";

// GET: /api/jobs - Get all jobs with optional filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const location = searchParams.get('location');
    const isRemote = searchParams.get('remote');
    const limitCount = parseInt(searchParams.get('limit') || '20');

    // Simple query without complex filters for now
    let jobsQuery = query(collection(db, "jobs"), orderBy("postedAt", "desc"), limit(limitCount));

    const snapshot = await getDocs(jobsQuery);
    const jobs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];

    // Apply all filters on client side for now
    let filteredJobs = jobs;
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title?.toLowerCase().includes(searchLower) ||
        job.company?.toLowerCase().includes(searchLower) ||
        job.description?.toLowerCase().includes(searchLower) ||
        job.location?.toLowerCase().includes(searchLower)
      );
    }
    
    if (type && type !== 'all') {
      filteredJobs = filteredJobs.filter(job => job.type === type);
    }
    
    if (isRemote === 'true') {
      filteredJobs = filteredJobs.filter(job => job.isRemote === true);
    }
    
    if (location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    return NextResponse.json(filteredJobs);
  } catch (error) {
    console.error('Jobs API Error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST: /api/jobs - Create new job posting
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      company,
      location,
      type,
      description,
      requirements,
      salary,
      contact,
      postedBy,
      tags,
      isRemote
    } = body;

    // Validation
    if (!title || !company || !location || !type || !description || !contact || !postedBy) {
      return NextResponse.json({ 
        error: "Missing required fields: title, company, location, type, description, contact, postedBy" 
      }, { status: 400 });
    }

    const jobData = {
      title,
      company,
      location,
      type,
      description,
      requirements: requirements || [],
      salary: salary || null,
      contact,
      postedBy,
      postedAt: new Date(),
      status: 'active',
      applications: [],
      tags: tags || [],
      isRemote: isRemote || false
    };

    const docRef = await addDoc(collection(db, "jobs"), jobData);
    
    return NextResponse.json({ 
      id: docRef.id,
      ...jobData 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 