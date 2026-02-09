import Link from "next/link";
import Image from "next/image";

export default function CompanyLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0">
      <Image src="/images/svg/logo.svg" alt="Allbrick Pavers' Logo" width={100} height={100} />
    </Link>
  );
}
