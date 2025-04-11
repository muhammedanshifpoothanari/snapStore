"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CldUploadButton } from 'next-cloudinary';
import { addsnapStoreToDatabase, deletesnapStoreFromDatabase, getsnapStoreFromDatabase, getsnapStoreFromDatabaseById, updatesnapStoreInDatabase } from '@/lib//user/category';

// Sample photo data
const initialPhotos = Array.from({ length: 24 }, (_, i) => ({
  _id: i + 1,
  url: `/placeholder.svg?height=400&width=400`,
  alt: `Photo ${i + 1}`,
}))

export default function PhotoGallery() {
  const [photos, setPhotos] = useState(initialPhotos)
  const [loading, setLoading] = useState(false)

  const handleUpload = async (result: any) => {
    if (result.event === "success") {
      console.log('Upload Result:', result);
      await addsnapStoreToDatabase({url:result.info.public_id,alt:"april"})
    }

  };


  useEffect(() => {
    const get = async () => {
     const result =  await getsnapStoreFromDatabase()
     setPhotos(result.data)
    }

    get()
  },[])


  // Function to load more photos
  const loadMore = () => {
    setLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      const newPhotos = Array.from({ length: 12 }, (_, i) => ({
        _id: photos.length + i + 1,
        url: `/placeholder.svg?height=400&width=400`,
        alt: `Photo ${photos.length + i + 1}`,
      }))

      setPhotos([...photos, ...newPhotos])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold">SnapStore</h1>
        </div>
      </header>

      {/* Photo Grid */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
          {photos.map((photo) => (
            <div key={photo._id} className="aspect-square overflow-hidden rounded-md relative group">
              <Image
                src={`https://res.cloudinary.com/diwhddwig/image/upload/f_auto,q_auto/${photo.url}`}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105 group-focus:scale-105"
                loading="lazy"
              />


              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-8 flex justify-center">
          <Button onClick={loadMore} disabled={loading} variant="outline" className="px-6">
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      </main>

      {/* Upload Button */}
      <div className="fixed bottom-6 right-6">
      <CldUploadButton
              uploadPreset="fdqf0lpc"
              className="h-14 w-14 rounded-full shadow-lg"
              onSuccess={handleUpload}
            >
              <Plus className="h-6 w-6" />
              <span className="sr-only">Upload photo</span>
            </CldUploadButton>
      
      </div>
    </div>
  )
}
