import { FC } from "react";
import { useTranslation } from "next-i18next";
import ReactMarkdown from "react-markdown";

export const OpenLetterText: FC = () => {
  const { t } = useTranslation("content");
  return (
    <div className='my-8'>
      <h1 className='text-4xl mb-6'>{t("title")}</h1>
      <ReactMarkdown>{t("introductionMD")}</ReactMarkdown>
      <br />
      <ReactMarkdown>{t("block1IntroMD")}</ReactMarkdown>
      <ReactMarkdown>{t("block2IntroMD")}</ReactMarkdown>
      <ReactMarkdown>{t("block3IntroMD")}</ReactMarkdown>
      <ReactMarkdown>{t("block4IntroMD")}</ReactMarkdown>
    </div>
  );
};
