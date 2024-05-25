export async function getUpcomingVote() {
  const res = await fetch(
    "https://voting-system-server.vercel.app/api/votes/upcoming-vote"
  );
  const data = await res.json();
  return data?.data;
}
