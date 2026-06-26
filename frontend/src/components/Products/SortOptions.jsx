import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (sortBy) {
      params.set("sortBy", sortBy);
    } else {
      params.delete("sortBy");
    }

    setSearchParams(params);
  };

  return (
    <div className="d-flex justify-content-end mb-3">
      <select
        className="form-select w-auto"
        id="sort"
        value={searchParams.get("sortBy") || ""}
        onChange={handleSortChange}
      >
        <option value="">Sort By: Default</option>
        <option value="priceLowToHigh">Price: Low to High</option>
        <option value="priceHighToLow">Price: High to Low</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
};

export default SortOptions;