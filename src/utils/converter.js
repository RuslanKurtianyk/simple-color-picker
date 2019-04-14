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
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
export const rgbToHsl = (r, g, b) => {
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        throw new Error("Something went wrong. Please check input data.")
    }
    r = r / 255
    g = g / 255
    b = b / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
        h = s = 0
    } else {
        const diff = max - min
        s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min)

        switch (max) {
            case r:
                h = (g - b) / diff + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / diff + 2
                break
            case b:
                h = (r - g) / diff + 4
                break
        }

        h = h * 60 
    }

    return [
        Math.round(h * 1000) / 1000, 
        Math.round(s * 1000) / 1000, 
        Math.round(l * 1000) / 1000, 
    ]
}