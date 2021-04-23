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
        <div>
          <div>
            <p>
              Diese Webseite verwendet Cookies, um bestimmte Funktionen zu
              ermöglichen und das Angebot zu verbessern. Indem Sie hier
              fortfahren, stimmen Sie der Nutzung von Cookies zu.
            </p>
            &nbsp;
            <Link href='/privacy'>Weitere Informationen</Link>
          </div>
          <button onClick={acceptCookies}>Akzeptieren</button>
        </div>
      )}
    </React.Fragment>
  );
};
