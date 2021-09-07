import { render, waitFor } from "@testing-library/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import PageNotFound from "../404";

describe("<PageNotFound/>", () => {
  it("renders OK", async () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <PageNotFound />
        </BrowserRouter>
      </HelmetProvider>
    );
    await waitFor(() => {
      expect(document.title).toBe("Page Not Found | Nuber Eats");
    });
  });
});
