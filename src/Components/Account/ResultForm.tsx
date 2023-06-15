import { Table, Container } from "reactstrap";
import ResultFormItem from "./CreateNewAccount/ResultFormItem";
import { IAccount } from "../../Container/AccountContainer";

interface ResultFormProps {
  data: IAccount[];
}

function ResultForm(props: ResultFormProps) {
  return (
    <Container>
      <br />
      <h3>Danh sách Account</h3>
      <Table hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Fullname</th>
            <th>Department</th>
            <th>Position</th>
            <th>Create Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((account) => (
            <ResultFormItem key={account.id} {...account} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ResultForm;
