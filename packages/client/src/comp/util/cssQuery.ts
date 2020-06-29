const media = '@media screen and'

const minWidth = (px: number) => `(min-width: ${px}px)`
const maxWidth = (px: number) => `(max-width: ${px}px)`

const minHeight = (px: number) => `(min-height: ${px}px)`
const maxHeight = (px: number) => `(max-height: ${px}px)`

const portrait = '(orientation: portrait)'
const landscape = '(orientation: landscape)'

/**
 * Group of queries that aims to speed up styling, as well as to help
 * avoiding conflicts when styling different parts of the app.
 */
export const cssQuery = {
  /** Desktops are wide devices, with a good amount of height, and on landscape */
  desktop: {
    /** Devices that are at least 992px wide, 520px tall, and on landscape */
    get all() { return `${media} ${minWidth(992)} and ${minHeight(520)} and ${landscape}` },
    /** Devices up to 1199px and landscape */
    get narrow() { return `${media} ${maxWidth(1119)} and ${landscape}` },
    /** Devices at least 1200px wide */
    get wide() { return `${media} ${minWidth(1200)} and ${landscape}` },

    /** Devices that have up to 769px available for height */
    get short() {
      return `${media} ${minWidth(992)} and ${maxHeight(769)} and ${landscape}`
    },
    /** Devices that have at least 768px available for height */
    get tall() {
      return `${media} ${minWidth(992)} and ${minHeight(768)} and ${landscape}`
    }
  },
  /** To access landscape mobile queries use cssQuery.mobile.landscape */
  mobile: {
    /**
     * Devices up to 1024px wide and on portrait, we need this relatively
     * wide width as tablets on portrait are most likely to benefit from
     * these rules.
     *
     * So remember to use cssQuery.mobile.narrow to specifically target
     * phones.
     */
    get all() { return `${media} ${maxWidth(1024)} and ${portrait}` },
    /** Devices up to 519px wide */
    get narrow() { return `${media} ${maxWidth(519)} and ${portrait}`},
    /** Devices at least 520px wide */
    get wide() { return `${media} ${minWidth(520)} and ${portrait}` },

    /** Devices that have up to 639px available for height */
    get short() {
      return `${media} ${maxHeight(639)} and ${portrait}`
    },
    /** Devices that have more than 640px available for height */
    get tall() {
      return `${media} ${minHeight(640)} and ${portrait}`
    },

    landscape: {
      /** Max height 519px and landscape */
      get all() { return `${media} ${maxHeight(519)} and ${landscape}` },

      /** Max height 360px */
      get short() { return `${media} ${maxHeight(360)} and ${landscape}` },
    }
  },
}
