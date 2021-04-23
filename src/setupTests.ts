import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";
import { cache } from "swr";

afterEach(() => {
  jest.restoreAllMocks();
  cache.clear();
});
