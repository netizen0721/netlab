import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getTrackedLearningStatus,
} from "../utils/progressTracker";
import "./Progress.css";

function Progress() {
  const [learningStatus, setLearningStatus] =
    useState(null);

  useEffect(() => {
    const userId =
      localStorage.getItem("netlabUserId");

    if (!userId) {
      return;
    }

    const status =
      getTrackedLearningStatus(userId);

    setLearningStatus(status);
  }, []);

  if (!learningStatus) {
    return (
      <div className="progress-page">
        <div className="progress-empty">
          <h2>Progress Belum Tersedia</h2>
          <p>
            Silakan masuk terlebih dahulu untuk
            melihat progress pembelajaranmu.
          </p>

          <Link
            to="/sign-in"
            className="progress-primary-button"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="progress-page">

      <div className="progress-container">

        {/* HEADER */}

        <div className="progress-header">

          <div>

            <span className="progress-label">
              LEARNING PROGRESS
            </span>

            <h1>
              My Learning Progress
            </h1>

            <p>
              Pantau perkembangan pembelajaran
              jaringanmu dari awal hingga selesai.
            </p>

          </div>

          <Link
            to="/home"
            className="progress-home-button"
          >
            ← Home
          </Link>

        </div>


        {/* OVERALL PROGRESS */}

        <section className="progress-overview">

          <div className="progress-overview-top">

            <div>

              <span>
                OVERALL PROGRESS
              </span>

              <h2>
                {learningStatus.progress}%
              </h2>

            </div>

            <div className="progress-count">

              <strong>
                {learningStatus.completedCount}
              </strong>

              <span>
                / {learningStatus.totalActivities}
              </span>

              <small>
                Activities Completed
              </small>

            </div>

          </div>


          <div className="progress-bar">

            <div
              className="progress-bar-fill"
              style={{
                width:
                  `${learningStatus.progress}%`,
              }}
            ></div>

          </div>

        </section>


        {/* CURRENT LEARNING STATUS */}

        <div className="progress-status-grid">

          <section className="progress-status-card">

            <span className="progress-card-label">
              LAST ACTIVITY
            </span>

            {learningStatus.lastActivity ? (
              <>
                <h3>
                  {learningStatus.lastActivity.title}
                </h3>

                <p>
                  {learningStatus.lastActivity.type}
                </p>
              </>
            ) : (
              <>
                <h3>
                  Belum Ada
                </h3>

                <p>
                  Belum ada aktivitas yang selesai.
                </p>
              </>
            )}

          </section>


          <section className="progress-status-card">

            <span className="progress-card-label">
              CURRENT ACTIVITY
            </span>

            {learningStatus.currentActivity ? (
              <>
                <h3>
                  {learningStatus.currentActivity.title}
                </h3>

                <p>
                  {learningStatus.currentActivity.type}
                </p>
              </>
            ) : (
              <>
                <h3>
                  Semua Selesai
                </h3>

                <p>
                  Kamu telah menyelesaikan seluruh
                  pembelajaran.
                </p>
              </>
            )}

          </section>

        </div>


        {/* ACTIVITY LIST */}

        <section className="progress-activities">

          <div className="progress-section-heading">

            <div>

              <span>
                LEARNING PATH
              </span>

              <h2>
                Learning Activities
              </h2>

            </div>

            <p>
              {learningStatus.completedCount} dari{" "}
              {learningStatus.totalActivities} selesai
            </p>

          </div>


          <div className="progress-activity-list">

            {learningStatus.activities.map(
              (activity) => {

                const isCompleted =
                  activity.status ===
                  "completed";

                const isCurrent =
                  activity.status ===
                  "current";

                const isLocked =
                  activity.status ===
                  "locked";

                return (
                  <div
                    key={activity.activityId}
                    className={`progress-activity-item ${
                      isCompleted
                        ? "completed"
                        : ""
                    } ${
                      isCurrent
                        ? "current"
                        : ""
                    } ${
                      isLocked
                        ? "locked"
                        : ""
                    }`}
                  >

                    <div className="progress-activity-number">

                      {isCompleted
                        ? "✓"
                        : activity.order}

                    </div>


                    <div className="progress-activity-info">

                      <h3>
                        {activity.title}
                      </h3>

                      <p>
                        {activity.type}
                      </p>

                    </div>


                    <div className="progress-activity-status">

                      {isCompleted && (
                        <span className="status-completed">
                          Completed
                        </span>
                      )}

                      {isCurrent && (
                        <span className="status-current">
                          Current
                        </span>
                      )}

                      {isLocked && (
                        <span className="status-locked">
                          Locked
                        </span>
                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </section>


        {/* COMPLETION */}

        {learningStatus.completed && (

          <section className="progress-complete-card">

            <div className="progress-complete-icon">
              🎉
            </div>

            <div>

              <span>
                LEARNING COMPLETE
              </span>

              <h2>
                Semua Materi dan Lab Selesai!
              </h2>

              <p>
                Kamu telah menyelesaikan seluruh
                tahapan pembelajaran NETLAB.
              </p>

            </div>

          </section>

        )}

      </div>

    </div>
  );
}

export default Progress;