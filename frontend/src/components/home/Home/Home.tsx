import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import "./Home.scss";
import { schools } from "./schools";
import {
  useAddProfessorMutation,
  useGetProfessorsQuery,
} from "../../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { AddProfessorPayload } from "../../../features/api/types";
import { useAppSelector } from "../../../app/hooks";

export default function Home() {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedProf, setSelectedProf] = useState("");
  const [newProfName, setNewProfName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const professors = useGetProfessorsQuery(selectedSchool);
  const [addProfessor, { isLoading }] = useAddProfessorMutation();

  const user = useAppSelector(state => state.user);

  const loggedIn = user.sessionToken !== null;
  const ADD_NEW_PROF = "Add New Professor";

  const canSubmit =
    selectedSchool !== "" && //non empty fields
    selectedProf !== "" &&
    (selectedProf !== ADD_NEW_PROF || //either not adding a new prof
      (newProfName !== "" && newProfName !== ADD_NEW_PROF)); // or the new prof is a valid name

  useEffect(() => {
    if (!isLoading && selectedSchool !== "" && !loggedIn && professors.data?.length === 0) {
      setError("No professors found for this school. Log in to add one!")
    } else {
      setError("");
    }


  }, [isLoading, selectedSchool, loggedIn, professors.data])

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }

    if (selectedProf !== ADD_NEW_PROF) {
      navigate(`/reviews/${selectedSchool}/${selectedProf}`);
    } else {
      if (isLoading || user.sessionToken === null) return;

      try {
        const payload: AddProfessorPayload = {
          username: user.username,
          sessionToken: user.sessionToken,
          schoolName: selectedSchool,
          profName: newProfName,
        };
        await addProfessor(payload).unwrap();
        navigate(`/reviews/${selectedSchool}/${newProfName}`);
      } catch {
        setError("Failed to add professor");
      }
    }
  };

  return (
    <Layout>
      <div>
        <h2>Welcome to Evaluate My Professor!</h2>
        <div className="profSelector">
          <span>University</span>
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
          >
            <option value={""} />

            {schools.map((school, i) => (
              <option key={i} value={school}>
                {school}
              </option>
            ))}
          </select>

          <span>Professor</span>
          <select
            value={selectedProf}
            disabled={selectedSchool === ""}
            onChange={(e) => setSelectedProf(e.target.value)}
          >
            <option value={""} />

            {professors.data?.map((prof, i) => (
              <option key={i} value={prof}>
                {prof}
              </option>
            ))}

            {loggedIn && (<option value={ADD_NEW_PROF}>{ADD_NEW_PROF}</option>)}
          </select>

          {selectedProf === ADD_NEW_PROF && (
            <input
              type="text"
              className="courseSelect"
              placeholder="Professor Name"
              value={newProfName}
              onChange={(e) => setNewProfName(e.target.value)}
            />
          )}

          {canSubmit && (
            <button onClick={handleSubmit} className="submit">
              {selectedProf === ADD_NEW_PROF ? "Add Professor" : "View Reviews"}
            </button>
          )}

          <div className="error">{error}</div>
        </div>
      </div>
    </Layout>
  );
}
