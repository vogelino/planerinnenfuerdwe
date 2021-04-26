import { Button } from "@components/Button";
import { TextLink } from "@components/TextLink";
import Link from "next/link";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

interface CookieBannerPropType {
  ignoreCookie?: true;
}

export const CookieBanner: FC<CookieBannerPropType> = ({ ignoreCookie }) => {
  const { t } = useTranslation("cookieBanner");
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

  return cookieStatus === false ? (
    <div className='fixed left-0 p-6 bottom-0 w-full flex justify-center bg-white shadow-2xl border-t border-gray-200'>
      <div className='mx-auto prose-blue prose prose-sm sm:prose lg:prose-lg'>
        <div className='mb-2'>{t("message")}</div>
        <div className='flex gap-6 items-center justify-between'>
          <Link href='/privacy'>
            <TextLink href='/privacy'>{t("moreInfoLinkText")}</TextLink>
          </Link>
          <Button variant='primary' onClick={acceptCookies}>
            {t("acceptButtonText")}
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};
