"use client"

import { useState } from "react"
import { Coffee, User, Mail, Phone, Lock, BadgeDollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

export default function RegisterPage() {
    const [role, setRole] = useState("freelancer")

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f9f6e2] to-[#e9dbc7]">
            <div className="flex flex-col items-center w-full">
                {/* Logo & Title */}
                <div className="flex flex-col items-center mb-6">
                    <h1 className="mt-2 text-2xl font-semibold text-[#944C1F] flex items-center gap-2">
                        <Coffee className="w-6 h-6 text-[#944C1F]" />
                        warkop.ai
                    </h1>
                    <p className="mt-2 text-sm text-[#a67c52]">Daftar akun baru untuk mulai ngopi bareng cari kerja</p>
                </div>
                {/* Card */}
                <div className="bg-white/90 rounded-xl shadow-lg px-8 py-8 w-full max-w-sm flex flex-col items-center">
                    <div className="flex flex-col items-center -mt-16 mb-4">
                        <Image src="/user-login.png" alt="warkop.ai register" width={100} height={100} priority />
                    </div>
                    <form className="w-full flex flex-col gap-4">
                        <div>
                            <Label htmlFor="name" className="text-[#944C1F] flex items-center gap-2">
                                <User className="w-4 h-4 mr-1" /> Nama Lengkap
                            </Label>
                            <Input id="name" type="text" placeholder="Masukkan nama lengkap" className="mt-1 border-[#e9dbc7] focus:border-[#944C1F] focus:ring-[#944C1F]" autoComplete="name" />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-[#944C1F] flex items-center gap-2">
                                <Mail className="w-4 h-4 mr-1" /> Email Aktif
                            </Label>
                            <Input id="email" type="email" placeholder="contoh@email.com" className="mt-1 border-[#e9dbc7] focus:border-[#944C1F] focus:ring-[#944C1F]" autoComplete="email" />
                        </div>
                        <div>
                            <Label htmlFor="phone" className="text-[#944C1F] flex items-center gap-2">
                                <Phone className="w-4 h-4 mr-1" /> Nomor HP / WhatsApp
                            </Label>
                            <Input id="phone" type="tel" placeholder="+62812345678" className="mt-1 border-[#e9dbc7] focus:border-[#944C1F] focus:ring-[#944C1F]" autoComplete="tel" />
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-[#944C1F] flex items-center gap-2">
                                <Lock className="w-4 h-4 mr-1" /> Password
                            </Label>
                            <Input id="password" type="password" placeholder="Minimal 6 karakter" className="mt-1 border-[#e9dbc7] focus:border-[#944C1F] focus:ring-[#944C1F]" autoComplete="new-password" />
                        </div>
                        <div>
                            <Label htmlFor="confirm-password" className="text-[#944C1F] flex items-center gap-2">
                                <Lock className="w-4 h-4 mr-1" /> Konfirmasi Password
                            </Label>
                            <Input id="confirm-password" type="password" placeholder="Ulangi password" className="mt-1 border-[#e9dbc7] focus:border-[#944C1F] focus:ring-[#944C1F]" autoComplete="new-password" />
                        </div>
                        <div>
                            <Label className="text-[#944C1F] flex items-center gap-2">
                                <User className="w-4 h-4 mr-1" /> Saya adalah
                            </Label>
                            <RadioGroup value={role} onValueChange={setRole} className="flex flex-col gap-2 mt-2">
                                <label className="flex items-center gap-2 border rounded-md px-3 py-2 bg-[#f9f6e2] border-[#e9dbc7] cursor-pointer">
                                    <RadioGroupItem value="freelancer" id="freelancer" />
                                    <BadgeDollarSign className="w-4 h-4 text-[#388E3C]" />
                                    <span>Freelancer / Pencari Kerja</span>
                                </label>
                                <label className="flex items-center gap-2 border rounded-md px-3 py-2 bg-[#f9f6e2] border-[#e9dbc7] cursor-pointer">
                                    <RadioGroupItem value="owner" id="owner" />
                                    <BadgeDollarSign className="w-4 h-4 text-[#388E3C]" />
                                    <span>Pemilik Usaha / Pemberi Kerja</span>
                                </label>
                            </RadioGroup>
                        </div>
                        <Button type="submit" className="mt-2 bg-[#4CAF50] hover:bg-[#388E3C] text-white font-semibold flex items-center gap-2 w-full">
                            <Coffee className="w-5 h-5" />
                            Daftar Sekarang
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
