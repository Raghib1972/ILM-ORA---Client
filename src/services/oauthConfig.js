// New file — no existing file touched.
// Client IDs are public info (safe in frontend), same as GOOGLE_CLIENT_ID
// already hardcoded in Login.jsx / LMSHomepage.jsx.

export const GITHUB_CLIENT_ID = "Ov23liVtWE5Y2FR7o9KS";
export const LINKEDIN_CLIENT_ID = "77oh6z4b5edq38";

// CHANGED FOR NEXT.JS: these were module-level constants using
// window.location.origin in React, which throws during SSR/build.
// They are now functions evaluated only when a login button is clicked.
export const getGithubRedirectUri = () =>
  `${window.location.origin}/auth/github/callback`;
export const getLinkedinRedirectUri = () =>
  `${window.location.origin}/auth/linkedin/callback`;

export function getGithubAuthUrl() {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: getGithubRedirectUri(),
    scope: "read:user user:email",
  });
  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

export function getLinkedinAuthUrl() {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: LINKEDIN_CLIENT_ID,
    redirect_uri: getLinkedinRedirectUri(),
    scope: "openid profile email",
    state: crypto.randomUUID(), // CSRF protection
  });
  sessionStorage.setItem("linkedin_oauth_state", params.get("state"));
  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}
