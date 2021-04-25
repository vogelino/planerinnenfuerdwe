import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { TextLink } from "@components/TextLink";

export const LanguageSwitch: FC = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  return (
    <Link href={router.asPath} locale={router.locale === "en" ? "de" : "en"}>
      <TextLink href={router.asPath}>{t("otherLocale")}</TextLink>
    </Link>
  );
};
