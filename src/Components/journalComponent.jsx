// Journal component - a form submission (future iteration: that will store in a backend api)
import React from "react";

export default function JournalForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Form reset!");
  };
  return (
    <section className="journal-form">
      <div className="container">
        <div className="col-md-11">
          <div style={{ marginTop: `1em`, marginBottom: `17em` }}>
            <form
              className="myForm"
              onSubmit={handleSubmit}
              onReset={handleReset}
            >
              <h1 style={{ textAlign: `center`, paddingTop: `1em` }}>
                New Journal Entry
              </h1>
              <section style={{ padding: `1em` }}>
                <div style={{ justifyContent: `center`, alignItems: `center` }}>
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
                      required="on"
                    />
                  </label>
                  <br />
                  <label
                    htmlFor="miles"
                    className="form-label"
                    id="form-label"
                    style={{ fontWeight: `bold`, color: `white` }}
                  >
                    Miles Logged:
                    <br />
                    <input
                      type="number"
                      step="any"
                      autoComplete="on"
                      className="form-control"
                      id="miles"
                    />
                  </label>
                  <br />
                  <label
                    htmlFor="start-time"
                    className="form-label"
                    id="form-label"
                    style={{ fontWeight: `bold`, color: `white` }}
                  >
                    Start:
                    <br />
                    <input
                      type="time"
                      className="form-control"
                      id="start-time"
                    />
                  </label>
                  <br />
                  <label
                    htmlFor="finish-time"
                    className="form-label"
                    id="form-label"
                    style={{ fontWeight: `bold`, color: `white` }}
                  >
                    Finish:
                    <br />
                    <input
                      type="time"
                      className="form-control"
                      id="finish-time"
                    />
                  </label>
                  <br /> <br />
                  <div className="form-outline data-mdb-input-init">
                    <textarea
                      name="entry-body"
                      autoCapitalize="sentences"
                      autoCorrect="on"
                      placeholder="New personal record..."
                      id="entry"
                      cols="30"
                      rows="5"
                      style={{
                        width: `100%`,
                        height: `10em`,
                        borderRadius: `10px`,
                        padding: `1em`,
                      }}
                    ></textarea>
                  </div>
                </div>
                <div style={{ display: `flex`, justifyContent: `center` }}>
                  <button
                    type="submit"
                    id="submit"
                    className="btn-primary"
                    style={{
                      width: "40%",
                      margin: "1em",
                      borderRadius: "3px",
                    }}
                  >
                    Submit
                  </button>
                  <button
                    id="reset"
                    className="btn-secondary"
                    style={{
                      width: "40%",
                      margin: "1em",
                      borderRadius: "3px",
                    }}
                  >
                    Reset
                  </button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Academic References
 * get current date = https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/
 */
