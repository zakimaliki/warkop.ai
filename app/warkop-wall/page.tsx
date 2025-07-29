"use client"

import { useState, useEffect } from "react"
import {
    MessageCircle,
    Heart,
    User,
    Menu,
    X,
    Star,
    Briefcase,
    Users,
    Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faTag, faHeart, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

export default function WarkopWallPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [statusText, setStatusText] = useState("")
    const [filter, setFilter] = useState("semua")
    const router = useRouter();
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
        <div className="min-h-screen bg-[#F4F6F8]">
            {/* Header */}
            <header className="bg-[#944C1F] shadow-sm border-b border-[#EBA94B]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <Image src="/logo.png" alt="warkop.ai logo" width={30} height={30} priority />
                            <span className="text-2xl font-bold text-[#F9F6E2] tracking-wide">Warkop Wall</span>
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
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">
                {/* Wall Section */}
                <section className="flex-1 max-w-2xl mx-auto w-full">
                    {/* Form Posting */}
                    <Card className="mb-6">
                        <CardContent className="p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <Input
                                    placeholder="Ceritakan keahlianmu dan jenis kerja yang kamu cari"
                                    className="flex-1 bg-[#F4F6F8] border-none focus:ring-0 text-base"
                                    value={statusText}
                                    onChange={e => setStatusText(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 items-center justify-between">
                                <div className="flex gap-2">
                                    <Badge className="bg-[#4CAF50] text-white">Freelancer</Badge>
                                    <Badge className="bg-[#FFC76A] text-[#944C1F]">UMKM</Badge>
                                </div>
                                <Button className="bg-[#944C1F] hover:bg-[#EBA94B] text-white font-bold px-6 py-2 rounded-lg">Posting</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Filter Tab */}
                    <div className="flex gap-2 mb-6">
                        <Button variant={filter === "semua" ? "default" : "outline"} className={filter === "semua" ? "bg-[#944C1F] text-white" : "border-[#944C1F] text-[#944C1F]"} onClick={() => setFilter("semua")}>Semua</Button>
                        <Button variant={filter === "freelancer" ? "default" : "outline"} className={filter === "freelancer" ? "bg-[#4CAF50] text-white" : "border-[#4CAF50] text-[#4CAF50]"} onClick={() => setFilter("freelancer")}>Freelancer</Button>
                        <Button variant={filter === "umkm" ? "default" : "outline"} className={filter === "umkm" ? "bg-[#FFC76A] text-[#944C1F]" : "border-[#FFC76A] text-[#944C1F]"} onClick={() => setFilter("umkm")}>UMKM</Button>
                    </div>

                    {/* List Status/Posting */}
                    <div className="flex flex-col gap-6">
                        {/* Card 1 */}
                        <Card>
                            <CardContent className="p-6 flex flex-col gap-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <Avatar>
                                        <AvatarImage src="/user_1.png" />
                                        <AvatarFallback>S</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">Sari Warung</span>
                                            <Badge className="bg-[#FFC76A] text-[#944C1F]">UMKM</Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" /> Yogyakarta
                                            <span>•</span> 2 jam lalu
                                        </div>
                                    </div>
                                </div>
                                <div className="text-base text-[#2C4257]">
                                    Butuh fotografer makanan untuk menu warung saya. Budget 500rb untuk 20 foto produk. Lokasi di Jogja. Yang berminat bisa langsung chat ya!
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                                    <span><FontAwesomeIcon icon={faHeart} className="mr-1 text-[#E57373]" />12</span>
                                    <span><FontAwesomeIcon icon={faCommentDots} className="mr-1 text-[#4CAF50]" />3</span>
                                    <Button className="ml-auto bg-[#4CAF50] text-white px-4 py-1 rounded-lg">Lamar</Button>
                                </div>
                            </CardContent>
                        </Card>
                        {/* Card 2 */}
                        <Card>
                            <CardContent className="p-6 flex flex-col gap-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <Avatar>
                                        <AvatarImage src="/user_2.png" />
                                        <AvatarFallback>A</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">Andi Photographer</span>
                                            <Badge className="bg-[#4CAF50] text-white">FREELANCER</Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" /> Yogyakarta
                                            <span>•</span> 4 jam lalu
                                        </div>
                                    </div>
                                </div>
                                <div className="text-base text-[#2C4257]">
                                    Photographer profesional dengan pengalaman 5 tahun. Spesialisasi food photography, produk, dan event. Portfolio lengkap bisa dilihat di IG @andiphoto. Open untuk project di Jogja dan sekitarnya.
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                                    <span><FontAwesomeIcon icon={faHeart} className="mr-1 text-[#E57373]" />8</span>
                                    <span><FontAwesomeIcon icon={faCommentDots} className="mr-1 text-[#4CAF50]" />2</span>
                                    <Button className="ml-auto bg-[#FFC76A] text-[#944C1F] px-4 py-1 rounded-lg">Hubungi</Button>
                                </div>
                            </CardContent>
                        </Card>
                        {/* Card 3 */}
                        <Card>
                            <CardContent className="p-6 flex flex-col gap-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <Avatar>
                                        <AvatarImage src="/user_3.png" />
                                        <AvatarFallback>B</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">Budi Cafe</span>
                                            <Badge className="bg-[#FFC76A] text-[#944C1F]">UMKM</Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" /> Jakarta
                                            <span>•</span> 6 jam lalu
                                        </div>
                                    </div>
                                </div>
                                <div className="text-base text-[#2C4257]">
                                    Cari social media specialist untuk handle Instagram cafe. Part time, 3x seminggu. Bisa content creation, copywriting, dan engagement. Budget 1,5jt/bulan. Yang tertarik DM ya!
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                                    <span><FontAwesomeIcon icon={faHeart} className="mr-1 text-[#E57373]" />15</span>
                                    <span><FontAwesomeIcon icon={faCommentDots} className="mr-1 text-[#4CAF50]" />7</span>
                                    <Button className="ml-auto bg-[#4CAF50] text-white px-4 py-1 rounded-lg">Lamar</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Sidebar Rekomendasi AI */}
                <aside className="w-full lg:w-[370px] flex-shrink-0">
                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Image src="/bot.png" alt="AI Bot" width={24} height={24} className="w-6 h-6" />
                                <span className="font-bold text-[#944C1F] text-lg">Rekomendasi AI</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                {/* Rekomendasi 1 */}
                                <div className="rounded-lg border-l-4 border-[#4CAF50] bg-[#F4F6F8] p-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge className="bg-[#4CAF50] text-white">Match 95%</Badge>
                                        <span className="font-semibold text-[#2C4257]">Job Foto Makanan</span>
                                    </div>
                                    <p className="text-sm text-[#2C4257] mb-2">Sari Warung mencari fotografer makanan dengan budget 500rb. Cocok dengan skill photography kamu!</p>
                                    <div className="flex gap-2">
                                        <Button className="bg-[#4CAF50] text-white px-3 py-1 rounded-md text-xs">Lihat Detail</Button>
                                        <Button variant="outline" className="border-[#4CAF50] text-[#4CAF50] px-3 py-1 rounded-md text-xs">Rekomendasikan</Button>
                                    </div>
                                </div>
                                {/* Rekomendasi 2 */}
                                <div className="rounded-lg border-l-4 border-[#EBA94B] bg-[#F4F6F8] p-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge className="bg-[#EBA94B] text-[#944C1F]">Match 87%</Badge>
                                        <span className="font-semibold text-[#2C4257]">Social Media Specialist</span>
                                    </div>
                                    <p className="text-sm text-[#2C4257] mb-2">Budi Cafe butuh social media specialist part time. Sesuai dengan pengalaman digital marketing kamu!</p>
                                    <div className="flex gap-2">
                                        <Button className="bg-[#EBA94B] text-[#944C1F] px-3 py-1 rounded-md text-xs">Lihat Detail</Button>
                                        <Button variant="outline" className="border-[#EBA94B] text-[#EBA94B] px-3 py-1 rounded-md text-xs">Rekomendasikan</Button>
                                    </div>
                                </div>
                                {/* Rekomendasi 3 */}
                                <div className="rounded-lg border-l-4 border-[#FFC76A] bg-[#F4F6F8] p-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge className="bg-[#FFC76A] text-[#944C1F]">Match 78%</Badge>
                                        <span className="font-semibold text-[#2C4257]">Desain Menu Cafe</span>
                                    </div>
                                    <p className="text-sm text-[#2C4257] mb-2">Warung Kopi Alif perlu desainer untuk menu baru. Cocok dengan skill graphic design kamu!</p>
                                    <div className="flex gap-2">
                                        <Button className="bg-[#FFC76A] text-[#944C1F] px-3 py-1 rounded-md text-xs">Lihat Detail</Button>
                                        <Button variant="outline" className="border-[#FFC76A] text-[#FFC76A] px-3 py-1 rounded-md text-xs">Rekomendasikan</Button>
                                    </div>
                                </div>
                                {/* Tips */}
                                <div className="rounded-lg bg-white p-4 border border-dashed border-[#EBA94B]">
                                    <span className="font-semibold text-[#944C1F]">Tips AI</span>
                                    <p className="text-sm text-[#2C4257] mt-1">Lengkapi profil kamu untuk mendapatkan rekomendasi yang lebih akurat!</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </aside>
            </main>
        </div>
    )
} 