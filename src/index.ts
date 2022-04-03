import { ContainerMapOptions, FleetOptions } from 'fleetform'

export const container: ContainerMapOptions = {
    cprox: {
        enabled: true,
        image: "majo418/cprox",
        networks: [
            "cunet"
        ],
        publish: {
            "80/tcp": 30006,
            "443/tcp": 30007,
        },
        volumes: {
            "/home/codec/ws/test/html": "/var/www/html",
            "/home/codec/ws/test/calc": "/var/www/calc",
            "/home/netde/certs/coreunit.net": "/app/certs",
        },
        envs: {
            "CERT_PATH": "/app/certs/cert1.pem",
            "KEY_PATH": "/app/certs/privkey1.pem",
            "CA_PATH": "/app/certs/fullchain1.pem",
            "VERBOSE": "true",
        },
        // https://37.131.246.34:30007
        // https://37.131.246.34:30007/asdadsd
        // https://37.131.246.34:30007/wow
        // https://37.131.246.34:30007/lol
        // https://coreunit.net:30007
        // https://test.coreunit.net:30007
        // https://static.coreunit.net:30007
        args: [
            "/app/dist/index.js",
            "*=REDIRECT:https://start.duckduckgo.com/?t=h_&ia=web&q=root",
            "*/wow=REDIRECT:https://start.duckduckgo.com/?t=h_&ia=web&q=wow",
            "*/lol=REDIRECT:https://start.duckduckgo.com/?t=h_&ia=web&q=lol",
            "*.coreunit.net=REDIRECT:https://start.duckduckgo.com/?t=h_&ia=web&q=starcoreunitnet",
            "coreunit.net=REDIRECT:https://start.duckduckgo.com/?t=h_&ia=web&q=rootcoreunitnet",
            "static.coreunit.net=STATIC:/var/www/html",
            "calc.coreunit.net=STATIC:/var/www/calc",
        ],
    },
}

