type UmamiEventData = Record<string, string | number | boolean>;

interface Umami {
  track: {
    (eventName: string, eventData?: UmamiEventData): void;
    (payload?: Record<string, unknown> | ((props: Record<string, unknown>) => Record<string, unknown>)): void;
  };
}

interface Window {
  umami?: Umami & {
    (eventName: string, eventData?: UmamiEventData): void;
  };
}