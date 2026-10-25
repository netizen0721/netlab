import { supabase } from "../lib/supabase";

const PROGRESS_KEY = "netlabProgress";

const activities = [
  { id: "dasar-jaringan", title: "Dasar Jaringan", type: "Material" },
  { id: "perangkat-jaringan", title: "Perangkat Jaringan", type: "Material" },
  { id: "3d-hardware-lab", title: "3D Hardware Lab", type: "Interactive Lab" },
  { id: "topologi-jaringan", title: "Topologi Jaringan", type: "Material" },
  { id: "network-lab", title: "Network Lab", type: "Practical Lab" },
  { id: "kabel-lan", title: "Kabel LAN", type: "Material" },
  { id: "cable-lab", title: "Cable Lab", type: "Practical Lab" },
  { id: "troubleshoot-materi", title: "Troubleshooting Jaringan", type: "Material" },
  { id: "troubleshoot-lab", title: "Troubleshoot Lab", type: "Practical Lab" },
];

export function getActivities() {
  return activities;
}

function validateUserId(userId) {
  if (
    typeof userId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      userId
    )
  ) {
    throw new Error(
      "ID siswa bukan UUID Supabase. Silakan login ulang menggunakan akun yang valid."
    );
  }
}

function getLocalProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveLocalProgress(data) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

function mapDatabaseProgress(row) {
  const activity = activities.find(
    (item) => item.id === row.activity_key
  );

  if (!activity) return null;

  return {
    userId: row.user_id,
    activityId: row.activity_key,
    title: activity.title,
    type: activity.type,
    order:
      activities.findIndex((item) => item.id === row.activity_key) + 1,
    status: row.completed
      ? "completed"
      : row.progress_percent > 0
        ? "in-progress"
        : "not-started",
    progress: row.progress_percent,
    completedAt: row.completed ? row.updated_at : null,
  };
}

function cacheStudentProgress(userId, studentRows) {
  const otherUsers = getLocalProgress().filter(
    (item) => String(item.userId) !== String(userId)
  );

  const sortedRows = studentRows
    .map(mapDatabaseProgress)
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);

  saveLocalProgress([...otherUsers, ...sortedRows]);

  return sortedRows;
}

function normalizeProgress(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) return 0;

  return Math.min(100, Math.max(0, Math.round(number)));
}

export async function refreshStudentProgress(userId) {
  validateUserId(userId);

  const { data, error } = await supabase
    .from("learning_progress")
    .select("user_id, activity_key, progress_percent, completed, updated_at")
    .eq("user_id", userId);

  if (error) {
    console.error("Gagal mengambil progress Supabase:", error);
    throw error;
  }

  return cacheStudentProgress(userId, data || []);
}

export async function initializeStudentProgress(userId) {
  validateUserId(userId);

  const rows = activities.map((activity) => ({
    user_id: userId,
    activity_key: activity.id,
    progress_percent: 0,
    completed: false,
  }));

  const { error } = await supabase
    .from("learning_progress")
    .upsert(rows, {
      onConflict: "user_id,activity_key",
      ignoreDuplicates: true,
    });

  if (error) {
    console.error("Gagal membuat progress siswa:", error);
    throw error;
  }

  return refreshStudentProgress(userId);
}

export function getStudentProgress(userId) {
  if (!userId) return [];

  return getLocalProgress()
    .filter((item) => String(item.userId) === String(userId))
    .sort((a, b) => a.order - b.order);
}

export async function updateActivityProgress(
  userId,
  activityId,
  progressValue
) {
  validateUserId(userId);

  const currentIndex = activities.findIndex(
    (activity) => activity.id === activityId
  );

  if (currentIndex === -1) {
    throw new Error(`Aktivitas tidak ditemukan: ${activityId}`);
  }

  const progress = normalizeProgress(progressValue);

  const { data: rows, error: fetchError } = await supabase
    .from("learning_progress")
    .select("user_id, activity_key, progress_percent, completed, updated_at")
    .eq("user_id", userId);

  if (fetchError) {
    console.error("Gagal memeriksa urutan progress:", fetchError);
    throw fetchError;
  }

  let currentRows = rows || [];

  if (currentRows.length === 0) {
    await initializeStudentProgress(userId);

    const { data: refreshedRows, error: refreshedError } = await supabase
      .from("learning_progress")
      .select("user_id, activity_key, progress_percent, completed, updated_at")
      .eq("user_id", userId);

    if (refreshedError) {
      console.error("Gagal membaca ulang progress:", refreshedError);
      throw refreshedError;
    }

    currentRows = refreshedRows || [];
  }

  const currentRow = currentRows.find(
    (row) => row.activity_key === activityId
  );

  if (!currentRow) {
    throw new Error(
      `Data aktivitas ${activityId} belum tersedia di Supabase.`
    );
  }

  if (currentIndex > 0) {
    const previousActivity = activities[currentIndex - 1];

    const previousRow = currentRows.find(
      (row) => row.activity_key === previousActivity.id
    );

    if (!previousRow?.completed) {
      return false;
    }
  }

  const { error: updateError } = await supabase
    .from("learning_progress")
    .upsert(
      {
        user_id: userId,
        activity_key: activityId,
        progress_percent: progress,
        completed: progress >= 100,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,activity_key",
      }
    );

  if (updateError) {
    console.error("Gagal menyimpan progress:", updateError);
    throw updateError;
  }

  await refreshStudentProgress(userId);

  return true;
}

export function calculateOverallProgress(userId) {
  const studentProgress = getStudentProgress(userId);

  if (studentProgress.length === 0) return 0;

  const completedCount = studentProgress.filter(
    (item) => item.status === "completed"
  ).length;

  return Math.round((completedCount / activities.length) * 100);
}

export function getCompletedActivities(userId) {
  return getStudentProgress(userId).filter(
    (item) => item.status === "completed"
  ).length;
}

export function getLastActivity(userId) {
  const completed = getStudentProgress(userId).filter(
    (item) => item.status === "completed"
  );

  return completed.length ? completed[completed.length - 1] : null;
}

export function getCurrentActivity(userId) {
  const studentProgress = getStudentProgress(userId);

  if (studentProgress.length === 0) return activities[0] || null;

  return (
    studentProgress.find((item) => item.status === "in-progress") ||
    studentProgress.find((item) => item.status === "not-started") ||
    null
  );
}

export function getNextActivity(userId) {
  return (
    getStudentProgress(userId).find(
      (item) => item.status === "not-started"
    ) || null
  );
}

export function getStudentLearningStatus(userId) {
  const studentProgress = getStudentProgress(userId);

  const completedCount = studentProgress.filter(
    (item) => item.status === "completed"
  ).length;

  return {
    progress:
      studentProgress.length === 0
        ? 0
        : Math.round((completedCount / activities.length) * 100),
    lastActivity: getLastActivity(userId),
    currentActivity: getCurrentActivity(userId),
    nextActivity: getNextActivity(userId),
    completed:
      studentProgress.length > 0 &&
      completedCount === activities.length,
  };
}