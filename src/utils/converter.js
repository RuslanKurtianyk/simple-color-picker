/**
 * Converts HSL color value to RGB. Conversion formula
 * adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB.
 *
 * @param   {number}  h       The hue (value in set [0, 360])
 * @param   {number}  s       The saturation (value in set [0, 1])
 * @param   {number}  l       The lightness (value in set [0, 1])
 * @return  {Array}           The RGB representation (r, g, and b in the set [0, 255])
 */
export const hslToRgb = (h, s, l) => {
    if (h < 0 || h > 360 || s < 0 || s > 1 || l < 0 || l > 1) {
        throw new Error("Something went wrong. Please check input data.")
    }
    const c = (1 - Math.abs(2 * l - 1)) * s
    const hp = h / 60.0
    const x = c * (1 - Math.abs((hp % 2) - 1))
    let result

    if (isNaN(h)) result = [0, 0, 0]
    else if (hp <= 1) result = [c, x, 0]
    else if (hp <= 2) result = [x, c, 0]
    else if (hp <= 3) result = [0, c, x]
    else if (hp <= 4) result = [0, x, c]
    else if (hp <= 5) result = [x, 0, c]
    else if (hp <= 6) result = [c, 0, x]
    const m = l - c * 0.5

    const hasErrors = result.some(r => typeof (r) === undefined)
    if (hasErrors) {
        throw new Error("Something went wrong(")
    }

    return [
        Math.round(255 * (result[0] + m)),
        Math.round(255 * (result[1] + m)),
        Math.round(255 * (result[2] + m))
    ]
}

/**
 * Converts an RGB color value to HEX.
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {string}          The HEX color value
 */
export const rgbToHex = (r, g, b) => {
    const rValue = valueToHex(r)
    const gValue = valueToHex(g)
    const bValue = valueToHex(b)
    return `#${rValue}${gValue}${bValue}`
}

const valueToHex = (value) => {
    const hex = value.toString(16)
    return hex.length == 1 ? '0' + hex : hex
}