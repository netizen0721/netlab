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

// Memeriksa penyelesaian berdasarkan progress Supabase yang
// sudah disalin ke cache oleh progress.js
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

// Mempertahankan dukungan data materi lama selama migrasi.
// Progress Supabase tetap menjadi sumber utama setelah cache diperbarui.
function isActivityCompletedForUser(userId, activityId) {
  const progressCompleted = isProgressCompleted(
    userId,
    activityId
  );

  if (progressCompleted) {
    return true;
  }

  return isMaterialCompleted(userId, activityId);
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
      isMaterialCompletedForUser(userId, activity.id);

    return {
      activityId: activity.id,
      title: activity.title,
      type: activity.type,
      order: index + 1,
      status: completed
        ? "completed"
        : "not-started",
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

// Persentase keseluruhan berdasarkan jumlah aktivitas selesai
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

  if (completed.length === 0) {
    return null;
  }

  return completed[completed.length - 1];
}

// Aktivitas yang sedang tersedia untuk dikerjakan
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

// Mengambil ringkasan progress siswa
export function getTrackedLearningStatus(userId) {
  const activities = getTrackedProgress(userId);
  const completedCount = getTrackedCompleted