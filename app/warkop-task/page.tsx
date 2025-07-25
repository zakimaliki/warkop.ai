import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';


export default function WarkopTaskPage() {
    return (
        <div className="min-h-screen bg-[#FFF6E9] flex flex-col">
            {/* Header */}
            <header className="bg-white shadow flex items-center px-8 py-3 justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brown-200 rounded-lg flex items-center justify-center">
                        {/* Logo Placeholder */}
                        <Image src="/logo-2.png" alt="Meja.warkop.ai" width={36} height={36} />
                    </div>
                    <div>
                        <h1 className="font-semibold text-lg">Tugas & Proyek Kamu di Warkop</h1>
                        <p className="text-xs text-gray-500">Lacak tugas freelance kamu seperti nyatet orderan di papan warkop</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                        + Buat Tugas
                    </Button>
                    <img src="/notification.png" alt="Notification" className="w-7 h-7" />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex gap-6 px-8 py-6">
                {/* Sidebar Kiri */}
                <aside className="w-72 flex flex-col gap-6">
                    {/* Ringkasan Tugas */}
                    <Card className="p-4">
                        <h2 className="font-semibold mb-2 text-sm flex items-center gap-2">
                            <img src="/ringkasan.png" alt="Ringkasan" className="w-4 h-4" />
                            Ringkasan Tugas
                        </h2>
                        <ul className="text-sm space-y-1">
                            <li className="flex items-center justify-between">
                                <span>Belum dikerjakan</span>
                                <span className="bg-yellow-200 text-yellow-800 rounded-full px-2">2</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>Sedang dikerjakan</span>
                                <span className="bg-blue-200 text-blue-800 rounded-full px-2">1</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>Selesai</span>
                                <span className="bg-green-200 text-green-800 rounded-full px-2">1</span>
                            </li>
                        </ul>
                    </Card>
                    {/* Notifikasi Terbaru */}
                    <Card className="p-4">
                        <h2 className="font-semibold mb-2 text-sm flex items-center gap-2">
                            <img src="/notif.png" alt="Notif" className="w-4 h-4" />
                            Notifikasi Terbaru
                        </h2>
                        <ul className="text-xs space-y-2">
                            <li>
                                <span className="font-medium">Abdul</span> menyelesaikan tugas <b>"Buat Landing Page"</b>
                                <div className="text-gray-400">2 menit lalu</div>
                            </li>
                            <li>
                                <span className="font-medium">Pak Rahman</span> menambahkan tugas baru
                                <div className="text-gray-400">15 menit lalu</div>
                            </li>
                        </ul>
                    </Card>
                </aside>

                {/* Konten Kanan */}
                <section className="flex-1 flex flex-col gap-6">
                    {/* Tab & Form Buat Tugas Baru */}
                    <Card className="p-6 mb-4">
                        <div className="flex gap-6 mb-4 border-b pb-2">
                            <button className="font-semibold border-b-2 border-orange-400 pb-1">Tugas Saya</button>
                            <button className="text-gray-400">Kanban Board</button>
                        </div>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Judul Tugas</label>
                                <Input placeholder="Contoh: Buat form input order di Laravel" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Assign ke</label>
                                <select className="w-full border rounded px-3 py-2">
                                    <option>Abdul - Frontend Developer</option>
                                    <option>Sinta - Toko Online Berkah</option>
                                    <option>Pak Joko - Warung Makan Sederhana</option>
                                </select>
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="text-sm font-medium">Penjelasan Tugas</label>
                                <Textarea placeholder="Jelaskan detail tugas yang perlu dikerjakan..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Deadline</label>
                                <Input type="date" />
                            </div>
                            <div className="flex items-end">
                                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Tambahkan Tugas</Button>
                            </div>
                        </form>
                    </Card>

                    {/* Daftar Tugas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Card Tugas - Belum dikerjakan */}
                        <Card className="p-4 bg-yellow-100 border-yellow-200">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-yellow-200 text-yellow-800 rounded-full px-2 text-xs">Belum dikerjakan</span>
                            </div>
                            <h3 className="font-semibold">Buat form input order di Laravel</h3>
                            <p className="text-xs text-gray-600 mb-2">Buat form untuk input orderan pelanggan dengan validasi lengkap</p>
                            <div className="text-xs text-gray-500 mb-2">Pak Rahman - Percetakan Angkasa</div>
                            <div className="text-xs text-gray-500 mb-2">Deadline: 15 Jan 2024</div>
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">Mulai</Button>
                        </Card>
                        {/* Card Tugas - Sedang dikerjakan */}
                        <Card className="p-4 bg-blue-100 border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-blue-200 text-blue-800 rounded-full px-2 text-xs">Sedang dikerjakan</span>
                            </div>
                            <h3 className="font-semibold">Design UI Dashboard Admin</h3>
                            <p className="text-xs text-gray-600 mb-2">Buat mockup dashboard admin dengan fitur analytics</p>
                            <div className="text-xs text-gray-500 mb-2">Sinta - Toko Online Berkah</div>
                            <div className="text-xs text-gray-500 mb-2">Deadline: 20 Jan 2024</div>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Selesai</Button>
                        </Card>
                        {/* Card Tugas - Selesai */}
                        <Card className="p-4 bg-green-100 border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-green-200 text-green-800 rounded-full px-2 text-xs">Selesai</span>
                            </div>
                            <h3 className="font-semibold">Setup Database MySQL</h3>
                            <p className="text-xs text-gray-600 mb-2">Install dan konfigurasi database untuk sistem inventory</p>
                            <div className="text-xs text-gray-500 mb-2">Pak Joko - Warung Makan Sederhana</div>
                            <div className="text-xs text-gray-500 mb-2">Selesai 2 hari lalu</div>
                            <Button size="sm" variant="outline" className="border-green-600 text-green-700">Completed</Button>
                        </Card>
                        {/* Card Tugas - Belum dikerjakan 2 */}
                        <Card className="p-4 bg-yellow-100 border-yellow-200">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-yellow-200 text-yellow-800 rounded-full px-2 text-xs">Belum dikerjakan</span>
                            </div>
                            <h3 className="font-semibold">Integrasi Payment Gateway</h3>
                            <p className="text-xs text-gray-600 mb-2">Integrasikan Midtrans untuk pembayaran online</p>
                            <div className="text-xs text-gray-500 mb-2">Pak Rahman - Percetakan Angkasa</div>
                            <div className="text-xs text-gray-500 mb-2">Deadline: 25 Jan 2024</div>
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">Mulai</Button>
                        </Card>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-brown-700 text-white flex items-center justify-between px-8 py-3 mt-8">
                <div className="flex items-center gap-2">
                    <span className="text-xl">☕</span>
                    <span className="font-semibold">Task.Warkop.AI</span>
                    <span className="text-xs ml-2">Manajemen tugas freelance yang santai</span>
                </div>
                <div className="flex items-center gap-6 text-xs">
                    <span>meja.warkop.ai</span>
                    <span>WA Notif</span>
                </div>
            </footer>
        </div>
    );
}
