import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function WarkopMejaPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#FCF6ED]">
            {/* Header */}
            <header className="w-full bg-[#FFF7ED] border-b border-[#E5E5E5] flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-2">
                    <Image src="/logo-2.png" alt="Meja.warkop.ai" width={36} height={36} />
                    <span className="font-bold text-[#A05A13] text-lg">Meja.warkop.ai</span>
                </div>
                <nav className="flex gap-8 text-[#6B4F1D] font-medium text-base">
                    <Link href="/warkop-meja">Beranda</Link>
                    <Link href="/warkop-loker">Loker.warkop.ai</Link>
                    <Link href="/warkop-wall">Warkop Wall</Link>
                    <Link href="/warkop-task">Task.warkop.ai</Link>
                </nav>
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
