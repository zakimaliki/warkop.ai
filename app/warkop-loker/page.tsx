"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import Link from "next/link"
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { Menu, X } from "lucide-react"
import { useJobs } from "@/hooks/use-jobs"
import { useAIMatch } from "@/hooks/use-ai-match"
import { JobCard } from "@/components/job-card"
import { JobForm } from "@/components/job-form"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import type { Job } from "@/hooks/use-jobs"

export default function WarkopLokerPage() {
    const [filter, setFilter] = useState({ remote: false, onsite: false, freelance: false, fulltime: false })
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)
    const [showDetail, setShowDetail] = useState(false)
    const [editMode, setEditMode] = useState(false)
    
    const { jobs, loading, error, fetchJobs, updateJob, deleteJob } = useJobs();
    const { matchedJobs, getMatchedJobs } = useAIMatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/login");
            } else {
                // Fetch jobs when user is authenticated
                fetchJobs();
                getMatchedJobs(user.uid);
            }
        });
        return () => unsubscribe();
    }, [router]);
    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    const currentUser = auth.currentUser;

    const handleViewDetails = (jobId: string) => {
        const job = jobs.find((j: Job) => j.id === jobId) || null
        setSelectedJob(job)
        setShowDetail(true)
        setEditMode(false)
    }

    const handleEditJob = async (formData: any) => {
        if (!selectedJob) return;
        await updateJob(selectedJob.id, {
            ...formData,
            tags: (formData.tags as string).split(',').map((tag: string) => tag.trim()).filter(Boolean),
            type: formData.type,
            isRemote: !!formData.isRemote,
        })
        toast.success('Lowongan berhasil diupdate!')
        setEditMode(false)
        setShowDetail(false)
        setSelectedJob(null)
        fetchJobs()
    }

    const handleDeleteJob = async () => {
        if (!selectedJob) return;
        if (!window.confirm('Yakin ingin menghapus lowongan ini?')) return;
        await deleteJob(selectedJob.id)
        toast.success('Lowongan berhasil dihapus!')
        setShowDetail(false)
        setSelectedJob(null)
        fetchJobs()
    }

    // Tambahkan fungsi filter dan search sebelum render jobs
    const filteredJobs = jobs.filter((job) => {
      // Filter by search term
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.location.toLowerCase().includes(search) ||
        job.description.toLowerCase().includes(search);
      // Filter by type
      const matchesType = selectedType === 'all' || job.type === selectedType;
      // Filter by remote/onsite/freelance/fulltime
      const matchesRemote = !filter.remote || job.isRemote;
      const matchesOnsite = !filter.onsite || job.type === 'onsite';
      const matchesFreelance = !filter.freelance || job.type === 'freelance';
      const matchesFulltime = !filter.fulltime || job.type === 'fulltime';
      return matchesSearch && matchesType && matchesRemote && matchesOnsite && matchesFreelance && matchesFulltime;
    });

    return (
        <div className="min-h-screen bg-[#FFF8E1] flex flex-col">
            {/* Header */}
            <header className="bg-[#944C1F] shadow-sm border-b border-[#EBA94B]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <Image src="/logo.png" alt="warkop.ai logo" width={30} height={30} priority />
                            <span className="text-2xl font-bold text-[#F9F6E2] tracking-wide">Warkop Loker</span>
                        </div>
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8 items-center">
                            <Link href="/" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B] transition">Home</Link>
                            <Link href="/warkop-wall" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B] transition">Warkop Wall</Link>
                            <Link href="/warkop-loker" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B] transition">Loker</Link>
                            <Link href="/warkop-task" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B] transition">Tugas</Link>
                            <Link href="/warkop-meja" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B] transition">Meja Saya</Link>
                            <Button onClick={handleLogout} className="bg-[#EBA94B] hover:bg-[#FFD699] text-[#7B3F10] font-bold ml-4">Logout</Button>
                        </nav>
                        {/* Mobile menu button */}
                        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="w-6 h-6 text-[#F9F6E2]" /> : <Menu className="w-6 h-6 text-[#F9F6E2]" />}
                        </button>
                    </div>
                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 border-t border-[#EBA94B] bg-[#944C1F]">
                            <nav className="flex flex-col space-y-4">
                                <Link href="/" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B]">Home</Link>
                                <Link href="/warkop-wall" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B]">Warkop Wall</Link>
                                <Link href="/warkop-loker" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B]">Loker</Link>
                                <Link href="/warkop-task" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B]">Tugas</Link>
                                <Link href="/warkop-meja" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B]">Meja Saya</Link>
                                <Button onClick={handleLogout} className="bg-[#EBA94B] hover:bg-[#FFD699] text-[#7B3F10] font-bold">Logout</Button>
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero & Main */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex flex-col md:flex-row gap-8">
                {/* Left: Loker List */}
                <section className="flex-1 min-w-0">
                    {/* Hero Title */}
                    <div className="mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#7B3F10] mb-1">Lowongan Terbaru di Warkop Kamu</h1>
                        <p className="text-[#7B3F10]/80 text-base md:text-lg">Temukan kerjaan freelance atau pasang lowongan dengan mudah, seperti ngobrol di warkop.</p>
                    </div>

                    {/* Filter & Search */}
                    <Card className="mb-6">
                        <CardContent className="p-4 flex flex-col gap-3">
                            <div className="flex flex-col md:flex-row gap-3 items-center">
                                <Input 
                                    placeholder="Cari lowongan atau lokasi..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 bg-[#FFF8E1] border border-[#EBA94B]" 
                                />
                                {/* Hapus dropdown select jenis pekerjaan */}
                            </div>
                            <div className="flex gap-4 flex-wrap text-sm">
                                <label className="flex items-center gap-1">
                                    <input 
                                        type="checkbox" 
                                        checked={filter.remote}
                                        onChange={(e) => setFilter(prev => ({ ...prev, remote: e.target.checked }))}
                                        className="accent-[#7B3F10]" 
                                    /> Remote
                                </label>
                                <label className="flex items-center gap-1">
                                    <input 
                                        type="checkbox" 
                                        checked={filter.onsite}
                                        onChange={(e) => setFilter(prev => ({ ...prev, onsite: e.target.checked }))}
                                        className="accent-[#7B3F10]" 
                                    /> Onsite
                                </label>
                                <label className="flex items-center gap-1">
                                    <input 
                                        type="checkbox" 
                                        checked={filter.freelance}
                                        onChange={(e) => setFilter(prev => ({ ...prev, freelance: e.target.checked }))}
                                        className="accent-[#7B3F10]" 
                                    /> Freelance
                                </label>
                                <label className="flex items-center gap-1">
                                    <input 
                                        type="checkbox" 
                                        checked={filter.fulltime}
                                        onChange={(e) => setFilter(prev => ({ ...prev, fulltime: e.target.checked }))}
                                        className="accent-[#7B3F10]" 
                                    /> Full-time
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Daftar Lowongan */}
                    <div className="flex flex-col gap-4">
                        {loading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF7043] mx-auto"></div>
                                <p className="text-[#7B3F10] mt-2">Memuat lowongan...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <p className="text-red-500">{error}</p>
                                <Button onClick={() => fetchJobs()} className="mt-2">Coba Lagi</Button>
                            </div>
                        ) : filteredJobs.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-[#7B3F10]">Tidak ada lowongan yang cocok</p>
                            </div>
                        ) : (
                            filteredJobs.map((job) => (
                                <JobCard 
                                    key={job.id} 
                                    job={job}
                                    onViewDetails={handleViewDetails}
                                />
                            ))
                        )}
                    </div>
                </section>

                {/* Right: Sidebar */}
                <aside className="w-full md:w-[340px] flex-shrink-0 flex flex-col gap-6">
                    {/* Pasang Lowongan */}
                    <JobForm onSuccess={() => fetchJobs()} />

                    {/* AI Match */}
                    <Card className="bg-[#E8F5E9] border-none">
                        <CardContent className="p-4 flex flex-col gap-2">
                            <span className="font-semibold text-[#388E3C]">AI Match</span>
                            <span className="text-sm text-[#2C4257]">
                                {matchedJobs.length > 0 
                                    ? `Ada ${matchedJobs.length} lowongan cocok buat kamu hari ini!` 
                                    : 'Belum ada rekomendasi lowongan'
                                }
                            </span>
                            {matchedJobs.length > 0 && (
                                <Button 
                                    onClick={() => {
                                        // Handle view matched jobs
                                        console.log('View matched jobs:', matchedJobs);
                                    }}
                                    className="bg-[#43A047] text-white px-3 py-1 rounded-md text-xs w-fit"
                                >
                                    Lihat Match
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    {/* Eksplor Warkop */}
                    <Card>
                        <CardContent className="p-4 flex flex-col gap-2">
                            <span className="font-semibold text-[#7B3F10] mb-1">Eksplor Warkop</span>
                            <Link href="#" className="text-[#388E3C] hover:underline text-sm">Meja.warkop.ai</Link>
                            <Link href="#" className="text-[#388E3C] hover:underline text-sm">Warkop Wall</Link>
                            <Link href="#" className="text-[#388E3C] hover:underline text-sm">Task.warkop.ai</Link>
                        </CardContent>
                    </Card>
                </aside>
            </main>

            {/* Footer */}
            <footer className="bg-[#7B3F10] text-white py-6 mt-8">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
                    <span className="font-bold text-lg flex items-center gap-2">
                        <Image src="/logo.png" alt="warkop.ai logo" width={30} height={30} priority />
                        warkop.ai
                    </span>
                    <span className="text-sm text-[#EBA94B] mt-1">Ekosistem kerja berbasis komunitas</span>
                </div>
            </footer>

            <Dialog open={showDetail} onOpenChange={(open) => { setShowDetail(open); if (!open) { setEditMode(false); setSelectedJob(null); } }}>
                <DialogContent>
                    {selectedJob && !editMode && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedJob.title}</DialogTitle>
                            </DialogHeader>
                            <div className="mb-2 text-sm text-[#7B3F10]">{selectedJob.company} - {selectedJob.location}</div>
                            <div className="mb-2 text-xs text-[#7B3F10]/70">{selectedJob.type} {selectedJob.isRemote && '/ Remote'}</div>
                            <div className="mb-2 text-[#2C4257]">{selectedJob.description}</div>
                            {/* Salary */}
                            {selectedJob.salary && selectedJob.salary.min !== undefined && selectedJob.salary.max !== undefined && (
                                <div className="mb-2 text-xs text-[#7B3F10]/70">
                                    Gaji: Rp{selectedJob.salary.min.toLocaleString()} - Rp{selectedJob.salary.max.toLocaleString()} ({selectedJob.salary.currency || 'IDR'})
                                </div>
                            )}
                            {/* Requirements */}
                            {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                                <div className="mb-2 text-xs text-[#7B3F10]/70">
                                    <div className="font-semibold">Requirements:</div>
                                    <ul className="list-disc list-inside ml-2">
                                        {selectedJob.requirements.map((req: string, idx: number) => (
                                            <li key={idx}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="mb-2 text-xs text-[#7B3F10]/70">Kontak: {selectedJob.contact}</div>
                            <div className="mb-2 text-xs text-[#7B3F10]/70">Tags: {selectedJob.tags?.join(', ')}</div>
                            <DialogFooter>
                                {currentUser && selectedJob.postedBy === currentUser.uid && (
                                    <div className="flex gap-2 w-full">
                                        <Button className="flex-1 bg-[#43A047] text-white" onClick={() => setEditMode(true)}>Edit</Button>
                                        <Button className="flex-1 bg-[#FF7043] text-white" onClick={handleDeleteJob}>Hapus</Button>
                                    </div>
                                )}
                                <Button variant="outline" className="w-full mt-2" onClick={() => setShowDetail(false)}>Tutup</Button>
                            </DialogFooter>
                        </>
                    )}
                    {selectedJob && editMode && (
                        <JobForm
                            initialValues={{
                                title: selectedJob.title,
                                company: selectedJob.company,
                                location: selectedJob.location,
                                type: selectedJob.type,
                                description: selectedJob.description,
                                contact: selectedJob.contact,
                                isRemote: selectedJob.isRemote,
                                tags: selectedJob.tags?.join(', '),
                                requirements: Array.isArray(selectedJob.requirements) ? selectedJob.requirements.join(', ') : '',
                                salaryMin: selectedJob.salary && selectedJob.salary.min !== undefined ? String(selectedJob.salary.min) : '',
                                salaryMax: selectedJob.salary && selectedJob.salary.max !== undefined ? String(selectedJob.salary.max) : '',
                                salaryCurrency: selectedJob.salary && selectedJob.salary.currency ? selectedJob.salary.currency : 'IDR',
                            }}
                            onSubmit={handleEditJob}
                            submitLabel="Simpan Perubahan"
                            onSuccess={() => {}}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
