import { useState, useEffect } from "react";
import api from "../api/axios-instance";
import { toast } from "react-toastify";

export default function ReportsTable(){

    const [allReports, setAllReports] = useState([]);
    async function getReports() {
        const toastId = toast.loading('loading...');
        try {
          const res = await api.get("api/reports");
          setAllReports(res.data.reports);
          console.log(res.data.reports)
          toast.update(toastId, {render: 'Success!',
          type: 'success',
          isLoading: false,
          autoClose: 2000})
        } catch (error) {
          console.log("Error fetching reports:", error);
        }
      }
      useEffect(() => {
          getReports();
        }, []);

        return(
            <>
            <div>
                <h1>All reports: {allReports.length}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Property ID</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(allReports) && allReports.map(report=> (
                            <tr key={report._id}>
                                <td>{report.propertyId}</td>
                                <td>
                                    <span>
                                        {report.description}
                                    <button className='more-options'>
                                        :
                                    </button>
                                    </span></td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            </>
        )
}