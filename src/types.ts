export interface Country {
  commonName: string
  officialName: string
  countryCode: string
  region: string
  borders: string[]
}

export interface CountryFromList {
  countryCode: string
  name: string
}

export interface Holiday {
  date: string
  localName: string
  name: string
  countryCode: string
  fixed: boolean
  global: boolean
  counties: string[]
  launchYear: number
  types: string[]
}

export interface RandomCountry {
  countryCode: string
  name: string
  nextHoliday: Holiday | null
}
