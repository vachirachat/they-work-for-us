/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  const { pathname } = location
  // enable scroll to top on path = "/votelog"
  if (/^\/votelog/.test(pathname)) {
    window.scrollTo(0, 0)
    return true
  }
  return false
}