"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import Link from "next/link"

export default function WarkopLokerPage() {
    const [filter, setFilter] = useState({ remote: false, onsite: false, freelance: false, fulltime: false })
    return (
        <div className="min-h-screen bg-[#FFF8E1] flex flex-col">
            {/* Header */}
            <header className="bg-[#7B3F10] text-white py-4 border-b border-[#EBA94B]">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold flex items-center gap-2">
                            <Image src="/logo.png" alt="warkop.ai logo" width={30} height={30} priority />
                            loker.warkop.ai
                        </span>
                    </div>
                    <nav className="flex gap-6 text-sm font-medium">
                        <Link href="/warkop-meja" className="hover:text-[#EBA94B]">Meja.warkop.ai</Link>
                        <Link href="/warkop-wall" className="hover:text-[#EBA94B]">Warkop Wall</Link>
                        <Link href="/warkop-task" className="hover:text-[#EBA94B]">Task.warkop.ai</Link>
                    </nav>
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
                                <Input placeholder="Cari lowongan atau lokasi..." className="flex-1 bg-[#FFF8E1] border border-[#EBA94B]" />
                                <select className="border border-[#EBA94B] rounded-md px-3 py-2 text-sm text-[#7B3F10] bg-white">
                                    <option>Semua Jenis</option>
                                    <option>Freelance</option>
                                    <option>Full-time</option>
                                    <option>Remote</option>
                                    <option>Onsite</option>
                                </select>
                            </div>
                            <div className="flex gap-4 flex-wrap text-sm">
                                <label className="flex items-center gap-1">
                                    <input type="checkbox" className="accent-[#7B3F10]" /> Remote
                                </label>
                                <label className="flex items-center gap-1">
                                    <input type="checkbox" className="accent-[#7B3F10]" /> Onsite
                                </label>
                                <label className="flex items-center gap-1">
                                    <input type="checkbox" className="accent-[#7B3F10]" /> Freelance
                                </label>
                                <label className="flex items-center gap-1">
                                    <input type="checkbox" className="accent-[#7B3F10]" /> Full-time
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Daftar Lowongan */}
                    <div className="flex flex-col gap-4">
                        {/* Card 1 */}
                        <Card className="border-[#FF7043] border-2">
                            <CardContent className="p-4 flex flex-col gap-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-lg">💻</span>
                                    <span className="font-bold text-[#7B3F10]">Programmer Freelance</span>
                                    <Badge className="bg-[#43A047]/10 text-[#43A047] border border-[#43A047] ml-auto">Remote</Badge>
                                </div>
                                <div className="text-sm text-[#7B3F10]">Percetakan Angkasa - Madiun</div>
                                <div className="text-sm text-[#2C4257]">Butuh programmer untuk develop website company profile dan sistem inventory. Stack: PHP, MySQL, Bootstrap.</div>
                                <div className="flex items-center gap-3 text-xs text-[#7B3F10]/70 mt-1">
                                    <span>Madiun / Remote</span>
                                    <span>•</span>
                                    <span>2 jam lalu</span>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Button className="bg-[#FF7043] hover:bg-[#FF5722] text-white font-bold flex-1">Lamar</Button>
                                    <Button variant="outline" className="border-[#FF7043] text-[#FF7043] font-bold flex-1">Lihat Detail</Button>
                                </div>
                            </CardContent>
                        </Card>
                        {/* Card 2 */}
                        <Card className="border-[#1976D2] border-2">
                            <CardContent className="p-4 flex flex-col gap-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-lg">🎨</span>
                                    <span className="font-bold text-[#7B3F10]">Desainer Grafis</span>
                                    <Badge className="bg-[#1976D2]/10 text-[#1976D2] border border-[#1976D2] ml-auto">Freelance</Badge>
                                </div>
                                <div className="text-sm text-[#7B3F10]">Warung Kopi Santai - Yogyakarta</div>
                                <div className="text-sm text-[#2C4257]">Perlu desainer untuk bikin menu board, poster promosi, dan konten social media. Portfolio wajib!</div>
                                <div className="flex items-center gap-3 text-xs text-[#7B3F10]/70 mt-1">
                                    <span>Yogyakarta</span>
                                    <span>•</span>
                                    <span>5 jam lalu</span>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Button className="bg-[#FF7043] hover:bg-[#FF5722] text-white font-bold flex-1">Lamar</Button>
                                    <Button variant="outline" className="border-[#FF7043] text-[#FF7043] font-bold flex-1">Lihat Detail</Button>
                                </div>
                            </CardContent>
                        </Card>
                        {/* Card 3 */}
                        <Card className="border-[#8E24AA] border-2">
                            <CardContent className="p-4 flex flex-col gap-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-lg">📋</span>
                                    <span className="font-bold text-[#7B3F10]">Social Media Specialist</span>
                                    <Badge className="bg-[#8E24AA]/10 text-[#8E24AA] border border-[#8E24AA] ml-auto">Part-time</Badge>
                                </div>
                                <div className="text-sm text-[#7B3F10]">Kedai Kopi Nusantara - Jakarta</div>
                                <div className="text-sm text-[#2C4257]">Handle Instagram & TikTok kedai kopi. Bikin konten kreatif, engage sama followers, analisis performa.</div>
                                <div className="flex items-center gap-3 text-xs text-[#7B3F10]/70 mt-1">
                                    <span>Jakarta Selatan</span>
                                    <span>•</span>
                                    <span>1 hari lalu</span>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Button className="bg-[#FF7043] hover:bg-[#FF5722] text-white font-bold flex-1">Lamar</Button>
                                    <Button variant="outline" className="border-[#FF7043] text-[#FF7043] font-bold flex-1">Lihat Detail</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Right: Sidebar */}
                <aside className="w-full md:w-[340px] flex-shrink-0 flex flex-col gap-6">
                    {/* Pasang Lowongan */}
                    <Card>
                        <CardContent className="p-6 flex flex-col gap-3">
                            <h3 className="font-bold text-[#7B3F10] mb-2">Pasang Lowongan</h3>
                            <Input placeholder="Nama Usaha" className="bg-[#FFF8E1] border border-[#EBA94B]" />
                            <Input placeholder="Judul Lowongan" className="bg-[#FFF8E1] border border-[#EBA94B]" />
                            <select className="border border-[#EBA94B] rounded-md px-3 py-2 text-sm text-[#7B3F10] bg-white">
                                <option>Jenis Pekerjaan</option>
                                <option>Freelance</option>
                                <option>Full-time</option>
                                <option>Remote</option>
                                <option>Onsite</option>
                            </select>
                            <Textarea placeholder="Deskripsi Singkat" className="bg-[#FFF8E1] border border-[#EBA94B]" />
                            <Input placeholder="Lokasi" className="bg-[#FFF8E1] border border-[#EBA94B]" />
                            <Input placeholder="Kontak" className="bg-[#FFF8E1] border border-[#EBA94B]" />
                            <Button className="bg-[#FF7043] hover:bg-[#FF5722] text-white font-bold mt-2">+ Pasang Lowongan</Button>
                        </CardContent>
                    </Card>

                    {/* AI Match */}
                    <Card className="bg-[#E8F5E9] border-none">
                        <CardContent className="p-4 flex flex-col gap-2">
                            <span className="font-semibold text-[#388E3C]">AI Match</span>
                            <span className="text-sm text-[#2C4257]">Ada 3 lowongan cocok buat kamu hari ini! Cek sekarang.</span>
                            <Button className="bg-[#43A047] text-white px-3 py-1 rounded-md text-xs w-fit">Lihat Match</Button>
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
        </div>
    )
}
