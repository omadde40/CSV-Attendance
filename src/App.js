import React, { useState } from "react";
import { CSVReader, jsonToCSV, CSVDownloader } from "react-papaparse";
import moment from "moment";

function App() {
  const [file, setFile] = useState();

  const handleOnDrop = (data) => {
    data.splice(0, 4);
    const teacherTime = 0.6 * moment.duration(data[1].data[2]).asSeconds();

    for (let i = 2; i < data.length - 1; i++) {
      const studentTime = moment.duration(data[i].data[2]).asSeconds();
      delete data[i].data[1];
      if (studentTime >= teacherTime) {
        data[i].data.push("Present");
      } else {
        data[i].data.push("Absent");
      }
    }
    console.log(data);
    setFile(jsonToCSV(data));
    console.log(jsonToCSV(data));
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log(data);
  };

  return (
    <>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        removeButtonColor="#659cef"
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>

      {file ? (
        <CSVDownloader
          data={file}
          type="button"
          filename={moment().format("DD/MM/YYYY")}
          bom={true}
        >
          Download Generated CSV File
        </CSVDownloader>
      ) : null}
    </>
  );
}

export default App;
