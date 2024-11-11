// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Hooks Import
import { useSelector } from 'react-redux'
import { PROFILES, ROUTES_PERMISSION } from 'src/configs/profiles'

const resolveProfile = (user, path) => {
  const userProfile = user?.profile ? PROFILES[user.profile] : PROFILES.default

  if (!userProfile) {
    return []
  }
  const permission = ROUTES_PERMISSION[path]
  return userProfile.includes(permission)
}

const AuthGuard = props => {
  const { children, fallback } = props
  const { user } = useSelector(state => state.session)
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      if (user && !resolveProfile(user, router.pathname)) {
        router.replace({
          pathname: '/landing-page/home/'
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )
  // if (isLoading || user === null) {
  //   return fallback
  // }

  return <>{children}</>
}

export default AuthGuard
