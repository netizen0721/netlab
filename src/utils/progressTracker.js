import {
  getActivities,
  getStudentProgress,
  refreshStudentProgress,
} from "./progress";

const COMPLETED_MATERIALS_KEY = "netlabCompletedMaterials";
const PROGRESS_KEY = "netlabProgress";
const LEGACY_LAST_ACTIVITY_KEY = "netlabLastActivity";

// Membaca data materi lama dari localStorage
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

// Membaca cache progress dari localStorage
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

// Memeriksa apakah materi tercatat selesai di data lama
function isMaterialCompleted(userId, activityId) {
  if (!userId) return false;

  const completedMaterials = getCompletedMaterials();
  const userMaterials =
    completedMaterials[String(userId)] || [];

  return userMaterials.includes(activityId);
}

// Membaca status aktivitas dari cache progress
function getCachedActivity(userId, activityId) {
  if (!userId) return null;

  const progressData = getProgressData();

  return (
    progressData.find(
      (item) =>
        String(item.userId) === String(userId) &&
        item.activityId === activityId
    ) || null
  );
}

// Memeriksa apakah aktivitas sudah selesai
function isProgressCompleted(userId, activityId) {
  const item = getCachedActivity(userId, activityId);

  return Boolean(
    item &&
      (
        item.status === "completed" ||
        Number(item.progress) >= 100
      )
  );
}

// Menggabungkan data progress dan data materi lama
function isActivityCompletedForUser(userId, activityId) {
  return (
    isProgressCompleted(userId, activityId) ||
    isMaterialCompleted(userId, activityId)
  );
}

// Menghasilkan daftar aktivitas beserta statusnya
export function getTrackedProgress(userId) {
  const activities = getActivities();

  if (!userId) {
    return activities.map((activity, index) => ({
      activityId: activity.id,
      title: activity.title,
      type: activity.type,
      order: index + 1,
      status: index === 0 ? "current" : "locked",
      progress: 0,
    }));
  }

  const studentProgress = getStudentProgress(userId);

  const tracked = activities.map((activity, index) => {
    const savedProgress = studentProgress.find(
      (item) => item.activityId === activity.id
    );

    const completed =
      savedProgress?.status === "completed" ||
      Number(savedProgress?.progress) >= 100 ||
      isActivityCompletedForUser(userId, activity.id);

    return {
      activityId: activity.id,
      title: activity.title,
      type: activity.type,
      order: index + 1,
      status: completed ? "completed" : "not-started",
      progress: completed
        ? 100
        : Number(savedProgress?.progress) || 0,
    };
  });

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
      };
    }

    return {
      ...activity,
      status: "locked",
      progress: 0,
    };
  });
}

// Jumlah aktivitas selesai
export function getTrackedCompletedCount(userId) {
  return getTrackedProgress(userId).filter(
    (activity) => activity.status === "completed"
  ).length;
}

// Persentase keseluruhan progress
export function getTrackedOverallProgress(userId) {
  const activities = getActivities();

  if (activities.length === 0) {
    return 0;
  }

  return Math.round(
    (getTrackedCompletedCount(userId) / activities.length) * 100
  );
}

// Aktivitas terakhir yang selesai
export function getTrackedLastActivity(userId) {
  const completed = getTrackedProgress(userId).filter(
    (activity) => activity.status === "completed"
  );

  return completed.length > 0
    ? completed[completed.length - 1]
    : null;
}

// Aktivitas yang sedang tersedia
export function getTrackedCurrentActivity(userId) {
  return (
    getTrackedProgress(userId).find(
      (activity) => activity.status === "current"
    ) || null
  );
}

// Aktivitas berikutnya yang tersedia
export function getTrackedNextActivity(userId) {
  return getTrackedCurrentActivity(userId);
}

// Memeriksa apakah aktivitas sudah selesai
export function isActivityCompleted(userId, activityId) {
  return getTrackedProgress(userId).some(
    (activity) =>
      activity.activityId === activityId &&
      activity.status === "completed"
  );
}

// Memeriksa apakah aktivitas sudah terbuka
export function isActivityUnlocked(userId, activityId) {
  const activity = getTrackedProgress(userId).find(
    (item) => item.activityId === activityId
  );

  if (!activity) {
    return false;
  }

  return (
    activity.status === "current" ||
    activity.status === "completed"
  );
}

// Ringkasan progress siswa
export function getTrackedLearningStatus(userId) {
  const activities = getTrackedProgress(userId);
  const completedCount = getTrackedCompletedCount(userId);
  const progress = getTrackedOverallProgress(userId);

  return {
    progress,
    completedCount,
    totalActivities: activities.length,
    lastActivity: getTrackedLastActivity(userId),
    currentActivity: getTrackedCurrentActivity(userId),
    nextActivity: getTrackedNextActivity(userId),
    completed:
      activities.length > 0 &&
      completedCount === activities.length,
    activities,
  };
}

// Mengambil data terbaru dari Supabase dan memperbarui cache
export async function refreshTrackedProgress(userId) {
  if (!userId) {
    return [];
  }

  await refreshStudentProgress(userId);

  return getTrackedProgress(userId);
}

// Sinkronisasi cache lokal untuk kompatibilitas dengan data lama
export function syncLegacyProgress(userId) {
  if (!userId) {
    return [];
  }

  const activities = getActivities();
  const existing = getProgressData();

  const otherUsers = existing.filter(
    (item) => String(item.userId) !== String(userId)
  );

  const studentProgress = getStudentProgress(userId);

  const synced = activities.map((activity, index) => {
    const savedProgress = studentProgress.find(
      (item) => item.activityId === activity.id
    );

    const completed =
      savedProgress?.status === "completed" ||
      Number(savedProgress?.progress) >= 100 ||
      isMaterialCompleted(userId, activity.id);

    return {
      userId: String(userId),
      activityId: activity.id,
      title: activity.title,
      type: activity.type,
      order: index + 1,
      status: completed
        ? "completed"
        : savedProgress?.status || "not-started",
      progress: completed
        ? 100
        : Number(savedProgress?.progress) || 0,
      completedAt: completed
        ? savedProgress?.completedAt || new Date().toISOString()
        : null,
    };
  });

  localStorage.setItem(
    PROGRESS_KEY,
    JSON.stringify([...otherUsers, ...synced])
  );

  return synced;
}

// Membaca aktivitas terakhir dari data lama
export function getLastLegacyActivity() {
  return localStorage.getItem(LEGACY_LAST_ACTIVITY_KEY);
}