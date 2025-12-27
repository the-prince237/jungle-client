'use client'

import { incrementViewCountAction } from '@/presentation/actions/content.actions'
import { useEffect, useRef } from 'react'

interface VideoPlayerProps {
  videoUrl: string
  contentId: string
  userId: string
}

export function VideoPlayer({ videoUrl, contentId, userId }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasIncrementedRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => {
      if (!hasIncrementedRef.current) {
        incrementViewCountAction(contentId)
        hasIncrementedRef.current = true
      }
    }

    video.addEventListener('play', handlePlay)
    return () => video.removeEventListener('play', handlePlay)
  }, [contentId])

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full"
        controlsList="nodownload"
      >
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>
    </div>
  )
}