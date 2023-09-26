import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StoreProducts from "../StoreProducts";
import { renderWithRouter } from "../../../shared/util/test";

describe("StoreProducts Component", () => {
  test("renders Products Store container", async () => {
    window.scrollTo = jest.fn();
    renderWithRouter(<StoreProducts />);

    const selectElement = screen.getByTestId("products-store");
    expect(selectElement).toBeInTheDocument();
  });

  test("renders Products List", async () => {
    window.scrollTo = jest.fn();
    renderWithRouter(<StoreProducts />);


    const listElement = await screen.findByTestId("products-list");
    const listItemElements = within(listElement).getAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });

  

});
