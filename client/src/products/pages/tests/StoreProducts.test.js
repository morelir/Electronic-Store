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

// {
//   totalPages: 2,
//   totalResults: 6,
//   page: 1,
//   next: { page: 2, limit: 3 },
//   products: [
//     {
//       id: "p1",
//       title: "p1",
//       image:
//         "uploads/category/controllers/dcd5f56c-7a02-43ab-ab07-eaf922709346.webp",
//       ratingsAverage: 4,
//       ratingsQuantity: 0,
//       listPrice: 700,
//       discount: 0,
//     },
//   ],
// },
