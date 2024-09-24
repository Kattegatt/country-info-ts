import { RouteLocationNormalizedLoadedGeneric } from 'vue-router'

export const getYearParam = (
  route: RouteLocationNormalizedLoadedGeneric
): string => {
  const yearParam = route.params.year
  return Array.isArray(yearParam) ? yearParam[0] : yearParam
}

export const getCodeParam = (
  route: RouteLocationNormalizedLoadedGeneric
): string => {
  const codeParam = route.params.code
  return Array.isArray(codeParam) ? codeParam[0] : codeParam
}
