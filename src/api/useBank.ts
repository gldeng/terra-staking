import { Balance, BankAPI, BankData } from '../types/bank'
import { useAddress } from './useAddress'
import useFCD from './useFCD'

export default (): BankAPI => {
  const address = useAddress()
  const { data, ...rest } = useFCD<BankData>({ url: `/v1/bank/${address}` })

  const fixAvailable = (balance: Balance[]): Balance[] =>
    balance.map(({ available, ...rest }) => ({
      ...rest,
      available: available,
    }))

  return Object.assign(
    {},
    rest,
    data && {
      data: Object.assign({}, data, { balance: fixAvailable(data.balance) }),
    }
  )
}
