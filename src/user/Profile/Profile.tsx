import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";

export default function Profile() {
  const params = useParams();

  console.log(params?.username);
  return <Layout></Layout>;
}
