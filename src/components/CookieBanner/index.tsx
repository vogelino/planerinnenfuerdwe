import { Button } from "@components/Button";
import { TextLink } from "@components/TextLink";
import Link from "next/link";
import React, { useState } from "react";

export const CookieBanner: React.FC<{
  ignoreCookie?: true;
}> = ({ ignoreCookie }) => {
  const cookie = typeof window !== "undefined" && window.document.cookie;
  const cookieIsAccepted = cookie
    ? Boolean(
        cookie?.split("; ")?.find(row => row.startsWith("disclaimerAccepted"))
      )
    : false;
  const [cookieStatus, setCookieStatus] = useState<boolean>(
    ignoreCookie === undefined ? cookieIsAccepted : false
  );

  const acceptCookies: () => void = () => {
    document.cookie = "disclaimerAccepted=true;path=/;max-age=31536000;";
    setCookieStatus(true);
  };

  return (
    <React.Fragment>
      {cookieStatus === false && (
        <div className='fixed left-0 py-6 bottom-0 w-full flex justify-center bg-white shadow-2xl border-t border-gray-200'>
          <div className='mx-auto prose-blue prose prose-sm sm:prose lg:prose-lg px-6'>
            <div className='mb-2'>
              Diese Webseite verwendet Cookies, um bestimmte Funktionen zu
              ermöglichen und das Angebot zu verbessern. Indem Sie hier
              fortfahren, stimmen Sie der Nutzung von Cookies zu.
            </div>
            <div className='flex gap-6 items-center justify-between'>
              <Link href='/privacy'>
                <TextLink href='/privacy'>Weitere Informationen</TextLink>
              </Link>
              <Button variant='primary' onClick={acceptCookies}>
                Akzeptieren
              </Button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
