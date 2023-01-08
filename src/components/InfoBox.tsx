import { useStore } from "../store";
import { FaSpinner } from "react-icons/fa";
import React from "react";
export const InfoBox = () => {
  const store = useStore((state) => state);
  return (
    <div className="infoBox">
      <h2>Another Components</h2>
      <div className="row">
        <label>Message:</label>
        <span className="theValue"> {store.message}</span>
      </div>
      <div className="row">
        <label>Colors:</label>
        <span className="theValue">
          {" "}
          {store.colors.map((m) => m).join(",")}
        </span>
      </div>
      <div className="row">
        <label>User is online:</label>{" "}
        <span className="theValue">
          {store.currentUserStatus.isOnline ? "yes" : "no"}
        </span>
      </div>
      <div className="row">
        <label>User's email is valid:</label>{" "}
        <span className="theValue">
          {store.currentUserStatus.emailIsConfirmed ? "yes" : "no"}
        </span>
      </div>

      <div className="row">
        <label>TechBooks:</label>
        {store.techBooksAreLoading && (
          <p>
            <FaSpinner className="spinner" />
          </p>
        )}
        <ul>
          {store.techBooks.map((techBook, i) => {
            return (
              <React.Fragment key={i}>
                {techBook.title
                  .toLowerCase()
                  .includes(store.techBookSearch.toLowerCase()) && (
                  <li key={i}>{techBook.title}</li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
