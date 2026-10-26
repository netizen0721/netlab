import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { getTrackedLearningStatus } from "../utils/progressTracker";
import { supabase } from "../lib/supabase";

export default function TeacherDashboard() {
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [loadingStudents, setLoadingStudents] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoadingStudents(true);

      const { data: studentData, error: studentError } =
        await supabase
          .from("profiles")
          .select("id, full_name, username, role, created_at")
          .eq("role", "student")
          .order("created_at", { ascending: true });

      if (studentError) {
        console.error("Failed to load students:", studentError);
      } else {
        setStudents(
          (studentData || []).map((student) => ({
            ...student,
            fullName: student.full_name,
          }))
        );
      }

      const username = localStorage.getItem("netlabUser");

      if (username) {
        const { data: teacherData, error: teacherError } =
          await supabase
            .from("profiles")
            .select("id, full_name, username, role")
            .eq("username", username)
            .eq("role", "teacher")
            .maybeSingle();

        if (teacherError) {
          console.error("Failed to load teacher:", teacherError);
        } else {
          setCurrentTeacher(
            teacherData
              ? {
                  ...teacherData,
                  fullName: teacherData.full_name,
                }
              : null
          );
        }
      }

      setLoadingStudents(false);
    };

    loadDashboardData();
  }, []);

  const activities = [
    {
      id: "dasar-jaringan",
      title: "Dasar Jaringan",
      type: "Material",
    },
    {
      id: "perangkat-jaringan",
      title: "Perangkat Jaringan",
      type: "Material",
    },
    {
      id: "3d-hardware-lab",
      title: "3D Hardware Lab",
      type: "Interactive Lab",
    },
    {
      id: "topologi-jaringan",
      title: "Topologi Jaringan",
      type: "Material",
    },
    {
      id: "network-lab",
      title: "Network Lab",
      type: "Practical Lab",
    },
    {
      id: "kabel-lan",
      title: "Kabel LAN",
      type: "Material",
    },
    {
      id: "cable-lab",
      title: "Cable Lab",
      type: "Practical Lab",
    },
    {
      id: "troubleshoot-materi",
      title: "Troubleshooting Jaringan",
      type: "Material",
    },
    {
      id: "troubleshoot-lab",
      title: "Troubleshoot Lab",
      type: "Practical Lab",
    },
  ];

  const learningMaterials = [
    {
      title: "Dasar Jaringan",
      description:
        "Basic material about computer network concepts and fundamentals.",
      path: "/materi/dasar-jaringan",
    },
    {
      title: "Perangkat Jaringan",
      description:
        "Learn about various devices used in computer networks.",
      path: "/materi/perangkat-jaringan",
    },
    {
      title: "Topologi Jaringan",
      description:
        "Learn about different types and characteristics of network topologies.",
      path: "/materi/topologi-jaringan",
    },
    {
      title: "Kabel LAN",
      description:
        "Learn about LAN cable types and cable color arrangements.",
      path: "/materi/kabel-lan",
    },
    {
      title: "Troubleshooting Jaringan",
      description:
        "Learn how to identify and solve network problems.",
      path: "/materi/troubleshoot",
    },
  ];

  const practicalLabs = [
    {
      title: "3D Hardware Lab",
      description:
        "Learn about network hardware components interactively.",
      path: "/ar-hardware",
    },
    {
      title: "Network Lab",
      description:
        "Create and configure network topologies interactively.",
      path: "/network-lab",
    },
    {
      title: "Cable Lab",
      description:
        "Practice arranging LAN cables according to color standards.",
      path: "/cable-lab",
    },
    {
      title: "Troubleshoot Lab",
      description:
        "Solve various network troubleshooting cases.",
      path: "/troubleshoot-lab",
    },
  ];

  const getStudentLearningStatus = (student) => {
    try {
      return getTrackedLearningStatus(student.id);
    } catch {
      return {
        progress: 0,
        completedCount: 0,
        totalActivities: 9,
        activities: [],
      };
    }
  };

  const studentProgressList = students.map(
    (student) => {
      const learningStatus =
        getStudentLearningStatus(student);

      return {
        student,
        learningStatus,
        progress: learningStatus?.progress || 0,
      };
    }
  );

  const getActivityResult = (activityId) => {
    const completedStudents =
      studentProgressList.filter(
        ({ learningStatus }) =>
          learningStatus.activities?.some(
            (activity) =>
              activity.activityId === activityId &&
              activity.status === "completed"
          )
      ).length;

    const totalStudents = students.length;

    const percentage =
      totalStudents > 0
        ? Math.round(
            (completedStudents / totalStudents) * 100
          )
        : 0;

    return {
      completedStudents,
      totalStudents,
      percentage,
    };
  };

  const activeStudents =
    studentProgressList.filter(
      ({ progress }) => progress > 0
    ).length;

  const completedActivities =
    studentProgressList.filter(
      ({ progress }) => progress >= 80
    ).length;

  const averageProgress =
    studentProgressList.length > 0
      ? Math.round(
          studentProgressList.reduce(
            (total, { progress }) =>
              total + progress,
            0
          ) / studentProgressList.length
        )
      : 0;

  const handleLogout = () => {
    localStorage.removeItem("netlabUser");
    localStorage.removeItem("netlabRole");
    localStorage.removeItem("netlabUserId");
    window.location.href = "/";
  };

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const toggleStudent = (studentId) => {
    setExpandedStudent(
      expandedStudent === studentId
        ? null
        : studentId
    );
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-navbar">
        <Link
          to="/teacher-dashboard"
          className="dashboard-brand"
        >
          <div className="dashboard-brand-icon">
            NET
          </div>

          <div>
            <strong>NETLAB</strong>
            <span>Teacher Dashboard</span>
          </div>
        </Link>

        <div className="dashboard-user">
          <div className="dashboard-user-info">
            <strong>
              {currentTeacher?.fullName ||
                "NETLAB Teacher"}
            </strong>
            <span>Teacher</span>
          </div>

          <button
            className="dashboard-logout"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="dashboard-heading">
          <div>
            <p className="dashboard-label">
              TEACHER PANEL
            </p>

            <h1>Welcome, Teacher</h1>

            <p>
              Monitor student learning progress,
              activities, and practical lab performance.
            </p>
          </div>
        </section>

        <section className="dashboard-stats">
          <div className="dashboard-stat-card">
            <div className="stat-icon">👨‍🎓</div>

            <div>
              <span>Students Enrolled</span>
              <strong>
                {students.length}/20
              </strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">🟢</div>

            <div>
              <span>Active Learners</span>
              <strong>
                {activeStudents}
              </strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">📈</div>

            <div>
              <span>Average Progress</span>
              <strong>
                {averageProgress}%
              </strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">✓</div>

            <div>
              <span>Completed Activities</span>
              <strong>
                {completedActivities}
              </strong>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div
            id="student-progress-section"
            className="dashboard-panel"
          >
            <div className="panel-header">
              <div>
                <p className="panel-label">
                  STUDENT MONITORING
                </p>

                <h2>Student Progress</h2>
              </div>
            </div>

            {students.length === 0 ? (
              <div className="empty-dashboard">
                <div className="empty-dashboard-icon">
                  👨‍🎓
                </div>

                <strong>
                  No students registered yet
                </strong>

                <span>
                  Student accounts will appear here
                  once they register.
                </span>
              </div>
            ) : (
              <div className="student-progress-list">
                {studentProgressList.map(
                  ({
                    student,
                    learningStatus,
                    progress,
                  }) => {
                    const isExpanded =
                      expandedStudent ===
                      student.id;

                    const completedCount =
                      learningStatus?.completedCount ||
                      0;

                    const totalActivities =
                      learningStatus?.totalActivities ||
                      9;

                    const studentActivities =
                      learningStatus?.activities || [];

                    return (
                      <div
                        className="student-progress-row"
                        key={student.id}
                        onClick={() =>
                          toggleStudent(student.id)
                        }
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <div className="student-avatar">
                          {student.fullName
                            ?.charAt(0)
                            .toUpperCase() || "S"}
                        </div>

                        <div className="student-progress-info">
                          <div className="student-progress-top">
                            <strong>
                              {student.fullName}
                            </strong>

                            <span>
                              {completedCount}/
                              {totalActivities} ·{" "}
                              {progress}%
                            </span>
                          </div>

                          <div className="progress-bar">
                            <div
                              className="progress-bar-fill"
                              style={{
                                width: `${progress}%`,
                              }}
                            ></div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "space-between",
                              gap: "10px",
                            }}
                          >
                            <small>
                              @{student.username}
                            </small>

                            <span
                              style={{
                                fontSize:
                                  "11px",
                                color:
                                  "#a855f7",
                                fontWeight:
                                  "700",
                              }}
                            >
                              {isExpanded
                                ? "▲ Close Details"
                                : "▼ View Details"}
                            </span>
                          </div>

                          {isExpanded && (
                            <div
                              onClick={(event) =>
                                event.stopPropagation()
                              }
                              style={{
                                marginTop: "14px",
                                display: "grid",
                                gap: "7px",
                                paddingTop:
                                  "12px",
                                borderTop:
                                  "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              <div
                                style={{
                                  fontSize:
                                    "12px",
                                  fontWeight:
                                    "800",
                                  color:
                                    "#ffffff",
                                  marginBottom:
                                    "3px",
                                }}
                              >
                                PROGRESS DETAILS
                              </div>

                              {studentActivities.map(
                                (activity) => (
                                  <div
                                    key={
                                      activity.activityId
                                    }
                                    style={{
                                      display:
                                        "flex",
                                      alignItems:
                                        "center",
                                      justifyContent:
                                        "space-between",
                                      gap: "12px",
                                      padding:
                                        "8px 10px",
                                      borderRadius:
                                        "8px",
                                      background:
                                        "rgba(255,255,255,0.03)",
                                      border:
                                        "1px solid rgba(255,255,255,0.06)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize:
                                          "12px",
                                        color:
                                          "#e5e7eb",
                                      }}
                                    >
                                      {activity.order}.{" "}
                                      {
                                        activity.title
                                      }
                                    </span>

                                    <span
                                      style={{
                                        fontSize:
                                          "11px",
                                        fontWeight:
                                          "700",
                                        color:
                                          activity.status ===
                                          "completed"
                                            ? "#4ade80"
                                            : activity.status ===
                                              "current"
                                            ? "#facc15"
                                            : "#94a3b8",
                                        whiteSpace:
                                          "nowrap",
                                      }}
                                    >
                                      {activity.status ===
                                      "completed"
                                        ? "✓ Completed"
                                        : activity.status ===
                                          "current"
                                        ? "● In Progress"
                                        : "○ Not Completed"}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>

          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <p className="panel-label">
                  QUICK ACCESS
                </p>

                <h2>Teacher Tools</h2>
              </div>
            </div>

            <div className="quick-actions">
              <button
                className="quick-action"
                onClick={() =>
                  scrollToSection(
                    "student-progress-section"
                  )
                }
              >
                <span>👨‍🎓</span>

                <div>
                  <strong>
                    Student Progress
                  </strong>

                  <small>
                    Monitor student learning progress
                  </small>
                </div>
              </button>

              <button
                className="quick-action"
                onClick={() =>
                  scrollToSection(
                    "learning-materials-section"
                  )
                }
              >
                <span>📚</span>

                <div>
                  <strong>
                    Learning Materials
                  </strong>

                  <small>
                    View NETLAB learning materials
                  </small>
                </div>
              </button>

              <button
                className="quick-action"
                onClick={() =>
                  scrollToSection(
                    "practical-labs-section"
                  )
                }
              >
                <span>🧪</span>

                <div>
                  <strong>
                    Practical Labs
                  </strong>

                  <small>
                    Review available practical labs
                  </small>
                </div>
              </button>

              <button
                className="quick-action"
                onClick={() =>
                  scrollToSection(
                    "activity-results-section"
                  )
                }
              >
                <span>📊</span>

                <div>
                  <strong>
                    Activity Results
                  </strong>

                  <small>
                    Review student activity results
                  </small>
                </div>
              </button>
            </div>
          </div>
        </section>

        <section
          id="learning-materials-section"
          className="dashboard-panel activity-panel"
        >
          <div className="panel-header">
            <div>
              <p className="panel-label">
                LEARNING MATERIALS
              </p>

              <h2>NETLAB Learning Materials</h2>
            </div>
          </div>

          <div className="activity-grid">
            {learningMaterials.map((material) => (
              <div
                className="activity-card"
                key={material.title}
              >
                <div className="activity-card-top">
                  <span className="activity-type">
                    Material
                  </span>

                  <span className="activity-status">
                    Available
                  </span>
                </div>

                <h3>{material.title}</h3>

                <p>{material.description}</p>

                <Link
                  to={material.path}
                  className="quick-action"
                  style={{
                    marginTop: "14px",
                    textDecoration: "none",
                  }}
                >
                  📖 Open Material
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section
          id="practical-labs-section"
          className="dashboard-panel activity-panel"
        >
          <div className="panel-header">
            <div>
              <p className="panel-label">
                PRACTICAL LABS
              </p>

              <h2>NETLAB Practical Labs</h2>
            </div>
          </div>

          <div className="activity-grid">
            {practicalLabs.map((lab) => (
              <div
                className="activity-card"
                key={lab.title}
              >
                <div className="activity-card-top">
                  <span className="activity-type">
                    Practical Lab
                  </span>

                  <span className="activity-status">
                    Available
                  </span>
                </div>

                <h3>{lab.title}</h3>

                <p>{lab.description}</p>

                <Link
                  to={lab.path}
                  className="quick-action"
                  style={{
                    marginTop: "14px",
                    textDecoration: "none",
                  }}
                >
                  🧪 Open Lab
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section
          id="activity-results-section"
          className="dashboard-panel activity-panel"
        >
          <div className="panel-header">
            <div>
              <p className="panel-label">
                ACTIVITY RESULTS
              </p>

              <h2>Student Activity Results</h2>
            </div>
          </div>

          {students.length === 0 ? (
            <div className="empty-dashboard">
              <div className="empty-dashboard-icon">
                📊
              </div>

              <strong>
                No student results available
              </strong>

              <span>
                Student activity results will appear
                here once students start learning.
              </span>
            </div>
          ) : (
            <div className="activity-grid">
              {studentProgressList.map(
                ({
                  student,
                  learningStatus,
                }) => (
                  <div
                    className="activity-card"
                    key={student.id}
                  >
                    <div className="activity-card-top">
                      <span className="activity-type">
                        Student
                      </span>

                      <span className="activity-status">
                        {
                          learningStatus.completedCount
                        }
                        /
                        {
                          learningStatus.totalActivities
                        }
                      </span>
                    </div>

                    <h3>
                      {student.fullName}
                    </h3>

                    <p>
                      Overall progress:{" "}
                      <strong>
                        {learningStatus.progress}%
                      </strong>
                    </p>

                    <div
                      style={{
                        marginTop: "12px",
                        display: "grid",
                        gap: "7px",
                      }}
                    >
                      {learningStatus.activities.map(
                        (activity) => (
                          <div
                            key={
                              activity.activityId
                            }
                            style={{
                              display: "flex",
                              justifyContent:
                                "space-between",
                              gap: "10px",
                              fontSize: "12px",
                            }}
                          >
                            <span>
                              {activity.title}
                            </span>

                            <span
                              style={{
                                color:
                                  activity.status ===
                                  "completed"
                                    ? "#4ade80"
                                    : "#94a3b8",
                                fontWeight: "700",
                              }}
                            >
                              {activity.status ===
                              "completed"
                                ? "Completed"
                                : "Not Completed"}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        <section className="dashboard-panel activity-panel">
          <div className="panel-header">
            <div>
              <p className="panel-label">
                NETLAB ACTIVITIES
              </p>

              <h2>Learning Activities</h2>
            </div>
          </div>

          {students.length === 0 ? (
            <div className="empty-dashboard">
              <div className="empty-dashboard-icon">
                📚
              </div>

              <strong>
                No student data available
              </strong>

              <span>
                Activity progress will appear here
                once students start learning.
              </span>
            </div>
          ) : (
            <div className="activity-grid">
              {activities.map((activity) => {
                const result =
                  getActivityResult(activity.id);

                return (
                  <div
                    className="activity-card"
                    key={activity.id}
                  >
                    <div className="activity-card-top">
                      <span className="activity-type">
                        {activity.type}
                      </span>

                      <span className="activity-status">
                        {result.completedStudents}/
                        {result.totalStudents}
                      </span>
                    </div>

                    <h3>
                      {activity.title}
                    </h3>

                    <p>
                      {result.completedStudents} of{" "}
                      {result.totalStudents} students
                      have completed this activity.
                    </p>

                    <div
                      style={{
                        marginTop: "14px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems: "center",
                          marginBottom: "7px",
                          fontSize: "12px",
                        }}
                      >
                        <span>
                          Completion Rate
                        </span>

                        <strong>
                          {result.percentage}%
                        </strong>
                      </div>

                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${result.percentage}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: "12px",
                        fontSize: "12px",
                        fontWeight: "700",
                        color:
                          result.percentage === 100
                            ? "#4ade80"
                            : result.percentage > 0
                            ? "#facc15"
                            : "#94a3b8",
                      }}
                    >
                      {result.percentage === 100
                        ? "✓ All students completed"
                        : result.percentage > 0
                        ? "● In Progress"
                        : "○ Not Started"}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}