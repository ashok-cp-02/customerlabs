// *******~ Import ~******** //
//? React
import { useContext, useState } from "react";

//? Assets
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import axios from "axios";
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
  const [schemaOptions, setSchemaOptions] = useState([
    { value: "first_name", label: "First Name", traits: "user" },
    { value: "last_name", label: "Last Name", traits: "user" },
    { value: "gender", label: "Gender", traits: "group" },
    { value: "age", label: "Age", traits: "user" },
    { value: "account_name", label: "Account Name", traits: "group" },
    { value: "city", label: "City", traits: "user" },
    { value: "state", label: "State", traits: "group" },
  ]);
  const traits = [
    { value: "first_name", trait: "user" },
    { value: "last_name", trait: "user" },
    { value: "gender", trait: "group" },
    { value: "age", trait: "user" },
    { value: "account_name", trait: "user" },
    { value: "city", trait: "group" },
    { value: "state", trait: "group" },
  ];

  const handleSegmentFormClose = () => setSegmentFormShow(false);
  const handleSegmentFormShow = () => setSegmentFormShow(true);

  const handleAddSchema = () => {
    const selectedValue = document.getElementById("schemaSelector").value;

    if (!schemas.includes(selectedValue)) {
      setSchemas((prevSchemas) => [...prevSchemas, selectedValue]);
      setSchemaOptions((prevOptions) =>
        prevOptions.filter((option) => option.value !== selectedValue)
      );
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

    const segmentObject = {
      segment_name: segmentName,
      schema: schemas.reduce((acc, schema) => {
        acc.push({
          [schema]:
            schemaOptions.find((option) => option.value === schema)?.label ||
            schema,
        });
        return acc;
      }, []),
    };

    console.log(segmentObject);

    axios
      .post(
        "https://webhook.site/8364fdf2-d5bc-40cb-a3a1-f666a714b0a4",
        segmentObject
      )
      .then((response) => {
        console.log("Webhook server response:", response.data);
        resetForm();
      })
      .catch((error) => {
        console.error("Error sending data to webhook:", error);
      });
  };

  const resetForm = () => {
    setSchemas([]);
    setSchemaOptions([
      { value: "first_name", label: "First Name", traits: "user" },
      { value: "last_name", label: "Last Name", traits: "user" },
      { value: "gender", label: "Gender", traits: "group" },
      { value: "age", label: "Age", traits: "user" },
      { value: "account_name", label: "Account Name", traits: "group" },
      { value: "city", label: "City", traits: "user" },
      { value: "state", label: "State", traits: "group" },
    ]);
    setSegmentName("");
    setSegmentNameError(false);
    setSegmentFormShow(false);
  };
  return (
    <>
      <button onClick={handleSegmentFormShow}>Save Segment</button>
      <Offcanvas
        show={segmentFormShow}
        onHide={handleSegmentFormClose}
        placement="end"
        className={`segment-form-canva ${theme === "dark" && "dark-theme"}`}
      >
        <Offcanvas.Body>
          <div className="body-content">
            <div className="heading" onClick={handleSegmentFormClose}>
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
                <div className="dynamic-schema">
                  <ul>
                    {schemas.map((schema, index) => (
                      <li key={index}>
                        <span
                          className={`traits-list ${
                            traits.find((option) => option.value === schema)
                              ?.trait || ""
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
                              {option.label}
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
                <div className="add-btn">
                  <div className="dropdown-div">
                    <span className="traits-list"></span>
                    <Form.Select
                      id="schemaSelector"
                      aria-label="Default select example"
                    >
                      {schemaOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <button onClick={handleAddSchema}>+ Add new schema</button>
                </div>
              </div>
            </div>
            <div className="footer-div">
              <button className="save" onClick={handleSaveSegment}>
                Save the Segment
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
