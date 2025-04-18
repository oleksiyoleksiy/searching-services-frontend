let globalNavigate: any = null

export const setNavigate = (value: any) => {
  globalNavigate = value
}

export const getNavigate = () => {
  return globalNavigate
}
