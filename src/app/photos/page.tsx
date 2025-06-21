'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PhotoCard from '@/components/PhotoCard';
import Image from 'next/image';

type Photo = {
  id: string;
  alt: string;
  photographer: string;
  photographer_url: string;
  avg_color: string;
  src: {
    small: string;
  };
};

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/');
      return;
    }

    loadData();

  }, [router]);

  const loadData = async () => {
    const res = await fetch('/api/photos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
       },
    });
    if(res.ok) {
      const data = await res.json();
      setPhotos(data);
    } else {
      alert('Failed to load photos');
    }
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-white">
      <div className="flex flex-col items-left mb-8">
        <Image src="/logo.svg" alt="Clever Logo" width={75} height={75} className="mb-4" />
        <h1 className="text-[20px] font-semibold text-gray-800">All photos</h1>
      </div>

      <div className="space-y-6">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}
