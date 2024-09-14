export function hexToRgba(hex: string, alpha: number = 1): string {
  // Remove the leading '#' if present
  hex = hex.replace(/^#/, '')

  // Parse hex color code
  let r: number, g: number, b: number

  if (hex.length === 3) {
    // For 3-digit hex (e.g., #abc)
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
  } else if (hex.length === 6) {
    // For 6-digit hex (e.g., #abcdef)
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  } else {
    throw new Error('Invalid hex color format')
  }

  // Return the RGBA string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
