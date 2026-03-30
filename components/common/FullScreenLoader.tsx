import Image from "next/image";


export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <Image src="/1-removebg-preview.png" alt="logo" className="animate-pulse" width={200} height={200} />
    </div>
  );
}
