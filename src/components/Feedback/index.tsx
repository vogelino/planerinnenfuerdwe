import { FC } from "react";

type FeedbackType = "error" | "success" | "info";

interface FeedbackPropType {
  type?: FeedbackType;
}

const getFeedbackStylesByType = (type: FeedbackType): string =>
  [
    "px-4 py-3 border rounded mb-4",
    type === "error" && "border-red-500 text-red-500",
    type === "success" && "border-green-500 text-green-500",
    type === "info" && "border-grey-500 text-grey-500",
  ]
    .filter(Boolean)
    .join(" ");

export const Feedback: FC<FeedbackPropType> = ({ children, type = "info" }) => (
  <div className={getFeedbackStylesByType(type)}>{children}</div>
);
