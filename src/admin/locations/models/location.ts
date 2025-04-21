export const LocationStatus = {
    Draft: 1,
    Requested: 2,
    Ready: 3,
    Published: 4,
  } as const

  export type LocationStatus = (typeof LocationStatus)[keyof typeof LocationStatus]