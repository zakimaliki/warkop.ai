"use client"

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useState } from "react"
import { Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Fetch user data from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            if (userData?.role === "owner") {
                router.push("/warkop-loker"); // Halaman buat pekerjaan
            } else if (userData?.role === "freelancer") {
                router.push("/warkop-meja"); // Halaman pencari kerja
            } else {
                setError("Role user tidak valid.");
            }
        } catch (err: any) {
            setError(err.message || "Gagal login. Cek email dan password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f9f6e2] to-[#e9dbc7]">
            <div className="flex flex-col items-center w-full">
                {/* Logo & Title */}
                <div className="flex flex-col items-center mb-6">
                    <h1 className="mt-2 text-2xl font-semibold text-[#944C1F] flex items-center gap-2">
                        <Coffee className="w-6 h-6 text-[#944C1F]" />
                        warkop.ai
                    </h1>
                </div>
                {/* Card */}
                <div className="bg-white/90 rounded-xl shadow-lg px-8 py-8 w-full max-w-sm flex flex-col items-center">
                    <div className="flex flex-col items-center -mt-16 mb-4">
                        <Image src="/user-login.png" alt="warkop.ai logo" width={100} height={100} priority />
                    </div>
                    <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
                        <div>
                            <Label htmlFor="email" className="text-[#944C1F]">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="mt-1 border-[#e9dbc7] focus:border-[#944C1F] focus:ring-[#944C1F]"
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-[#944C1F]">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="mt-1 border-[#e9dbc7] focus:border-[#944C1F] focus:ring-[#944C1F]"
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" checked={remember} onCheckedChange={v => setRemember(!!v)} />
                            <Label htmlFor="remember" className="text-[#a67c52] cursor-pointer">Ingat saya</Label>
                        </div>
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        <Button type="submit" className="mt-2 bg-[#944C1F] hover:bg-[#7a3d18] text-white font-semibold flex items-center gap-2 w-full" disabled={loading}>
                            <Coffee className="w-5 h-5" />
                            {loading ? "Memproses..." : "Masuk ke Warkop"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm text-[#a67c52]">
                        Belum punya akun?{' '}
                        <Link href="/register" className="text-[#944C1F] font-medium hover:underline">Daftar di sini</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
