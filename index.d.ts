export const NEOVIS_DEFAULT_CONFIG: unique symbol;

export const enum NeovisEvent {
    CompletionEvent = 'completed',
    ClickNodeEvent = 'clickNode',
    ClickEdgeEvent = 'clickEdge',
    ErrorEvent = 'error'
}

export interface IVisColor {
    color?: string;
    highlight?: string;
    hover?: string;
    opacity?: number;
}

// https://visjs.github.io/vis-network/docs/network/nodes.html
export interface ILabelConfig {
    caption?: string;
    size?: string;
    community?: string;
    sizeCypher?: string;
    shape?: string;
    imageUrlPath?: string;
    imageExt?: string;
}

// https://almende.github.io/vis/docs/network/edges.html#
export interface IRelationshipConfig {
    thickness?: string;
    caption?: boolean;
    color?: string | IVisColor;
    colorFn?: (relationship: any) => string | IVisColor;
    toolTipFn?: (relationship: any) => string;
}

export interface INeovisConfig {
    container_id: string;
    server_url: string;
    server_user: string;
    server_password: string;
    labels?: {
        [label: string]: ILabelConfig,
        [NEOVIS_DEFAULT_CONFIG]?: IRelationshipConfig
    };
    relationships?: {
        [relationship: string]: IRelationshipConfig,
        [NEOVIS_DEFAULT_CONFIG]?: IRelationshipConfig
    };
    arrows?: boolean;
    hierarchical?: boolean;
    hierarchical_sort_method?: "hubsize" | "directed";
    initial_cypher?: string;
    console_debug?: boolean;
    encrypted?: "ENCRYPTION_OFF" | "ENCRYPTION_ON";
    trust?: "TRUST_ALL_CERTIFICATES" | "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES";
    customEdgesScalingFn?: (min: number, max: number, total: number, value: number) => number;
    cacheProperties?: boolean;
}

declare class Neovis {
    constructor(config: INeovisConfig);
    render(): void;
    clearNetwork(): void;
    registerOnEvent(eventType: NeovisEvent, handler: (event: any) => void): void;
    reinit(config: INeovisConfig): void;
    reload(): void;
    stabilize(): void;
    renderWithCypher(query: string): void;
}

export default Neovis;
