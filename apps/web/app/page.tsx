// force-dynamic: fetch runs at request time, not during the build
export const dynamic = "force-dynamic";

export default async function Home() {
  let users: { id: string; username: string }[] = [];

  try {
    const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8080";
    const res = await fetch(`${backendUrl}/users`, { cache: "no-store" });
    users = await res.json();
  } catch {
    // backend may not be reachable during SSR — degrade gracefully
  }

  return (
    <div>
      <h1>Hi aryan</h1>
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id}>{u.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
