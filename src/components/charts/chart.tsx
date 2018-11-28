import { Component, Prop, Element, Listen } from "@stencil/core";
import { MapleStoryClass } from "../editor/editor.interfaces";

@Component({
  tag: "ms-chart",
  styleUrls: ["chart.scss"],
  shadow: true
})
export class ChartComponent {

  @Prop({ context: "publicPath" }) private publicPath: string;

  @Prop() msClass: MapleStoryClass;

  @Element() host: HTMLStencilElement;

  componentDidLoad() {
    this.resize();
  }

  @Listen("window:resize")
  resize() {
    let parent = (this.host.parentNode as ShadowRoot).host as HTMLElement;
    let parentWidth = parent.offsetWidth;

    let scale = parentWidth / 815;

    if (scale < 1) {
      this.host.style.transform = `scale(${ scale })`;
      this.host.style.marginBottom = `-${ 770 - (770 * scale) }px`;
      this.host.style.marginRight = `-${ 815 - (815 * scale) }px`;
    } else {
      this.host.style.transform = null;
      this.host.style.marginBottom = null;
      this.host.style.marginRight = null;
    }

    // let scale = parent.getBoundingClientRect().width / this.host.getBoundingClientRect().width;
  }

  render() {
    return [
      <style>{`
        :host, :host(:hover) {
          cursor: url(${ this.publicPath }assets/cursor.png) 5 8, auto;
        }
        :host(:active) {
          cursor: url(${ this.publicPath }assets/cursor-down.png) 5 8, auto;
        }
        .chart {
          background-image: url(${ this.publicPath }assets/charts/chart.jpg);
        }
        .class-icon {
          background-image: url(${ this.publicPath }assets/charts/${ this.msClass }-icon.png)
        }
        .chart > .class-icon > div {
          background-image: url(${ this.publicPath }assets/charts/${ this.msClass }-lines.png);
        }
        ::slotted(*) {
          background-image: url(${ this.publicPath }assets/skill-shield.png);
        }
        ::slotted([passive]) {
          background-image: url(${ this.publicPath }assets/skill-shield-passive.png);
        }
        ::slotted(*):after {
          background-image: url(${ this.publicPath }assets/skill-bar.png);
        }
      `}</style>,
      <ms-footer></ms-footer>,
      <div class="chart">
        <div class="class-icon">
          <div class={ this.msClass }>
            <slot></slot>
          </div>
        </div>
      </div>
    ];
  }
}
