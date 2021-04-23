import Link from "next/link";
import React from "react";

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <h1>Die angeforderte Seite existiert nicht.</h1>
      <span>
        Zurück zur&nbsp;
        <Link href='/'>Startseite</Link>
      </span>
    </>
  );
};
