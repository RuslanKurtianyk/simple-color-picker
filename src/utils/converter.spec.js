import { hslToRgb, rgbToHex } from "./converter";

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

    describe("RGB to HEX", () => {
        it("SHOULD convert white color", () => {
            const whiteColor = "#ffffff";
            expect(rgbToHex(255, 255, 255)).toEqual(whiteColor);
        });

        it("SHOULD convert black color", () => {
            const blackColor = "#000000";
            expect(rgbToHex(0, 0, 0)).toEqual(blackColor);
        });

        it("SHOULD convert red color", () => {
            const redColor = "#ff0000";
            expect(rgbToHex(255, 0, 0)).toEqual(redColor);
        });

        it("SHOULD convert green color", () => {
            const greenColor = "#00ff00";
            expect(rgbToHex(0, 255 ,0)).toEqual(greenColor);
        });

        it("SHOULD convert blue color", () => {
            const blueRgbColor = "#0000ff";
            expect(rgbToHex(0, 0, 255)).toEqual(blueRgbColor);
        });

        it("SHOULD convert gray color", () => {
            const grayColor = "#808080";
            expect(rgbToHex(128, 128, 128)).toEqual(grayColor);
        });
    });
   
});

