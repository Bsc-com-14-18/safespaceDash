import db from "../../firebase";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { collection, query, where, getDocs } from "firebase/firestore";

export function Cases() {
  const [matchingCases, setMatchingCases] = useState([]);

  useEffect(() => {
    const fetchMatchingCases = async () => {
      try {
        // Retrieve cases with matching assignedTo values
        const casesQuery = query(collection(db, "cases"), where("assignedTo", "in", ["Zomba", "Lilongwe", "Blantyre"]));
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
    const locationCounts = {
      Zomba: 0,
      Lilongwe: 0,
      Blantyre: 0,
    };

    matchingCases.forEach((caseData) => {
      const assignedTo = caseData.assignedTo;
      if (locationCounts.hasOwnProperty(assignedTo)) {
        locationCounts[assignedTo] += 1;
      }
    });

    const data = [
      ["Location", "Number of Cases"],
      ["Zomba", locationCounts.Zomba],
      ["Lilongwe", locationCounts.Lilongwe],
      ["Blantyre", locationCounts.Blantyre],
    ];

    return data;
  };

  const data = createChartData();

  const options = {
    chart: {
      title: "Case Distribution by Location",
      subtitle: "Number of Cases by Location",
    },
    titleTextStyle: {
      bold: true,
    },
  };

  return (
    <div>
      {matchingCases.length > 0 ? (
        <Chart chartType="Bar" width="100%" height="400px" data={data} options={options} />
      ) : (
        <p>No matching cases found.</p>
      )}
    </div>
  );
}
