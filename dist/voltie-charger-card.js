class VoltieChargerCard extends HTMLElement {

  constructor() {
    super();
    this._expanded = false;
  }

  setConfig(config) {
    if (!config.id) throw new Error("Id required");
    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
    const id = this.config.id;

    const switchId = `switch.voltie_charger_switch_${id}`;

    const switchValue = hass.states[switchId];
    const chargerIdValue = hass.states[`sensor.voltie_charger_id_${id}`];
    const isChargingValue = hass.states[`binary_sensor.voltie_charger_is_charging_${id}`];
    const carConnectedValue = hass.states[`binary_sensor.voltie_charger_car_connected_${id}`];
    const sessionEnergyValue = hass.states[`sensor.voltie_charger_session_energy_${id}`];
    const sessionChargeTimeValue = hass.states[`sensor.voltie_charger_session_charge_time_${id}`];
    const chargePowerValue = hass.states[`sensor.voltie_charger_charge_power_${id}`];

    const voltageL1Value = hass.states[`sensor.voltie_charger_voltage_l1_${id}`];
    const voltageL2Value = hass.states[`sensor.voltie_charger_voltage_l2_${id}`];
    const voltageL3Value = hass.states[`sensor.voltie_charger_voltage_l3_${id}`];
    const currentL1Value = hass.states[`sensor.voltie_charger_current_l1_${id}`];
    const currentL2Value = hass.states[`sensor.voltie_charger_current_l2_${id}`];
    const currentL3Value = hass.states[`sensor.voltie_charger_current_l3_${id}`];
    const powerL1Value = hass.states[`sensor.voltie_charger_power_l1_${id}`];
    const powerL2Value = hass.states[`sensor.voltie_charger_power_l2_${id}`];
    const powerL3Value = hass.states[`sensor.voltie_charger_power_l3_${id}`];

    const dlmValidValue = hass.states[`binary_sensor.voltie_charger_dlm_valid_${id}`];
    const dlmCurrentL1Value = hass.states[`sensor.voltie_charger_dlm_current_l1_${id}`];
    const dlmCurrentL2Value = hass.states[`sensor.voltie_charger_dlm_current_l2_${id}`];
    const dlmCurrentL3Value = hass.states[`sensor.voltie_charger_dlm_current_l3_${id}`];
    const ipmValidValue = hass.states[`binary_sensor.voltie_charger_ipm_valid_${id}`];
    const ipmCurrentL1Value = hass.states[`sensor.voltie_charger_ipm_current_l1_${id}`];
    const ipmCurrentL2Value = hass.states[`sensor.voltie_charger_ipm_current_l2_${id}`];
    const ipmCurrentL3Value = hass.states[`sensor.voltie_charger_ipm_current_l3_${id}`];


    if (!switchValue) return;

    // Charger is Offline
    if (switchValue.state == 'unavailable') {
      this.innerHTML = `
      <ha-card style="padding:16px;">
        <div style="width: 100%; border-radius: 12px; background-color: #E4E6EF;">
          <div style="height: 24px"></div>
          <p style="font-size: 16px; font-weight: 600; width: 100%; text-align: center; margin: 0px; color: #181C32;">Offline</p>
          <div style="height: 24px"></div>
          <img src="/local/community/lovelace-voltie-charger-card/voltie-charger-card-icons/Offline.svg" style="width:40%; margin-left: 30%;" />
          <div style="height: 24px"></div>
        </div>
      </ha-card>
    `;

      // Charger is Online, but not connected to car
    } else if (carConnectedValue.state == 'off') {
      this.innerHTML = `
      <ha-card style="padding:16px;">
        <div style="width: 100%; border-radius: 12px; background: linear-gradient(rgb(87, 217, 186), rgb(9, 188, 166));">
          <div style="height: 24px"></div>
          <p style="font-size: 16px; font-weight: 600; width: 100%; text-align: center; margin: 0px; color: #FFFFFF;">Online</p>
          <p style="font-size: 14px; font-weight: 500; width: 100%; text-align: center; margin: 0px; color: #FFFFFF;">Car not connected</p>
          <div style="height: 24px"></div>
          <img src="/local/community/lovelace-voltie-charger-card/voltie-charger-card-icons/Online.svg" style="width:40%; margin-left: 30%;" />
          <div style="height: 24px"></div>
          <div id="powerDetailsSection"></div>
          <p class="chargerIdLabel">${(chargerIdValue.state || '-').slice(-4)}</p>
        </div>
      </ha-card>
    `;

      // Charger is Online, and connected to car, but not charging
    } else if (carConnectedValue.state == 'on' && isChargingValue.state == 'off') {
      this.innerHTML = `
      <ha-card style="padding:16px;">
        <div style="width: 100%; border-radius: 12px; background: linear-gradient(rgb(87, 217, 186), rgb(9, 188, 166));">
          <div style="height: 24px"></div>
          <p style="font-size: 16px; font-weight: 600; width: 100%; text-align: center; margin: 0px; color: #FFFFFF;">Car plugged in</p>
          <div style="height: 24px"></div>
          <img src="/local/community/lovelace-voltie-charger-card/voltie-charger-card-icons/Online.svg" style="width: 40%; margin-left: 30%;" />
          <div style="height: 24px"></div>
          <div class="slider-container">
            <input type="range" id="slider" min="0" max="100" value="0" style="background: linear-gradient(90deg, rgb(42, 111, 244) 0%, rgb(86, 242, 223) 100%);" />
            <div class="slider-text">Slide to START charging</div>
          </div>
          <div style="height: 32px"></div>
          <div style="display: flex;">
            <div style="width: 33.3%">
              <p class="detail-value">${sessionEnergyValue.state || '-'} kWh</p>
              <p class="detail-label">Session Energy</p>
            </div>
            <div style="width: 33.3%">
              <p class="detail-value">${formatDuration(sessionChargeTimeValue.state || 0)}</p>
              <p class="detail-label">Session Time</p>
            </div>
            <div style="width: 33.3%">
              <p class="detail-value">${chargePowerValue.state || '-'} kW</p>
              <p class="detail-label">Charge Power</p>
            </div>
          </div>
          <div style="height: 16px"></div>
          <div id="powerDetailsSection"></div>
          <p class="chargerIdLabel">${(chargerIdValue.state || '-').slice(-4)}</p>
        </div>
      </ha-card>
    `;

      // Charger is Online, connected to car, and charging
    } else if (carConnectedValue.state == 'on' && isChargingValue.state == 'on') {
      this.innerHTML = `
      <ha-card style="padding:16px;">
        <div style="width: 100%; border-radius: 12px; background: linear-gradient(rgb(43, 113, 245), rgb(80, 215, 223));">
          <div style="height: 24px"></div>
          <p style="font-size: 16px; font-weight: 600; width: 100%; text-align: center; margin: 0px; color: #FFFFFF;">Charging</p>
          <div style="height: 24px"></div>
          <img src="/local/community/lovelace-voltie-charger-card/voltie-charger-card-icons/Charging.svg" style="width: 40%; margin-left: 30%;" />
          <div style="height: 24px"></div>
          <div class="slider-container">
            <input type="range" id="slider" min="0" max="100" value="0" style="background: linear-gradient(90deg, rgb(42, 111, 244) 0%, rgb(226, 89, 75) 100%);" />
            <div class="slider-text">Slide to STOP charging</div>
          </div>
          <div style="height: 32px"></div>
          <div style="display: flex;">
            <div style="width: 33.3%">
              <p class="detail-value">${sessionEnergyValue.state || '-'} kWh</p>
              <p class="detail-label">Session Energy</p>
            </div>
            <div style="width: 33.3%">
              <p class="detail-value">${formatDuration(sessionChargeTimeValue.state || 0)}</p>
              <p class="detail-label">Session Time</p>
            </div>
            <div style="width: 33.3%">
              <p class="detail-value">${chargePowerValue.state || '-'} kW</p>
              <p class="detail-label">Charge Power</p>
            </div>
          </div>
          <div style="height: 16px"></div>
          <div id="powerDetailsSection"></div>
          <p class="chargerIdLabel">${(chargerIdValue.state || '-').slice(-4)}</p>
        </div>
      </ha-card>
    `;

      // Charger is in Error
    } else {
      this.innerHTML = `
      <ha-card style="padding:16px;">
        <div style="width: 100%; border-radius: 12px; background: linear-gradient(rgb(235, 81, 114), rgb(253, 78, 78));">
          <div style="height: 16px"></div>
          <p style="font-size: 14px; font-weight: 600; width: 100%; text-align: center; margin: 0px; color: #FFFFFF;">Online</p>
          <div style="height: 16px"></div>
          <img src="/local/community/lovelace-voltie-charger-card/voltie-charger-card-icons/Error.svg" style="width:40%; margin-left: 30%;" />
          <div style="height: 16px"></div>
          <div id="powerDetailsSection"></div>
          <p class="chargerIdLabel">${(chargerIdValue.state || '-').slice(-4)}</p>
        </div>
      </ha-card>
    `;
    }

    const updatePowerDetailsSection = () => {
      const section = this.querySelector("#powerDetailsSection");
      if (!section) return;

      const safe = (entity) => entity ? entity.state == 'unknown' ? '-' : entity.state : "-";

      section.innerHTML = this._expanded ? `
        <p id="powerDetailsToggle" style="width: 10%; text-align: center; font-size: 16px; font-weight: 900; color: #FFFFFF; margin: 0px; margin-top: -8px; margin-left: 45%; cursor: pointer;">⏶</p>
        <div style="height: 12px"></div>
        <div style="width: 90%; margin-left: 5%; height: 1px; background-color: #ffffffa3;"></div>
        <div style="height: 12px"></div>
        <div style="width: 100%; display: flex;">
          <p class="power-details-value" style="font-weight: 800;">Phase 1</p>
          <p class="power-details-value" style="font-weight: 800;">Phase 2</p>
          <p class="power-details-value" style="font-weight: 800;">Phase 3</p>
        </div>
        <div style="width: 100%; display: flex;">
          <p class="power-details-value">${safe(voltageL1Value)} V</p>
          <p class="power-details-value">${safe(voltageL2Value)} V</p>
          <p class="power-details-value">${safe(voltageL3Value)} V</p>
        </div>
        <div style="width: 100%; display: flex;">
          <p class="power-details-value">${safe(currentL1Value)} A</p>
          <p class="power-details-value">${safe(currentL2Value)} A</p>
          <p class="power-details-value">${safe(currentL3Value)} A</p>
        </div>
        <div style="width: 100%; display: flex;">
          <p class="power-details-value">${safe(powerL1Value)} kW</p>
          <p class="power-details-value">${safe(powerL2Value)} kW</p>
          <p class="power-details-value">${safe(powerL3Value)} kW</p>
        </div>
        <div style="height: 12px"></div>
        <div style="width: 90%; margin-left: 5%; height: 1px; background-color: #ffffffa3;"></div>
        <div style="height: 12px"></div>
        <div style="width: 100%; display: flex;">
          <p class="power-details-value" style="width: 25%; font-weight: 800;"></p>
          <p class="power-details-value" style="width: 25%; font-weight: 800;">Phase 1</p>
          <p class="power-details-value" style="width: 25%; font-weight: 800;">Phase 2</p>
          <p class="power-details-value" style="width: 25%; font-weight: 800;">Phase 3</p>
        </div>
        <div style="width: 100%; display: flex;">
          <p class="power-details-value" style="width: 25%;">DLM ${dlmValidValue.state != 'off' ? "Active" : "Inactive"}</p>
          <p class="power-details-value" style="width: 25%;">${safe(dlmCurrentL1Value)} A</p>
          <p class="power-details-value" style="width: 25%;">${safe(dlmCurrentL2Value)} A</p>
          <p class="power-details-value" style="width: 25%;">${safe(dlmCurrentL3Value)} A</p>
        </div>
        <div style="width: 100%; display: flex;">
          <p class="power-details-value" style="width: 25%;">IPM ${ipmValidValue.state != 'off' ? "Active" : "Inactive"}</p>
          <p class="power-details-value" style="width: 25%;">${safe(ipmCurrentL1Value)} A</p>
          <p class="power-details-value" style="width: 25%;">${safe(ipmCurrentL2Value)} A</p>
          <p class="power-details-value" style="width: 25%;">${safe(ipmCurrentL3Value)} A</p>
        </div>
        <div style="height: 16px"></div>
      ` : `
        <p id="powerDetailsToggle" style="width: 10%; text-align: center; font-size: 16px; font-weight: 900; color: #FFFFFF; margin: 0px; margin-top: -8px; margin-left: 45%; cursor: pointer;">⏷</p>
        <div style="height: 16px"></div>
      `;

      this.querySelector("#powerDetailsToggle").onclick = (e) => {
        this._expanded = !this._expanded;
        updatePowerDetailsSection()
      };
    }
    updatePowerDetailsSection()

    if (this.querySelector("#slider")) {
      this.querySelector("#slider").onchange = (e) => {
        const [domain] = switchId.split(".");
        if (e.target.value > 90) {
          this._hass.callService(domain, "toggle", { entity_id: switchId });
        } else {
          e.target.value = 0
        }
      };
    }

    const style = document.createElement("style");
    style.textContent = `
      .chargerIdLabel {
        position: absolute;
        padding: 16px;
        top: 16px;
        right: 16px;
        color: #ffffffc0;
        font-size: 14px;
        font-weight: 700;
        margin: 0px;
      }

      .power-details-value {
        width: 33.3%;
        text-align: center;
        color: #FFFFFF;
        font-size: 12px;
        font-weight: 600;
        margin: 2px;
      }

      .detail-value {
        width: 100%;
        text-align: center;
        color: white;
        margin: 0px;
        font-weight: 600;
      }

      .detail-label {
        width: 100%;
        text-align: center;
        color: white;
        margin: 0px;
        font-weight: 500;
      }

      .slider-container {
        position: relative;
        width: calc(100% - 32px - 8px);
        margin-left: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .slider-text {
        position: absolute;
        color: white;
        font-weight: 600;
        pointer-events: none;
        user-select: none;
      }

      input[type=range] {
        -webkit-appearance: none;
        width: 100%;
        height: 42px;
        border-radius: 42px;
        box-shadow: 0 0 6px rgba(0,0,0,0.1);
        outline: none;
      }

      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 36px;
        height: 36px;
        margin-top: 0px;
        margin-left: 3px;
        border-radius: 100%;
        background: #ffffff;
        cursor: pointer;
        box-shadow: 0 0 6px rgba(0,0,0,0.3);
        transition: background 0.2s, transform 0.2s;
      }

      input[type=range]::-moz-range-thumb {
        width: 36px;
        height: 36px;
        margin-top: 0px;
        margin-left: 3px;
        border-radius: 100%;
        background: #ffffff;
        cursor: pointer;
        box-shadow: 0 0 6px rgba(0,0,0,0.3);
      }
    `;
    this.appendChild(style);

    function formatDuration(seconds) {
      if (seconds < 60) {
        return `${seconds} second${seconds !== 1 ? 's' : ''}`;
      }

      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      if (seconds < 3600) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
      }

      const remainingMinutes = minutes % 60;
      return `${hours} hour${hours !== 1 ? 's' : ''}` +
        (remainingMinutes > 0 ? ` ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}` : '');
    }
  }

  getCardSize() {
    return 4;
  }
}

customElements.define('voltie-charger-card', VoltieChargerCard);
