import React from "react";
import { useHistory } from "react-router-dom";

const CreateButton = () => {
  const history = useHistory();
  const navigateTo = () => history.push("/entity/create");

  return (
    <button className="btn btn-primary" onClick={navigateTo} type="button">
      Create Entity
    </button>
  );
};

const UpdateButton = () => {
  const history = useHistory();
  const navigateTo = () => history.push("/entity/update");

  return (
    <button className="btn btn-primary" onClick={navigateTo} type="button">
      Update Entity
    </button>
  );
};

const GetButton = () => {
  const history = useHistory();
  const navigateTo = () => history.push("/entity");
  return (
    <button className="btn btn-primary" onClick={navigateTo} type="button">
      Display Entities
    </button>
  );
};

const Default = () => {
  return (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
      <h1>Default Page</h1>
      <div className="btn-group" style={{ paddingRight: "10px" }}>
        <CreateButton />
        <UpdateButton />
        <GetButton />
      </div>
    </div>
  );
};

export default Default;
