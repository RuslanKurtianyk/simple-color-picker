import { hslToRgb, rgbToHsl } from "./converter";

describe("Converter", () => {
    describe("HSL to RGB", () => {
        it("SHOULD convert white color", () => {
            const whiteRgbColor = [255, 255, 255];
            expect(hslToRgb(0, 0, 1)).toEqual(whiteRgbColor);
        });

        it("SHOULD convert black color", () => {
            const blackRgbColor = [0, 0, 0];
            expect(hslToRgb(0, 0, 0)).toEqual(blackRgbColor);
        });

        it("SHOULD convert red color", () => {
            const redRgbColor = [255, 0, 0];
            expect(hslToRgb(0, 1, 0.5)).toEqual(redRgbColor);
        });

        it("SHOULD convert green color", () => {
            const greenRgbColor = [0, 255 ,0];
            expect(hslToRgb(120, 1, 0.5)).toEqual(greenRgbColor);
        });

        it("SHOULD convert blue color", () => {
            const blueRgbColor = [0, 0, 255];
            expect(hslToRgb(240, 1, 0.5)).toEqual(blueRgbColor);
        });

        it("SHOULD convert gray color", () => {
            const grayRgbColor = [128, 128, 128];
            expect(hslToRgb(0, 0, 0.502)).toEqual(grayRgbColor);
        });

        it("SHOULD handle bigger hue", () => {
            expect(() => hslToRgb(361, 0, 0)).toThrow(new Error("Something went wrong. Please check input data."));
        });

        it("SHOULD handle bigger saturation", () => {
            expect(() => hslToRgb(100, 2, 0)).toThrow(new Error("Something went wrong. Please check input data."));
        });

        it("SHOULD handle bigger lightness", () => {
            expect(() => hslToRgb(349, 0, 3)).toThrow(new Error("Something went wrong. Please check input data."));
        });
    });

    describe("RGB to HSL", () => {
        it("SHOULD convert white color", () => {
            const whiteHslColor = [0, 0, 1];
            expect(rgbToHsl(255, 255, 255)).toEqual(whiteHslColor);
        });

        it("SHOULD convert black color", () => {
            const blackHslColor = [0, 0, 0];
            expect(rgbToHsl(0, 0, 0)).toEqual(blackHslColor);
        });

        it("SHOULD convert red color", () => {
            const redHslColor = [0, 1, 0.5];
            expect(rgbToHsl(255, 0, 0)).toEqual(redHslColor);
        });

        it("SHOULD convert green color", () => {
            const greenHslColor = [120, 1, 0.5];
            expect(rgbToHsl(0, 255, 0)).toEqual(greenHslColor);
        });

        it("SHOULD convert blue color", () => {
            const blueHslColor = [240, 1, 0.5];
            expect(rgbToHsl(0, 0, 255)).toEqual(blueHslColor);
        });

        it("SHOULD convert gray color", () => {
            const grayRgbColor = [0, 0, 0.502];
            expect(rgbToHsl(128, 128, 128)).toEqual(grayRgbColor);
        });

        it("SHOULD handle wrong red value", () => {
            expect(() => rgbToHsl("test", 0, 0)).toThrow(new Error("Something went wrong. Please check input data."));
        });

        it("SHOULD handle wrong green value", () => {
            expect(() => rgbToHsl(100, "test", 0)).toThrow(new Error("Something went wrong. Please check input data."));
        });

        it("SHOULD handle wrong blue", () => {
            expect(() => rgbToHsl(349, 0, "test")).toThrow(new Error("Something went wrong. Please check input data."));
        });
    });
});

