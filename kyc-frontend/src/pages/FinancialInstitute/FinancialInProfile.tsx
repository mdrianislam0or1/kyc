import { useGetSingleInstituteQuery } from "../../redux/features/FNInstitute/instituteApi";
import Loader from "../../ui/Loader";

const FinancialInProfile = () => {
  const { data: singleInstitute } = useGetSingleInstituteQuery({});
  console.log(singleInstitute?.data);

  if (!singleInstitute) {
    return <Loader />;
  }
  return <div>FinancialInProfile</div>;
};

export default FinancialInProfile;
