"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Menu, X } from "lucide-react";

export default function WarkopMejaPage() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/login");
            }
        });
        return () => unsubscribe();
    }, [router]);
    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };
    return (
        <div className="min-h-screen flex flex-col bg-[#F4F6F8]">
            {/* Header */}
            <header className="bg-[#944C1F] shadow-sm border-b border-[#EBA94B]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <Image src="/logo.png" alt="warkop.ai logo" width={30} height={30} priority />
                            <span className="text-2xl font-bold text-[#F9F6E2] tracking-wide">Warkop Meja</span>
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

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center px-4 py-8">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#A05A13]">
                    Upload CV Kamu Sekali,<br />
                    <span className="text-[#1BAA5B]">Warkop.ai yang Urus Sisanya!</span>
                </h1>
                <p className="text-center text-[#6B4F1D] mb-8 max-w-xl">
                    Kami akan membaca CV kamu dan mengisi profil secara otomatis.<br />
                    Kamu masih bisa edit nanti.
                </p>

                {/* Upload Card */}
                <Card className="w-full max-w-md bg-white shadow-md mb-8">
                    <CardContent className="flex flex-col items-center py-8">
                        <div className="flex flex-col items-center mb-4">
                            <div className="bg-[#F5E3D1] rounded-full w-16 h-16 flex items-center justify-center mb-2">
                                {/* PDF Icon */}
                                <Image src="/upload.png" alt="Meja.warkop.ai" width={24} height={24} />
                            </div>
                            <div className="font-semibold text-[#A05A13] text-lg">Upload CV Kamu</div>
                            <div className="text-[#6B4F1D] text-sm">Drag & drop file CV atau klik untuk browse</div>
                        </div>
                        <Button className="w-full bg-[#1BAA5B] hover:bg-[#17994e] text-white font-semibold mb-2" type="button">
                            <svg className="inline mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 16V4M12 4L7 9M12 4L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><rect x="4" y="16" width="16" height="4" rx="2" fill="white" fillOpacity="0.1" /></svg>
                            Upload CV (PDF)
                        </Button>
                        <div className="text-xs text-[#A05A13] mt-1">Format yang didukung: .pdf, maksimal 2MB</div>
                    </CardContent>
                </Card>

                {/* Profil Sudah Siap Card */}
                <div className="w-full max-w-2xl">
                    <div className="rounded-lg bg-[#8B5C2A] text-white px-8 py-6 flex flex-col items-center shadow-md">
                        <div className="font-bold text-lg mb-1">Profil Sudah Siap!</div>
                        <div className="mb-4 text-center text-base">Sekarang saatnya mencari pekerjaan impian kamu</div>
                        <div className="flex flex-col md:flex-row gap-3 w-full justify-center">
                            <Link href="https://loker.warkop.ai" className="w-full md:w-auto">
                                <Button className="w-full bg-[#1BAA5B] hover:bg-[#17994e] text-white font-semibold">
                                    <Image src="/loker.png" alt="Meja.warkop.ai" width={15} height={15} />
                                    Lanjut ke Loker.warkop.ai
                                </Button>
                            </Link>
                            <Button className="w-full md:w-auto bg-[#A05A13] hover:bg-[#8B5C2A] text-white font-semibold">
                                <Image src="/loker-pertama.png" alt="Meja.warkop.ai" width={15} height={15} />
                                Lamar Pekerjaan Pertama
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-[#FFF7ED] border-t border-[#E5E5E5] flex flex-col items-center py-4 mt-8">
                <div className="flex items-center gap-2 mb-1">
                    <Image src="/logo-2.png" alt="Meja.warkop.ai" width={36} height={36} />
                    <span className="font-bold text-[#A05A13] text-base">Meja.warkop.ai</span>
                </div>
                <div className="text-[#6B4F1D] text-sm">Platform AI untuk memudahkan pencarian kerja</div>
            </footer>
        </div>
    );
}
