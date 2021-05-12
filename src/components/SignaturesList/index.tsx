import { FC } from "react";
import { useTranslation } from "react-i18next";
import { SignatoryType } from "src/types/supabase";

interface SignaturesListPropType {
  signatories: SignatoryType[];
  isLoading: boolean;
}

export const SignaturesList: FC<SignaturesListPropType> = ({
  signatories,
  isLoading,
}) => {
  const { t } = useTranslation("common");
  return (
    <>
      <h2 className='pt-16 mb-4 font-bold text-2xl md:text-3xl'>
        {t("signatoriesHeadline")}
      </h2>
      {isLoading && t("loadingText")}
      {!isLoading && (
        <div className='mt-2'>
          <ul>
            {signatories.map(
              ({ userId, firstName, lastName, organisation }) => (
                <li key={userId} className='text-lg'>
                  <span className='mr-3'>{`${firstName} ${lastName}`}</span>
                  {organisation && (
                    <small className='text-gray-400 inline-block'>
                      {`( ${organisation} )`}
                    </small>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </>
  );
};
