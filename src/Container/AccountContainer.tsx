import React, { createContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import CreateButton from "../Components/Account/CreateButton";
import ResultForm from "../Components/Account/ResultForm";
import ModalCreateNewAccount from "../Components/Account/CreateNewAccount/ModalCreateNewAccount";

export interface IAccountData {
  email: string;
  userName: string;
  fullName: string;
  department: string;
  position: string;
  createDate?: string;
}

export interface IAccount extends IAccountData {
  id: string;
}

interface IAccountContext {
  listAccount: IAccount[];
  isOpenCreateModal: boolean;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentInputFormData: IAccount | undefined;
  setCurrentInputFormData: React.Dispatch<
    React.SetStateAction<IAccount | undefined>
  >;
  onHandleCreateNewAccount: (newAccount: IAccount) => void;
  onHandleEditAccount: (newAccountData: IAccount) => void;
  onHandleDeleteAccount: (accountId: string) => void;
}

export const AccountContext = createContext<IAccountContext>(
  null as unknown as IAccountContext
);

function AccountContainer() {
  const [isOpenCreateModal, setOpenCreateModal] = useState(false);
  const [listAccount, setListAccount] = useState<IAccount[]>([]);
  const [currentInputFormData, setCurrentInputFormData] = useState<
    IAccount | undefined
  >();

  const updateListAccountData = () => {
    setListAccount(listAccount);
    localStorage.setItem("listAccount", JSON.stringify(listAccount));
  };

  const onHandleCreateNewAccount = (newAccount: IAccount) => {
    listAccount.push(newAccount);
    updateListAccountData();

    setOpenCreateModal(false);
  };

  const onHandleEditAccount = (newAccountData: IAccount) => {
    const targetAccountIndex = listAccount.findIndex(
      (account) => account.id === newAccountData.id
    );

    listAccount[targetAccountIndex] = {
      ...listAccount[targetAccountIndex],
      ...newAccountData,
    };
    updateListAccountData();

    setOpenCreateModal(false);
    setCurrentInputFormData(undefined);
  };

  const onHandleDeleteAccount = (accountId: string) => {
    const targetAccountIndex = listAccount.findIndex(
      (account) => account.id === accountId
    );
    const cloneList = [...listAccount];
    cloneList.splice(targetAccountIndex, 1);
    setListAccount(cloneList);
    localStorage.setItem("listAccount", JSON.stringify(cloneList));
  };

  useEffect(() => {
    if (localStorage && localStorage.getItem("listAccount")) {
      const listAccountLocalStorage = JSON.parse(
        localStorage.getItem("listAccount") as any
      ) as IAccount[];
      setListAccount(listAccountLocalStorage);
    }
  }, []);

  return (
    <AccountContext.Provider
      value={{
        listAccount,
        isOpenCreateModal,
        setOpenCreateModal,
        currentInputFormData,
        setCurrentInputFormData,
        onHandleCreateNewAccount,
        onHandleEditAccount,
        onHandleDeleteAccount,
      }}
    >
      <Container>
        {/* Nút thêm mới */}
        <CreateButton />
        {/* Form thêm mới Account*/}
        <ModalCreateNewAccount />
        {/* Form kết quả */}
        <ResultForm data={listAccount} />
      </Container>
    </AccountContext.Provider>
  );
}

export default AccountContainer;
