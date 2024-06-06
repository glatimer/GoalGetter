// Journal component - a form submission (future iteration: that will store in a backend api)
import React from "react";
import { CloseButton } from "react-bootstrap";

export default function JournalForm() {
  let entryText = "";
  return (
    <section className="journal-form">
      <div className="container">
        <div className="col-md-11">
          <div style={{ marginTop: `1em`, marginBottom: `17em` }}>
            <form className="myForm">
              <h1 style={{ textAlign: `center`, paddingTop: `1em` }}>
                New Journal Entry
              </h1>
              <section style={{ padding: `1em` }}>
                <div
                  className="mb-3"
                  style={{ justifySelf: `left`, width: `100%` }}
                >
                  <label
                    htmlFor="date"
                    className="form-label"
                    id="form-label"
                    style={{ fontWeight: `bold`, color: `white` }}
                  >
                    {" "}
                    Today's Date
                    <br />
                    <input
                      type="date"
                      autoComplete="on"
                      className="form-control"
                      id="date"
                    />
                  </label>
                  <br />
                  <label
                    htmlFor="date"
                    className="form-label"
                    id="form-label"
                    style={{ fontWeight: `bold`, color: `white` }}
                  >
                    Miles Logged:
                    <br />
                    <input
                      type="text"
                      autoComplete="on"
                      className="form-control"
                      id="miles"
                    />
                    <br />
                    <div className="form-outline data-mdb-input-init">
                      <textarea
                        name="entry-body"
                        id="entry"
                        cols="30"
                        rows="5"
                        style={{
                          width: `100%`,
                          height: `10em`,
                          borderRadius: `10px`,
                        }}
                      ></textarea>
                    </div>
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
