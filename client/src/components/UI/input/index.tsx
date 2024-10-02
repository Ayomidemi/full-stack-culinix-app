/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

import styles from "./styles.module.scss";

interface InputProps {
  label?: string;
  defaultValue?: string;
  helperText?: string;
  type?: string;
  onChange: (val: any) => void;
  name?: string;
  trim?: boolean;
  maxLength?: number;
  styles?: React.CSSProperties;
  required?: boolean;
  size?: string;
  preffix?: string;
  error?: boolean;
  placeholder?: string;
  disabled?: boolean;
  active?: boolean;
  id?: string;
  placeInputRef?: React.RefObject<HTMLInputElement>;
  textArea?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  defaultValue,
  helperText,
  type,
  onChange,
  name,
  trim,
  maxLength,
  styles: customStyles,
  required,
  preffix,
  error,
  placeholder,
  disabled,
  active,
  id,
  placeInputRef,
  textArea = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | any>(null);
  const inputWrapRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const isActive = (inputValue && inputValue?.length > 0) || isOpen || active;

  const handleClose = () => {
    setIsOpen(false);
    setInputValue(null);
    onChange({ value: "", name: name || "" });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (trim) {
      value = value?.replace(/[^a-zA-Z0-9]/g, "");
    }

    if (name === "firstName" || name === "lastName") {
      value = value.replace(/[^a-zA-Z\s-]/g, "");
    }

    setInputValue(value);
    onChange({ value, name: name || "" });
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;

    if (trim) {
      value = value?.replace(/[^a-zA-Z0-9]/g, "");
    }

    if (name === "firstName" || name === "lastName") {
      value = value.replace(/[^a-zA-Z\s-]/g, "");
    }

    setInputValue(value);
    onChange({ value, name: name || "" });
  };

  const handlePaste = (e: {
    clipboardData: { getData: (arg0: string) => any };
    preventDefault: () => void;
  }) => {
    const pastedText = e.clipboardData.getData("text");

    if (pastedText) {
      setInputValue(pastedText);
      onChange({ value: pastedText, name });
    }

    e.preventDefault();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (disabled) return;
      if (
        inputWrapRef.current &&
        !inputWrapRef.current.contains(event.target as Node) &&
        inputRef.current?.value?.length === 0
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [disabled]);

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
      setIsOpen(true);
    } else {
      setInputValue(null);
    }
  }, [defaultValue]);

  return (
    <>
      <div
        ref={inputWrapRef}
        className={`${styles.input_wrap} ${error && styles.error} `}
        onClick={() => setIsOpen(true)}
      >
        <p
          className={`${styles.label} ${isOpen && styles.active} ${
            isActive && styles.active
          } `}
          style={{ color: "#000" }}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
          {required && (
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
          )}
        </p>
        {type === "password" && (
          <button
            type="button"
            className={styles.cancel}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <FaEyeSlash size={20} color="453A50" />
            ) : (
              <FaEye size={20} color="453A50" />
            )}
          </button>
        )}
        {!disabled &&
          type !== "password" &&
          inputValue &&
          inputValue?.length > 0 && (
            <button
              type="button"
              className={styles.cancel}
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              <MdOutlineCancel size={20} color="453A50" />
            </button>
          )}
        {textArea ? (
          <textarea
            onChange={handleTextAreaChange}
            ref={(el) => {
              inputRef.current = el;
              if (placeInputRef) {
                (placeInputRef as any).current = el;
              }
            }}
            value={inputValue || ""}
            maxLength={maxLength}
            className={styles.input}
            placeholder={placeholder}
            id={id}
            disabled={disabled}
            rows={6}
            style={{ height: "100%", paddingTop: "20px" }}
            onPaste={handlePaste}
          />
        ) : (
          <input
            type={showPassword ? "text" : type}
            onChange={handleInputChange}
            ref={(el) => {
              inputRef.current = el;
              if (placeInputRef) {
                (placeInputRef as any).current = el;
              }
            }}
            value={inputValue || ""}
            maxLength={maxLength}
            style={customStyles}
            className={styles.input}
            placeholder={placeholder}
            id={id}
            disabled={disabled}
            onPaste={handlePaste}
          />
        )}
        {preffix && isOpen && <span className={styles.preffix}>{preffix}</span>}
        {preffix && !isOpen && isActive && (
          <span className={styles.preffix}>{preffix}</span>
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
            textAlign: "left",
          }}
        >
          {helperText}
        </p>
      )}
    </>
  );
};

export default Input;
