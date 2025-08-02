"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// Remove this import as we'll use API instead
import { toast } from "sonner"

export default function SeedPage() {
  const [loading, setLoading] = useState(false);

  const handleSeedJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to add sample data');
      }
      
      const result = await response.json();
      toast.success('Data sample berhasil ditambahkan!');
      console.log('Added jobs:', result.addedJobs);
    } catch (error) {
      toast.error('Gagal menambahkan data sample');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E1] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-[#7B3F10] mb-4">Seed Data</h1>
          <p className="text-[#7B3F10]/80 mb-6">
            Halaman ini untuk menambahkan data sample ke database Firebase.
          </p>
          
          <Button 
            onClick={handleSeedJobs}
            disabled={loading}
            className="w-full bg-[#FF7043] hover:bg-[#FF5722] text-white font-bold"
          >
            {loading ? 'Menambahkan Data...' : 'Tambahkan Sample Jobs'}
          </Button>
          
          <div className="mt-4 text-sm text-[#7B3F10]/60">
            <p>Data yang akan ditambahkan:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Programmer Freelance</li>
              <li>Desainer Grafis</li>
              <li>Social Media Specialist</li>
              <li>Web Developer Full Stack</li>
              <li>Content Writer</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 