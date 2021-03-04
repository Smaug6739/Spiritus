module.exports = {
    TOKENS : {
        DISCORD : '<token>'
    },
    MONGOOSE : {
        DBCONNECTION : '<mongodb url connection>'
    },
    DEFAULTSETTINGS: {
        prefix: "<default prefix>",
        logChannel: "<default logs channel>",
        welcomeMessage: "<default welcome message>",
        rankcard: "<default rankcard>",
        invitations : false, //Default anti-invitations status
        kickauto : false //Default kick-auto status
      },
    WEBHOOKS : {
        ERRORS : {
            ID : '<webhook errors id>',
            TOKEN : '<webhook errors token>',
            NAME : '<webhook errors name>',
            AVATAR : '<webhook errors name>',
        },
        CONSOLE : {
            ID : '<webhook errors id>',
            TOKEN : '<webhook errors token>',
            NAME : '<webhook errors name>',
            AVATAR : '<webhook errors name>',
        },
        CONNECTIONS : {
            MONGOOSE : {
                ID : '<mongodb webhook connection id>',
                TOKEN : '<mongodb webhook connection token>',
                NAME : '<mongodb webhook connection name>',
                AVATAR : '<mongodb webhook connection name>',
            },
            DISCORD : {
                ID : '<discord webhook connection id>',
                TOKEN : '<discord webhook connection token>',
                NAME : '<discord webhook connection name>',
                AVATAR : '<discord webhook connection name>',
            }
        },
    },
    ADMIN : {
        ORIGINPULL : '<branch>',
    }
};
