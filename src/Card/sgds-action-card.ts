import { customElement, property, state, query } from "lit/decorators.js";
import { html, literal } from "lit/static-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./sgds-action-card.scss";
import { CardElement } from "../utils/card-element";

export type CardVariant = "card-action" | "card-action-quantity-toggle";

export type TypeVariant = "checkbox" | "radio";

@customElement("sgds-action-card")
export class SgdsActionCard extends CardElement {
  static styles = styles;

  @query("sgds-checkbox") // Define the query
  inputEl!: HTMLElement; // Declare the prop

  @property({ type: String, reflect: true }) type?: TypeVariant = "checkbox";

  /** Use on actionable cards like SelectableCard and Quantity Toggle Card' */
  @property({ reflect: true }) variant?: CardVariant = "card-action";

  /** The card's subtitle iconName. */
  @property() iconName?: string;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  // Declare the click event listener
  onInputClick() {
    // Use the query to click
    this.inputEl.click();
  }

  render() {
    const checkbox = html`<sgds-checkbox
      ?disabled=${this.disabled}
      @click=${this.onInputClick}
    ></sgds-checkbox>`;

    const icon = html `<sl-icon name="${
      this.iconName
    }"></sl-icon>`

    // TODO: Radio component

    const radio = undefined;

    return html`
      <div
        tabindex="0"
        variant="card-action"
        class="sgds card
        ${classMap({
          [`text-${this.textColor}`]: this.textColor,
          [`bg-${this.bgColor}`]: this.bgColor,
          [`border-${this.borderColor}`]: this.borderColor,
        })}
        "
        @click=${this.onInputClick}
      >
        <div class="card-body">
          <h6 class="text-muted card-subtitle">
            <div>
              ${this.iconName == undefined ? undefined : icon }
              <slot name="card-subtitle"></slot></slot>
              </div>
            <div class="card-input">
            ${
              this.type == "checkbox" && this.variant == "card-action"
                ? checkbox
                : this.type == "radio" && this.variant == "card-action"
                ? undefined
                : undefined
            }
          </div>
          </h6>
          <h5 class="card-title"><slot name="card-title"></slot></h5>
          <p class="card-text"><slot name="card-text"></slot></p>
        </div>
      </div>
    `;
  }
}

export default SgdsActionCard;
