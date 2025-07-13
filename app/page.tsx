"use client"

import { useState } from "react"
import {
  Search,
  MessageCircle,
  Users,
  Briefcase,
  User,
  Heart,
  MessageSquare,
  Star,
  ExternalLink,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faImage, faLocationDot, faTag, faHeart, faCommentDots } from '@fortawesome/free-solid-svg-icons'

export default function WarkopLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [statusText, setStatusText] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-[#944C1F] shadow-sm border-b border-[#EBA94B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="warkop.ai logo" width={30} height={30} priority />
              <span className="text-2xl font-bold text-[#F9F6E2] tracking-wide">warkop.ai</span>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="#" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B] transition">Home</Link>
              <Link href="#" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B] transition">Warkop</Link>
              <Link href="#" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B] transition">Loker</Link>
              <Link href="#" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B] transition">Tugas</Link>
              <Link href="#" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B] transition">Meja Saya</Link>
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
                <Link href="#" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B]">Home</Link>
                <Link href="#" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B]">Warkop</Link>
                <Link href="#" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B]">Loker</Link>
                <Link href="#" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B]">Tugas</Link>
                <Link href="#" className="text-[#F9F6E2] font-medium hover:text-[#EBA94B]">Meja Saya</Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-28 bg-[#944C1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text & Actions */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-extrabold text-[#2D1600] leading-tight">
                  Cari kerja & tenaga kerja,<br />
                  <span className="text-[#FFC76A]">sesantai ngopi</span>
                </h1>
                <p className="text-xl lg:text-2xl text-[#F9F6E2]/80 font-medium leading-relaxed">
                  Platform AI yang mempertemukan freelancer dengan UMKM lokal.<br />Santai tapi serius, seperti ngobrol di warkop!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-4 rounded-xl text-lg font-bold shadow flex items-center gap-2">
                  <FontAwesomeIcon icon={faPencil} className="w-5 h-5" />
                  Pasang Status
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#E8F5E9] px-8 py-4 rounded-xl text-lg font-bold bg-transparent shadow"
                >
                  <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
                  Cari Talenta
                </Button>
              </div>
            </div>
            {/* Right: Hero Image */}
            <div className="flex justify-center items-center">
              <Image
                src="/hero.png"
                alt="People working in a cafe"
                width={600}
                height={400}
                className="w-[600px] h-[400px] object-cover rounded-3xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Warkop Wall Section */}
      <section className="py-16 bg-[#F4F6F8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C4257] mb-4">Warkop Wall</h2>
            <p className="text-xl text-[#2C4257]/70">Tempat ngobrol dan berbagi status pekerjaan</p>
          </div>

          <div className="space-y-8">
            <Image src="/wall-example_1.png" alt="Warkop Wall 1" width={900} height={300} className="w-full h-auto rounded-2xl" />
            <Image src="/wall-example_2.png" alt="Warkop Wall 2" width={900} height={300} className="w-full h-auto rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-[#F9F6E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#944C1F] mb-4">Akses Cepat</h2>
            <p className="text-xl text-[#944C1F]/80">Semua yang kamu butuhkan dalam satu platform</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Loker */}
            <Card className="text-center shadow-lg bg-white border-0">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[#944C1F]">
                  <Image src="/bag.png" alt="Loker" width={40} height={40} className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-[#944C1F] mb-2">Loker.warkop.ai</h3>
                <p className="text-[#6B4A2B] mb-4">Cari lowongan kerja terbaru</p>
              </CardContent>
            </Card>
            {/* Meja */}
            <Card className="text-center shadow-lg bg-white border-0">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[#944C1F]">
                  <Image src="/person.png" alt="Meja" width={40} height={40} className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-[#944C1F] mb-2">Meja.warkop.ai</h3>
                <p className="text-[#6B4A2B] mb-4">Kelola profil & portfolio</p>
              </CardContent>
            </Card>
            {/* Task */}
            <Card className="text-center shadow-lg bg-white border-0">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[#944C1F]">
                  <Image src="/list.png" alt="Task" width={40} height={40} className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-[#944C1F] mb-2">Task.warkop.ai</h3>
                <p className="text-[#6B4A2B] mb-4">Manajemen tugas project</p>
              </CardContent>
            </Card>
            {/* Notifikasi WA */}
            <Card className="text-center shadow-lg bg-white border-0">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[#944C1F]">
                  <Image src="/wa.png" alt="Notifikasi WA" width={40} height={40} className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-[#944C1F] mb-2">Notifikasi WA</h3>
                <p className="text-[#6B4A2B] mb-4">Update via WhatsApp</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Image src="/logo.png" alt="warkop.ai logo" width={30} height={30} priority />

                <span className="text-xl font-bold">warkop.ai</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Platform AI yang mempertemukan freelancer dengan UMKM lokal. Santai tapi profesional!
              </p>
            </div>

            {/* Platform Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Platform</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Warkop Wall
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Cara Kerja
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Loker.warkop.ai
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Meja.warkop.ai
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Task.warkop.ai
                </Link>
              </div>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Bantuan</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Kontak
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Syarat & Ketentuan
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Hubungi</h4>
              <div className="space-y-2">
                <p className="text-gray-400">Email: hello@warkop.ai</p>
                <p className="text-gray-400">WhatsApp: +62 812-3456-7890</p>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium">Ikuti Kami</h5>
                <div className="flex space-x-4">
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Instagram
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Twitter
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="text-center text-gray-400">
            <p>&copy;2024 warkop.ai - Ngopi sambil nyari kerja, kenapa nggak?</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
