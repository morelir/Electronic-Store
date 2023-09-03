import React, { useState } from "react";
import { renderWithRouter } from "../../../shared/util/test";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filters from "../Filters";

// let mockSearchParam = "";
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useSearchParams: () => {
//     const [params, setParams] = useState(new URLSearchParams(mockSearchParam));
//     return [
//       params,
//       (newParams) => {
//         mockSearchParam = newParams;
//         setParams(new URLSearchParams(newParams));
//       },
//     ];
//   },
// }));

describe("Filter Component", () => {
  test("renders Filter Container", () => {
    renderWithRouter(<Filters />);
    const selectElement = screen.getByTestId("filter-id");
    expect(selectElement).toBeInTheDocument();
  });

  test("sort by SELECT should allow to change selected option", () => {
    const setStateMock = jest.fn();
    const useStateMock = (useState) => [useState, setStateMock];
    const spy = jest.spyOn(React, "useState").mockImplementation(useStateMock);
    renderWithRouter(<Filters />);

    const options = [
      { label: "Top rating", value: "-ratingsAverage" },
      { label: "Price: Low to High", value: "listPrice" },
      { label: "Price: High to Low", value: "-listPrice" },
    ];

    const input = screen.getByLabelText("Sort by");
    for (let i = 0; i < options.length; i++) {
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: "ArrowDown" });
      // Select an option
      fireEvent.click(screen.getByText(options[i].label));

      // Ensure that the value has changed and is displayed correctly
      expect(setStateMock).toHaveBeenCalledWith(options[i]);
      expect(input.value).toBe(options[i].label);
    }

    spy.mockRestore();
  });

  test("price range SLIDER should allow to change numbers range between 0-1000", () => {
    renderWithRouter(<Filters />);
    const inputElements = screen.getAllByLabelText("price-range");
    expect(inputElements[0]).toBeInTheDocument();
    expect(inputElements[1]).toBeInTheDocument();
    fireEvent.change(inputElements[0], { target: { value: "25" } });
    fireEvent.change(inputElements[1], { target: { value: "800" } });
    expect(inputElements[0].value).toBe("25");
    expect(inputElements[1].value).toBe("800");
  });

  test("clicking APPLY button after changing SELECT input and SLIDER range should set correct query params", async () => {
    renderWithRouter(<Filters />);

    const selectedOption = { label: "Top rating", value: "-ratingsAverage" };
    const input = screen.getByLabelText("Sort by");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.click(screen.getByText(selectedOption.label));
    expect(input.value).toBe(selectedOption.label);

    const inputElements = screen.getAllByLabelText("price-range");
    const range = ["50", "500"];
    fireEvent.change(inputElements[0], { target: { value: range[0] } });
    fireEvent.change(inputElements[1], { target: { value: range[1] } });
    expect(inputElements[0].value).toBe(range[0]);
    expect(inputElements[1].value).toBe(range[1]);

    const applyButton = screen.getByText("Apply");
    await userEvent.click(applyButton);

    // Assert that the component displays the query parameter value
    expect(
      screen.getByText("sort=-ratingsAverage", { exact: false })
    ).toBeInTheDocument();
  });
});
