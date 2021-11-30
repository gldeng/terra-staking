import BigNumber from 'bignumber.js'

interface Config {
  integer?: boolean
}

export const decimal = (number: string = '0', decimals: number = 6): string =>
  new BigNumber(number)
    .decimalPlaces(decimals, BigNumber.ROUND_DOWN)
    .toFormat(decimals)

export const decimalN = (number: string = '0', decimals: number = 6): number =>
  new BigNumber(number).decimalPlaces(decimals, BigNumber.ROUND_DOWN).toNumber()

export const amount = (
  amount: string,
  decimals = 6,
  config?: Config
): string => {
  const number = new BigNumber(amount || 0).div(new BigNumber(10).pow(decimals))
  return decimal(number.toString(), config?.integer ? 0 : decimals)
}

export const amountN = (
  amount: string,
  decimals = 6,
  config?: Config
): number => {
  const number = new BigNumber(amount || 0).div(new BigNumber(10).pow(decimals))
  return decimalN(number.toString(), config?.integer ? 0 : decimals)
}

export const toAmount = (input: string, decimals = 6): string => {
  const number = new BigNumber(input ?? 0).times(
    new BigNumber(10).pow(decimals)
  )

  return input ? number.decimalPlaces(0, BigNumber.ROUND_DOWN).toString() : '0'
}
