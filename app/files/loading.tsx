import Image from "next/image";

export default function Loading() {
  return (
    <div className="animate-pulse fixed-center">
      <Image width={200} height={200} src={"/tag.svg"} alt="logo" />
    </div>
  );
}
