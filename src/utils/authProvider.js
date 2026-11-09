export function getAuthProvider(user) {
  if (!user || !user.email) return null;
  if (user.isGoogleUser) return "Google";
  if (user.isGithubUser) return "GitHub";
  if (user.isLinkedinUser) return "LinkedIn";
  return "Email";
}