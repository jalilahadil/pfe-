import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line, Radar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement, RadarController, RadialLinearScale } from 'chart.js';
import Navbar from '../components/navbar';
import axios from "axios"

// Enregistrement des composants chart.js
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

  // Métriques supplémentaires
  const exercisesPerCourse = (data.statExercice / data.statCours).toFixed(2);
  const lessonsPerCategory = (data.statLesson / data.statCategory).toFixed(2);
  const chaptersPerCourse = (data.statChapter / data.statCours).toFixed(2);

  // Préparer les données pour les graphiques
  const barChartData = {
    labels: ['Étudiants', 'Enseignants', 'Exercices', 'Cours', 'Catégories', 'Leçons'],
    datasets: [
      {
        label: 'Comptes',
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
    labels: ['Devoirs de Leçons', 'Abonnements de Chapitres', 'Réponses aux Quiz'],
    datasets: [
      {
        data: [data.assignmentLesson, data.subscriptionChapter, data.quizResponse],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };

  const lineChartData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'],
    datasets: [
      {
        label: 'Croissance des Étudiants',
        data: [2, 3, 5, 7, 10], // Simulation de la croissance du nombre d'étudiants
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const radarChartData = {
    labels: ['Exercices', 'Leçons', 'Chapitres', 'Devoirs', 'Réponses'],
    datasets: [
      {
        label: 'Performance',
        data: [80, 70, 90, 60, 85], // Données de performance aléatoires
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Leçons Assignées', 'Leçons Non Assignées'],
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
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Métriques du Tableau de Bord</h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)', // Boîtes de données dans une seule ligne (3 éléments)
            gap: '30px',
          }}
        >
          {/* Boîtes de Métriques */}
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
            <div style={{ fontSize: '18px', color: '#555', marginBottom: '10px' }}>Exercices par Cours</div>
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
            <div style={{ fontSize: '18px', color: '#555', marginBottom: '10px' }}>Leçons par Catégorie</div>
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
            <div style={{ fontSize: '18px', color: '#555', marginBottom: '10px' }}>Chapitres par Cours</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>{chaptersPerCourse}</div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr', // Mise en page en une seule colonne pour les graphiques
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
                      text: 'Comptes de Diverses Métriques',
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
                      text: 'Répartition des Devoirs, Abonnements et Réponses',
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
                      text: 'Croissance des Étudiants au Fil du Temps',
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
                      text: 'Comparaison de la Performance',
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
                      text: 'Leçons Assignées vs Non Assignées',
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
