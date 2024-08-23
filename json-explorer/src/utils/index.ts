export const isArrayIndex = (pathSegment: string) =>
    !isNaN(Number(pathSegment.replace("[", "").replace("]", "")));

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