import { html } from "../../utils/html"

export const AppSection = ({children, activeSection, section, isIOS}) => {
    return html`
        <section className=${`flex basis-auto lg:basis-full ${activeSection !== section ? 'hidden lg:hidden xl:flex' : ''} ${isIOS? 'min-h-[86vh] max-h-[86vh] pb-1' : 'min-h-[93vh] max-h-[88vh]'} lg:min-h-[92vh] xl:min-h-[95vh] md:min-h-[90vh] md:max-h-[90vh] overflow-y-auto`}>
            ${children}
        </section>
    `
}