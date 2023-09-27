"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminPage({ allReports }) {
  console.log(allReports);

  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports(allReports);
  }, []);

  const deleteReport = async (reportId) => {
    setReports(
      (reports) =>
        (reports = reports.filter((report) => report.id !== reportId))
    );

    const res = await axios.post("/api/report/delete?reportId=" + reportId);
    console.log(res);
  };

  const acceptReport = async (reportId) => {
    const videoId = reports.find((report) => report.id === reportId).video.id;

    setReports(
      (reports) =>
        (reports = reports.filter((report) => report.id !== reportId))
    );

    const res = await axios.post("/api/video/delete?videoId=" + videoId);
    console.log(res);
  };

  return (
    <div className="p-16 w-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl">Admin Page</h1>
      <div className="mt-8 w-full">
        <h1 className="font-semibold text-xl">Reports</h1>
        <div className="mt-4 w-full flex flex-col gap-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="w-full bg-gray-200 rounded-lg p-4 flex flex-col"
            >
              <div className="flex justify-between align-center">
                <div>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-lg">{report.video.title}</h1>
                    <h2 className="text-sm text-gray-400">
                      {report.video.desc}
                    </h2>
                  </div>
                  <div className="mt-4">
                    <h1 className="font-semibold text-md">Reported by</h1>
                    <p className="text-sm">@{report.user.username}</p>
                    <p className="text-sm">
                      Admin: {report.user.isAdmin ? "true" : "false"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div
                    className="bg-green-300 rounded-lg p-3 cursor-pointer"
                    onClick={() => acceptReport(report.id)}
                  >
                    Accept
                  </div>
                  <div
                    className="bg-red-300 rounded-lg p-3 cursor-pointer"
                    onClick={() => deleteReport(report.id)}
                  >
                    Dismiss
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
