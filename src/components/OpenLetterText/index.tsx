import { FC } from "react";
import { useTranslation } from "next-i18next";
import ReactMarkdown from "react-markdown";
import { ExpandableParagraph } from "@components/ExpandableParagraph";

export const OpenLetterText: FC = () => {
  const { t } = useTranslation("content");
  return (
    <div className='my-8'>
      <div className='mx-auto prose-blue content prose prose-sm sm:prose lg:prose-lg'>
        <h1 className='text-4xl mb-6'>{t("title")}</h1>
        <ReactMarkdown>{t("introductionMD")}</ReactMarkdown>
      </div>
      <br />
      <ExpandableParagraph
        introduction={t("block1IntroMD")}
        content={t("block1ContentMD")}
      />
      <ExpandableParagraph
        introduction={t("block2IntroMD")}
        content={t("block2ContentMD")}
      />
      <ExpandableParagraph
        introduction={t("block3IntroMD")}
        content={t("block3ContentMD")}
      />
      <ExpandableParagraph
        introduction={t("block4IntroMD")}
        content={t("block4ContentMD")}
      />
    </div>
  );
};
