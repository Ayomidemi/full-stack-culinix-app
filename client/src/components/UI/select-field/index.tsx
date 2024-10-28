/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { FaChevronDown } from "react-icons/fa";

import Input from "../input";

type Props = {
  options?: never[] | any;
  onSelect?: any | unknown;
  label?: string;
  defaultValue?: never[] | any;
  name?: string;
  haveCheckbox?: boolean;
  loading?: boolean;
  size?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  hideSearch?: boolean;
};

const Select = ({
  options,
  onSelect,
  label,
  defaultValue,
  name,
  haveCheckbox,
  loading,
  size = "lg",
  error,
  helperText,
  required,
  hideSearch,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<React.MutableRefObject<null> | any>(null);
  const [selected, setSelected] = useState<unknown | any>(null);
  const [checked, setChecked] = useState<unknown | any>([]);
  const [filterableOption, setFilterableOption] = useState(options);

  useEffect(() => {
    setFilterableOption(options);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        // setFilterableOption(filterableOption);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleOptionClick = (option: React.SetStateAction<null>) => {
    setSelected(option);
    if (name) {
      onSelect(option, name);
    } else {
      onSelect(option);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (!haveCheckbox) {
      setSelected(defaultValue || null);
    }
    if (haveCheckbox) {
      setChecked(defaultValue || []);
    }
  }, [defaultValue, haveCheckbox]);

  const handleSearch = async (val: string) => {
    const filteredOptions = options.filter((option: string) =>
      option.toLowerCase().includes(val.toLowerCase())
    );
    setFilterableOption(filteredOptions);
  };

  const handleSelect = (option: unknown | any) => {
    if (haveCheckbox) {
      if (checked.includes(option)) {
        setChecked(checked.filter((c: string) => c !== option));
        onSelect(checked.filter((c: string) => c !== option));
      } else {
        setChecked([...checked, option]);
        onSelect([...checked, option]);
      }
      setFilterableOption(options);
      return;
    }
    handleOptionClick(option);
  };

  return (
    <>
      <div ref={dropdownRef} className={`${styles.input_wrap}`}>
        <button
          type="button"
          onClick={() => (checked?.length > 3 ? {} : setIsOpen(!isOpen))}
          className={`${styles.button_wrap} ${error && styles.error}`}
        >
          <p
            className={`${styles.label} ${
              (isOpen || selected || (haveCheckbox && checked?.length > 0)) &&
              styles.active
            } `}
            style={{ color: "#000" }}
          >
            {label}
            {required && (
              <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            )}
          </p>
          {selected && (
            <p
              className={styles.label}
              style={{
                color: "#000",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <span>{selected}</span>
            </p>
          )}
          {haveCheckbox && checked?.length > 0 && (
            <div className={styles.selected_group}>
              {checked?.map((c: string, i: number) => (
                <h6 className={styles.selected_label} key={i}>
                  {c}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(c);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                    >
                      <path
                        d="M6.70399 6.50009L9.85399 3.35509C9.94814 3.26094 10.001 3.13324 10.001 3.00009C10.001 2.86694 9.94814 2.73924 9.85399 2.64509C9.75984 2.55094 9.63214 2.49805 9.49899 2.49805C9.36584 2.49805 9.23815 2.55094 9.14399 2.64509L5.99899 5.79509L2.85399 2.64509C2.75984 2.55094 2.63214 2.49805 2.49899 2.49805C2.36584 2.49805 2.23814 2.55094 2.14399 2.64509C2.04984 2.73924 1.99695 2.86694 1.99695 3.00009C1.99695 3.13324 2.04984 3.26094 2.14399 3.35509L5.29399 6.50009L2.14399 9.64509C2.09713 9.69157 2.05993 9.74687 2.03455 9.8078C2.00916 9.86873 1.99609 9.93409 1.99609 10.0001C1.99609 10.0661 2.00916 10.1315 2.03455 10.1924C2.05993 10.2533 2.09713 10.3086 2.14399 10.3551C2.19047 10.402 2.24577 10.4392 2.3067 10.4645C2.36763 10.4899 2.43299 10.503 2.49899 10.503C2.565 10.503 2.63035 10.4899 2.69128 10.4645C2.75221 10.4392 2.80751 10.402 2.85399 10.3551L5.99899 7.20509L9.14399 10.3551C9.19047 10.402 9.24577 10.4392 9.3067 10.4645C9.36763 10.4899 9.43299 10.503 9.49899 10.503C9.565 10.503 9.63035 10.4899 9.69128 10.4645C9.75221 10.4392 9.80751 10.402 9.85399 10.3551C9.90086 10.3086 9.93805 10.2533 9.96344 10.1924C9.98882 10.1315 10.0019 10.0661 10.0019 10.0001C10.0019 9.93409 9.98882 9.86873 9.96344 9.8078C9.93805 9.74687 9.90086 9.69157 9.85399 9.64509L6.70399 6.50009Z"
                        fill="#7946aa"
                      />
                    </svg>
                  </span>
                </h6>
              ))}
            </div>
          )}
          <p className={styles.caret} onClick={() => setIsOpen(!isOpen)}>
            <FaChevronDown color="#000000" />
          </p>
        </button>

        {isOpen && (
          <div
            style={{ width: "100%", background: "#FFFFFF", zIndex: "100" }}
            className={styles.drpdwn_wrap}
          >
            <div className={styles.sticky}>
              {haveCheckbox && (
                <div className={styles.selectAllWrap}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setChecked(options);
                      onSelect(options);
                    }}
                  >
                    Select all
                  </button>
                  <button
                    onClick={() => {
                      setChecked([]);
                      onSelect([]);
                    }}
                  >
                    Clear
                  </button>
                </div>
              )}
              {!hideSearch && (
                <Input
                  name="name"
                  placeholder="Search"
                  onChange={(val) => handleSearch(val.value)}
                  size={size}
                />
              )}
            </div>
            <div
              className={styles.optionsWrap}
              style={{ opacity: loading ? "0.3" : "1" }}
            >
              {filterableOption &&
                filterableOption.map(
                  (option: string, index: React.Key | null | undefined) => (
                    <button
                      key={index}
                      className={styles.btn}
                      onClick={() => handleSelect(option)}
                    >
                      {haveCheckbox && (
                        <input
                          className={styles.checkbox}
                          type="checkbox"
                          name=""
                          id=""
                          checked={checked.includes(option)}
                        />
                      )}
                      <span>{option}</span>
                    </button>
                  )
                )}
              {filterableOption && filterableOption?.length < 1 && (
                <span style={{ textAlign: "center", fontSize: "14px" }}>
                  No data
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {helperText && (
        <p
          style={{
            paddingLeft: "17px",
            marginTop: "5px",
            fontSize: "12px",
            color: "#d32f2f",
            marginBottom: "0px",
          }}
        >
          {helperText}
        </p>
      )}
    </>
  );
};

export default Select;
