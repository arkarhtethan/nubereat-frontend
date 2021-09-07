import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Restaurant from "../restaurant";

describe("<Restaurant/>", () => {
  it("should render with Props", () => {
    const { getByText, container } = render(
      <BrowserRouter>
        <Restaurant id={1} coverImage="x" name="test" categoryName="catTest" />
      </BrowserRouter>
    );
    getByText("test");
    getByText("catTest");
    expect(container.firstChild).toHaveAttribute("href", "/restaurant/1");
  });
});
