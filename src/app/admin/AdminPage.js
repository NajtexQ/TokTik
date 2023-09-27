"use client";

import Button from "../components/Button";

import deleteVideo from "../actions/deleteVideo";
import deleteReport from "../actions/reports/deleteReport";

export default async function AdminPage({ reports }) {
  const acceptReport = async (id) => {
    const res = await deleteVideo(id);
    console.log(res);
  };

  const deleteReport = async (id) => {
    const res = await deleteReport(id);
    console.log(res);
  };

  return (
    <div className="p-16 w-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl">Admin Page</h1>
      <div className="mt-8 w-full">
        <h1 className="font-semibold text-xl">Reports</h1>
        <div className="mt-4 w-full">
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
                  <div type="submit" className="bg-green-300 rounded-lg p-3">
                    Accept
                  </div>
                  <div type="submit" className="bg-red-300 rounded-lg p-3">
                    Delete
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
