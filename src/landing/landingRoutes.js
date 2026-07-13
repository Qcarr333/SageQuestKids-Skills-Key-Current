export const LANDING_ROUTES = Object.freeze({
  home: { label: "Home", href: "/", status: "live" },
  parents: { label: "For Parents", href: "/parents", status: "live" },
  teachers: { label: "For Teachers", href: "/teachers", status: "coming soon" },
  pricing: { label: "Pricing", href: "/pricing", status: "live" },
  login: { label: "Login", href: "/login", status: "live" },
  signup: { label: "Create Account", href: "/signup", status: "live" },
  reading: { label: "Reading Rainforest", href: "/reading", status: "live" },
  readingReference: {
    label: "Reading Rainforest Reference",
    href: "/reading-reference",
    status: "reference",
  },
  math: { label: "Math Mountain", href: "/math", status: "coming soon" },
  skills: { label: "Skills Sea", href: "/skills", status: "live" },
  coding: { label: "Code Cavern", href: "/coding", status: "coming soon" },
});

export function isRouteLive(routeKey) {
  return LANDING_ROUTES[routeKey]?.status === "live";
}

export function isRouteReference(routeKey) {
  return LANDING_ROUTES[routeKey]?.status === "reference";
}

export function isRouteAccessible(routeKey) {
  const status = LANDING_ROUTES[routeKey]?.status;
  return status === "live" || status === "reference";
}
