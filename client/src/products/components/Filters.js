import React from "react";
import "./Filters.css";
import Card from "../../shared/components/UIElements/Card";
import { Slider, Autocomplete, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";

const sortDefaultProps = {
  options: [
    { label: "Top rating", value: "-ratingsAverage" },
    { label: "Price: Low to High", value: "listPrice" },
    { label: "Price: High to Low", value: "-listPrice" },
  ],
  getOptionLabel: (option) => option.label,
};

function valuetext(value) {
  return `${value}$`;
}

const Filters = () => {
  const [search, setSearch] = useSearchParams();
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [sortBy, setSortBy] = React.useState(null);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleApply = () => {
    search.delete("page");
    search.set("listPrice[gte]", priceRange[0]);
    search.set("listPrice[lte]", priceRange[1]);
    if (sortBy) search.set("sort", sortBy.value);
    setSearch(search, {
      replace: true,
    });
  };

  const handleClear = () => {
    search.delete("listPrice[gte]");
    search.delete("listPrice[lte]");
    search.delete("sort");
    setSearch(search, {
      replace: true,
    });
    setPriceRange([0, 1000]);
    setSortBy(null);
  };

  return (
    <div className="products-filter" data-testid="filter-id">
      <span style={{ display: "none" }}>{search.toString()}</span>
      <header className="filter-header">Filters</header>
      <div className="filter-box">
        <div className="filter-item">
          <label htmlFor="sort">Sort by</label>
          <Autocomplete
            label="Sort by"
            {...sortDefaultProps}
            onChange={(event, newValue) => {
              setSortBy(newValue);
            }}
            id="sort"
            clearOnEscape
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                data-testid="autocomplete-input"
              />
            )}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="price">Price range</label>
          <span className="price-range-dollars">
            {priceRange[0]}$-{priceRange[1]}$
          </span>
          <Slider
            id="price"
            getAriaLabel={() => "price-range"}
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            valueLabelFormat={valuetext}
            max={1000}
          />
        </div>

        <div className="filter-actions">
          <Button className="btn btn-discard" onClick={handleClear}>
            Clear
          </Button>
          <Button className="btn btn-apply" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
