import React from "react";
import { Resizable } from 're-resizable';

const Component1 = () => {
  return (
    <Resizable
      style={{ border: "1px solid #ddd", margin: "8px" }}
      // defaultSize={{ width: 200, height: 200 }}
    >
      <div class="col-lg-4 col-md-6">
      <div class="component">
        <h2>Component 2</h2>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <button class="btn btn-primary add-btn">Add Data</button>
        <button class="btn btn-secondary update-btn">Update Data</button>
      </div>
    </div>
    </Resizable>
  );
};

export default Component1;