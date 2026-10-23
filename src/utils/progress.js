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

export function getActivities() {
  return activities;
}

export function initializeStudentProgress(userId) {
  const allProgress = JSON.parse(
    localStorage.getItem("netlabProgress") || "[]"
  );

  const studentExists = allProgress.some(
    (progress) => progress.userId === userId
  );

  if (studentExists) {
    return;
  }

  const studentProgress = activities.map(
    (activity, index) => ({
      userId,
      activityId: activity.id,
      title: activity.title,
      type: activity.type,
      order: index + 1,
      status: "not-started",
      progress: 0,
      completedAt: null,
    })
  );

  localStorage.setItem(
    "netlabProgress",
    JSON.stringify([
      ...allProgress,
      ...studentProgress,
    ])
  );
}

export function getStudentProgress(userId) {
  const allProgress = JSON.parse(
    localStorage.getItem("netlabProgress") || "[]"
  );

  return allProgress
    .filter(
      (progress) => progress.userId === userId
    )
    .sort((a, b) => a.order - b.order);
}

export function updateActivityProgress(
  userId,
  activityId,
  progressValue
) {
  const allProgress = JSON.parse(
    localStorage.getItem("netlabProgress") || "[]"
  );

  const currentIndex = activities.findIndex(
    (activity) => activity.id === activityId
  );

  if (currentIndex === -1) {
    return false;
  }

  const studentProgress = allProgress
    .filter(
      (activity) => activity.userId === userId
    )
    .sort((a, b) => a.order - b.order);

  if (studentProgress.length === 0) {
    return false;
  }

  const currentActivity =
    studentProgress.find(
      (activity) =>
        activity.activityId === activityId
    );

  if (!currentActivity) {
    return false;
  }

  const previousActivity =
    studentProgress[currentIndex - 1];

  if (
    currentIndex > 0 &&
    previousActivity &&
    previousActivity.status !== "completed"
  ) {
    return false;
  }

  const progress = Math.min(
    100,
    Math.max(0, progressValue)
  );

  const updatedProgress = allProgress.map(
    (activity) => {
      if (
        activity.userId === userId &&
        activity.activityId === activityId
      ) {
        return {
          ...activity,
          progress,
          status:
            progress >= 100
              ? "completed"
              : progress > 0
              ? "in-progress"
              : "not-started",
          completedAt:
            progress >= 100
              ? activity.completedAt ||
                new Date().toISOString()
              : null,
        };
      }

      return activity;
    }
  );

  localStorage.setItem(
    "netlabProgress",
    JSON.stringify(updatedProgress)
  );

  return true;
}

export function calculateOverallProgress(userId) {
  const studentProgress =
    getStudentProgress(userId);

  if (studentProgress.length === 0) {
    return 0;
  }

  const completedCount =
    studentProgress.filter(
      (activity) =>
        activity.status === "completed"
    ).length;

  return Math.round(
    (completedCount / activities.length) * 100
  );
}

export function getCompletedActivities(userId) {
  const studentProgress =
    getStudentProgress(userId);

  return studentProgress.filter(
    (activity) =>
      activity.status === "completed"
  ).length;
}

export function getLastActivity(userId) {
  const studentProgress =
    getStudentProgress(userId);

  const completedActivities =
    studentProgress.filter(
      (activity) =>
        activity.status === "completed"
    );

  if (completedActivities.length === 0) {
    return null;
  }

  return completedActivities[
    completedActivities.length - 1
  ];
}

export function getCurrentActivity(userId) {
  const studentProgress =
    getStudentProgress(userId);

  if (studentProgress.length === 0) {
    return activities[0] || null;
  }

  const currentActivity =
    studentProgress.find(
      (activity) =>
        activity.status === "in-progress"
    );

  if (currentActivity) {
    return currentActivity;
  }

  const nextActivity =
    studentProgress.find(
      (activity) =>
        activity.status === "not-started"
    );

  return nextActivity || null;
}

export function getNextActivity(userId) {
  const studentProgress =
    getStudentProgress(userId);

  const nextActivity =
    studentProgress.find(
      (activity) =>
        activity.status === "not-started"
    );

  return nextActivity || null;
}

export function getStudentLearningStatus(userId) {
  const studentProgress =
    getStudentProgress(userId);

  if (studentProgress.length === 0) {
    return {
      progress: 0,
      lastActivity: null,
      currentActivity: activities[0] || null,
      nextActivity: activities[0] || null,
      completed: false,
    };
  }

  const completedActivities =
    studentProgress.filter(
      (activity) =>
        activity.status === "completed"
    );

  const progress = Math.round(
    (completedActivities.length /
      activities.length) *
      100
  );

  const lastActivity =
    completedActivities.length > 0
      ? completedActivities[
          completedActivities.length - 1
        ]
      : null;

  const currentActivity =
    studentProgress.find(
      (activity) =>
        activity.status === "in-progress"
    ) ||
    studentProgress.find(
      (activity) =>
        activity.status === "not-started"
    ) ||
    null;

  const nextActivity =
    studentProgress.find(
      (activity) =>
        activity.status === "not-started"
    ) || null;

  return {
    progress,
    lastActivity,
    currentActivity,
    nextActivity,
    completed:
      completedActivities.length ===
      activities.length,
  };
}