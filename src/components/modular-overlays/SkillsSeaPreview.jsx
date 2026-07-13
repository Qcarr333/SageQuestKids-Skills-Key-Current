import styles from "./SkillsSeaPreview.module.css";

const games = [
  { title: "Droplets", type: "Keyboard Games", icon: "⌨️", description: "Type falling letters before they hit the sea floor." },
  { title: "Word Builder Farm", type: "Keyboard Games", icon: "⌨️", description: "Type letters to grow your farm." },
  { title: "Memory Match", type: "Mouse Games", icon: "🖱️", description: "Click cards and match the values." },
  { title: "Shaker", type: "Mouse Games", icon: "🖱️", description: "Click quickly and test your control." },
  { title: "Reef Runner", locked: true },
  { title: "Treasure Tap", locked: true },
  { title: "Bubble Keys", locked: true },
  { title: "Coral Clicks", locked: true },
];

export default function SkillsSeaPreview() {
  return (
    <section className={styles.panel} aria-label="Skills Sea preview controls">
      <div className={styles.categoryRow}>
        <div className={`${styles.category} ${styles.keyboard}`}>
          <span aria-hidden="true">⌨️</span>
          <div>
            <h2>Keyboard Games</h2>
            <p>Type, spell, and build your skills!</p>
          </div>
        </div>
        <div className={`${styles.category} ${styles.mouse}`}>
          <span aria-hidden="true">🖱️</span>
          <div>
            <h2>Mouse Games</h2>
            <p>Click, match, and test your reflexes!</p>
          </div>
        </div>
      </div>

      <div className={styles.gameGrid}>
        {games.map((game) => (
          <button
            className={`${styles.gameCard} ${game.locked ? styles.locked : ""}`}
            type="button"
            key={game.title}
            aria-label={`${game.title} preview button${game.locked ? ", coming soon" : ""}`}
          >
            <span className={styles.thumbnail} aria-hidden="true">{game.locked ? "🔒" : game.icon}</span>
            <strong>{game.title}</strong>
            <small>{game.locked ? "Coming Soon!" : game.description}</small>
            <span className={styles.tag}>{game.locked ? "Locked" : game.type}</span>
          </button>
        ))}
      </div>

      <p className={styles.footer}>⭐ New games added regularly ⭐</p>
    </section>
  );
}
