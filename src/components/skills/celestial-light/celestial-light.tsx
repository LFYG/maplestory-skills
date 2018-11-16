import { Component, Prop } from "@stencil/core";
import { CelestialLightValues } from "../../../global/values/priest";

@Component({
  tag: "ms-celestial-light",
  styleUrls: ["../skills.scss", "celestial-light.scss"],
  shadow: true
})
export class CelestialLightComponent {

  @Prop({ reflectToAttr: true }) level: number = CelestialLightValues.minLevel;

  @Prop({ reflectToAttr: true }) private max: number = CelestialLightValues.maxLevel;

  getRequirements(): string[] {
    if (CelestialLightValues.levelRequirement[this.level] > 0) {
      return [
        `Level ${ CelestialLightValues.levelRequirement[this.level] }+`
      ];
    }
  }

  render() {
    return [
      <ms-icon name="celestial-light"></ms-icon>,
      <ms-skill-overlay heading="Celestial Light"
                        element="Holy"
                        level={ this.level }
                        type="Long Range / Magic"
                        weaponRequired="Main Hand Scepter"
                        requirements={ this.getRequirements() }
                        max={ this.max }>
        <ms-icon slot="icon" name="celestial-light"></ms-icon>
        <div slot="description">
          Strikes enemies with holy light,
          dealing <span>{ CelestialLightValues.damage[this.level] }%</span> holy damage
          to <span>3</span> enemies up to <span>8</span> m in front of you, plus an
          additional <span>{ CelestialLightValues.additionalDamage[this.level] }%</span> holy damage per sec
          for <span>6</span> sec.
        </div>
      </ms-skill-overlay>
    ];
  }
}
