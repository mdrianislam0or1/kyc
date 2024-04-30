/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetCustomerQuery } from "../../redux/features/Customer/customerApi";

const CustomerProfile = () => {
  const { data: singleCustomer } = useGetCustomerQuery({});
  console.log(singleCustomer);

  return <div>CustomerProfile</div>;
};

export default CustomerProfile;
