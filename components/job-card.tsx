import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useApplications } from "@/hooks/use-applications"
import { auth } from "@/lib/firebase"
import { toast } from "sonner"
import { Timestamp } from "firebase/firestore";

const getFormattedDate = (postedAt: any) => {
  let date: Date;

  if (postedAt instanceof Timestamp) {
    date = postedAt.toDate();
  } else if (postedAt && typeof postedAt.toDate === 'function') {
    date = postedAt.toDate();
  } else if (
    postedAt &&
    typeof postedAt.seconds === 'number'
  ) {
    date = new Date(postedAt.seconds * 1000);
  } else if (typeof postedAt === 'string') {
    date = new Date(postedAt);
  } else if (postedAt instanceof Date) {
    date = postedAt;
  } else {
    console.warn('Unrecognized date format:', postedAt);
    return 'Tanggal tidak valid';
  }

  return !isNaN(date.getTime())
    ? date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Tanggal tidak valid';
};

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    postedAt: Date | string;
    isRemote: boolean;
    applications: string[];
    postedBy: string; // Added postedBy to the interface
  };
  onViewDetails?: (jobId: string) => void;
}

const getJobIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'freelance':
      return '💻';
    case 'fulltime':
      return '👔';
    case 'part-time':
      return '⏰';
    case 'remote':
      return '🏠';
    default:
      return '💼';
  }
};

const getBadgeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'freelance':
      return 'bg-[#1976D2]/10 text-[#1976D2] border-[#1976D2]';
    case 'fulltime':
      return 'bg-[#43A047]/10 text-[#43A047] border-[#43A047]';
    case 'part-time':
      return 'bg-[#8E24AA]/10 text-[#8E24AA] border-[#8E24AA]';
    case 'remote':
      return 'bg-[#FF7043]/10 text-[#FF7043] border-[#FF7043]';
    default:
      return 'bg-[#7B3F10]/10 text-[#7B3F10] border-[#7B3F10]';
  }
};

const getCardBorderColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'freelance':
      return 'border-[#1976D2]';
    case 'fulltime':
      return 'border-[#43A047]';
    case 'part-time':
      return 'border-[#8E24AA]';
    case 'remote':
      return 'border-[#FF7043]';
    default:
      return 'border-[#7B3F10]';
  }
};

export function JobCard({ job, onViewDetails }: JobCardProps) {
  const [isApplying, setIsApplying] = useState(false);
  const { submitApplication } = useApplications();
  const currentUser = auth.currentUser;

  const handleApply = async () => {
    if (!currentUser) {
      toast.error('Silakan login terlebih dahulu');
      return;
    }

    setIsApplying(true);
    try {
      await submitApplication({
        jobId: job.id,
        userId: currentUser.uid,
        coverLetter: '',
        resume: '',
        portfolio: ''
      });
      toast.success('Lamaran berhasil dikirim!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal mengirim lamaran');
    } finally {
      setIsApplying(false);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Baru saja';
    if (diffInHours < 24) return `${diffInHours} jam lalu`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} hari lalu`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} minggu lalu`;
  };

  return (
    <Card className={`border-2 ${getCardBorderColor(job.type)}`}>
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{getJobIcon(job.type)}</span>
          <span className="font-bold text-[#7B3F10]">{job.title}</span>
          <Badge className={`${getBadgeColor(job.type)} ml-auto`}>
            {job.isRemote ? 'Remote' : job.type}
          </Badge>
        </div>
        
        <div className="text-sm text-[#7B3F10]">{job.company} - {job.location}</div>
        
        <div className="text-sm text-[#2C4257] line-clamp-2">
          {job.description}
        </div>
        
        <div className="flex items-center gap-3 text-xs text-[#7B3F10]/70 mt-1">
          <span>{job.location} {job.isRemote && '/ Remote'}</span>
          <span>•</span>
<span>{getFormattedDate(job.postedAt)}</span>
          {job.applications.length > 0 && (
            <>
              <span>•</span>
              <span>{job.applications.length} pelamar</span>
            </>
          )}
        </div>
        
        <div className="flex gap-2 mt-2">
          {/* Hanya tampilkan tombol Lamar jika bukan owner */}
          {!(currentUser && job.postedBy === currentUser.uid) && (
            <Button 
              onClick={handleApply}
              disabled={isApplying}
              className="bg-[#FF7043] hover:bg-[#FF5722] text-white font-bold flex-1"
            >
              {isApplying ? 'Mengirim...' : 'Lamar'}
            </Button>
          )}
          <Button 
            variant="outline" 
            className="border-[#FF7043] text-[#FF7043] font-bold flex-1"
            onClick={() => onViewDetails?.(job.id)}
          >
            Lihat Detail
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 