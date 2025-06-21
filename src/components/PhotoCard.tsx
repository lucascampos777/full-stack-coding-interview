'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = {
  photo: {
    id: string;
    alt: string;
    photographer: string;
    photographer_url: string;
    avg_color: string;
    src: {
      small: string;
    };
  };
};

export default function PhotoCard({ photo }: Props) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token || loading) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/photos/${photo.id}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setLiked(data.liked);
      }
    } catch (err) {
      console.error('Failed to like:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3">
        <button onClick={toggleLike} className="mt-1 text-yellow-500">
          <Image src={liked ? "/star-fill.svg" : "/star-line.svg"} alt="Liked" width={20} height={20} />
        </button>

        <img
          src={photo.src.small}
          alt={photo.alt}
          className="max-w-[75px] max-h-[75px] min-w-[75px] min-h-[75px] rounded-md"
        />

        <div>
          <p className="font-semibold text-[14px] text-gray-900">{photo.photographer}</p>
          <p className="text-[14px] text-gray-700">{photo.alt}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <span>#{photo.id}</span>
            <span
              className="w-[12px] h-[12px] inline-block"
              style={{ backgroundColor: photo.avg_color }}
            ></span>
          </div>
        </div>
      </div>

      <a
        href={photo.photographer_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[12px] text-[#0075EB] hover:underline whitespace-nowrap mt-1 ms-2 flex flex-row items-center gap-1"
      >
        <Image src="/links.svg" alt="" width={12} height={12} /> Portfolio
      </a>
    </div>
  );
}
