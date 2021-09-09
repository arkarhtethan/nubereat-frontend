import React from "react";
import { waitFor, render } from "../../test-utils";
import PageNotFound from "../404";

describe("<PageNotFound/>", () => {
  it("renders OK", async () => {
    render(<PageNotFound />);
    await waitFor(() => {
      expect(document.title).toBe("Page Not Found | Nuber Eats");
    });
  });
});
