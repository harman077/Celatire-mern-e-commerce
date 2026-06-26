import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    minPrice: 0,
    maxPrice: 100,
  });

  const categories = ["Top Wear", "Bottom Wear"];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });
  }, [searchParams]);

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    if (newFilters.category) {
      params.set("category", newFilters.category);
    }

    if (newFilters.gender) {
      params.set("gender", newFilters.gender);
    }

    if (newFilters.minPrice !== undefined) {
      params.set("minPrice", newFilters.minPrice);
    }

    if (newFilters.maxPrice !== undefined) {
      params.set("maxPrice", newFilters.maxPrice);
    }

    setSearchParams(params);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    const newFilters = {
      ...filters,
      [name]: value,
    };

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handlePriceChange = (e) => {
    const newMaxPrice = Number(e.target.value);

    const newFilters = {
      ...filters,
      minPrice: 0,
      maxPrice: newMaxPrice,
    };

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      category: "",
      gender: "",
      minPrice: 0,
      maxPrice: 100,
    };

    setFilters(resetFilters);
    setSearchParams({});
  };

  return (
    <div className="p-4 border rounded bg-white shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-bold">Filters</h5>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Category</label>
        {categories.map((category) => (
          <div className="form-check" key={category}>
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              id={`category-${category}`}
            />
            <label
              className="form-check-label"
              htmlFor={`category-${category}`}
            >
              {category}
            </label>
          </div>
        ))}
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Gender</label>
        {genders.map((gender) => (
          <div className="form-check" key={gender}>
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handleFilterChange}
              id={`gender-${gender}`}
            />
            <label
              className="form-check-label"
              htmlFor={`gender-${gender}`}
            >
              {gender}
            </label>
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Price Range</label>
        <input
          type="range"
          min={0}
          max={100}
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="form-range"
        />
        <div className="d-flex justify-content-between small text-muted">
          <span>$0</span>
          <span>${filters.maxPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;