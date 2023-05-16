class AppConfig{
}

class DevelopmentConfig extends AppConfig{
    public host = 'localhost';

    public username = 'root';

    public password = '';

    public database = 'remember';

    public port = 3001;

    public siteUrl = 'http://localhost:4200';

    public nodeUrl = "http://" + this.host + ":" + this.port + "/";

    public isProduction = false;
}

class ProductionConfig extends AppConfig{
    public host = process.env.HOST || 'localhost';

    public username = process.env.MYSQL_USER;

    public password = process.env.MYSQL_PASSWORD;

    public database = process.env.MYSQL_DATABASE;

    public port = process.env.PORT;

    public siteUrl = process.env.SITE_URL;

    public nodeUrl = "http://" + this.host + ":" + this.port + "/";

    public isProduction = true;

}

const appConfig = (process.env.NODE_ENV === 'production') ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;