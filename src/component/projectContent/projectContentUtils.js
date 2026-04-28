import projectImages from '../../helper/projectImages.js'

export const embeds = {
  recsee: {
    src: 'https://www.youtube.com/embed/pGe_YpY2bG8?rel=0',
    title: 'RecSee motion graphic',
  },
}

export const resolveProjectImages = (imageNames = []) =>
  imageNames
    .map((name) => ({
      name,
      src: projectImages[name],
    }))
    .filter((image) => image.src)

export const getFeatureImageNames = (feature) =>
  feature?.images?.length
    ? feature.images
    : feature?.image
      ? [feature.image]
      : []

export const getFeatureImages = (feature) =>
  resolveProjectImages(getFeatureImageNames(feature))

export const normalizeFeatures = (features = []) =>
  features.map((feature) => ({
    ...feature,
    resolvedImages: getFeatureImages(feature),
  }))

export const splitFeaturesByMedia = (features = []) => {
  const normalizedFeatures = normalizeFeatures(features)

  return {
    mediaFeatures: normalizedFeatures.filter((feature) => feature.resolvedImages.length > 0),
    textFeatures: normalizedFeatures.filter((feature) => feature.resolvedImages.length === 0),
  }
}

export const getProjectEmbed = (customContent) =>
  customContent === 'recsee' ? embeds.recsee : null

export const hasProjectDetails = (details) =>
  Boolean(
    details?.summary ||
    details?.role?.title ||
    details?.role?.description ||
    details?.features?.length ||
    details?.challenge ||
    details?.process?.length
  )
