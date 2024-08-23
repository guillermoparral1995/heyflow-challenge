import { buildPathArray, isArrayIndex, resolveValueAndPath } from ".";

describe("utils", () => {
    describe("buildPathArray", () => {
        it("should build path array - simple nested object", () => {
            const path = "a.b.c.d";
            const result = buildPathArray(path);
            expect(result).toEqual(["a", "b", "c", "d"]);
        })
        it("should build path array - object with array", () => {
            const path = "a.b.c[0].d";
            const result = buildPathArray(path);
            expect(result).toEqual(["a", "b", "c", "[0]", "d"]);
        })
        it("should build path array - object with res at beginning", () => {
            const path = "res.a.b.c[0].d";
            const result = buildPathArray(path);
            expect(result).toEqual(["a", "b", "c", "[0]", "d"]);
        })
    })

    describe("isArrayIndex", () => {
        it("should return true for array index", () => {
            const pathSegment = "[0]";
            const result = isArrayIndex(pathSegment);
            expect(result).toBeTruthy();
        })
        it("should return false for non array index", () => {
            const pathSegment = "a";
            const result = isArrayIndex(pathSegment);
            expect(result).toBeFalsy();
        })
    })

    describe("resolveValueAndPath", () => {
        it("should resolve value and path - simple nested object", () => {
            const path = ["a", "b", "c", "d"];
            const initialObj = { a: { b: { c: { d: "value" } } } };
            const [value, resolvedPath] = resolveValueAndPath(path, initialObj);
            expect(value).toEqual("value");
            expect(resolvedPath).toEqual("res.a.b.c.d");
        })

        it("should resolve value and path - object with array", () => {
            const path = ["a", "b", "c", "[0]", "d"];
            const initialObj = { a: { b: { c: [{ d: "value" }] } } };
            const [value, resolvedPath] = resolveValueAndPath(path, initialObj);
            expect(value).toEqual("value");
            expect(resolvedPath).toEqual("res.a.b.c[0].d");
        })

        it("should resolve value and path - object with res at beginning", () => {
            const path = ["a", "b", "c", "[0]", "d"];
            const initialObj = { res: { a: { b: { c: [{ d: "value" }] } } } }
            const [value, resolvedPath] = resolveValueAndPath(path, initialObj);
            expect(value).toEqual("undefined");
            expect(resolvedPath).toEqual("res.a.b.c[0].d");
        })

        it("should return undefined for undefined object", () => {
            const path = ["a", "b", "c", "d"];
            const initialObj = undefined;
            const [value, resolvedPath] = resolveValueAndPath(path, initialObj);
            expect(value).toEqual("undefined");
            expect(resolvedPath).toEqual("");
        })

        it("should return undefined for invalid path", () => {
            const path = ["a", "b", "c", "d"];
            const initialObj = { a: { b: { c: { e: "value" } } } };
            const [value, resolvedPath] = resolveValueAndPath(path, initialObj);
            expect(value).toEqual("undefined");
            expect(resolvedPath).toEqual("res.a.b.c.d");
        })

        it("should return undefined for invalid path - array index", () => {
            const path = ["a", "b", "c", "[1]", "d"];
            const initialObj = { a: { b: { c: [{ d: "value" }] } } }
            const [value, resolvedPath] = resolveValueAndPath(path, initialObj);
            expect(value).toEqual("undefined");
            expect(resolvedPath).toEqual("res.a.b.c[1].d");
        })
    })
})