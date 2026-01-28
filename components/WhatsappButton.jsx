import { Phone } from 'lucide-react';
import Link from 'next/link';

const Whatsapp = () => {
  const phone = '5511934664888';
  const message = 'Olá! Gostaria de saber mais sobre os seus serviços.';
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed z-50 px-4 py-2 bottom-4 right-4 md:bottom-10 md:right-6 group">
      <div>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-4 bg-green-500 rounded-full hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg"
        >
          <Phone className="w-8 h-8 text-white fill-white" />
        </Link>
      </div>
    </div>
  );
};

export default Whatsapp;