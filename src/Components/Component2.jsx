import React from "react";
import { Resizable } from 're-resizable';

const Component2 = () => {
    return (
      <Resizable
        style={{ border: "1px solid #ddd", margin: "8px" }}
        // defaultSize={{ width: 200, height: 200 }}
      >
      <div class="col-lg-4 col-md-6">
      <div class="component">
        <h2>Component 3</h2>
        <p>This is some content for Component 3.</p>
        <button class="btn btn-primary add-btn">Add Data</button>
        <button class="btn btn-secondary update-btn">Update Data</button>
      </div>
    </div>
      </Resizable>
    );
  };
  export default Component2;  
