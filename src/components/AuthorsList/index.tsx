import { FC } from "react";
import { useTranslation } from "react-i18next";
import authors from "../../authors";

export const AuthorsList: FC = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <h2 className='pt-16 mb-4 font-bold text-2xl md:text-3xl'>
        {t("authorsHeadline")}
      </h2>
      <div className='mt-2'>
        <ul>
          {authors.map(({ id, name, organisation }) => (
            <li key={id} className='text-lg'>
              <span className='mr-3'>{name}</span>
              {organisation && (
                <small className='text-gray-400 inline-block'>
                  {`( ${organisation} )`}
                </small>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
