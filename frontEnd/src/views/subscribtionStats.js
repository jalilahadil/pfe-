import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubscriptionStats = () => {
  const [stats, setStats] = useState({
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    waitingSubscriptions: 0,
    subscriptionsPerCourse: [],
    subscriptionsPerStudent: [],
    avgPoints: 0,
    terminatedLessonsStats: [],
    newSubscriptionsOverTime: [],
  });

  const loadData = () => {
    axios
      .get('http://localhost:8080/stats/findSubscriptionStats')
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subscription stats:", error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Ensure the data is iterable (array) before mapping
  const isArray = (data) => Array.isArray(data);

  return (
    <div style={{ padding: '20px', background: '#f5f7fa' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Statistiques des abonnements</h1>

      {/* Subscription Overview */}
      <div style={{ marginBottom: '30px' }}>
      <h2>Vue d'ensemble des abonnements</h2>
    <div>Total des abonnements : {stats.totalSubscriptions}</div>
    <div>Abonnements actifs : {stats.activeSubscriptions}</div>
    <div>Abonnements en attente : {stats.waitingSubscriptions}</div>
      </div>

      {/* Subscriptions Per Course */}
      <div style={{ marginBottom: '30px' }}>
        <h2>Abonnements par cours</h2>
        {isArray(stats.subscriptionsPerCourse) && stats.subscriptionsPerCourse.length > 0 ? (
          <ul>
            {stats.subscriptionsPerCourse.map((course, index) => (
              <li key={index}>
                Cours ID: {course._id} - Abonnements : {course.numSubscriptions}
              </li>
            ))}
          </ul>
        ) : (
          <div>Aucune donnée de cours disponible</div>
        )}
      </div>

      {/* Subscriptions Per Student */}
      <div style={{ marginBottom: '30px' }}>
        <h2>Abonnements par étudiant</h2>
        {isArray(stats.subscriptionsPerStudent) && stats.subscriptionsPerStudent.length > 0 ? (
          <ul>
            {stats.subscriptionsPerStudent.map((student, index) => (
              <li key={index}>
                Student ID: {student._id} - Subscriptions: {student.numSubscriptions}
              </li>
            ))}
          </ul>
        ) : (
          <div>Aucune donnée d’étudiant disponible</div>
        )}
      </div>

      {/* Average Points */}
      <div style={{ marginBottom: '30px' }}>
        <h2>Moyenne des Points</h2>
        <div>{stats.avgPoints}</div>
      </div>

      {/* New Subscriptions Over Time */}
      <div style={{ marginBottom: '30px' }}>
        <h2>Nouvelles souscriptions au fil du temps</h2>
        {isArray(stats.newSubscriptionsOverTime) && stats.newSubscriptionsOverTime.length > 0 ? (
          <ul>
            {stats.newSubscriptionsOverTime.map((date, index) => (
              <li key={index}>
                Date: {date._id} - Nouvelle  Subscriptions: {date.total}
              </li>
            ))}
          </ul>
        ) : (
          <div> Aucune nouvelle donnée d'abonnement disponible.</div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionStats;
