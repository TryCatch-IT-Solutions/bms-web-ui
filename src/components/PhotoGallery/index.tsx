import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/Carousel'
import { JobImageType } from '@/api/job/schema'
import { useEffect, useState } from 'react'

interface ICarouselIMagesProps {
    images: JobImageType[]
    selectedId: string
}

const PhotoCarousel = ({ images, selectedId }: ICarouselIMagesProps) => {
    const [embla, setEmbla] = useState<CarouselApi | null>(null)

    useEffect(() => {
        if (embla && images.length && selectedId) {
            const index = images.findIndex((image) => image.jobImageId === selectedId)
            if (index !== -1) {
                embla.scrollTo(index)
            }
        }
    }, [embla, selectedId, images])

    return (
        <Carousel opts={{ loop: true }} setApi={(api) => setEmbla(api)}>
            <CarouselContent>
                {images?.map((image) => (
                    <CarouselItem key={image.jobImageId}>
                        <img
                            src={image.jobImageUrl}
                            className='w-full max-w-screen h-[1000px] max-h-[400px] md:h-100 lg:h-100 xl:h-120 object-scale-down'
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext className='bg-gray-800' />
            <CarouselPrevious className='bg-gray-800' />
        </Carousel>
    )
}

export default PhotoCarousel
