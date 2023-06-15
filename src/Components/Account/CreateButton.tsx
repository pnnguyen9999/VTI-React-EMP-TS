import React, { useContext } from "react";
import { Container, Button } from "reactstrap";
import { AccountContext } from "../../Container/AccountContainer";

function CreateButton() {
  const { setOpenCreateModal } = useContext(AccountContext);
  return (
    <Container>
      <br />
      <Button color="primary" onClick={() => setOpenCreateModal(true)}>
        Create New Account
      </Button>
    </Container>
  );
}

export default CreateButton;
