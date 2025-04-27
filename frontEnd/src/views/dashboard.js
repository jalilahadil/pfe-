import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line, Radar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement, RadarController, RadialLinearScale } from 'chart.js';
import Navbar from '../components/navbar';
import axios from "axios"

// Registering chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale
);

const DashboardMetrics = () => {
  const [data, setData] = useState({
    statStudent: 0,
    statTeacher: 0,
    statExercice: 0,
    statCours: 0,
    statCategory: 0,
    statLesson: 0,
    statChapter: 0,
    assignmentLesson: 0,
    subscriptionChapter: 0,
    quizResponse: 0,
    questions: 0,
  });

  const loadData = () => {
    axios.get("http://localhost:8080/stats/getStats")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Additional Metrics
  const exercisesPerCourse = (data.statExercice / data.statCours).toFixed(2);
  const lessonsPerCategory = (data.statLesson / data.statCategory).toFixed(2);
  const chaptersPerCourse = (data.statChapter / data.statCours).toFixed(2);

  // Prepare Data for Charts
  const barChartData = {
    labels: ['Students', 'Teachers', 'Exercises', 'Courses', 'Categories', 'Lessons'],
    datasets: [
      {
        label: 'Counts',
        data: [
          data.statStudent,
          data.statTeacher,
          data.statExercice,
          data.statCours,
          data.statCategory,
          data.statLesson,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Lesson Assignments', 'Chapter Subscriptions', 'Quiz Responses'],
    datasets: [
      {
        data: [data.assignmentLesson, data.subscriptionChapter, data.quizResponse],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Student Growth',
        data: [2, 3, 5, 7, 10], // Simulating student count growth
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const radarChartData = {
    labels: ['Exercises', 'Lessons', 'Chapters', 'Assignments', 'Responses'],
    datasets: [
      {
        label: 'Performance',
        data: [80, 70, 90, 60, 85], // Random performance data
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Assigned Lessons', 'Unassigned Lessons'],
    datasets: [
      {
        data: [data.assignmentLesson, data.statLesson - data.assignmentLesson],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 159, 64, 0.6)'],
      },
    ],
  };

  return (
    <>
      <Navbar color="var(--mainColor)" />
      <div style={{ padding: '20px', background: '#f5f7fa', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Dashboard Metrics</h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)', // Data boxes in one row (3 items)
            gap: '30px',
          }}
        >
          {/* Metrics Boxes */}
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.2s',
              minHeight: '150px',
            }}
          >
            <div style={{ fontSize: '18px', color: '#555', marginBottom: '10px' }}>Exercises per Course</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>{exercisesPerCourse}</div>
          </div>

          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.2s',
              minHeight: '150px',
            }}
          >
            <div style={{ fontSize: '18px', color: '#555', marginBottom: '10px' }}>Lessons per Category</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>{lessonsPerCategory}</div>
          </div>

          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.2s',
              minHeight: '150px',
            }}
          >
            <div style={{ fontSize: '18px', color: '#555', marginBottom: '10px' }}>Chapters per Course</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>{chaptersPerCourse}</div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr', // Single column layout for charts
            gap: '30px',
            marginTop: '30px',
          }}
        >
          <div className="row d-flex">
            <div className='col'
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
                transition: 'transform 0.2s',
                height: '400px', display: "flex",
                justifyContent: "center"
              }}
            >
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Counts of Various Metrics',
                    },
                  },
                }}
              />
            </div>

            <div className='col'
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
                transition: 'transform 0.2s',
                height: '400px', display: "flex",
                justifyContent: "center"
              }}
            >
              <Pie
                data={pieChartData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Distribution of Assignments, Subscriptions, and Responses',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col"
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
                transition: 'transform 0.2s',
                height: '400px',
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Line
                data={lineChartData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Student Growth Over Time',
                    },
                  },
                }}
              />
            </div>

            <div className="col"
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
                transition: 'transform 0.2s',
                height: '400px',
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Radar
                data={radarChartData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Performance Comparison',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="row d-flex justify-content-center">
            <div className='col-4'
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
                transition: 'transform 0.2s',
                height: '400px',
              }}
            >
              <Doughnut
                data={doughnutChartData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Assigned vs Unassigned Lessons',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMetrics;
