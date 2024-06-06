// Journal component - a form submission (future iteration: that will store in a backend api)
import React from "react";
import { CloseButton } from "react-bootstrap";

export default function JournalForm() {
  let stringMonth = "";
  // Get the date for the Form
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // Month Conversion
  if (month === 1) {
    stringMonth = "January";
  } else if (month === 2) {
    stringMonth = "February";
  } else if (month === 3) {
    stringMonth = "March";
  } else if (month === 4) {
    stringMonth = "April";
  } else if (month === 5) {
    stringMonth = "May";
  } else if (month === 6) {
    stringMonth = "June";
  } else if (month === 7) {
    stringMonth = "July";
  } else if (month === 8) {
    stringMonth = "August";
  } else if (month === 9) {
    stringMonth = "September";
  } else if (month === 10) {
    stringMonth = "October";
  } else if (month === 11) {
    stringMonth = "November";
  } else if (month === 12) {
    stringMonth = "December";
  } else {
    stringMonth = "undefined";
  }

  let currentDate = `${stringMonth} ${day}, ${year}`;
  // Get mile tracker data

  // Get body Form text
  let entryText = "";
  return (
    <section className="journal-form">
      <div className="container">
        <div className="col-md-11">
          <div style={{ marginTop: `1em`, marginBottom: `17em` }}>
            <form
              className="myForm"
              style={{ backgroundColor: `white`, borderRadius: `2px` }}
            >
              <h1 style={{ textAlign: `center`, paddingTop: `1em` }}>
                Journal Entry
              </h1>
              <section style={{ padding: `1em` }}>
                <div
                  className="mb-3"
                  style={{ justifySelf: `left`, width: `100%` }}
                >
                  <label
                    htmlFor="date"
                    className="form-label"
                    style={{ fontWeight: `bold` }}
                  >
                    {" "}
                    Today's Date
                    <br />
                    <input
                      placeholder={currentDate}
                      type="text"
                      autoComplete="on"
                      className="form-control"
                      name="date"
                    />
                  </label>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>

      {/* <p style={{ color: `white` }}> Today's Date: {currentDate}</p> */}
    </section>
  );
}

/* Academic References
 * get current date = https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/
 */
