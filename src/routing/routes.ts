import {IdKey} from 'shared/types/id-key'

const callersBase = 'callers-base'
const calling = 'calling'
const scenario = 'scenario'

export const routes = {
    callersBase: {
        add: (): string => `/${callersBase}/add`,
        list: (): string => `/${callersBase}/list`,
        view: (id: IdKey): string => `/${callersBase}/view/id${id}`
    },
    calling: {
        list: (): string => `/${calling}/list`,
        create: (id?: IdKey): string => `/${calling}/create${id ? `/id${id}` : ''}`,
        view: (id: IdKey): string => `/${calling}/view/id${id}`
    },
    scenario: {
        list: (): string => `/${scenario}/list`,
        view: (id: IdKey) => `/${scenario}/view/id${id}`
    },
    settings: (): string => '/settings',
    stats: (): string => '/stats',
    test: (version: number): string => `/test/v${version}`
}
