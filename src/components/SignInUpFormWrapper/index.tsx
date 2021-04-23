import { Submit } from "@components/Button";
import { SmallModal } from "@components/SmallModal";
import { TextLink } from "@components/TextLink";
import Link from "next/link";
import { HTMLProps, FC } from "react";

interface SignInUpFormWrapperPropType extends HTMLProps<HTMLFormElement> {
  type: "in" | "up";
}

interface TextsObjectType {
  title: string;
  switchQuestion: string;
  switchLinkText: string;
  switchLinkRoute: string;
  submitButton: string;
}

const getTextsByType = (type: "in" | "up"): TextsObjectType =>
  type === "in"
    ? {
        title: "Login",
        switchQuestion: "Hast du noch keinen Account?",
        switchLinkText: "Registriere dich",
        switchLinkRoute: "signup",
        submitButton: "Einloggen",
      }
    : {
        title: "Registrierung",
        switchQuestion: "Hast du schon einen Account?",
        switchLinkText: "Logge dich ein",
        switchLinkRoute: "signin",
        submitButton: "Registrieren",
      };

export const SignInUpFormWrapper: FC<SignInUpFormWrapperPropType> = ({
  type,
  children,
  ...formProps
}) => {
  const texts = getTextsByType(type);
  const formId = `sign${type}-form`;

  return (
    <SmallModal
      title={texts.title}
      footerContent={
        <>
          <section className='text-gray-500'>
            {`${texts.switchQuestion} `}
            <Link href={`/${texts.switchLinkRoute}`}>
              <TextLink
                href={`/${texts.switchLinkRoute}`}
                className='inline-block'
              >
                {texts.switchLinkText}
              </TextLink>
            </Link>
          </section>
          <section
            className='flex flex-col'
            style={{ justifyContent: "flex-end" }}
          >
            <Submit variant='primary' form={formId}>
              {texts.submitButton}
            </Submit>
          </section>
        </>
      }
    >
      <form noValidate {...formProps} id={formId}>
        {children}
      </form>
    </SmallModal>
  );
};
