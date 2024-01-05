// *******~ Import ~******** //
//? React
import { useContext, useState } from "react";

//? Assets
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
// import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";

//? Components
import ThemeContext from "../../../../common/theme/components/contexts/themecontexts";
//? CSS
import "./css/segment-form.scss";
//? Images

//? JSON File

//? Icons
import { FaMinus } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
// *******~ Import ~******** //

const SegmentForm = () => {
  const { theme } = useContext(ThemeContext);
  const [segmentFormShow, setSegmentFormShow] = useState(false);
  const [schemas, setSchemas] = useState([]);
  const [segmentName, setSegmentName] = useState("");
  const [segmentNameError, setSegmentNameError] = useState(false);
  const [segmentSubmit, setSegmentSubmit] = useState(false);
  const [selectedSchema, setSelectedSchema] = useState("");
  const Options = [
    { id: 1, value: "first_name", label: "First Name", traits: "user" },
    { id: 2, value: "last_name", label: "Last Name", traits: "user" },
    { id: 3, value: "gender", label: "Gender", traits: "group" },
    { id: 4, value: "age", label: "Age", traits: "user" },
    { id: 5, value: "account_name", label: "Account Name", traits: "group" },
    { id: 6, value: "city", label: "City", traits: "user" },
    { id: 7, value: "state", label: "State", traits: "group" },
  ];
  const [schemaOptions, setSchemaOptions] = useState([...Options]);

  //   const handleSegmentFormClose = () => setSegmentFormShow(false);
  const handleSegmentFormShow = () => setSegmentFormShow(true);

  const handleAddSchema = () => {
    // Check if a schema is selected
    if (!selectedSchema) {
      // Handle the case when no schema is selected
      return;
    }

    if (!schemas.includes(selectedSchema)) {
      setSchemas((prevSchemas) => [...prevSchemas, selectedSchema]);
      setSchemaOptions((prevOptions) =>
        prevOptions.filter((option) => option.value !== selectedSchema)
      );
      // Clear the selected schema after adding
      setSelectedSchema("");
    }
  };

  const handleRemoveSchema = (index) => {
    const removedSchema = schemas[index];
    setSchemas((prevSchemas) => prevSchemas.filter((_, i) => i !== index));
    setSchemaOptions((prevOptions) => [
      ...prevOptions,
      { value: removedSchema, label: removedSchema },
    ]);
  };

  const handleSaveSegment = () => {
    if (segmentName.trim() === "") {
      setSegmentNameError(true);
      return;
    }
    setSegmentSubmit(true);
    const segmentObject = {
      segment_name: segmentName,
      schema: schemas.reduce((acc, schema) => {
        acc.push({
          [schema]:
            Options.find((option) => option.value === schema)?.label || schema,
        });
        return acc;
      }, []),
    };

    console.log(segmentObject);

    axios
      .post(
        "https://webhook.site/26aa003d-6d3e-4264-b9ff-67c6e8f76fbb",
        segmentObject
      )
      .then((response) => {
        console.log("Webhook server response:", response.data);
        toast.success(response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme === "dark" ? "dark" : "light",
        });
        resetForm();
        setSegmentSubmit(false);
      })
      .catch((error) => {
        console.error("Error sending data to webhook:", error);
        toast.error("Segment Added Faild", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme === "dark" ? "dark" : "light",
        });
        // resetForm();
        setSegmentSubmit(false);
      });
  };

  const resetForm = () => {
    setSchemas([]);
    setSchemaOptions([...Options]);
    setSegmentName("");
    setSegmentNameError(false);
    setSegmentFormShow(false);
  };
  return (
    <>
      <button className="save-segment-btn" onClick={handleSegmentFormShow}>
        Save Segment
      </button>
      <Offcanvas
        show={segmentFormShow}
        onHide={resetForm}
        placement="end"
        className={`segment-form-canva ${theme === "dark" && "dark-theme"}`}
      >
        <Offcanvas.Body>
          <div className="body-content">
            <div className="heading" onClick={resetForm}>
              <span>
                <FaChevronLeft />
              </span>
              <h3>Saving Segment</h3>
            </div>
            <div className="content">
              <div className="segment-name">
                <Form.Label>Enter the Name of the Segment</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name of Segment"
                  value={segmentName}
                  onChange={(e) => {
                    setSegmentName(e.target.value);
                    setSegmentNameError(false);
                  }}
                />
                {segmentNameError && <span>Please enter a segment name</span>}
                <p>
                  To save your segment, you need to add the schemas to build the
                  query
                </p>
              </div>
              <div className="add-segment">
                <div className="traits">
                  <ul>
                    <li>
                      <span className="user"></span> -User Traits
                    </li>
                    <li>
                      <span className="group"></span> -Group Traits
                    </li>
                  </ul>
                </div>
                {schemas.length !== 0 && (
                  <div className="dynamic-schema">
                    <ul>
                      {schemas.map((schema, index) => (
                        <li key={index}>
                          <span
                            className={`traits-list ${
                              Options.find((option) => option.value === schema)
                                ?.traits || ""
                            }`}
                          ></span>

                          <Form.Select
                            aria-label="Default select example"
                            defaultValue={schema}
                            onChange={(e) => {
                              const selectedValue = e.target.value;

                              // Remove the selected option from schemaOptions
                              const updatedOptions = schemaOptions.filter(
                                (option) => option.value !== selectedValue
                              );

                              // Add the previous value back to schemaOptions
                              if (schema) {
                                updatedOptions.push({
                                  value: schema,
                                  label: schema,
                                });
                              }

                              // Update schemaOptions
                              setSchemaOptions(updatedOptions);

                              // Update schemas
                              setSchemas((prevSchemas) => {
                                const newSchemas = [...prevSchemas];
                                newSchemas[index] = selectedValue;
                                return newSchemas;
                              });
                            }}
                          >
                            <option value={schema}>{schema}</option>
                            {schemaOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.value}
                              </option>
                            ))}
                          </Form.Select>
                          <button
                            className="minus-btn"
                            onClick={() => handleRemoveSchema(index)}
                          >
                            <FaMinus />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {schemaOptions.length === 0 ? (
                  <>
                    <p className="not-avil">No More Schema</p>
                  </>
                ) : (
                  <>
                    <div className="add-btn">
                      <div className="dropdown-div">
                        <span className="traits-list"></span>
                        <Form.Select
                          id="schemaSelector"
                          aria-label="Default select example"
                          value={selectedSchema}
                          onChange={(e) => setSelectedSchema(e.target.value)}
                        >
                          <option
                            className="default-option"
                            value=""
                            disabled
                            selected
                            hidden
                          >
                            Add schema to segment
                          </option>
                          {schemaOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                      <button
                        onClick={handleAddSchema}
                        disabled={!selectedSchema}
                      >
                        + Add new schema
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="footer-div">
              <button
                disabled={segmentSubmit}
                className="save"
                onClick={handleSaveSegment}
              >
                {segmentSubmit ? "Loading..." : "Save the Segment"}
              </button>
              <button onClick={resetForm} className="cancel">
                Cancel
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SegmentForm;
