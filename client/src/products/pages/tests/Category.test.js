import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Category from "../Category";
import { Route, Routes } from "react-router-dom";
import StoreProducts from "../StoreProducts";
import { renderWithRouter } from "../../../shared/util/test";

describe("Category Component", () => {
  test("renders 'Electronic Store'", () => {
    //Arrange
    // render(
    //   <MemoryRouter>
    //     <Routes>
    //       <Route path="/" element={<Category />} />
    //     </Routes>
    //   </MemoryRouter>
    // );
    renderWithRouter(<Category />);

    //Assert
    const outputElement = screen.getByText("Electronic Store");
    expect(outputElement).toBeInTheDocument();
  });

  test("should navigate to Code Repo when the 'Source Code' link is clicked", () => {
    renderWithRouter(<Category />);

    const outputElement = screen.getByRole("link", { name: "Source Code" });
    expect(outputElement).toHaveAttribute(
      "href",
      "https://github.com/morelir/Electronic-Store"
    );
  });

  test("should navigate to Github Projects when the 'More Projects' link is clicked", () => {
    renderWithRouter(<Category />);

    const outputElement = screen.getByRole("link", { name: "More Projects" });
    expect(outputElement).toHaveAttribute("href", "https://github.com/morelir");
  });

  const categories = [
    "Laptops",
    "Headsets",
    "Mouses",
    "Playstation",
    "Controllers",
    "Nintendo",
  ];

  test.each(categories)("match link href to %s Category", (category) => {
    renderWithRouter(<Category />);

    expect(
      screen.getByTestId(new RegExp(`^${category}$`, "i"))
    ).toHaveAttribute("href", `/products?category=${category.toLowerCase()}`);
  });

  test.each(categories)(
    "should navigate to %s Category when its link is clicked",
    async (category) => {
      window.scrollTo = jest.fn();

      renderWithRouter(
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/products" element={<StoreProducts />} />
        </Routes>
      );

      await userEvent.click(
        screen.getByTestId(new RegExp(`^${category}$`, "i"))
      ); // /^hello world$/i - full string match, ignore case

      const sectionElement = screen.getByTestId("products-store");
      expect(sectionElement).toBeInTheDocument();

      const listElement = await screen.findByTestId("products-list");
      const listItemElements = within(listElement).getAllByRole("listitem"); //findAllByRole return a promise
      expect(listItemElements).not.toHaveLength(0);
    }
  );
});
