// Fungsi utilitas untuk normalisasi ke string
function normalizeToString(value: unknown): string {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(v => String(v)).join(', ');
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useJobs } from "@/hooks/use-jobs"
import { auth } from "@/lib/firebase"
import { toast } from "sonner"

interface JobFormProps {
  onSuccess?: () => void;
  initialValues?: Partial<{
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    contact: string;
    isRemote: boolean;
    tags: string | string[]; // ubah bagian ini
    requirements: string | string[];
    salaryMin: string;
    salaryMax: string;
    salaryCurrency: string;
    salary?: { min?: number; max?: number; currency?: string };
  }>;
  onSubmit?: (formData: any) => Promise<void>;
  submitLabel?: string;
}

export function JobForm({ onSuccess, initialValues, onSubmit, submitLabel }: JobFormProps) {
  const [formData, setFormData] = useState<{
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    contact: string;
    isRemote: boolean;
    tags: string;
    requirements: string;
    salaryMin: string;
    salaryMax: string;
    salaryCurrency: string;
  }>({
    title: initialValues?.title || '',
    company: initialValues?.company || '',
    location: initialValues?.location || '',
    type: initialValues?.type || 'freelance',
    description: initialValues?.description || '',
    contact: initialValues?.contact || '',
    isRemote: initialValues?.isRemote || false,
    tags: normalizeToString(initialValues?.tags),
    requirements: normalizeToString(initialValues?.requirements),
    salaryMin: typeof initialValues?.salary === 'object' && initialValues.salary?.min !== undefined
      ? String(initialValues.salary.min)
      : (initialValues?.salaryMin || ''),
    salaryMax: typeof initialValues?.salary === 'object' && initialValues.salary?.max !== undefined
      ? String(initialValues.salary.max)
      : (initialValues?.salaryMax || ''),
    salaryCurrency: typeof initialValues?.salary === 'object' && initialValues.salary?.currency
      ? initialValues.salary.currency
      : (initialValues?.salaryCurrency || 'IDR'),
  });

  const { createJob, loading } = useJobs();
  const currentUser = auth.currentUser;
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Silakan login terlebih dahulu');
      return;
    }
    setSubmitting(true);
    try {
      console.log('DEBUG: formData.tags =', formData.tags);
      console.log('DEBUG: typeof tags =', typeof formData.tags);
      const payload = {
        ...formData,
        postedBy: currentUser.uid,
        tags: normalizeToString(formData.tags)
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean),
        requirements: normalizeToString(formData.requirements)
          .split(',')
          .map(req => req.trim())
          .filter(Boolean),
        salary: formData.salaryMin && formData.salaryMax ? {
          min: Number(formData.salaryMin),
          max: Number(formData.salaryMax),
          currency: formData.salaryCurrency || 'IDR',
        } : undefined,
        type: formData.type as 'freelance' | 'remote' | 'onsite' | 'fulltime' | 'part-time',
      };
      console.log("PAYLOAD:", payload);
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await createJob(payload);
        toast.success('Lowongan berhasil diposting!');
        setFormData({
          title: '',
          company: '',
          location: '',
          type: 'freelance',
          description: '',
          contact: '',
          isRemote: false,
          tags: '',
          requirements: '',
          salaryMin: '',
          salaryMax: '',
          salaryCurrency: 'IDR',
        });
        onSuccess?.();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal memposting lowongan');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    if (field === 'tags' || field === 'requirements') {
      value = typeof value === 'string' ? value : normalizeToString(value);
    }
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardContent className="p-6 flex flex-col gap-3">
        <h3 className="font-bold text-[#7B3F10] mb-2">{initialValues ? 'Edit Lowongan' : 'Pasang Lowongan'}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input 
            placeholder="Nama Usaha" 
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className="bg-[#FFF8E1] border border-[#EBA94B]" 
            required
          />
          <Input 
            placeholder="Judul Lowongan" 
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="bg-[#FFF8E1] border border-[#EBA94B]" 
            required
          />
          <select 
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="border border-[#EBA94B] rounded-md px-3 py-2 text-sm text-[#7B3F10] bg-white"
            required
          >
            <option value="freelance">Freelance</option>
            <option value="fulltime">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="remote">Remote</option>
            <option value="onsite">Onsite</option>
          </select>
          <Textarea 
            placeholder="Deskripsi Singkat" 
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="bg-[#FFF8E1] border border-[#EBA94B]" 
            rows={3}
            required
          />
          <Input 
            placeholder="Lokasi" 
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="bg-[#FFF8E1] border border-[#EBA94B]" 
            required
          />
          <Input 
            placeholder="Kontak (WhatsApp/Email)" 
            value={formData.contact}
            onChange={(e) => handleChange('contact', e.target.value)}
            className="bg-[#FFF8E1] border border-[#EBA94B]" 
            required
          />
          <Input 
            placeholder="Tags (pisahkan dengan koma)" 
            value={formData.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
            className="bg-[#FFF8E1] border border-[#EBA94B]" 
          />
          {/* Requirements */}
          <Input
            placeholder="Requirements (pisahkan dengan koma, contoh: PHP, MySQL, Bootstrap)"
            value={formData.requirements}
            onChange={(e) => handleChange('requirements', e.target.value)}
            className="bg-[#FFF8E1] border border-[#EBA94B]"
          />
          {/* Salary */}
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Gaji Minimum"
              value={formData.salaryMin}
              onChange={(e) => handleChange('salaryMin', e.target.value)}
              className="bg-[#FFF8E1] border border-[#EBA94B]"
              min={0}
            />
            <Input
              type="number"
              placeholder="Gaji Maksimum"
              value={formData.salaryMax}
              onChange={(e) => handleChange('salaryMax', e.target.value)}
              className="bg-[#FFF8E1] border border-[#EBA94B]"
              min={0}
            />
            <select
              value={formData.salaryCurrency}
              onChange={(e) => handleChange('salaryCurrency', e.target.value)}
              className="border border-[#EBA94B] rounded-md px-2 py-2 text-sm text-[#7B3F10] bg-white"
            >
              <option value="IDR">IDR</option>
              <option value="USD">USD</option>
              <option value="SGD">SGD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-[#7B3F10]">
            <input 
              type="checkbox" 
              checked={formData.isRemote}
              onChange={(e) => handleChange('isRemote', e.target.checked)}
              className="accent-[#7B3F10]" 
            />
            Remote Work
          </label>
          <Button 
            type="submit"
            disabled={loading || submitting}
            className="bg-[#FF7043] hover:bg-[#FF5722] text-white font-bold mt-2"
          >
            {submitting ? 'Menyimpan...' : (submitLabel || (initialValues ? 'Simpan Perubahan' : '+ Pasang Lowongan'))}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 