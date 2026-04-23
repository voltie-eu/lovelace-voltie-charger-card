// Fault-state help hints shown under the error illustration.
export const FAULT_HINTS = {
  diode_check_failed:
    "The charger's diode self-check failed. The charging cable or vehicle interface may be faulty — try unplugging and reconnecting; if it persists, service is needed.",
  gfci_fault:
    "Ground fault detected. The GFCI has tripped. Unplug the vehicle, check for moisture or damage at the plug, and clear the fault once safe.",
  no_ground:
    "No protective earth connection detected. Do not use the charger until an electrician has verified the grounding.",
  stuck_relay:
    "A relay is stuck. The charger has isolated itself for safety — power-cycle it; if the fault reappears, service is needed.",
  gfi_self_test_failure:
    "The ground-fault self-test failed. Power-cycle the charger; if it persists, the GFI module needs service.",
  over_temperature:
    "The charger has overheated and stopped charging. Let it cool down, clear airflow obstructions, and try again.",
  over_current:
    "The vehicle drew more current than allowed. Check the current limit setting and the vehicle's onboard charger.",
  i2c_bus_error:
    "Internal communication error. Power-cycle the charger; if it persists, service is needed.",
  ev_fault:
    "The vehicle is reporting a fault. Try unplugging and reconnecting; if it persists, check the car.",
  over_humidity:
    "Humidity inside the charger is too high. Let it dry and check for water ingress at the enclosure.",
  phase_misconnected:
    "The charger's supply phases look wrong. An electrician should check the wiring and breaker configuration.",
  overvoltage:
    "Grid voltage is too high. Wait for it to stabilize; if it persists, call your electrician or utility.",
  undervoltage:
    "Grid voltage is too low. Wait for it to stabilize; if it persists, check your supply or call an electrician.",
  error:
    "The charger reported an error. Inspect the charger's display or app for details.",
};

// Card-state fault triggers (the "error" catch-all is excluded so undocumented
// firmware codes don't paint the card red).
export const FAULT_STATES = new Set(
  Object.keys(FAULT_HINTS).filter((k) => k !== "error")
);
