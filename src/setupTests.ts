import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";
import { cache } from "swr";

jest.mock("react-i18next");

afterEach(() => {
  jest.restoreAllMocks();
  cache.clear();
});
