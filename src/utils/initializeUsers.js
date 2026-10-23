export function initializeUsers() {
  const existingUsers = JSON.parse(
    localStorage.getItem("netlabUsers") || "[]"
  );

  const defaultUsers = [
    {
      id: "admin-001",
      fullName: "NETLAB Administrator",
      studentId: "",
      email: "admin@netlab.com",
      username: "admin_netlab",
      password: "admin123",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: "teacher-001",
      fullName: "NETLAB Teacher One",
      studentId: "",
      email: "teacher01@netlab.com",
      username: "teacher01",
      password: "teacher123",
      role: "teacher",
      createdAt: new Date().toISOString(),
    },
    {
      id: "teacher-002",
      fullName: "NETLAB Teacher Two",
      studentId: "",
      email: "teacher02@netlab.com",
      username: "teacher02",
      password: "teacher123",
      role: "teacher",
      createdAt: new Date().toISOString(),
    },
  ];

  const updatedUsers = [...existingUsers];

  defaultUsers.forEach((defaultUser) => {
    const alreadyExists = updatedUsers.some(
      (user) =>
        user.username.toLowerCase() ===
        defaultUser.username.toLowerCase()
    );

    if (!alreadyExists) {
      updatedUsers.push(defaultUser);
    }
  });

  localStorage.setItem(
    "netlabUsers",
    JSON.stringify(updatedUsers)
  );
}