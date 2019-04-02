import { hslToRgb } from "./converter";

describe("Converter", () => {
    describe("HSL to RGB", () => {
        it("WHEN true SHOULD return true", () => {
            const whiteRgbColor = [255, 255, 255];
            expect(hslToRgb(0, 0, 1)).toBeTruthy(whiteRgbColor);
        });
    });
});

