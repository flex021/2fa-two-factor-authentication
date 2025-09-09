import { pick } from 'lodash'


export const pickUser = (user) => {
  if (!user) return {}
  return pick(user, ['_id', 'email', 'username', 'youtube', 'require_2fa', 'is_2fa_verified'])
}
