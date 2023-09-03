import { screen, within } from "@testing-library/react";
import Pagination from "../Pagination";
import { renderWithRouter } from "../../../util/test";

describe("Pagination Component", () => {
  test("renders PAGES container and check links", () => {
    renderWithRouter(
      <Pagination
        totalPages={2}
        totalResults={6}
        page={1}
        next={{ page: 2, limit: 3 }}
      />
    );

    const selectElement = screen.getByTestId("pagination-id");
    const linkElements = within(selectElement).getAllByRole("link");
    expect(linkElements).not.toHaveLength(0);
  });
});

//  totalPages: 2,
//   totalResults: 6,
//   page: 1,
//   next: { page: 2, limit: 3 },
