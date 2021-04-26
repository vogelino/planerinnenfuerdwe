import Link from "next/link";
import React from "react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className='mx-auto prose-blue prose prose-sm sm:prose lg:prose-lg grid min-h-screen -mt-8 items-center grid-cols-1'>
      <div>
        <h2>
          Die angeforderte Seite existiert nicht.
          <br />
          The requested page does not exist.
        </h2>
        <p>
          <Link href='/'>
            Zurück zum offenen Brief / Back to the open letter
          </Link>
        </p>
      </div>
    </div>
  );
};
