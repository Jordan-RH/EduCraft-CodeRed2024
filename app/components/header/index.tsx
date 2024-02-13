"use client";
import styles from "../../../styles/header.module.css";
import { Person, ChevronDown } from "akar-icons";
import React, { useState } from "react";
import { useThemContext } from "../../theme-provider";

export default function Header({ children }) {
  const theme = useThemContext();

  return (
    <>
      <nav className={styles.header}>
        <div className={styles.page_title}>
          <h1>{theme.title}</h1>
        </div>
        <div className={styles.profile}>
          <Person strokeWidth={2} size={32} />
          <div>
            <h3>John Doe</h3>
            <p>John.doe@gmail.com</p>
          </div>
          <ChevronDown strokeWidth={1} size={25} />
        </div>
      </nav>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { title, setTitle })
      )}
    </>
  );
}
