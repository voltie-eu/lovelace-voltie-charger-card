import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    padding: 16px;
    overflow: hidden;
  }

  /* ---- Hero panel (gradient background + state-specific palette) ---- */
  .panel {
    position: relative;
    width: 100%;
    border-radius: 12px;
    padding: 24px 0;
    color: #ffffff;
    overflow: hidden;
  }

  :host([card-state="offline"]) .panel {
    background-color: #e4e6ef;
    color: #181c32;
  }
  :host([card-state="idle"]) .panel,
  :host([card-state="ready"]) .panel {
    background: linear-gradient(rgb(87, 217, 186), rgb(9, 188, 166));
  }
  :host([card-state="charging"]) .panel {
    background: linear-gradient(rgb(43, 113, 245), rgb(80, 215, 223));
  }
  :host([card-state="fault"]) .panel {
    background: linear-gradient(rgb(235, 81, 114), rgb(253, 78, 78));
  }

  .label {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin: 0;
  }
  .label--sub {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.92;
    margin: 0;
    text-align: center;
  }

  .illustration {
    display: block;
    width: 40%;
    margin: 24px auto;
    line-height: 0;
  }
  .illustration :first-child { width: 100%; height: auto; }

  .charger-id {
    position: absolute;
    top: 16px;
    right: 16px;
    color: rgba(255, 255, 255, 0.75);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.04em;
    margin: 0;
  }
  :host([card-state="offline"]) .charger-id {
    color: rgba(24, 28, 50, 0.6);
  }

  .refresh-btn {
    position: absolute;
    top: 12px;
    left: 12px;
    background: transparent;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.75);
    border-radius: 999px;
    line-height: 0;
    z-index: 2;
    transition: color 150ms ease, background 150ms ease;
  }
  .refresh-btn:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.15);
  }
  .refresh-btn:active { transform: scale(0.92); }
  .refresh-btn ha-icon {
    --mdc-icon-size: 20px;
    color: inherit;
    display: inline-block;
    pointer-events: none;
  }
  :host([card-state="offline"]) .refresh-btn {
    color: rgba(24, 28, 50, 0.6);
  }
  :host([card-state="offline"]) .refresh-btn:hover {
    color: rgba(24, 28, 50, 0.9);
    background: rgba(24, 28, 50, 0.08);
  }
  .refresh-btn[data-spinning] ha-icon {
    animation: vc-spin 1s linear infinite;
    transform-origin: 50% 50%;
  }
  @keyframes vc-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* ---- Slide-to-action ---- */
  .slide {
    position: relative;
    width: calc(100% - 32px);
    margin: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .slide__text {
    position: absolute;
    color: white;
    font-weight: 600;
    font-size: 14px;
    pointer-events: none;
    user-select: none;
    letter-spacing: 0.02em;
  }
  .slide__input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 42px;
    border-radius: 42px;
    outline: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    cursor: grab;
  }
  .slide__input:active { cursor: grabbing; }
  .slide__input.start {
    background: linear-gradient(90deg, rgb(42, 111, 244) 0%, rgb(86, 242, 223) 100%);
  }
  .slide__input.stop {
    background: linear-gradient(90deg, rgb(42, 111, 244) 0%, rgb(226, 89, 75) 100%);
  }
  .slide__input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 36px;
    height: 36px;
    border-radius: 100%;
    background: #ffffff;
    cursor: grab;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    margin-left: 3px;
    transition: transform 0.15s ease;
  }
  .slide__input::-moz-range-thumb {
    width: 36px;
    height: 36px;
    border-radius: 100%;
    background: #ffffff;
    cursor: grab;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  }

  /* ---- Stats strip ---- */
  .stats {
    display: flex;
    margin: 24px 0 0;
    padding: 0 8px;
  }
  .stat {
    flex: 1;
    min-width: 0;
    text-align: center;
  }
  .stat__value {
    color: #ffffff;
    font-weight: 600;
    font-size: 15px;
    margin: 0;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: opacity 200ms ease;
  }
  /* Stale-value dim state. */
  .stat__value--stale {
    opacity: 0.55;
  }
  .stat__label {
    color: #ffffff;
    font-weight: 500;
    font-size: 11px;
    opacity: 0.85;
    margin: 2px 0 0;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* ---- Sparkline ---- */
  .sparkline {
    display: block;
    width: calc(100% - 32px);
    height: 36px;
    margin: 12px 16px 0;
    overflow: visible;
  }
  .sparkline__fill { fill: #ffffff; opacity: 0.18; }
  .sparkline__stroke {
    fill: none;
    stroke: #ffffff;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.85;
  }
  .sparkline__dot { fill: #ffffff; }

  /* ---- Fault hint ---- */
  .hint {
    margin: 12px 24px 0;
    padding: 10px 12px;
    background: rgba(255, 255, 255, 0.18);
    border-radius: 10px;
    color: #ffffff;
    font-size: 13px;
    line-height: 1.35;
    text-align: center;
  }

  /* ---- Drawer ---- */
  .drawer-toggle {
    display: block;
    width: 100%;
    margin: 12px 0 -8px;
    padding: 0;
    background: transparent;
    border: none;
    color: #ffffff;
    font-size: 16px;
    font-weight: 900;
    line-height: 1;
    cursor: pointer;
    font-family: inherit;
    opacity: 0.85;
    text-align: center;
  }
  :host([card-state="offline"]) .drawer-toggle { color: #181c32; }
  .drawer-toggle[aria-expanded="true"] { margin-bottom: 4px; }
  .drawer-toggle:hover { opacity: 1; }

  .drawer-body {
    padding: 4px 16px 0;
  }
  .drawer-sep {
    height: 1px;
    background: rgba(255, 255, 255, 0.4);
    margin: 12px 0;
  }
  :host([card-state="offline"]) .drawer-sep {
    background: rgba(24, 28, 50, 0.18);
  }

  .phase-grid {
    display: grid;
    grid-template-columns: auto repeat(3, 1fr);
    gap: 4px 10px;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    margin: 6px 0 0;
  }
  .phase-grid__cell {
    text-align: right;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .phase-grid__header {
    text-align: right;
    font-weight: 800;
    opacity: 0.9;
  }
  .phase-grid__label { text-align: left; font-weight: 500; opacity: 0.85; }

  .aux-grid {
    display: grid;
    grid-template-columns: auto repeat(3, 1fr);
    gap: 4px 10px;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
  }

  .periods__header {
    font-weight: 700;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.85);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 6px;
  }
  .periods__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    padding: 2px 0;
  }
  .periods__row + .periods__row {
    border-top: 1px solid rgba(255, 255, 255, 0.18);
  }
  .periods__row strong {
    font-weight: 700;
  }
  .periods__num {
    display: inline-block;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.85);
    margin-right: 8px;
    min-width: 22px;
  }
  .periods__more {
    text-align: center;
    font-size: 11px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    padding: 6px 0 2px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .aux-grid__meta {
    text-align: left;
    font-weight: 700;
    opacity: 0.95;
    white-space: nowrap;
  }

  /* ---- Gentle setup-hint (no device selected) ---- */
  .setup-hint {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 20px;
    color: var(--secondary-text-color, #888);
  }
  .setup-hint ha-icon {
    --mdc-icon-size: 28px;
    color: var(--secondary-text-color, #888);
    flex-shrink: 0;
  }
  .setup-hint strong {
    display: block;
    color: var(--primary-text-color, #222);
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .setup-hint span {
    font-size: 0.85rem;
  }
`;
