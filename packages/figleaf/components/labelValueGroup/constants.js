export const labelValueGroupBreakpoints = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl'
};

export const labelValueGroupDensity = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl'
};

export const labelValueClassNames_tablecell = {
    sm: 'sm:table-cell',
    md: 'md:table-cell',
    lg: 'lg:table-cell',
    xl: 'xl:table-cell'
};

export const labelValueClassNames_pr = {
    sm: 'sm:pr-3',
    md: 'md:pr-3',
    lg: 'lg:pr-3',
    xl: 'xl:pr-3'
};

/**
 * Returns a list of tailwind CSS classes that should be added to the
 * 'safelist' config in tailwind.config.js
 *
 * @returns []
 */
 export function get_label_value_group_css_safelist() {
    return [
        ...Object.values(labelValueClassNames_tablecell),
        ...Object.values(labelValueClassNames_pr),
    ];
}
