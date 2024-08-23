/**
 * @param pathSegment: string - A segment of the path (e.g. "name", "[0]")
 * @returns boolean - Whether the path segment is an array index or not
 */
export const isArrayIndex = (pathSegment: string) =>
    !isNaN(Number(pathSegment.replace("[", "").replace("]", "")));

/**
 * @param path: string - A path string (e.g. "name.first", "name[0]")
 * @param initialObj: any - The initial object to resolve the path on (usually matches the JSON provided as argument)
 * @returns [any, string] - A tuple containing the resolved value and the resolved path
 */
export const resolveValueAndPath = (
    path: string[],
    initialObj: any
): [any, string] => {
    if (initialObj === undefined) return ["undefined", ""];
    try {
        const [resolvedValue, resolvedPath] = path.reduce(
            ([resolvedObj, ongoingPath], currentPath) => {
                return [
                    (isArrayIndex(currentPath)
                        ? resolvedObj[currentPath.replace("[", "").replace("]", "")]
                        : resolvedObj[currentPath]) ?? "undefined",
                    isArrayIndex(currentPath)
                        ? `${ongoingPath}${currentPath}`
                        : `${ongoingPath}.${currentPath}`,
                ];
            },
            [initialObj, "res"]
        );
        if (typeof resolvedValue === "object") return ["undefined", resolvedPath];
        return [resolvedValue, resolvedPath];
    } catch {
        return ["undefined", ""];
    }
};

/**
 * @param path: string - A path string (e.g. "name.first", "name[0]")
 * @returns string[] - An array of path segments
 */
export const buildPathArray = (path: string) => {
    return path.split('.').reduce((acc: string[], segment: string) => {
        if (segment.includes("[")) {
            const [key, index] = segment.split("[");
            const indexWithoutBrackets = index.replace("]", "");
            return [...acc, key, `[${indexWithoutBrackets}]`];
        }
        return [...acc, segment];
    }, []).filter(segment => segment !== 'res');
};