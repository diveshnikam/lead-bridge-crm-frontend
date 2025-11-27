import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import useFetch from "../customHooks/useFetch";

const Report = () => {
  const {
    loading: loadingStatus,
    error: errorStatus,
    leadData: statusData,
  } = useFetch(
    "https://lead-bridge-crm-backend.vercel.app/report/status-distribution"
  );

  const {
    loading: loadingAgent,
    error: errorAgent,
    leadData: agentData,
  } = useFetch("https://lead-bridge-crm-backend.vercel.app/leads-by-agent");

  const {
    loading: loadingPipeline,
    error: errorPipeline,
    leadData: pipelineData,
  } = useFetch("https://lead-bridge-crm-backend.vercel.app/report/pipeline");

  const {
    loading: loadingWeek,
    error: errorWeek,
    leadData: weekData,
  } = useFetch("https://lead-bridge-crm-backend.vercel.app/report/last-week");

  const statusDist = Array.isArray(statusData) ? statusData : [];
  const leadsByAgent = Array.isArray(agentData) ? agentData : [];
  const pipeline = pipelineData?.totalLeadsInPipeline || 0;
  const lastWeekClosed = Array.isArray(weekData) ? weekData : [];

  const closedCount = statusDist.find((i) => i.status === "Closed")?.count || 0;

  const chartStatus = {
    labels: statusDist.map((i) => i.status),
    datasets: [
      {
        data: statusDist.map((i) => i.count),
        backgroundColor: [
          "#007bff",
          "#28a745",
          "#ffc107",
          "#dc3545",
          "#6f42c1",
        ],
      },
    ],
  };

  const chartAgent = {
    labels: leadsByAgent.map((i) => i.agentName),
    datasets: [
      {
        label: "Closed Leads",
        data: leadsByAgent.map((i) => i.closedLeads),
        backgroundColor: "rgba(40, 167, 69, 0.6)",
      },
      {
        label: "Total Leads",
        data: leadsByAgent.map((i) => i.totalLeads),
        backgroundColor: "rgba(0, 123, 255, 0.6)",
      },
    ],
  };

  const chartPipeline = {
    labels: ["Active Leads", "Closed Leads"],
    datasets: [
      {
        label: "Lead Count",
        data: [pipeline, closedCount],
        backgroundColor: ["rgba(255, 193, 7, 0.7)", "rgba(40, 167, 69, 0.7)"],
      },
    ],
  };

  const chartWeek = {
    labels: lastWeekClosed.map((l) => l.name),
    datasets: [
      {
        label: "Closed Last Week",
        data: lastWeekClosed.map(() => 1),
        backgroundColor: ["rgba(220, 53, 69, 0.6)"],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const NoData = ({ text }) => (
    <div className="text-center text-secondary mt-4 fw-semibold">
      <i className="bi bi-search fs-3 me-2"></i> {text}
    </div>
  );

  return (
    <>
     
      <div className="container-fluid px-3 px-md-5 mt-5">
        <h1 className="fw-bold text-center">Lead-Bridge CRM Reports</h1>
        <hr className="mt-5 mb-5" />
      </div>

      <div className="container-fluid px-3 px-md-5">
        <div className="row justify-content-center">
         
          <div className="col-12 col-md-3 mb-4 mt-1 text-center text-md-start">
            <Link
              to="/"
              className="btn btn-white border lead-btn  mt-4 back-btn-lg"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back To Dashboard
            </Link>
          </div>

         
          <div className="col-12 col-md-9">
          
            <h2 className="fw-bold text-center text-md-start mt-md-4 mb-5 ">
              Analytics Overview
            </h2>

           
            <div className="mt-5 mb-5">
              <h4 className="fw-semibold mb-5">Lead Status Distribution</h4>

              {loadingStatus && (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <div
                    className="spinner-border text-dark"
                    style={{ width: "3rem", height: "3rem" }}
                  />
                </div>
              )}

              {errorStatus && <NoData text={errorStatus} />}

              {!loadingStatus && !errorStatus && statusDist.length === 0 && (
                <NoData text="No status data found" />
              )}

              {!loadingStatus && !errorStatus && statusDist.length > 0 && (
                <div className="bg-white p-4 shadow-sm rounded">
                  <div style={{ width: "100%", height: "300px" }}>
                    <Pie
                      key="chart1"
                      data={chartStatus}
                      options={chartOptions}
                    />
                  </div>
                </div>
              )}
            </div>

            
            <div className="mt-5 mb-5">
              <h4 className="fw-semibold mb-5 mt-5">Leads by Sales Agent</h4>

              {loadingAgent && (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <div
                    className="spinner-border text-dark"
                    style={{ width: "3rem", height: "3rem" }}
                  />
                </div>
              )}

              {errorAgent && <NoData text={errorAgent} />}

              {!loadingAgent && !errorAgent && leadsByAgent.length === 0 && (
                <NoData text="No sales agent data found" />
              )}

              {!loadingAgent && !errorAgent && leadsByAgent.length > 0 && (
                <div className="bg-white p-4 shadow-sm rounded">
                  <div style={{ width: "100%", height: "300px" }}>
                    <Bar
                      key="chart2"
                      data={chartAgent}
                      options={chartOptions}
                    />
                  </div>
                </div>
              )}
            </div>

           
            <div className="mt-5 mb-5">
              <h4 className="fw-semibold mb-5">Total Leads in Pipeline</h4>

              {loadingPipeline && (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <div
                    className="spinner-border text-dark"
                    style={{ width: "3rem", height: "3rem" }}
                  />
                </div>
              )}

              {errorPipeline && <NoData text={errorPipeline} />}

              {!loadingPipeline && !errorPipeline && (
                <div className="bg-white p-4 shadow-sm rounded">
                  <div style={{ width: "100%", height: "300px" }}>
                    <Bar
                      key="chart3"
                      data={chartPipeline}
                      options={chartOptions}
                    />
                  </div>
                </div>
              )}
            </div>

           
            <div className="mt-5 mb-5">
              <h4 className="fw-semibold mb-5">Leads Closed Last Week</h4>

              {loadingWeek && (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <div
                    className="spinner-border text-dark"
                    style={{ width: "3rem", height: "3rem" }}
                  />
                </div>
              )}

              {errorWeek && <NoData text={errorWeek} />}

              {!loadingWeek && !errorWeek && lastWeekClosed.length === 0 && (
                <NoData text="No leads closed last week" />
              )}

              {!loadingWeek && !errorWeek && lastWeekClosed.length > 0 && (
                <div className="bg-white p-4 shadow-sm rounded">
                  <div style={{ width: "100%", height: "300px" }}>
                    <Bar key="chart4" data={chartWeek} options={chartOptions} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
