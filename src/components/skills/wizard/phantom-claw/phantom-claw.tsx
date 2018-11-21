import { Component, Prop } from "@stencil/core";
import { PhantomClawValues } from "../../../../global/values/wizard";

@Component({
  tag: "ms-phantom-claw",
  styleUrls: ["../../skills.scss", "phantom-claw.scss"],
  shadow: true
})
export class PhantomClawComponent {

  @Prop({ reflectToAttr: true }) level: number = PhantomClawValues.minLevel;

  @Prop({ reflectToAttr: true }) private max: number = PhantomClawValues.maxLevel;

  getRequirements(): string[] {
    if (PhantomClawValues.levelRequirement[this.level] > 0) {
      return [
        `Level ${ PhantomClawValues.levelRequirement[this.level] }+`,
      ];
    }
  }

  render() {
    return [
      <ms-icon name="phantom-claw"></ms-icon>,
      <ms-skill-overlay heading="Phantom Claw"
                        level={ this.level }
                        type="Long Range / Magic"
                        weaponRequired="Two-handed Staff"
                        requirements={ this.getRequirements() }
                        max={ this.max }>
        <ms-icon slot="icon" name="phantom-claw"></ms-icon>
        <div slot="description">
          Slash the air with sharp magical claws,
          dealing <span>{ PhantomClawValues.damage[this.level] }%</span> damage <span>2</span> times
          to <span>3</span> enemies up to <span>8</span> m in front of you.
        </div>
      </ms-skill-overlay>
    ];
  }
}