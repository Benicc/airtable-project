import Image from 'next/image';

type ProfileImageProps = {
    src?: string | null
    className?: string
}

export function ProfileImage({src, className = ""} :
ProfileImageProps) {
    return (
        <div className={`relative h-8 w-8 overflow-hidden rounded-full border ${className}`}>
            {src == null ? null : <Image src={src} alt="Profile Image" quality={100} fill/>}
        </div>
    );
}