export const backup: ContainerMapOptions = {
    nginx_test: {
        enabled: false,
        image: "nginx",
        networks: [
            "cunet",
        ],
    },
    nginx_test2: {
        enabled: false,
        image: "nginx",
        networks: [
            "cproxtest",
        ],
    },
    postgres: {
        enabled: false,
        host: "local",
        image: "postgres",
        networks: [
            "postgres"
        ],
        expose: [
            "5432/tcp"
        ],
        envs: {
            POSTGRES_USER: "superadminuser",
            POSTGRES_PASSWORD: "superFleetFormIsRunning911CallMajo",
            POSTGRES_DB: "default",
        },
        volumes: {
            "/home/store/postgres": "/var/lib/postgresql/data"
        },
    },
    keycloak: {
        enabled: false,
        image: "jboss/keycloak",
        host: "local",
        networks: [
            "fleetform"
        ],
        expose: [
            "8443/tcp"
        ],
        envs: {
            DB_VENDOR: "postgres",
            DB_USER: "fleetform",
            DB_PASSWORD: "fleetformPw",
            DB_PORT: "30052",
            DB_ADDR: "ports.codec.coreunit.net",
            DB_DATABASE: "keycloak",
            KEYCLOAK_USER: "fleetformAdmin",
            KEYCLOAK_PASSWORD: "fleetformSempai",
        },
    },
    dreg_web: {
        enabled: false,
        image: "joxit/docker-registry-ui",
        expose: [
            "80/tcp"
        ],
        envs: {
            "REGISTRY_TITLE": "CoreUnit.NET - DReg - Docker Registry",
            "REGISTRY_URL": "http://ff_dreg:5000"
        }
    },
    dreg: {
        enabled: false,
        image: "registry",
        tag: "2",
        expose: [
            "5000/tcp",
        ],
        networks: [
            "cunet",
        ],
    },
    gmod_test: {
        enabled: false,
        image: "hackebein/garrysmod",
        publish: {
            "27015/tcp": 27015,
            "27015/udp": 27015,
        },
    },
    portainer_test: {
        enabled: false,
        image: "cr.portainer.io/portainer/portainer-ce",
        host: "local",
        expose: [
            "9000/tcp"
        ],
        volumes: {
            "/var/run/docker.sock": "/var/run/docker.sock"
        },
    },
    postgres_test: {
        enabled: false,
        host: "local",
        image: "postgres",
        networks: [
            "fleetform"
        ],
        publish: {
            "5432/tcp": 39000,
            "5432/udp": 39000,
        },
        envs: {
            POSTGRES_USER: "fleetform",
            POSTGRES_PASSWORD: "fleetformPw",
            POSTGRES_DB: "fleetform",
        },
        volumes: {
            "/home/store/postgres": "/var/lib/postgresql/data"
        },
    },
    keycloak_test: {
        enabled: false,
        image: "jboss/keycloak",
        host: "local",
        networks: [
            "fleetform"
        ],
        expose: [
            "8443/tcp"
        ],
        envs: {
            DB_VENDOR: "postgres",
            DB_USER: "fleetform",
            DB_PASSWORD: "fleetformPw",
            DB_PORT: "30052",
            DB_ADDR: "ports.codec.coreunit.net",
            DB_DATABASE: "keycloak",
            KEYCLOAK_USER: "fleetformAdmin",
            KEYCLOAK_PASSWORD: "fleetformSempai",
        },
    },
    nextcloud_test: {
        enabled: false,
        image: "nextcloud",
        tag: "21-fpm",
        host: "local",
        networks: [
            "fleetform"
        ],
        expose: [
            "80/tcp"
        ],
        volumes: {
            "/home/store/nextcloud/apps": "/var/www/html/custom_apps",
            "/home/store/nextcloud/config": "/var/www/html/config",
            "/home/store/nextcloud/data": "/var/www/html/data",
            "/home/store/nextcloud/theme": "/var/www/html/themes",
        },
        envs: {
            NEXTCLOUD_TRUSTED_DOMAINS: "cloud.coreunit.net localhost",
            NEXTCLOUD_ADMIN_USER: "fleetform",
            NEXTCLOUD_ADMIN_PASSWORD: "Pw",
            POSTGRES_USER: "fleetform",
            POSTGRES_PASSWORD: "fleetformPw",
            POSTGRES_HOST: "ports.codec.coreunit.net",
            POSTGRES_PORT: "30052",
            SMTP_HOST: "",
            SMTP_SECURE: "",
            SMTP_PORT: "",
            SMTP_AUTHTYPE: "",
            SMTP_NAME: "",
            SMTP_PASSWORD: "",
            MAIL_FROM_ADDRESS: "",
            MAIL_DOMAIN: "",
        }
    },
    gitlab_test: {
        enabled: false,
        image: "gitlab/gitlab-ce",
        host: "local",
        networks: [
            "fleetform"
        ],
        publish: {
            "39022/tcp": 39022,
        },
        expose: [
            "443/tcp"
        ],
        volumes: {
            "/home/store/gitlab/config": "/etc/gitlab",
            "/home/store/gitlab/logs": "/var/log/gitlab",
            "/home/store/gitlab/data": "/var/opt/gitlab",
        },
        envs: {
            "GITLAB_OMNIBUS_CONFIG": `
                external_url 'https://ports.codec.coreunit.net:443';

                gitlab_rails['gitlab_ssh_host'] = 'ports.codec.coreunit.net';
                gitlab_rails['gitlab_ssh_user'] = 'sshuser';
                gitlab_rails['gitlab_shell_ssh_port'] = 39022;
                gitlab_rails['gitlab_shell_git_timeout'] = 1200;

                gitlab_rails['initial_root_password'] = "rootSenpai";
                gitlab_rails['lfs_enabled'] = true;
                gitlab_rails['gitlab_default_theme'] = 9;
                gitlab_rails['time_zone'] = 'UTC';

                gitlab_rails['omniauth_providers'] = [
                    {
                      name: "openid_connect",
                      label: "Auth.CoreUnit.NET",
                      icon: "<custom_provider_icon>",
                      args: {
                        name: "openid_connect",
                        scope: ["openid","profile","email"],
                        response_type: "code",
                        issuer: "<your_oidc_url>",
                        discovery: true,
                        client_auth_method: "query",
                        uid_field: "<uid_field>",
                        send_scope_to_token_endpoint: "false",
                        client_options: {
                          identifier: "<your_oidc_client_id>",
                          secret: "<your_oidc_client_secret>",
                          redirect_uri: "<your_gitlab_url>/users/auth/openid_connect/callback"
                        }
                      }
                    }
                  ]

                #gitlab_rails['smtp_enable'] = true;
                #gitlab_rails['smtp_address'] = "smtp.server";
                #gitlab_rails['smtp_port'] = 465;
                #gitlab_rails['smtp_user_name'] = "smtp user";
                #gitlab_rails['smtp_password'] = "smtp password";
                #gitlab_rails['smtp_domain'] = "example.com";
                #gitlab_rails['smtp_authentication'] = "login";
                #gitlab_rails['smtp_enable_starttls_auto'] = true;
                #gitlab_rails['smtp_tls'] = false;
                #gitlab_rails['smtp_pool'] = false;
            `
        }
    },
    terraria_test: {
        enabled: false,
        host: "local",
        tag: "tshock-latest",
        image: "beardedio/terraria",
        networks: [
            "fleetform"
        ],
        expose: [
            "7777/tcp"
        ],
        envs: {
        },
        volumes: {
            "/home/store/terraria/majotest": "/root/.local/share/Terraria/Worlds",
        },
        args: [
            "-world",
            "/root/.local/share/Terraria/Worlds/sex.wld",
            "-ip",
            "0.0.0.0",
            "-port",
            "7777",
            "-autocreate",
            "3",
            "-seed",
            "05162020",
        ]
    },
    phppgadmin_test: {
        enabled: false,
        host: "local",
        image: "dockage/phppgadmin",
        networks: [
            "fleetform"
        ],
        expose: [
            "80/tcp"
        ],
        envs: {
            PHP_PG_ADMIN_SERVER_DESC: "fleetform",
            PHP_PG_ADMIN_SERVER_HOST: "ports.codec.coreunit.net",
            PHP_PG_ADMIN_SERVER_PORT: "30052",
            PHP_PG_ADMIN_SERVER_DEFAULT_DB: "fleetform",
            PHP_PG_ADMIN_DEFAULT_LANG: "english",
            PHP_PG_ADMIN_SERVER_SSL_MODE: "allow",
        },
    },
    mysql_test: {
        enabled: false,
        image: "mysql",
        host: "local",
        networks: [
            "fleetform"
        ],
        publish: {
            "3306/tcp": 39001,
            "3306/udp": 39001,
        },
        envs: {
            MYSQL_ROOT_PASSWORD: "fleetformPw",
            MYSQL_USER: "fleetform",
            MYSQL_PASSWORD: "fleetformPw",
        },
        volumes: {
            "/home/store/mysql": "/var/lib/mysql"
        },
    },
    adminer_test: {
        enabled: false,
        image: "adminer",
        host: "local",
        networks: [
            "fleetform"
        ],
        expose: [
            "8080/tcp"
        ],
        envs: {
            ADMINER_PLUGINS: "",
            ADMINER_DEFAULT_SERVER: ""
        },
    },
    mariadb_test: {
        enabled: false,
        image: "mariadb",
        host: "local",
        networks: [
            "fleetform"
        ],
        publish: {
            "3808/tcp": 39002,
            "3808/udp": 39002,
        },
        envs: {
            MYSQL_ROOT_PASSWORD: "fleetformPw",
            MYSQL_USER: "fleetform",
            MYSQL_PASSWORD: "fleetformPw",
        },
        volumes: {
            "/home/store/mariadb": "/var/lib/mysql"
        },
    },
    phpmyadmin_test: {
        enabled: false,
        image: "phpmyadmin",
        host: "local",
        networks: [
            "fleetform"
        ],
        expose: [
            "27017/tcp",
            "27017/udp",
        ],
        envs: {
            PMA_HOST: "37.131.246.47",
            PMA_PORT: "30056",
            PMA_USER: "fleetform",
            PMA_PASSWORD: "fleetformPw",
        },
    },
    mongodb_test: {
        enabled: false,
        image: "mongo",
        host: "local",
        networks: [
            "fleetform"
        ],
        publish: {
            "27017/tcp": 27017,
            "27017/udp": 27017
        },
        envs: {
            MONGO_INITDB_ROOT_USERNAME: "fleetform",
            MONGO_INITDB_ROOT_PASSWORD: "fleetformPw"
        },
        volumes: {
            "/home/store/mongob": "/data/db"
        },
    },
    mongodb_express_test: {
        enabled: false,
        image: "mongo-express",
        host: "local",
        networks: [
            "fleetform"
        ],
        expose: [
            "8081/tcp"
        ],
        envs: {
            ME_CONFIG_MONGODB_ADMINUSERNAME: "fleetform",
            ME_CONFIG_MONGODB_ADMINPASSWORD: "fleetformPw",
            ME_CONFIG_MONGODB_URL: "mongodb://fleetform:fleetformPw@37.131.246.47:30059/"
        },
    },
}

export const fleet: FleetOptions = {
    container: container
}

export default fleet
