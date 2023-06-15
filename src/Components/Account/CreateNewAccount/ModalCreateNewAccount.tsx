import React, { useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from "reactstrap";

import { AccountContext } from "../../../Container/AccountContainer";
import InputForm from "./InputForm";

function ModalCreateNewAccount() {
  const {
    isOpenCreateModal,
    setOpenCreateModal,
    currentInputFormData,
    setCurrentInputFormData,
  } = useContext(AccountContext);

  const handleCloseModal = () => {
    setOpenCreateModal(false);
    setCurrentInputFormData({} as typeof currentInputFormData);
  };

  return (
    <Container>
      <br />
      <Modal isOpen={isOpenCreateModal}>
        <ModalHeader>
          <h3>Create New Account</h3>
        </ModalHeader>
        <ModalBody>
          <InputForm />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default ModalCreateNewAccount;
