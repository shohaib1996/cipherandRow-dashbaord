// types/stripe.d.ts

export {}; // ensures file is global

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": {
        "pricing-table-id": string;
        "publishable-key": string;
        "client-reference-id"?: string | null;
        className?: string;
        style?: React.CSSProperties;
      };
    }
  }
}
