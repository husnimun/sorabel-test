export function getAvailableSize(variants) {
  let sizeMap = {}
  return variants.reduce((acc, variant) => {
    if (variant.quantity > 0 && !sizeMap[variant.size]) {
      sizeMap[variant.size] = true
      acc.push(variant.size)
    }
    return acc
  }, [])
}

export function getAvailableColor(variants) {
  let colorMap = {}
  return variants.reduce((acc, variant) => {
    if (variant.quantity > 0 && !colorMap[variant.color]) {
      colorMap[variant.color] = true
      acc.push(variant.color)
    }
    return acc
  }, [])
}

export function filterVariantsByColorAndSize(
  variants,
  color = null,
  size = null
) {
  return variants.filter(variant => {
    if (color && size) {
      return variant.color === color && variant.size === size
    } else if (color && !size) {
      return variant.color === color
    } else if (!color && size) {
      return variant.size === size
    }
    return true
  })
}

export function getVariantsAvailabilityMapByType(variants, type) {
  return variants.reduce((acc, variant) => {
    if (variant.quantity > 0) {
      acc[variant[type]] = true
    }
    return acc
  }, {})
}
