import { getActivities } from "./progress";

const COMPLETED_MATERIALS_KEY = "netlabCompletedMaterials";
const PROGRESS_KEY = "netlabProgress";
const LEGACY_LAST_ACTIVITY_KEY = "netlabLastActivity";

function getCompletedMaterials() {
  try {
    const data = JSON.parse(
      localStorage.getItem(COMPLETED_MATERIALS_KEY) || "{}"
    );

    if (
      data &&
      typeof data === "object" &&
      !Array.isArray(data)
    ) {
      return data;
    }

    return {};
  } catch {
    return {};
  }
}

function getProgressData() {
  try {
    const data = JSON.parse(
      localStorage.getItem(PROGRESS_KEY) || "[]"
    );

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function isMaterialCompleted(userId, activityId) {
  const completedMaterials = getCompletedMaterials();

  const userMaterials =
    completedMaterials[String(userId)] || [];

  return userMaterials.includes(activityId);
}

function isProgressCompleted(userId, activityId) {
  const progressData = getProgressData();

  return progressData.some(
    (item) =>
      String(item.userId) === String(userId) &&
      item.activityId === activityId &&
      (
        item.status === "completed" ||
        Number(item.progress) >= 100
      )
  );
}

function isActivityCompletedForUser(
  userId,
  activityId
) {
  return (
    isMaterialCompleted(
      userId,
      activityId
    ) ||
    isProgressCompleted(
      userId,
      activityId
    )
  );
}

export function getTrackedProgress(userId) {
  const activities = getActivities();

  const tracked = activities.map(
    (activity, index) => {
      const completed =
        isActivityCompletedForUser(
          userId,
          activity.id
        );

      return {
        activityId: activity.id,
        title: activity.title,
        type: activity.type,
        order: index + 1,
        status: completed
          ? "completed"
          : "not-started",
        progress: completed ? 100 : 0,
      };
    }
  );

  let foundIncomplete = false;

  return tracked.map((activity) => {
    if (activity.status === "completed") {
      return activity;
    }

    if (!foundIncomplete) {
      foundIncomplete = true;

      return {
        ...activity,
        status: "current",
        progress: 0,
      };
    }

    return {
      ...activity,
      status: "locked",
      progress: 0,
    };
  });
}

export function getTrackedCompletedCount(userId) {
  const activities = getActivities();

  return activities.filter(
    (activity) =>
      isActivityCompletedForUser(
        userId,
        activity.id
      )
  ).length;
}

export function getTrackedOverallProgress(userId) {
  const activities = getActivities();

  if (activities.length === 0) {
    return 0;
  }

  const completed =
    getTrackedCompletedCount(userId);

  return Math.round(
    (completed / activities.length) * 100
  );
}

export function getTrackedLastActivity(userId) {
  const completed =
    getTrackedProgress(userId).filter(
      (activity) =>
        activity.status === "completed"
    );

  if (completed.length === 0) {
    return null;
  }

  return completed[completed.length - 1];
}

export function getTrackedCurrentActivity(userId) {
  return (
    getTrackedProgress(userId).find(
      (activity) =>
        activity.status === "current"
    ) || null
  );
}

export function getTrackedNextActivity(userId) {
  return getTrackedCurrentActivity(userId);
}

export function isActivityCompleted(
  userId,
  activityId
) {
  return getTrackedProgress(userId).some(
    (activity) =>
      activity.activityId === activityId &&
      activity.status === "completed"
  );
}

export function isActivityUnlocked(
  userId,
  activityId
) {
  const activity =
    getTrackedProgress(userId).find(
      (item) =>
        item.activityId === activityId
    );

  if (!activity) {
    return false;
  }

  return (
    activity.status === "current" ||
    activity.status === "completed"
  );
}

export function getTrackedLearningStatus(userId) {
  const activities =
    getTrackedProgress(userId);

  const completedCount =
    getTrackedCompletedCount(userId);

  const progress =
    getTrackedOverallProgress(userId);

  const lastActivity =
    getTrackedLastActivity(userId);

  const currentActivity =
    getTrackedCurrentActivity(userId);

  const nextActivity =
    getTrackedNextActivity(userId);

  return {
    progress,
    completedCount,
    totalActivities: activities.length,
    lastActivity,
    currentActivity,
    nextActivity,
    completed:
      activities.length > 0 &&
      completedCount === activities.length,
    activities,
  };
}

export function syncLegacyProgress(userId) {
  const activities = getActivities();

  const existing = getProgressData();

  const otherUsers = existing.filter(
    (item) =>
      String(item.userId) !== String(userId)
  );

  const synced = activities.map(
    (activity, index) => {
      const completed =
        isActivityCompletedForUser(
          userId,
          activity.id
        );

      return {
        userId: Number(userId),
        activityId: activity.id,
        title: activity.title,
        type: activity.type,
        order: index + 1,
        status: completed
          ? "completed"
          : "not-started",
        progress: completed ? 100 : 0,
        completedAt: completed
          ? new Date().toISOString()
          : null,
      };
    }
  );

  localStorage.setItem(
    PROGRESS_KEY,
    JSON.stringify([
      ...otherUsers,
      ...synced,
    ])
  );

  return synced;
}

export function getLastLegacyActivity() {
  return localStorage.getItem(
    LEGACY_LAST_ACTIVITY_KEY
  );
}