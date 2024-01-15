export type XANOSDBConfig = {
    host: string;
    port?: number;
    user: string;
    password: string;
    database: string;
}

export interface XANOSServerConfig {
    databases: {
        main: XANOSDBConfig,
        tanants?: {
            [id: string]: XANOSDBConfig
        },
    },
    secrets: {
        public: string;
        private: string;
    }
}

export interface XANOSClientConfig {
    secrets: {
        public: string;
    }
}