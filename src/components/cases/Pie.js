import db from "../../firebase";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { collection, query, where, getDocs } from "firebase/firestore";

export function PieChart() {
  const [matchingCases, setMatchingCases] = useState([]);

  useEffect(() => {
    const fetchMatchingCases = async () => {
      try {
        // Retrieve cases with matching gender values
        const casesQuery = query(collection(db, "cases"), where("gender", "in", ["Male", "Female"]));
        // Add more conditions if needed

        const casesSnapshot = await getDocs(casesQuery);
        const cases = casesSnapshot.docs.map((doc) => doc.data());
        setMatchingCases(cases);
        console.log("Cases:", cases);
      } catch (error) {
        console.error("Error fetching matching cases:", error);
      }
    };

    fetchMatchingCases();
  }, []);

  const createChartData = () => {
    const genderCounts = {
      Male: 0,
      Female: 0,
    };

    matchingCases.forEach((caseData) => {
      const gender = caseData.gender;
      if (genderCounts.hasOwnProperty(gender)) {
        genderCounts[gender] += 1;
      }
    });

    const data = [
      ["Gender", "Number of Cases"],
      ["Male", genderCounts.Male],
      ["Female", genderCounts.Female],
    ];

    return data;
  };

  const data = createChartData();

  const options = {
    title: "Case Distribution by Gender",
  };

  return (
    <div>
      {matchingCases.length > 0 ? (
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      ) : (
        <p>No matching cases found.</p>
      )}
    </div>
  );
}
