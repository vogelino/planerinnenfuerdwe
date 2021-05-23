import { TextLink } from "@components/TextLink";
import Link from "next/link";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

export const Footer: FC = () => {
  const { t } = useTranslation("footer");
  return (
    <footer className='mt-40 opacity-75 pt-8 border-t border-gray-150 mx-auto prose-blue prose prose-sm sm:prose lg:prose-lg text-sm'>
      <ReactMarkdown>{t("contentMD")}</ReactMarkdown>
      <Link href='/privacy'>
        <TextLink href='/privacy'>{t("privacyLinkText")}</TextLink>
      </Link>
      <br />
      <Link href='/imprint'>
        <TextLink href='/imprint'>{t("imprintLinkText")}</TextLink>
      </Link>
    </footer>
  );
};
