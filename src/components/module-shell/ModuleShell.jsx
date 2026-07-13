import { getImageProps } from "next/image";
import Link from "next/link";
import { LANDING_ROUTES, isRouteLive, isRouteReference } from "../landing/landingRoutes";
import styles from "./ModuleShell.module.css";

function ModuleArtwork({ config }) {
  const common = {
    alt: "",
    quality: 90,
    loading: "eager",
  };

  const {
    props: { srcSet: desktopSrcSet, ...desktopProps },
  } = getImageProps({
    ...common,
    src: config.desktopSrc,
    width: config.desktopWidth,
    height: config.desktopHeight,
    sizes: config.desktopSizes,
  });

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...common,
    src: config.mobileSrc,
    width: config.mobileWidth,
    height: config.mobileHeight,
    sizes: config.mobileSizes,
  });

  return (
    <picture className={styles.picture} aria-hidden="true">
      <source media="(max-width: 768px)" srcSet={mobileSrcSet} />
      <source media="(min-width: 769px)" srcSet={desktopSrcSet} />
      <img {...desktopProps} className={styles.image} alt="" />
    </picture>
  );
}

export default function ModuleShell({ config, children, referenceOnly = false, forcePreview = false }) {
  const route = LANDING_ROUTES[config.routeKey];
  const isLive = isRouteLive(config.routeKey);
  const isReference = isRouteReference(config.routeKey) || referenceOnly;
  const showPreview = isLive || isReference || forcePreview;
  const isComingSoon = !showPreview;

  return (
    <main className={styles.page}>
      <h1 className="sr-only">{config.title}</h1>
      <p className="sr-only">{config.summary}</p>

      <div
        className={styles.artwork}
        style={{
          "--module-desktop-width": `${config.desktopWidth}`,
          "--module-desktop-height": `${config.desktopHeight}`,
          "--module-mobile-width": `${config.mobileWidth}`,
          "--module-mobile-height": `${config.mobileHeight}`,
        }}
      >
        <ModuleArtwork config={config} />

        <Link className={`${styles.region} ${styles.logo}`} href={LANDING_ROUTES.home.href} aria-label="Sage Quest Kids Home">
          <span className="sr-only">Sage Quest Kids Home</span>
        </Link>
        <Link className={styles.loginButton} href={LANDING_ROUTES.login.href}>
          Login
        </Link>
        <Link className={styles.backLink} href={LANDING_ROUTES.home.href}>
          Back to Home
        </Link>

        {isReference && (
          <div className={styles.referenceBadge} aria-label={`${route.label} is a prototype reference only`}>
            Prototype Reference Only
          </div>
        )}

        {isComingSoon && (
          <div className={styles.comingSoonBanner} aria-label={`${route.label} is coming soon`}>
            Coming Soon!
          </div>
        )}

        {showPreview && <div className={styles.previewLayer}>{children}</div>}
      </div>
    </main>
  );
}
