"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { MdOutlineCancel, MdSearch } from "react-icons/md";

import styles from "./index.module.scss";

interface SearchInputProps {
  name: string;
  placeholder?: string;
  handleChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  name,
  placeholder,
  handleChange,
}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        /* empty */
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    handleChange(e.target.value);
  };

  const clearSearchValue = () => {
    setSearchValue("");
    handleChange("");
  };

  return (
    <div className={styles.search} ref={searchRef}>
      <span className={styles.icon_search}>
        <MdSearch size={20} color="453A50" />
      </span>
      {searchValue.length > 0 && (
        <button className={styles.icon_cancel} onClick={clearSearchValue}>
          <MdOutlineCancel size={20} color="453A50" />
        </button>
      )}
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        className={styles.input}
      />
    </div>
  );
};

export default SearchInput;
