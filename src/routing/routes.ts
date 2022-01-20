const callersBase = 'callers-base'
const calling = 'calling'
const scenario = 'scenario'

export const routes = {
    callersBase: {
        add: (): string => `/${callersBase}/add`,
        list: (): string => `/${callersBase}/list`,
        view: (id: string | number): string => `/${callersBase}/view/id${id}`
    },
    calling: {
        list: (): string => `/${calling}/list`,
        create: (id?: number | string): string => `/${calling}/create${id ? `/id${id}` : ''}`,
        view: (id: string | number): string => `/${calling}/view/id${id}`
    },
    scenario: {
        list: (): string => `/${scenario}/list`,
        view: (id: string | number) => `/${scenario}/view/id${id}`
    },
    settings: (): string => '/settings',
    stats: (): string => '/stats',
    test: (): string => '/test'
}
