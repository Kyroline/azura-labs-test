import { useMediaQuery } from "react-responsive"
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../../tailwind.config"

const config = resolveConfig(tailwindConfig)
const breakpoints = config.theme.screens

const useBreakpoint = () => {
    const breakpointQueries = Object.entries(breakpoints).reduce((acc, [key, value]) => {
        acc[key] = useMediaQuery({ query: `(min-width: ${value})` });
        return acc;
    }, {} as Record<string, boolean>);

    return breakpointQueries;
}

export default useBreakpoint