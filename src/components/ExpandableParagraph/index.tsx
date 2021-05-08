import { TextLink } from "@components/TextLink";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

interface ExpandableParagraphPropType {
  introduction: string;
  content: string;
}

export const ExpandableParagraph: FC<ExpandableParagraphPropType> = ({
  introduction,
  content,
}) => {
  const { t } = useTranslation("content");
  const [isExpanded, setIsExpanded] = useState(false);

  if (introduction === "" && content === "") return null;
  return (
    <div className='my-4 sm:my-6 lg:my-8'>
      <div className='text-left block mx-auto prose-blue prose prose-sm sm:prose lg:prose-lg'>
        <ReactMarkdown>{introduction}</ReactMarkdown>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='focus-offset focus:ring-blue-500 -mt-4 block'
        >
          <TextLink className='block'>
            {isExpanded ? t("readLessLinkText") : t("readMoreLinkText")}
          </TextLink>
        </button>
      </div>
      {isExpanded && (
        <div className='text-left block focus-offset focus:ring-blue-500 mx-auto prose-blue prose prose-sm sm:prose lg:prose-lg pt-4 sm:pt-6 lg:pt-8'>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
